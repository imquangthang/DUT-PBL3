import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import "./Profile.scss";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { getCompanyByEmail } from "../../services/companyService";
import { updateCurrentCompany } from "../../services/companyService";

const CompanyInformation = (props) => {
  const location = useLocation();
  const { email } = location.state;
  const defaultCompanyData = {
    id: "",
    name: "",
    address: "",
    description: "",
    headcount: "",
    avatar: "",
  };
  const [companyData, setCompanyData] = useState(defaultCompanyData);

  const handleGetCompany = async () => {
    let response = await getCompanyByEmail(email);
    if (response && response.EC === 0) {
      let tmp_data = {
        id: response.DT.id,
        name: response.DT.name,
        address: response.DT.address,
        description: response.DT.description,
        headcount: response.DT.headcount,
        avatar:
          response.DT.User && response.DT.User.avatar
            ? response.DT.User.avatar
            : "",
      };
      setCompanyData(tmp_data);
    }
  };

  const handleOnChangeInput = (value, name) => {
    let _companyData = _.cloneDeep(companyData);
    _companyData[name] = value;
    setCompanyData(_companyData);
  };

  const handleConfirmCompany = async () => {
    let res = updateCurrentCompany({
      ...companyData,
    });
    if (res && res.EC === 0) {
      props.onHide();
      setCompanyData({
        ...defaultCompanyData,
      });
      toast.success("UPDATE success");
    } else {
      toast.error(res.EM);
      toast.success("UPDATE unsuccess");
    }
  };

  useEffect(() => {
    handleGetCompany();
  }, [email]);

  return (
    <>
      {companyData ? (
        <>
          <div class="container">
            <div class="main-body">
              <div class="row my-3">
                <div class="col-lg-4">
                  <div class="card">
                    <div class="card-body">
                      <div class="d-flex flex-column align-items-center text-center">
                        <img
                          src={companyData.avatar}
                          alt="Admin"
                          class="rounded-circle"
                          width="110"
                          height="110"
                        ></img>
                        <div class="mt-3 name-company">
                          <h4>{companyData.name}</h4>
                        </div>

                        <div className="links_locat d-flex align-items-center justify-content-center gap-3">
                          <div className="address">
                            <div className="text_ellipsis">
                              <i className="fa fa-map-marker"></i>{" "}
                              {companyData.address}
                            </div>
                          </div>
                          <div className="headcount">
                            <div className="text_ellipsis">
                              <i className="fa fa-users"></i>{" "}
                              {companyData.headcount}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-8">
                  <div class="card">
                    <div class="card-body mx-2 my-2">
                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0">Company Name</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input
                            type="text"
                            class="form-control"
                            value={companyData.name}
                            onChange={(event) =>
                              handleOnChangeInput(event.target.value, "name")
                            }
                          />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0">Address</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input
                            type="text"
                            class="form-control"
                            value={companyData.address}
                            onChange={(event) =>
                              handleOnChangeInput(event.target.value, "address")
                            }
                          />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0">Description</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <textarea
                            class="form-control"
                            id="aboutMe"
                            cols="81"
                            rows="5"
                            placeholder="description"
                            value={companyData.description}
                            onChange={(event) =>
                              handleOnChangeInput(
                                event.target.value,
                                "description"
                              )
                            }
                          ></textarea>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0">Headcount</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input
                            type="text"
                            class="form-control"
                            value={companyData.headcount}
                            onChange={(event) =>
                              handleOnChangeInput(
                                event.target.value,
                                "headcount"
                              )
                            }
                          />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0">Avatar</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input
                            type="text"
                            class="form-control"
                            value={companyData.avatar}
                            onChange={(event) =>
                              handleOnChangeInput(event.target.value, "avatar")
                            }
                          />
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-3"></div>
                        <div class="col-sm-9 text-secondary">
                          <div className="button-list">
                            <button
                              type="button"
                              class="btn btn-primary"
                              onClick={() => handleConfirmCompany()}
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default CompanyInformation;
