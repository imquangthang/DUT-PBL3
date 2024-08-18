import axios from "../setup/axios";

const registerNewUser = (
  firstName,
  lastName,
  email,
  phone,
  username,
  password
) => {
  return axios.post("/api/v1/register", {
    firstName,
    lastName,
    email,
    phone,
    username,
    password,
  });
};

const registerNewCompany = (email, phone, companyName, password) => {
  return axios.post("/api/v1/register-company", {
    email,
    phone,
    companyName,
    password,
  });
};

const loginUser = (valueLogin, password) => {
  return axios.post("/api/v1/login", {
    valueLogin,
    password,
  });
};

const fetchAllUsers = (page, limit) => {
  return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`);
};

const deleteUser = (user) => {
  return axios.delete("/api/v1/user/delete", {
    data: { id: user.id },
  });
};

const fetchGroup = () => {
  return axios.get("/api/v1/group/read");
};

const createNewUser = (userData) => {
  return axios.post("/api/v1/user/create", {
    ...userData,
  });
};

const updateCurrentUser = (userData) => {
  return axios.put("/api/v1/user/update", {
    ...userData,
  });
};

const getUserAccount = () => {
  return axios.get("/api/v1/account");
};

const logoutUser = () => {
  return axios.post("/api/v1/logout");
};

const getUserByEmail = (email) => {
  return axios.get(`/api/v1/user/read-info-user?email=${email}`);
};

const updateUser = (userData) => {
  return axios.put("/api/v1/user/update-info-user", {
    ...userData,
  });
};

const getListJobRecruitment = (email) => {
  return axios.get(`/api/v1/user/read/job-recruitment?email=${email}`);
};

const ChangePassword = (data) => {
  return axios.put("/api/v1/change-pass", {
    ...data,
  });
};

export {
  registerNewUser,
  loginUser,
  fetchAllUsers,
  deleteUser,
  fetchGroup,
  createNewUser,
  updateCurrentUser,
  getUserAccount,
  logoutUser,
  getUserByEmail,
  updateUser,
  getListJobRecruitment,
  registerNewCompany,
  ChangePassword,
};
