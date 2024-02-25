import userService from '../service/userService.js';

const getHomePage = (req, res) => {
  return res.send("Hello Word");
}

const handleUserPage = async (req, res) => {
  let userList = await userService.getUserList();

  return res.render('user', {userList});
}

const handleCreateNewUser = (req, res) => {
  let {email, password, userName} = req.body;
  
  userService.creteNewUser(email, password, userName);

  return res.redirect("/user");
}

const handleDeleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);

  return res.redirect("/user");
}

const handleUpdateUserPage = async (req, res) => {
  let id = req.params.id;
  let user = await userService.getUserById(id);
  let userData = user;

  return res.render("user-update", {userData});
}

const handleUpdateUser = async (req, res) => {
  let {id, email, userName} = req.body;

  await userService.updateUserInfo(id, email, userName);

  return res.redirect("/user");
}

module.exports = {
  getHomePage, handleUserPage, handleCreateNewUser, handleDeleteUser,
  handleUpdateUserPage, handleUpdateUser
};
