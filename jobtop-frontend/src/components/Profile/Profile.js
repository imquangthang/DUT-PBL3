import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getUserByEmail, updateUser } from "../../services/userService";
import "./Profile.scss";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import ModalSelectJob from "./ModalSelectJob";
import { getListJobRecruitment } from "../../services/userService";

const Profile = (props) => {
  const location = useLocation();
  const { email } = location.state;
  const defaultUserData = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    address: "",
    sex: "",
    phone: "",
    aboutMe: "",
    skills: "",
    education: "",
    experience: "",
    avatar: "",
  };
  const [userData, setUserData] = useState(defaultUserData);

  const [isShowModalSelectJob, setIsShowModalSelectJob] = useState(false);

  const handleGetUser = async () => {
    let response = await getUserByEmail(email);
    if (response && response.EC === 0) {
      setUserData(response.DT);
    }
  };

  const handleOnChangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };

  const handleConfirmUser = async () => {
    // create user
    let res = updateUser({
      ...userData,
    });
    if (res && res.EC === 0) {
      props.onHide();
      setUserData({
        ...defaultUserData,
      });
      toast.success("UPDATE success");
    } else {
      toast.error(res.EM);
      toast.success("UPDATE unsuccess");
    }
  };

  const onHideModalSelectJob = async () => {
    setIsShowModalSelectJob(false);
    await handleGetUser();
  };

  useEffect(() => {
    handleGetUser();
  }, [email]);

  return (
    <>
      {userData ? (
        <>
          <div class="container">
            <div class="main-body">
              <div class="row my-3">
                <div class="col-lg-4">
                  <div class="card">
                    <div class="card-body">
                      <div class="d-flex flex-column align-items-center text-center">
                        <img
                          src={userData.avatar}
                          alt="Admin"
                          class="rounded-circle"
                          width="110"
                          height="110"
                        ></img>
                        <div class="mt-3 username">
                          <h4>{userData.username}</h4>
                          <div className="address_user text_ellipsis">
                            <p class="text-muted font-size-sm d-inline">
                              {userData.address}
                            </p>
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
                          <h6 class="mb-0">Fist Name</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input
                            type="text"
                            class="form-control"
                            value={userData.firstName}
                            onChange={(event) =>
                              handleOnChangeInput(
                                event.target.value,
                                "firstName"
                              )
                            }
                          />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0">Last Name</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input
                            type="text"
                            class="form-control"
                            value={userData.lastName}
                            onChange={(event) =>
                              handleOnChangeInput(
                                event.target.value,
                                "lastName"
                              )
                            }
                          />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0">User name</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input
                            type="text"
                            class="form-control"
                            value={userData.username}
                            onChange={(event) =>
                              handleOnChangeInput(
                                event.target.value,
                                "username"
                              )
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
                            value={userData.address}
                            onChange={(event) =>
                              handleOnChangeInput(event.target.value, "address")
                            }
                          />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0">Gender</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <select
                            className="form-select"
                            value={userData.sex}
                            onChange={(event) =>
                              handleOnChangeInput(event.target.value, "sex")
                            }
                          >
                            <option defaultValue="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0">Email</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input
                            disabled
                            type="email"
                            class="form-control"
                            value={userData.email}
                          />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0">Phone</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input
                            disabled
                            type="text"
                            class="form-control"
                            value={userData.phone}
                          />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0">About Me</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <textarea
                            class="form-control"
                            id="aboutMe"
                            cols="81"
                            rows="5"
                            placeholder="About Me"
                            value={userData.aboutMe}
                            onChange={(event) =>
                              handleOnChangeInput(event.target.value, "aboutMe")
                            }
                          ></textarea>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0">Skills</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input
                            type="text"
                            class="form-control"
                            value={userData.skills}
                            onChange={(event) =>
                              handleOnChangeInput(event.target.value, "skills")
                            }
                          />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0">Education</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input
                            type="text"
                            class="form-control"
                            value={userData.education}
                            onChange={(event) =>
                              handleOnChangeInput(
                                event.target.value,
                                "education"
                              )
                            }
                          />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0">Experience</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input
                            type="text"
                            class="form-control"
                            value={userData.experience}
                            onChange={(event) =>
                              handleOnChangeInput(
                                event.target.value,
                                "experience"
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
                            value={userData.avatar}
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
                              onClick={() => handleConfirmUser()}
                            >
                              Save Changes
                            </button>
                            <button
                              type="button"
                              class="btn btn-warning"
                              onClick={() => setIsShowModalSelectJob(true)}
                            >
                              Create CV
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

          <ModalSelectJob
            show={isShowModalSelectJob}
            onHide={onHideModalSelectJob}
            name={userData.firstName + " " + userData.lastName}
            email={userData.email}
            phone={userData.phone}
            aboutMe={userData.aboutMe}
            skills={userData.skills}
            education={userData.education}
            experience={userData.experience}
            imageSrc={userData.avatar}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Profile;
