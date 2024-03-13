const syu = (app) => {
  app.use("/auth", require("../app/syu/auth/authRoutes"));
  app.use("/role", require("../app/syu/roleMaster/roleMasterRoutes"));
  app.use(
    "/userStatus",
    require("../app/syu/userStatusMaster/userStatusMasterRoutes")
  );
  app.use(
    "/department",
    require("../app/syu/departmentMaster/departmentMasterRoutes")
  );
  app.use(
    "/userRole",
    require("../app/syu/userRoleMapping/userRoleMappingRoutes")
  );
  app.use("/country", require("../app/syu/countryMaster/countryRouter"));
  app.use("/search", require("../app/syu/searchFilters/searchFiltersRoutes"));
  app.use("/college", require("../app/syu/collegeMaster/collegeRoutes"));
  app.use("/city", require("../app/syu/cityMaster/cityRoutes"));
  app.use("/course", require("../app/syu/courseMaster/courseRoutes"));
  app.use("/currency", require("../app/syu/currencyMaster/currencyRoutes"));
  app.use("/program", require("../app/syu/programMaster/programMasterRoutes"));
  app.use("/user", require("../app/syu/userMaster/userMasterRoutes"));
  app.use("/student", require("../app/syu/studentMaster/studentMasterRoutes"));
  app.use(
    "/manageApplication",
    require("../app/syu/applicationMaster/applicationMasterRoutes")
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
  app.use(
    "/termsAndCondition",
    require("../app/syu/termsAndConditions/termsAndConditionsRoutes")
  );
  app.use("/stream", require("../app/syu/streamMaster/streamMasterRoutes"));
  app.use("/state", require("../app/syu/stateMaster/stateMasterRoutes"));
  app.use(
    "/educationLevel",
    require("../app/syu/educationLevelMaster/educationLevelMasterRoutes")
  );
  app.use(
    "/qualification",
    require("../app/syu/qualificationMaster/qualificationMasterRoutes")
  );
  app.use(
    "/documentType",
    require("../app/syu/documentType/documentTypeRoutes")
  );
  app.use("/exam", require("../app/syu/englishExam/englishExamRoutes"));
  app.use(
    "/clgContact",
    require("../app/syu/collegeContact/collegeContactRoutes")
  );
  app.use(
    "/clgAccred",
    require("../app/syu/collegeAccredition/collegeAccreditionRoutes")
  );
  app.use("/clgAward", require("../app/syu/collegeAward/collegeAwardRoutes"));
  app.use(
    "/programmePriority",
    require("../app/syu/programmePriority/programmePriorityRoutes")
  );
  app.use(
    "/programmeLink",
    require("../app/syu/programmeLink/programmeLinkRoutes")
  );
  app.use("/intake", require("../app/syu/intakeMaster/intakeMasterRoutes"));
};

const routes = {
  syu,
};

module.exports = routes[process.env.PROJ_NAME];
