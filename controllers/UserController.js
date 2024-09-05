const User = require("../models/User");
const users = require("../data/UsersData");

const importUsers = async () => {
  try {
    await User.deleteMany({});

    for (let user of users) {
      const newUser = new User({ name: user });
      await newUser.save();
    }
  } catch (error) {
    console.log(error);
  }
};

const getRamdomUser = (req, res) => {
  try {
    User.find()
      .then((allUsers) => {
        const randomIndex = Math.floor(Math.random() * allUsers.length);
        res.json({ name: allUsers[randomIndex].name });
      })
      .catch((error) => {
        res.status(500).json({ message: error });
      });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { importUsers, getRamdomUser };
