import userExService from '../service/userExService.js';

const getHomePage = (req, res) => {
  return res.send("Hello Word");
}

const handleUserPage = async (req, res) => {
  let userList = await userExService.getUserList();

  return res.render('user', {userList});
}

const handleCreateNewUser = (req, res) => {
  let {email, password, userName} = req.body;
  
  userExService.creteNewUser(email, password, userName);

  return res.redirect("/user");
}

const handleDeleteUser = async (req, res) => {
  await userExService.deleteUser(req.params.id);

  return res.redirect("/user");
}

const handleUpdateUserPage = async (req, res) => {
  let id = req.params.id;
  let user = await userExService.getUserById(id);
  let userData = user;

  return res.render("user-update", {userData});
}

const handleUpdateUser = async (req, res) => {
  let {id, email, userName} = req.body;

  await userExService.updateUserInfo(id, email, userName);

  return res.redirect("/user");
}

module.exports = {
  getHomePage, handleUserPage, handleCreateNewUser, handleDeleteUser,
  handleUpdateUserPage, handleUpdateUser
};
