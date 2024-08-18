import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getUserApplyJob } from "../../services/companyService";
import "./CompanyJobInfoStatus.scss";
import { getUserAccount } from "../../services/userService";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import ModalViewCV from "./ModalViewCV";

const CompanyJobInfoStatus = (props) => {
  let { id } = useParams();
  const [userApplyJob, setUserApplyJob] = useState({});
  const [userValid, setUserValid] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(15);
  const [totalPages, setTotalPages] = useState(0);

  const [viewCV, setViewCV] = useState("");
  const [viewCoverletter, setViewCoverLetter] = useState("");
  const [idRecruitment, setIdRecruitment] = useState("");
  const [statusRecrutment, setStatusRecrutment] = useState("");

  const [isShowModalViewCV, setIsShowModalViewCV] = useState(false);

  const [statusQuery, setStatusQuery] = useState("");

  useEffect(() => {
    handleGetUserApplyJob();
    checkUser();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);

  const handleGetUserApplyJob = async () => {
    let response = await getUserApplyJob(
      id,
      statusQuery,
      currentPage,
      currentLimit
    );
    if (response && response.EC === 0) {
      setTotalPages(response.DT.totalPages);
      setUserApplyJob(response.DT);
    }
  };

  const checkUser = async () => {
    let response = await getUserAccount();
    if (response && response.EC === 0) {
      let group = response.DT.groupWithRoles.name;
      if (group === "Customer") {
        setUserValid(true);
      } else {
        setUserValid(false);
      }
    } else {
      setUserValid(false);
    }
  };

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const onHideModalViewCV = async () => {
    setIsShowModalViewCV(false);
    setViewCV("");
    setViewCoverLetter("");
    setIdRecruitment("");
    setStatusRecrutment("");
    await handleGetUserApplyJob();
  };

  useEffect(() => {
    handleGetUserApplyJob();
  }, [statusQuery]);

  return (
    <>
      {userValid ? (
        <>
          <div className="container">
            <div class="h2 font-weight-bold">Recruitment</div>
            <select
              id=""
              class="form-select mb-2"
              onChange={(event) => setStatusQuery(event.target.value)}
            >
              <option value="">Tất Cả</option>
              <option value="0">Đang Chờ Xử Lí</option>
              <option value="1">Đã Gửi Mail Tuyển Dụng</option>
              <option value="2">Đã Từ Chối</option>
            </select>
          </div>
          {userApplyJob.recruitments && userApplyJob.recruitments.length > 0 ? (
            <>
              <div class="container rounded bg-white">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">UserName</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr id="spacing-row">
                        <td></td>
                      </tr>
                      {userApplyJob.recruitments.map((item, index) => {
                        return (
                          <>
                            <tr class="bg-blue">
                              <td>
                                <div class="pl-lg-5 pl-md-3 pl-1 name">
                                  {item.User && item.User.username
                                    ? item.User.username
                                    : "Chưa có"}
                                </div>
                              </td>
                              <td>
                                <div class="pl-lg-5 pl-md-3 pl-1 name">
                                  {item.User && item.User.email
                                    ? item.User.email
                                    : "Chưa có"}
                                </div>
                              </td>
                              <td>
                                <div class="pl-lg-5 pl-md-3 pl-1 name">
                                  {item.User && item.User.phone
                                    ? item.User.phone
                                    : "Chưa có"}
                                </div>
                              </td>
                              <td>
                                <div class="pl-lg-5 pl-md-3 pl-1 name">
                                  {item.User && item.User.sex
                                    ? item.User.sex
                                    : "Chưa có"}
                                </div>
                              </td>
                              <td>
                                {item.status && +item.status === 1 ? (
                                  <div class="d-inline-flex align-items-center active">
                                    <div class="circle mx-1"></div>
                                    <span>Đã Gửi Mail Tuyển Dụng</span>
                                  </div>
                                ) : (
                                  <>
                                    {item.status && +item.status === 2 ? (
                                      <div class="d-inline-flex align-items-center warning">
                                        <div class="circle mx-1"></div>
                                        <span>Đã Từ Chối</span>
                                      </div>
                                    ) : (
                                      <div class="d-inline-flex align-items-center waiting">
                                        <div class="circle mx-1"></div>
                                        <span>Đang Chờ Xử Lí</span>
                                      </div>
                                    )}
                                  </>
                                )}
                              </td>
                              <td>
                                <span
                                  onClick={() => {
                                    setIsShowModalViewCV(true);
                                    setIdRecruitment(item.id);
                                    setViewCV(item.CV);
                                    setViewCoverLetter(item.coverletter);
                                    setStatusRecrutment(item.status);
                                  }}
                                >
                                  <i class="fa fa-eye"></i>
                                </span>
                              </td>
                            </tr>
                            <tr id="spacing-row">
                              <td></td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="container">
              <>chưa có người nào applied</>
            </div>
          )}
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

          <ModalViewCV
            show={isShowModalViewCV}
            onHide={onHideModalViewCV}
            viewCV={viewCV}
            viewCoverletter={viewCoverletter}
            idRecruitment={idRecruitment}
            statusRecrutment={statusRecrutment}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default CompanyJobInfoStatus;
