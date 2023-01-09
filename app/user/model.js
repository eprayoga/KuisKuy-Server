const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const HASH_ROUND = 10;

let userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Email harus diisi"],
    },
    name: {
      type: String,
      require: [true, "Nama harus diisi"],
      maxlength: [225, "Panjang nama harus antara 3 - 225 karakter"],
      minlength: [3, "Panjang nama harus antara 3 - 225 karakter"],
    },
    username: {
      type: String,
      require: [true, "Username harus diisi"],
      maxlength: [225, "Panjang nama harus antara 3 - 225 karakter"],
      minlength: [3, "Panjang nama harus antara 3 - 225 karakter"],
    },
    password: {
      type: String,
      require: [true, "Kata sandi harus diisi"],
      maxlength: [225, "Panjang kata sandi harus antara 8 - 225 karakter"],
      minlength: [8, "Panjang kata sandi harus antara 8 - 225 karakter"],
    },
    profile_photo: { type: String },
    favorite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

userSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("User").countDocuments({ email: value });
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} sudah terdaftar`
);

userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

module.exports = mongoose.model("User", userSchema);
