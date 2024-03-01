const syu = (app) => {
  app.use("/auth", require("../app/syu/auth/authRoutes"));
  app.use("/role", require("../app/syu/roles/roleRoutes"));
  app.use(
    "/department",
    require("../app/syu/departmentMaster/departmentMasterRoutes")
  );
  app.use("/country", require("../app/syu/countryMaster/countryRouter"));
  app.use("/search", require("../app/syu/searchFilters/searchFiltersRoutes"));
  app.use("/college", require("../app/syu/collegeMaster/collegeRoutes"));
  app.use("/city", require("../app/syu/cityMaster/cityRoutes"));
  app.use("/course", require("../app/syu/courseMaster/courseRoutes"));
  app.use("/currency", require("../app/syu/currencyMaster/currencyRoutes"));
  app.use("/program", require("../app/syu/programMaster/programMasterRoutes"));
  app.use("/user", require("../app/syu/userMaster/userMasterRoutes"));
  app.use(
    "/manageStudent",
    require("../app/syu/manageStudentMaster/manageStudentMasterRoutes")
  );
  app.use(
    "/manageApplication",
    require("../app/syu/manageApplicationMaster/manageApplicationMasterRoutes")
  );
  app.use(
    "/manageDocument",
    require("../app/syu/documentMaster/documentMasterRoutes")
  );
  app.use(
    "/manageAddress",
    require("../app/syu/addressMaster/addressMasterRoutes")
  );
  app.use(
    "/managePassport",
    require("../app/syu/passportMaster/passportMasterRoutes")
  );
  app.use(
    "/manageWorkExperience",
    require("../app/syu/workExperienceMaster/workExperienceMasterRoutes")
  );
  app.use("/manageTest", require("../app/syu/testMaster/testMasterRoutes"));
};

const routes = {
  syu,
};

module.exports = routes[process.env.PROJ_NAME];
