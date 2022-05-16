const Waitlist = require("../models/Waitlist");

const getAllWaitlistMembers = async () => {
  try {
    const allWaitlistMembers = await Waitlist.find();
    if (allWaitlistMembers.length === 0)
      return { status: 404, message: "No Waitlists found", data: allWaitlistMembers };

    return {
      status: 200,
      message: "Waitlists found",
      data: allWaitlistMembers,
    };
  } catch (error) {
    return {
      status: 500,
      message: "An error occured",
      data: error,
    };
  }
};
// status: 200,
// message: "All Waitlists found",

// Get a single Waitlist from the database
const getWaitlistMember = (waitlistId) => {
  try {
    const WaitlistMember = Waitlist.findById(waitlistId);
    //   check if Waitlist exists
    if (!WaitlistMember) {
      return {
        status: 404,
        message: "No Waitlist Member found",
        data: null,
      };
    }
    return {
      status: 200,
      message: "Waitlist Member found",
      data: WaitlistMember,
    };
  } catch (error) {
    return {
      status: 500,
      message: "An error occured",
      data: error,
    };
  }
};
// status: 404,
//             message: "Waitlist not found",

const getWaitlistByName = async (name) => {
  try {
    const WaitlistMember = await Waitlist.findOne({ name });
    //   check if Waitlist exists
    if (!WaitlistMember) {
      return {
        status: 404,
        message: "No Member found",
        data: null,
      };
    }
    return {
      status: 200,
      message: "Waitlist Member found",
      data: WaitlistMember,
    };
  } catch (error) {
    return {
      status: 500,
      message: "An error occured",
      data: error,
    };
  }
};

// Create a new Waitlist
const addWaitlistMember = async (details) => {
  try {
    const waitlistMember = new Waitlist(details);

    await waitlistMember.save();

    return {
      status: 200,
      message: "Waitlist saved successfully",
      data: waitlistMember,
    };
  } catch (error) {
    return {
      status: 500,
      message: "An error occured",
      data: error,
    };
  }
};
// status: 200,
// message: "Waitlist created successfully",

// Delete a single Waitlist Member
const deleteWaitlistMember = async (id) => {
  const waitlistMember = getWaitlist(id);
  if (!waitlistMember.status === 200) return waitlistMember;

  await waitlistMember.remove();

  return {
    error: false,
    message: "Waitlist Member deleted",
  };
};

module.exports = {
  addWaitlistMember,
  deleteWaitlistMember,
  getAllWaitlistMembers,
  getWaitlistMember,
  getWaitlistByName
};
