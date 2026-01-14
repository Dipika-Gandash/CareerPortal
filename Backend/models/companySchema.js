import mongoose from "mongoose";

const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Company name is required"],
    trim: true,
    minlength: [3, "Company name must be at least 3 characters"],
    maxlength: [100, "Company name must be at most 100 characters"],
  },

  description: {
    type: String,
    required: [true, "Company description is required"],
    trim: true,
    minlength: [10, "Description must be at least 10 characters"],
    maxlength: [1000, "Description must be at most 1000 characters"],
  },

  website: {
    type: String,
    trim: true,
    validate: {
      validator: function (value) {
        return /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*\/?$/.test(value);
      },
      message: "Please enter a valid URL",
    },
  },

  location: {
    type: [String],
    required: [true, "At leat one location is required"],
    validate: {
      validator: function (arr) {
        return (
          arr.length > 0 &&
          arr.every((loc) => loc.length >= 2 && loc.length <= 100)
        );
      },
      message: "Each location must be 2-100 characters long",
    },
  },

  logo: {
    type: String,
    validate: {
      validator: function (value) {
        return /^(https?:\/\/.*\.(?:png|jpg|jpeg|svg|webp))$/.test(value);
      },
      message: "Logo must be a valid image URL (png, jpg, jpeg, svg, webp)",
    },
  },

  createdBy : {
    type: mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : true
  },
},  { timestamps: true } );

const Company = mongoose.model("Company", companySchema);

export default Company;
