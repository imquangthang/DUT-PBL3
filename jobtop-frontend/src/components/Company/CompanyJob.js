import { useEffect, useState } from "react";
import "../Job/Job.scss";
import {
  fetchAllCompanyJob,
  deleteJob,
  getListAddress,
} from "../../services/jobService";
import { getUserAccount } from "../../services/userService";
import ReactPaginate from "react-paginate";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import ModalJob from "../Job/ModalJob";
import { toast } from "react-toastify";
import ModalDelete from "../Job/ModalDelete";
import _ from "lodash";

const CompanyJob = (props) => {
  //modal read job
  const location = useLocation();
  const [listJobs, setListJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const defaultJobQuery = {
    title: "",
    address: "",
    experience: "",
    salary: "",
  };
  const [jobQuery, setJobQuery] = useState(defaultJobQuery);

  const [listAddress, setListAddress] = useState({});

  // modal update/create job
  const [isShowModalJob, setIsShowModalJob] = useState(false);
  const [actionModalJob, setActionModalJob] = useState("");
  const [dataModalJob, setDataModalJob] = useState({});
  // modal delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModal, setDataModal] = useState({});

  const [userValid, setUserValid] = useState(false);
  const [userValidEmail, setUserValidEmail] = useState("");
  const [company, setCompany] = useState({});

  const checkUser = async () => {
    let response = await getUserAccount();
    if (response && response.EC === 0) {
      let group = response.DT.groupWithRoles.name;
      if (group === "Customer") {
        setUserValid(true);
        setUserValidEmail(response.DT.email);
      } else {
        setUserValid(false);
        setUserValidEmail("");
      }
    } else {
      setUserValid(false);
      setUserValidEmail("");
    }
  };

  useEffect(() => {
    handleGetAddress();
    checkUser();
    fetchCompanyJob();
  }, [currentPage, currentLimit, userValidEmail]);

  const fetchCompanyJob = async () => {
    let response = await fetchAllCompanyJob(
      currentPage,
      currentLimit,
      userValidEmail,
      jobQuery
    );

    if (response && response.EC === 0) {
      setListJobs(response.DT.jobs);
      setTotalPages(response.DT.totalPages);
      setCompany(response.DT.jobs[0].Company);
    }
  };

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleDeleteJob = async (job) => {
    setDataModal(job);
    setIsShowModalDelete(true);
  };

  const handleClose = () => {
    setIsShowModalDelete(false);
    setDataModal({});
  };

  const confirmDeleteUser = async () => {
    let response = await deleteJob(dataModal);
    console.log(">>Check response: ", response);
    if (response && response.EC === 0) {
      toast.success(response.EM);
      await fetchCompanyJob();
      setIsShowModalDelete(false);
    } else {
      toast.error(response.EM);
    }
  };

  const onHideModalJob = async () => {
    setIsShowModalJob(false);
    setDataModalJob({});
    await fetchCompanyJob();
  };

  const handleRefresh = async () => {
    await fetchCompanyJob();
  };

  const handleEditJob = (job) => {
    setActionModalJob("UPDATE");
    setDataModalJob(job);
    setIsShowModalJob(true);
  };

  const handleOnChangeQuery = (value, name) => {
    let _JobQuery = _.cloneDeep(jobQuery);
    _JobQuery[name] = value;
    setJobQuery(_JobQuery);
  };

  const handleQuery = () => {
    fetchCompanyJob();
  };

  const handleGetAddress = async () => {
    let dataAddress = await getListAddress();
    if (dataAddress && dataAddress.EC === 0) {
      setListAddress(dataAddress.DT);
    }
  };

  return (
    <>
      {userValid ? (
        <div className="container mt-3">
          <div className="input-group mb-3">
            <span className="input-group-text" onClick={() => handleQuery()}>
              <i className="fa fa-search"></i>
            </span>
            <input
              type="text"
              id="keywordInput"
              className="form-control"
              placeholder="Tìm công việc"
              value={jobQuery.title}
              onChange={(event) =>
                handleOnChangeQuery(event.target.value, "title")
              }
            />
          </div>

          <div className="my-3">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <label for="locationFilter" className="form-label">
                  Chọn Địa Điểm:
                </label>
                <select
                  id="locationFilter"
                  className="form-select"
                  onChange={(event) =>
                    handleOnChangeQuery(event.target.value, "address")
                  }
                >
                  <option value="">Tất Cả</option>
                  {listAddress && listAddress.length > 0 ? (
                    <>
                      {listAddress.map((item, index) => {
                        return (
                          <option value={item.address}>{item.address}</option>
                        );
                      })}
                    </>
                  ) : (
                    <></>
                  )}
                </select>
              </div>
              <div className="col-lg-4 col-md-6">
                <label for="salaryFilter" className="form-label">
                  Mức lương:
                </label>
                <select
                  id="salaryFilter"
                  className="form-select"
                  onChange={(event) =>
                    handleOnChangeQuery(event.target.value, "salary")
                  }
                >
                  <option value="">Tất Cả</option>
                  <option value="ASC">Tăng dần</option>
                  <option value="DESC">Giảm dần</option>
                </select>
              </div>
              <div className="col-lg-4 col-md-6">
                <label for="experienceFilter" className="form-label">
                  Kinh nghiệm:
                </label>
                <select
                  id="experienceFilter"
                  className="form-select"
                  onChange={(event) =>
                    handleOnChangeQuery(event.target.value, "experience")
                  }
                >
                  <option value="">Tất Cả</option>
                  <option value="Chưa có kinh nghiệm">
                    Chưa có kinh nghiệm
                  </option>
                  <option value="1">Dưới 1 năm</option>
                  <option value="1 2 ">Từ 1 đến 2 năm</option>
                  <option value="2 ">Trên 2 năm</option>
                </select>
              </div>
              <div className="col-lg-12 mt-3">
                <button
                  className="btn btn-primary"
                  onClick={() => handleQuery()}
                >
                  Tìm Kiếm
                </button>
              </div>
            </div>
          </div>

          <>
            <div className="actions my-3">
              <button
                className="btn btn-success refresh me-1"
                onClick={() => handleRefresh()}
              >
                <i className="fa fa-refresh me-1"></i>
                Refresh
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setIsShowModalJob(true);
                  setActionModalJob("CREATE");
                }}
              >
                <i className="fa fa-plus-circle me-1"></i>
                Add New Job
              </button>
            </div>
          </>

          <div
            className="row row-cols-1 row-cols-md-1 
              row-cols-lg-3 g-3"
          >
            {listJobs && listJobs.length > 0 ? (
              <>
                {listJobs.map((item, index) => {
                  return (
                    <div className="col">
                      <div className="card mb-0">
                        <div className="row g-0">
                          <div className="col-md-3 text-center">
                            <Link
                              className="card-info"
                              to={`/job-info/${item.id}`}
                            >
                              <img
                                src={item.sourcePicture}
                                className="img-fluid rounded-start"
                                alt="..."
                              ></img>
                            </Link>
                          </div>
                          <div className="col-md-9">
                            <div className="card-body">
                              <Link
                                className="card-info"
                                to={`/job-info/${item.id}`}
                              >
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.Company.name}</p>
                              </Link>
                              <small className="text-muted">
                                <p className="card-tag">
                                  <div className="card-tag--salary text_ellipsis">
                                    <span>{item.salary}</span>
                                  </div>
                                  <div className="card-tag--address text_ellipsis">
                                    <span>{item.address}</span>
                                  </div>
                                </p>
                                {userValid && location.pathname !== "/" && (
                                  <td className="edit-and-del">
                                    <span
                                      title="Edit"
                                      className="edit"
                                      onClick={() => handleEditJob(item)}
                                    >
                                      <i className="fa fa-pencil"></i>
                                    </span>
                                    <span
                                      title="Delete"
                                      className="delete"
                                      onClick={() => handleDeleteJob(item)}
                                    >
                                      <i className="fa fa-trash"></i>
                                    </span>
                                  </td>
                                )}
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <tr>
                  <td>Not Found Jobs</td>
                </tr>
              </>
            )}
          </div>

          {totalPages > 0 && (
            <div className="job-footer mt-3">
              <ReactPaginate
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="<"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          )}

          <ModalDelete
            show={isShowModalDelete}
            handleClose={handleClose}
            confirmDeleteUser={confirmDeleteUser}
            dataModal={dataModal}
          />

          <ModalJob
            show={isShowModalJob}
            onHide={onHideModalJob}
            action={actionModalJob}
            dataModalJob={dataModalJob}
            company={company}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default CompanyJob;
