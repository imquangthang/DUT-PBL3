import axios from "../setup/axios";

const fetchAllJob = (page, limit, jobQuery) => {
  return axios.get(
    `/api/v1/job/read?page=${page}&limit=${limit}&title=${jobQuery.title}&address=${jobQuery.address}&salary=${jobQuery.salary}&experience=${jobQuery.experience}`
  );
};

const fetchAllCompanyJob = (page, limit, email, jobQuery) => {
  return axios.get(
    `/api/v1/job/read/company-job?page=${page}&limit=${limit}&title=${jobQuery.title}&address=${jobQuery.address}&salary=${jobQuery.salary}&experience=${jobQuery.experience}&email=${email}`
  );
};

const createNewJob = (jobData) => {
  return axios.post("/api/v1/job/create", {
    ...jobData,
  });
};

const updateCurrentJob = (jobData) => {
  return axios.put("/api/v1/job/update", {
    ...jobData,
  });
};

const deleteJob = (job) => {
  return axios.delete("/api/v1/job/delete", {
    data: { id: job.id },
  });
};

const getListAddress = () => {
  return axios.get("/api/v1/job/read/getAddress");
};

const getListCareer = () => {
  return axios.get("/api/v1/job/read/getCareer");
};

const getJobInfo = (id) => {
  return axios.get(`/api/v1/job/read/job-info?id=${id}`);
};

const addNewCareer = (careerData) => {
  return axios.post("/api/v1/job/create/create-new-career", { ...careerData });
};

const applyJob = (formData) => {
  return axios.post("/api/v1/job/apply-job", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export {
  fetchAllJob,
  updateCurrentJob,
  createNewJob,
  deleteJob,
  getListAddress,
  fetchAllCompanyJob,
  getJobInfo,
  getListCareer,
  addNewCareer,
  applyJob,
};
