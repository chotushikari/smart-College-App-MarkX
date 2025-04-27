const csv = require("csvtojson");
const User = require("../models/user"); // adjust path if needed

const uploadCSVUsers = async (filePath) => {
  const users = await csv().fromFile(filePath);

  const insertData = users.map(u => ({
    email: u.email,
    role: u.role,
    name: u.name,
    batch: u.batch || null,
  }));

  const inserted = await User.insertMany(insertData, { ordered: false });
  return { insertedCount: inserted.length };
};

module.exports = uploadCSVUsers;
