const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
// create a user register
exports.registerController = async (req, res) => {
  try {
    // get the user input
    const { username, email, password } = req.body;
    // check if user exist
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    //   check if user exist,findOne return a promise so we use await,if user exist return error
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(401).send({
        success: false,
        message: "User already exist",
      });
    }
    // hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // save user to db
    const user = new userModel({
      username,
      email,
      password: hashPassword,
    }).save();
    return res.status(201).send({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in user registration",
      error,
    });
  }
};

// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "All users",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting all users",
      error,
    });
  }
};

// login a user
exports.loginController = async (req,res) => {
  try {
    const { email, password } = req.body;
    // check if user exist
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: " Invalid credentials",
      });
    }
    // check if password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: " Invalid credentials",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in login user",
      error,
    });
  }
};
