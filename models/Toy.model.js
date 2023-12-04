const mongoose = require('mongoose');

const myToySchema = {
  id: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  img_url: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  
  created_date: {
    type: Date,
    default: Date.now, // Use Date.now to get the current timestamp
  },
  user_id:{
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  }
};

const toySchema = mongoose.Schema(myToySchema);

toySchema.pre("save", function (next) {
  this.id = String(this._id);
  next();
});

const Toy = mongoose.model("Toy", toySchema);
module.exports = Toy;
