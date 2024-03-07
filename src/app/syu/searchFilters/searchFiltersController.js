const collegeModel = require("../collegeMaster/collegeModel");
const courseModel = require("../courseMaster/courseModel");
const programMasterModel = require("../programMaster/programMasterModel");
const cityModel = require("../cityMaster/cityModel");
const countryModel = require("../countryMaster/countryModel");
const stateModel = require("../stateMaster/stateMasterModel");
const { Sequelize, Op } = require("sequelize");

const globalSearch = async (req, res) => {
  try {
    const {
      limit,
      skip,
      fees,
      globalSearch,
      programmeLevel,
      intakeTime,
      country,
      state,
      programmeDuration,
    } = req.body;

    const whereConditions = {
      [Op.or]: [
        {
          "$College.collegename$": {
            [Op.iLike]: `%${globalSearch}%`,
          },
        },
        {
          "$College.City.cityname$": {
            [Op.iLike]: `%${globalSearch}%`,
          },
        },
        {
          "$College.City.State.statename$": {
            [Op.iLike]: `%${globalSearch}%`,
          },
        },
        {
          "$College.Country.countryname$": {
            [Op.iLike]: `%${globalSearch}%`,
          },
        },
        {
          "$Course.coursefullform$": {
            [Op.iLike]: `%${globalSearch}%`,
          },
        },
        {
          "$Course.coursename$": {
            [Op.iLike]: `%${globalSearch}%`,
          },
        },
      ],
    };

    if (programmeLevel) {
      whereConditions.programmelevel = {
        [Op.iLike]: `%${programmeLevel}%`,
      };
    }

    if (intakeTime.length > 0) {
      whereConditions.intaketime = {
        [Op.or]: intakeTime.map((intake) => ({
          [Op.iLike]: `%${intake}%`,
        })),
      };
    }
    if (state.length > 0) {
      whereConditions["$College.City.State.statename$"] = {
        [Op.or]: state.map((state) => ({
          [Op.iLike]: `%${state}%`,
        })),
      };
    }
    if (country.length > 0) {
      whereConditions["$College.Country.countryname$"] = {
        [Op.or]: country.map((country) => ({
          [Op.iLike]: `%${country}%`,
        })),
      };
    }
    if (programmeDuration) {
      whereConditions.duration = {
        [Op.iLike]: `%${programmeDuration}%`,
      };
    }

    if (fees && fees.minFees !== "" && fees.maxFees !== "") {
      whereConditions.fees = {
        [Op.between]: [fees.minFees, fees.maxFees],
      };
    }
    // Add similar conditions for country and state if provided

    const programs = await programMasterModel.findAll(
      {
        include: [
          { model: courseModel },
          {
            model: collegeModel,
            include: [
              { model: cityModel, include: [{ model: stateModel }] },
              { model: countryModel },
            ],
          },
        ],
        where: whereConditions,
      },
      { limit: limit, offset: skip }
    );

    if (programs.length > 0) {
      return res.status(200).json({
        status: 200,
        totalRecords: programs.length,
        data: programs,
      });
    }

    return res.status(404).json({
      status: 404,
      error: "404",
      message: `No results found for ${globalSearch}.`,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: 500, error: "Internal server error." });
  }
};

const searchResult = async (req, res) => {
  try {
    const { id, searchType, sortBy, sortOrder } = req.body;

    if (searchType === "college") {
      const college = await collegeModel.findByPk(id);
      if (!college) {
        return res.status(404).json({
          status: 404,
          error: 404,
          message: `College with ID ${id} is not found`,
        });
      }

      const programs = await programMasterModel.findAll({
        where: { collegeId: id },
        order: [[`${sortBy}`, `${sortOrder}`]],
      });

      const result = {
        college: college,
        programs: programs,
      };

      return res.status(200).json({ status: 200, error: 200, data: result });
    }

    const course = await courseModel.findByPk(id);
    if (!course) {
      return res.status(404).json({
        status: 404,
        error: 404,
        message: `Course with ID ${id} is not found`,
      });
    }

    const programs = await programMasterModel.findAll({
      where: { courseId: id },
      include: [{ model: courseModel }, { model: collegeModel }],
      order: [[`${sortBy}`, `${sortOrder}`]],
    });

    if (programs.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 404,
        message: `Programs with course ID ${id} are not found`,
      });
    }

    return res.status(200).json({ status: 200, error: 200, data: programs });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal server error" });
  }
};

module.exports = { globalSearch, searchResult };
