const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    RecordClick:[{
      clickname:{
        type:String,
      },
      clickurl:{
        type:String,
      },
      clickline:{
        type:Number,
      },
      clickdata:{
        type:String,
      }
    }]
  },
  { timestamps: true }
);

// UserSchema.methods.generateHash = function (password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// UserSchema.methods.validPassword = function (password) {
//   return bcrypt.compareSync(password, this.password);
// };

const User = mongoose.model("user", UserSchema);
module.exports = User;
