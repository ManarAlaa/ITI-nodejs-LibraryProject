const express=require("express");
const validateMW=require("../Core/Validation/validateMW");
const controller=require("../Controllers/EmpController");
const { empImage } = require("../Core/Validation/imageValidate");
const imageValidate=require("../Core/Validation/imageValidate").empImage;
const removeEmpIMG=require("../Core/Validation/imageValidate").removeEmpIMG;
const router=express.Router();
const validatePostEmp=require("../Core/Validation/EmpValidation").validatePost;
const validatePutEmp=require("../Core/Validation/EmpValidation").validatePut;
const validateOnGetEmp=require("../Core/Validation/EmpValidation").validateOnGet;
const validateOnDeleteEmp=require("../Core/Validation/EmpValidation").validateOnDelete;
const AuthenticateMW=require("./../Core/auth/AuthenticateMW");

router.route("/Employees")
    .get(validateMW,controller.getEmps) //checkBaAdminAndAdminAndEmp
    .post(validateMW,validatePostEmp,controller.addEmp) //checkBasicAdminAndAdmin

router.route("/Employee/:_id")
    .put(imageValidate,validateMW,validatePutEmp,controller.updateEmp) //checkBaAdminAndAdminAndEmp
    .delete(validateMW,validateOnDeleteEmp,removeEmpIMG,controller.deleteEmp) //checkBasicAdminAndAdmin
    .get(validateOnGetEmp,validateMW,controller.getOneEmp) //checkBaAdminAndAdminAndEmp

router.route("/searchForEmp")
    .put(controller.searchForEmp)

module.exports=router;