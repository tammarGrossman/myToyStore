const mongoose = require('mongoose');

const currentDate = new Date().getDate();

const myUserSchema={
    id: {
        type: String,
        required: false,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique:true
      },
      password: {
        type: String,
        required: true,
        select:false
      },
      date_created: {
        type:Date,
        default:currentDate
      },
      role: {
        type: String,
        required:true,
        default:'User'
      }
}
  
const userSchema = mongoose.Schema(myUserSchema);

userSchema.pre("save", function (next) {
    this.id = String(this._id);
    next();
  });
const User = mongoose.model("User", userSchema);
module.exports = User;
