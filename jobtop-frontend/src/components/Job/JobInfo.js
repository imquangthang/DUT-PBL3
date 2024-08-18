import { useEffect, useReducer, useState } from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { applyJob, getJobInfo } from "../../services/jobService";
import "./JobInfo.scss";
import { getUserAccount } from "../../services/userService";
import { toast } from "react-toastify";
import { Rings } from "react-loader-spinner";

const JobInfo = (props) => {
  let { id } = useParams();
  const [job, setJob] = useState({});
  const [userValid, setUserValid] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [applying, setApplying] = useState(false);

  const [showDesFull, setShowDesFull] = useState(false);
  const [showReqFull, setShowReqFull] = useState(false);
  const [showRigFull, setShowRigFull] = useState(false);
  const showDesFullText = () => {
    setShowDesFull(!showDesFull);
  };
  const showReqFullText = () => {
    setShowReqFull(!showReqFull);
  };
  const showRigFullText = () => {
    setShowRigFull(!showRigFull);
  };

  useEffect(() => {
    handleGetJob();
    checkUser();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);

  const handleGetJob = async () => {
    let response = await getJobInfo(id);
    if (response && response.EC === 0) {
      setJob(response.DT);
    }
  };

  useEffect(() => {
    console.log("User email: " + userEmail);
    console.log("job id: " + id);
  }, [job, userEmail]);

  const checkUser = async () => {
    let response = await getUserAccount();
    if (response && response.EC === 0) {
      let group = response.DT.groupWithRoles.name;
      if (group === "Guest") {
        setUserValid(true);
        setUserEmail(response.DT.email);
      } else {
        setUserValid(false);
        setUserEmail("");
      }
    } else {
      setUserValid(false);
      setUserEmail("");
    }
  };

  const handleApplyJob = async (file, textCoverletter) => {
    if (userValid) {
      const formData = new FormData();
      formData.append("fileCV", file); // Đính kèm đối tượng File vào FormData
      formData.append("jobId", id);
      formData.append("accountEmail", userEmail);
      formData.append("coverletter", textCoverletter);

      try {
        setApplying(true);
        let response = await applyJob(formData);
        if (response && response.EC === 0) {
          toast.success(response.EM);
        } else {
          toast.error(response.EM);
        }
        setApplying(false);
      } catch (error) {
        console.error("Error applying for job:", error.message);
        toast.error("An error occurred while applying for the job.");
      }
    } else {
      toast.error("You don't have role apply job");
    }
  };

  const handleFileChange = (event) => {
    try {
      const fileName = event.target.files[0].name; // Lấy tên của tệp đã chọn
      const label = document.getElementById("fileLabel"); // Lấy thẻ nhãn
      label.innerText = fileName; // Cập nhật nội dung của nhãn với tên của tệp đã chọn
    } catch (error) {
      const label = document.getElementById("fileLabel");
      label.innerText = "Upload CV";
    }
  };

  return (
    <div className="container-full mx-auto">
      {job ? (
        <>
          {applying ? (
            <div className="loading-container">
              <Rings
                height="100"
                width="100"
                color="#1877f2"
                ariaLabel="loading"
              />
              <div>Waiting...</div>
            </div>
          ) : (
            <>
              <div className="job_details_area">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="job_details_header">
                        <div className="single_jobs white-bg d-flex justify-content-between">
                          <div className="jobs_left d-flex align-items-center">
                            <div className="thumb">
                              <img src={job.sourcePicture} alt=""></img>
                            </div>
                            <div className="jobs_content">
                              <h4>{job.title}</h4>

                              {job.Company ? (
                                <div className="location">
                                  <a
                                    href={
                                      job.Company.id
                                        ? `/company-info/${job.Company.id}`
                                        : "#"
                                    }
                                  >
                                    <p>
                                      {job.Company.name ? job.Company.name : ""}
                                    </p>
                                  </a>
                                </div>
                              ) : (
                                <></>
                              )}

                              <div className="links_locat d-flex align-items-center">
                                <div className="location">
                                  <p>
                                    <i className="fa fa-map-marker"></i>
                                    {job.address}
                                  </p>
                                </div>
                                <div className="location">
                                  <p>
                                    <i className="fa fa-clock-o"></i>{" "}
                                    {job.deadline}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="descript_wrap white-bg">
                        <div className="single_wrap">
                          <h4>Description</h4>
                          <p
                            className={
                              showDesFull ? "mb-0" : "text_ellipsis mb-0"
                            }
                          >
                            {job.description}
                          </p>
                          <div
                            className="text-center show-text"
                            onClick={() => showDesFullText()}
                          >
                            <div>
                              {showDesFull ? "Show less " : "Show full "}
                              {showDesFull ? (
                                <i class="fa fa-angle-double-up"></i>
                              ) : (
                                <i class="fa fa-angle-double-down"></i>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="single_wrap">
                          <h4>Requirement</h4>
                          <p
                            className={
                              showReqFull ? "mb-0" : "text_ellipsis mb-0"
                            }
                          >
                            {job.requirements}
                          </p>
                          <div
                            className="text-center show-text"
                            onClick={() => showReqFullText()}
                          >
                            <div>
                              {showReqFull ? "Show less " : "Show full "}
                              {showReqFull ? (
                                <i class="fa fa-angle-double-up"></i>
                              ) : (
                                <i class="fa fa-angle-double-down"></i>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="single_wrap">
                          <h4>Right</h4>
                          <p
                            className={
                              showRigFull ? "mb-0" : "text_ellipsis mb-0"
                            }
                          >
                            {job.rights}
                          </p>
                          <div
                            className="text-center show-text"
                            onClick={() => showRigFullText()}
                          >
                            <div>
                              {showRigFull ? "Show less " : "Show full "}
                              {showRigFull ? (
                                <i class="fa fa-angle-double-up"></i>
                              ) : (
                                <i class="fa fa-angle-double-down"></i>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="apply_job_form white-bg">
                        <h4>Apply for the job</h4>
                        <form action="#">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <button
                                    type="button"
                                    id="inputGroupFileAddon03"
                                  >
                                    <i
                                      className="fa fa-cloud-upload"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                </div>
                                <div className="custom-file">
                                  <input
                                    type="file"
                                    className="custom-file-input"
                                    id="inputGroupFile03"
                                    aria-describedby="inputGroupFileAddon03"
                                    onChange={handleFileChange}
                                    accept=".pdf"
                                    hidden
                                  ></input>
                                  <label
                                    className="custom-file-label"
                                    for="inputGroupFile03"
                                    id="fileLabel"
                                  >
                                    Upload CV
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="input_field">
                                <textarea
                                  id="Coverletter"
                                  cols="30"
                                  rows="10"
                                  placeholder="Coverletter"
                                ></textarea>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="submit_btn">
                                <button
                                  className="boxed-btn3 w-100"
                                  type="submit"
                                  onClick={(e) => {
                                    e.preventDefault(); // Ngăn chặn hành vi mặc định của sự kiện
                                    let fileInput =
                                      document.getElementById(
                                        "inputGroupFile03"
                                      );
                                    let textCoverletter =
                                      document.getElementById(
                                        "Coverletter"
                                      ).value;
                                    if (
                                      fileInput.files.length > 0 &&
                                      textCoverletter
                                    ) {
                                      // Kiểm tra xem có tệp đã chọn không
                                      let file = fileInput.files[0]; // Lấy thông tin về tệp đã chọn
                                      handleApplyJob(file, textCoverletter); // Truyền tệp đã chọn vào hàm xử lý
                                    } else {
                                      // Hiển thị thông báo cho người dùng rằng họ chưa chọn tệp
                                      toast.error(
                                        "Please select a file and write Coverletter before submitting."
                                      );
                                    }
                                  }}
                                >
                                  Apply Now
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="job_sumary">
                        <div className="job_content">
                          <ul>
                            <li>
                              DateSub: <span> {job.dateSub}</span>
                            </li>
                            <li>
                              Salary: <span> {job.salary}</span>
                            </li>
                            <li>
                              Place: <span> {job.address}</span>
                            </li>
                            <li>
                              Number: <span> {job.numberEmployee}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>not found job</>
      )}
    </div>
  );
};

export default JobInfo;
