import { useEffect, useState } from "react";
import "./CompanyList.scss";
import { fetchAllCompany, deleteCompany } from "../../services/companyService";
import { getListAddress } from "../../services/jobService";
import { getUserAccount } from "../../services/userService";
import ReactPaginate from "react-paginate";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import _ from "lodash";
import ModalDelete from "./ModalDelete";
import ModalCompany from "./ModalCompany";

const CompanyList = (props) => {
  //modal read job
  const location = useLocation();
  const [listCompany, setListCompany] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const defaultJobQuery = {
    title: "",
    address: "",
  };
  const [companyQuery, setCompanyQuery] = useState(defaultJobQuery);

  const [listAddress, setListAddress] = useState({});

  // modal update/create job
  const [isShowModalCompany, setIsShowModalCompany] = useState(false);
  const [dataModalCompany, setDataModalCompany] = useState({});
  // modal delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const [userValid, setUserValid] = useState(false);

  const checkUser = async () => {
    let response = await getUserAccount();
    if (response && response.EC === 0) {
      let group = response.DT.groupWithRoles.name;
      if (group === "Admin" || group === "Customer") {
        setUserValid(true);
      } else {
        setUserValid(false);
      }
    } else {
      setUserValid(false);
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentLimit(6);
    }
    handleGetAddress();
    checkUser();
    fetchCompany();
  }, [currentPage, currentLimit]);

  const fetchCompany = async () => {
    let response = await fetchAllCompany(
      currentPage,
      currentLimit,
      companyQuery
    );

    if (response && response.EC === 0) {
      console.log(response.DT);
      setTotalPages(response.DT.totalPages);
      setListCompany(response.DT.company);
    }
  };

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleDeleteCompany = async (company) => {
    setDataModalCompany(company);
    setIsShowModalDelete(true);
  };

  const handleClose = () => {
    setIsShowModalDelete(false);
    setDataModalCompany({});
  };

  const confirmDeleteCompany = async () => {
    let response = await deleteCompany(dataModalCompany);
    console.log(">>Check response: ", response);
    if (response && response.EC === 0) {
      toast.success(response.EM);
      await fetchCompany();
      setIsShowModalDelete(false);
    } else {
      toast.error(response.EM);
    }
  };

  const onHideModalJob = async () => {
    setIsShowModalCompany(false);
    setDataModalCompany({});
    await fetchCompany();
  };

  const handleEditCompany = (job) => {
    setDataModalCompany(job);
    setIsShowModalCompany(true);
  };

  const handleOnChangeQuery = (value, name) => {
    let _CompanyQuery = _.cloneDeep(companyQuery);
    _CompanyQuery[name] = value;
    setCompanyQuery(_CompanyQuery);
  };

  const handleQuery = () => {
    fetchCompany();
  };

  const handleGetAddress = async () => {
    let dataAddress = await getListAddress();
    if (dataAddress && dataAddress.EC === 0) {
      setListAddress(dataAddress.DT);
    }
  };

  return (
    <>
      <div className="container mt-3">
        <div class="my-3">
          <div class="row">
            <div className="col-lg-8 col-md-12">
              <label for="locationFilter" class="form-label">
                Tên Công Ty:
              </label>
              <div class="input-group mb-3">
                <span class="input-group-text" onClick={() => handleQuery()}>
                  <i class="fa fa-search"></i>
                </span>
                <input
                  type="text"
                  id="keywordInput"
                  className="form-control"
                  placeholder="Tìm công ty"
                  value={companyQuery.title}
                  onChange={(event) =>
                    handleOnChangeQuery(event.target.value, "title")
                  }
                />
              </div>
            </div>
            <div class="col-lg-4 col-md-12">
              <label for="locationFilter" class="form-label">
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
            <div class="col-lg-12">
              <button class="btn btn-primary" onClick={() => handleQuery()}>
                Tìm Kiếm
              </button>
            </div>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {listCompany && listCompany.length > 0 ? (
            <>
              {listCompany.map((item, index) => {
                return (
                  <div className="col">
                    <div className="card mb-0">
                      <div className="row g-0">
                        <div className="col-md-3 text-center d-block">
                          <Link
                            className="card-info"
                            to={`/company-info/${item.id}`}
                          >
                            <img
                              src={item.User.avatar}
                              className="img-fluid rounded-start"
                              alt="..."
                            ></img>
                          </Link>
                        </div>

                        <div className="col-md-9">
                          <div className="card-body">
                            <Link
                              className="card-info"
                              to={`/company-info/${item.id}`}
                            >
                              <h5 className="card-title">{item.name}</h5>

                              <p className="card-text">{item.description}</p>
                            </Link>
                            <small className="text-muted mt-2">
                              <p className="card-tag">
                                <div className="card-tag--headcount text_ellipsis">
                                  <span>{item.headcount}</span>
                                </div>
                                <div className="card-tag--address text_ellipsis">
                                  <span>{item.address}</span>
                                </div>
                              </p>

                              {userValid &&
                                location.pathname === "/edit-company" && (
                                  <td className="edit-and-del">
                                    <span
                                      title="Edit"
                                      className="edit"
                                      onClick={() => handleEditCompany(item)}
                                    >
                                      <i className="fa fa-pencil"></i>
                                    </span>
                                    <span
                                      title="Delete"
                                      className="delete"
                                      onClick={() => handleDeleteCompany(item)}
                                    >
                                      <i class="fa fa-trash"></i>
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
                <td>Not Found Company</td>
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
          confirmDeleteCompany={confirmDeleteCompany}
          dataModalCompany={dataModalCompany}
        />

        <ModalCompany
          show={isShowModalCompany}
          onHide={onHideModalJob}
          dataModalCompany={dataModalCompany}
        />
      </div>
    </>
  );
};

export default CompanyList;
