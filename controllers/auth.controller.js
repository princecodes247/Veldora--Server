const UserService = require("../services/user.service");
const { login } = require("../services/auth.service");

const signIn = async (req, res, next, details) => {
  const user = await getUserByEmail(details.email);
  if (user.status === 404) {
    return user;
  }
  // Check if password is correct
  if (!user.authenticate(details.password)) {
    return {
      status: 401,
      message: "Invalid email or password",
    };
  }
  return user;
};

const signUp = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.json({
      status: 400,
      message: "Email and password are required",
    });
    return;
  }
  const checkUser = await UserService.getUserByEmail(req.body.email);

  if (!checkUser.error) {
    console.log(checkUser.data);
    res.json({
      status: 400,
      message: "Email is already taken",
    });
    return;
  }
  const { email, password, username } = req.body;
  const result = await UserService.createUser({ email, password, username });
  console.log(result);
  if (result.error) {
    res.json({
      status: result.status,
      message: result.data,
    });
    return;
  }
  const user = result.data
 const token = await login(req, user)
 return res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // expires: dayjs().add(30, "days").toDate(),
    })
    .status(200)
    .json({ message: "Signup successful 😊 👌" });
return res.json({
  message: "Signup successful",
  token,
});
  // req.login(user.data, (err) => {
  //     if (err) {
  //         console.log(err);
  //         res.json({
  //             message: 'Signup successful',
  //             user: req.user
  //           });
  //       }
  //       res.json({
  //         message: 'Signup successful',
  //         user: req.user
  //       });
  //     });
};

const signOut = () => {
  req.logout();
  return {
    status: 200,
    message: "User signed out",
  };
};

const AuthController = {
  signIn,
  signOut,
  signUp,
};

module.exports = AuthController;
