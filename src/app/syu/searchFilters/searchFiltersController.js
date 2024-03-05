const collegeModel = require("../collegeMaster/collegeModel");
const courseModel = require("../courseMaster/courseModel");
const programMasterModel = require("../programMaster/programMasterModel");
const cityModel = require("../cityMaster/cityModel");
const countryModel = require("../countryMaster/countryModel");
const { Sequelize, Op } = require("sequelize");

// const globalSearch = async (req, res) => {
//   try {
//     const { search } = req.body;

//     const colleges = await collegeModel.findAll({
//       where: {
//         [Op.or]: [
//           {
//             collegeName: {
//               [Op.like]: `%${search}%`,
//             },
//           },
//           {
//             "$City.cityName$": {
//               [Op.like]: `%${search}%`,
//             },
//           },
//           {
//             "$Country.countryName$": {
//               [Op.like]: `%${search}%`,
//             },
//           },
//         ],
//       },
//       include: [{ model: cityModel }, { model: countryModel }],
//     });

//     const courses = await courseModel.findAll({
//       where: {
//         [Op.or]: [
//           {
//             courseName: {
//               [Op.like]: `%${search}%`,
//             },
//           },
//           {
//             courseFullForm: {
//               [Op.like]: `%${search}%`,
//             },
//           },
//         ],
//       },
//     });

//     let response = {};

//     if (colleges.length > 0) {
//       response.colleges = colleges;
//     }

//     if (courses.length > 0) {
//       response.courses = courses;
//     }

//     const totalRecords = Object.keys(response).reduce(
//       (total, key) =>
//         total + (Array.isArray(response[key]) ? response[key].length : 1),
//       0
//     );

//     if (totalRecords > 0) {
//       return res.status(200).json({
//         status: 200,
//         totalRecords: totalRecords,
//         data: response,
//       });
//     }

//     return res.status(404).json({
//       status: 404,
//       error: "404",
//       message: `No results found for ${search}.`,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ status: 500, error: "Internal server error." });
//   }
// };
const globalSearch = async (req, res) => {
  try {
    const { search } = req.body;

    const programs = await programMasterModel.findAll({
      include: [
        { model: courseModel },
        {
          model: collegeModel,
          include: [{ model: cityModel }, { model: countryModel }],
        },
      ],
      where: {
        [Op.or]: [
          {
            "$College.collegename$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$College.City.cityname$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$College.Country.countryname$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            programmelevel: {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            intaketime: {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$Course.coursefullform$": {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            "$Course.coursename$": {
              [Op.iLike]: `%${search}%`,
            },
          },
        ],
      },
    });

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
      message: `No results found for ${search}.`,
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
