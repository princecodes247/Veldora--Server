const WaitlistService = require("../services/Waitlist.service");

const getAllWaitlistMembers = async (req, res) => {
  console.log("hit");
  let result = await WaitlistService.getAllWaitlistMembers();
  res.status(result.status).json(result);
};

const getWaitlistMember = async (req, res) => {
  let { id } = req.body;
  let result = await WaitlistService.getWaitlistMember(id);
  res.status(result.status).json(result);
};

const addWaitlistMember = async (req, res) => {
  let {
    name,
    email,
    from,
    message,
    rating,
  } = req.body;


  // Trim inputs
  name = name.trim()
  email = email.trim();
  from = from.trim();
  message = message.trim();
  rating = rating.trim()

  //   Check
  if (
    !name ||
    !email ||
    !from ||
    !message ||
    !rating
  ) {
    return res.status(400).json({
      status: 400,
      message: "Please provide all required fields",
    });
  }

  let result = await WaitlistService.createWaitlistMember({
    name,
    email,
    from,
    message,
    rating,
  });
  
  res.status(result.status).json(result);
};

const deleteWaitlistMember = async (req, res) => {
  let { WaitlistTag } = req.body;
  let result = await WaitlistService.deleteWaitlist(WaitlistTag);
  res.status(result.status).json(result);
};



const WaitlistController = {
  addWaitlistMember,
  deleteWaitlistMember,
  getAllWaitlistMembers,
  getWaitlistMember,
};

module.exports = WaitlistController;
