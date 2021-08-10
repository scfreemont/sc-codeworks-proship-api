import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";


// @route   POST /api/user/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body; 
  console.log(req.body);
  var query= { email: email  };
  console.log(query);
  let user = await User.findOne(query).exec();
  console.log(user);
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,     
    });
  } else {
    res.status(401);
    throw new Error("Invalid username/email or password");
  }
});


export { authUser };
