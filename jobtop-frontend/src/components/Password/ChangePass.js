import "./ChangePass.scss";
import logo from "../../logo.png";
import { useState } from "react";
import { toast } from "react-toastify";
import { ChangePassword } from "../../services/userService";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const ChangePass = () => {
  const forgotPasswordImage = `${process.env.PUBLIC_URL}/img/forgot-password-frent-img.jpg`;
  const location = useLocation();
  const { email } = location.state;
  const [newPass, setNewPass] = useState("");
  const [confPass, setConfPass] = useState("");

  const handleChangePass = async () => {
    if (newPass === "" || confPass === "") {
      toast.error("Please enter New Password and Confirm Password!!!");
    } else if (newPass !== confPass) {
      toast.error("New Password and Confirm Password not same!!!");
    } else {
      let data = { email, newPass, confPass };
      let response = await ChangePassword(data);
      if (response && +response.EC === 0) {
        toast.success(response.EM);
        setNewPass("");
        setConfPass("");
      } else if (response && +response.EC === 1) {
        toast.error(response.EM);
      }
    }
  };
  return (
    <>
      <div class="wrapper">
        <div class="authentication-reset-password d-flex align-items-center justify-content-center">
          <div class="row">
            <div class="col-12 col-lg-10 mx-auto">
              <div class="card">
                <div class="row g-0">
                  <div class="col-lg-5 border-end">
                    <div class="card-body">
                      <div class="p-5">
                        <div class="text-start">
                          <h3 className="brand">
                            <img
                              src={logo}
                              width="30"
                              height="30"
                              className="d-inline-block align-top"
                              alt="Logo"
                            />
                            <span className="brand-name mx-3">JOBTOP</span>
                          </h3>
                        </div>
                        <h4 class="mt-5 font-weight-bold">
                          Genrate New Password
                        </h4>
                        <p class="text-muted">
                          We received your reset password request. Please enter
                          your new password!
                        </p>
                        <div class="mb-3 mt-5">
                          <label class="form-label">New Password</label>
                          <input
                            type="password"
                            class="form-control"
                            placeholder="Enter new password"
                            value={newPass}
                            onChange={(event) => {
                              setNewPass(event.target.value);
                            }}
                          />
                        </div>
                        <div class="mb-3">
                          <label class="form-label">Confirm Password</label>
                          <input
                            type="password"
                            class="form-control"
                            placeholder="Confirm password"
                            value={confPass}
                            onChange={(event) => {
                              setConfPass(event.target.value);
                            }}
                          />
                        </div>
                        <div class="d-grid gap-2">
                          <button
                            type="button"
                            class="btn btn-primary"
                            onClick={() => handleChangePass()}
                          >
                            Change Password
                          </button>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-7">
                    <img
                      src={forgotPasswordImage}
                      class="card-img login-img h-100"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePass;
