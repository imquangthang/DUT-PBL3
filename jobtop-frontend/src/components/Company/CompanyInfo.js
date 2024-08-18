import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";

import "../../components/Job/JobInfo.scss";
import { getUserAccount } from "../../services/userService";
import { toast } from "react-toastify";
import { Rings } from "react-loader-spinner";
import { getCompanyInfo } from "../../services/companyService";

const CompanyInfo = (props) => {
  let { id } = useParams();
  const [company, setCompany] = useState({});

  useEffect(() => {
    handleGetCompany();
  }, [id]);

  const handleGetCompany = async () => {
    let response = await getCompanyInfo(id);
    if (response && response.EC === 0) {
      setCompany(response.DT);
    }
  };
  return (
    <div className="container-full mx-auto">
      {company ? (
        <>
          <div className="job_details_area">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="job_details_header">
                    <div className="single_jobs white-bg d-flex justify-content-between">
                      <div className="jobs_left d-flex align-items-center">
                        <div className="thumb">
                          <img
                            src={
                              company.User && company.User.avatar
                                ? company.User.avatar
                                : ""
                            }
                            alt=""
                          ></img>
                        </div>
                        <div className="jobs_content">
                          <h4>{company.name}</h4>
                          <div className="links_locat d-flex align-items-center">
                            <div className="location">
                              <p>
                                <i className="fa fa-map-marker"></i>
                                {company.address}
                              </p>
                            </div>
                            <div className="location">
                              <p>
                                <i className="fa fa-users"></i>{" "}
                                {company.headcount}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="jobs_right">
                        <div className="apply_now">
                          <a className="heart_mark" href="#">
                            <i className="ti-heart"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="descript_wrap white-bg">
                    <div className="single_wrap">
                      <h4>Description</h4>
                      <p>{company.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>not found company</>
      )}
    </div>
  );
};

export default CompanyInfo;
