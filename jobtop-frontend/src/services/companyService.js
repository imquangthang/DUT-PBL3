import axios from "../setup/axios";

const getUserApplyJob = (id, statusQuery, page, limit) => {
  return axios.get(
    `/api/v1/company/read/job-info-status?id=${id}&statusQuery=${statusQuery}&page=${page}&limit=${limit}`
  );
};

const rejectRecruitment = (data) => {
  return axios.put("/api/v1/company/update/reject-recruitment", { ...data });
};

const acceptRecruitment = (data) => {
  return axios.put("/api/v1/company/update/accept-recruitment", { ...data });
};
const fetchAllCompany = (page, limit, companyQuery) => {
  return axios.get(
    `/api/v1/company/read?page=${page}&limit=${limit}&title=${companyQuery.title}&address=${companyQuery.address}`
  );
};

const getCompanyInfo = (id) => {
  return axios.get(`/api/v1/company/read/company-info?id=${id}`);
};

const updateCurrentCompany = (companyData) => {
  return axios.put("/api/v1/company/update", {
    ...companyData,
  });
};

const deleteCompany = (company) => {
  return axios.delete("/api/v1/company/delete", {
    data: { id: company.id },
  });
};

const getCompanyByEmail = (email) => {
  return axios.get(`/api/v1/company/read/company-profile?email=${email}`);
};

export {
  getUserApplyJob,
  rejectRecruitment,
  acceptRecruitment,
  fetchAllCompany,
  deleteCompany,
  getCompanyInfo,
  updateCurrentCompany,
  getCompanyByEmail,
};
