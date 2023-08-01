const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const User = require("../models/Usermodal");
const createError = require("http-errors");
const {
  registerValidation,
  loginValidation,
} = require("../helper/userauthschema");
module.exports = {
  register: async (req, res, next) => {
    try {
      const { error } = registerValidation(req.body);
      if (error)
        return res
          .status(400)
          .json({ status: 400, message: error.details[0].message });

      const emailExist = await User.findOne({ email: req.body.email });
      if (emailExist) {
        return res
          .status(409)
          .json({ status: 409, message: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      //Create New User
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
      // console.log(newUser);
      //Save User
      const user = await newUser.save();
      res
        .status(200)
        .json({
          status: 200,
          message: "User registered Successfully",
          id: user._id,
          username: user.username,
          email: user.email,
        });
    } catch (err) {
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  },
  login: async (req, res, next) => {
    try {
      // console.log("login", req.body);
      const { error } = loginValidation(req.body);
      if (error)
        return res
          .status(400)
          .json({ status: 400, message: error.details[0].message });

      const user = await User.findOne({ email: req.body.email });
      !user && res.status(404).json({ status: 404, message: "User not found" });

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      !validPassword &&
        res.status(401).json({ status: 401, message: "wrong password" });

      res
        .status(200)
        .json({
          status: 200,
          message: "Logged In",
          username: user.username,
          email: user.email,
          id: user._id,
          RecordClick:user.RecordClick
        });
    } catch (err) {
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  },
  fetchsaveclick:async(req,res,next)=>{
      try{
        const saveclick = await User.find({ _id :req.params.id});
         console.log(saveclick)
        
        res
          .status(200)
          .json({
            status: 200,
            message: "click  Save Successfully",
            data:saveclick[0]
          });

      }catch{
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      }
  },
  saveclick: async (req, res, next) => {
    try {
      const { _id, clickname, clickline } = req.body;
      // console.log("saveclick", _id, clickname, clickurl, clickdata, clickline);
      const saveclick = await User.updateOne(
        { _id },
        {
          $push: {
            RecordClick: {
              $each: [{ clickname, clickline}],
            },
          },
        }
      );
      if (!saveclick) {
        res
        .status(400)
        .json({
          status: 400,
          message: "Click not Save Successfully",
          id: saveclick._id,
        });
      }
      const Newsaveclick = await User.find({ _id });
      // console.log("save id",Newsaveclick)
      res
        .status(200)
        .json({
          status: 200,
          message: "click  Save Successfully",
          data:Newsaveclick[0].RecordClick
        });
    } catch (err) {
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  },
  editsaveclick: async (req, res, next) => {
    try {
      const { id, clickname, clickline } = req.body;

      const saveclick = await User.updateOne(
        { _id:id, "RecordClick._id": req.params.click_id },
        {
          $set: {
            "RecordClick.$.clickname": clickname,
            "RecordClick.$.clickline": clickline,
          },
        }
      );
      if (!saveclick) {
        res
          .status(400)
          .json({
            status: 400,
            message: "edi not Save Successfully",
            id: saveclick._id,
          });
      }
      res
        .status(200)
        .json({
          status: 200,
          message: "edit  Save Successfully",
          id: saveclick._id,
        });
    } catch (err) {
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  },
  deletesaveclick: async (req, res, next) => {
    try {
      console.log("dle")
      const save_delete = await User.updateOne(
        { _id: req.params.id },
        { $pull: { RecordClick: { _id: req.params.click_id } } }
      );

      if (!save_delete) {
        res.status(400).json({ status: 400, message: "del not Successfully" });
      }
      res.status(200).json({ status: 200, message: "del  Successfully" });
    } catch (err) {
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  },
  fetchsaveclick: async (req, res, next) => {
    try {
      const id = req.params.id;
      const saveclick = await User.find({ _id: id });
      if (!saveclick) {
        res
          .status(400)
          .json({ status: 400, message: "Click not fetch Successfully" });
      }
      res
        .status(200)
        .json({ status: 200, message: "click fetch Successfully", saveclick });
    } catch (err) {
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  },
};
