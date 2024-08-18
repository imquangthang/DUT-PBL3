import "./Register.scss";
import { useHistory, Link } from "react-router-dom";
// import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerNewCompany, registerNewUser } from "../../services/userService";
import logo from "../../logo.png";
import { UserContext } from "../../context/UserContext";

const Register2 = (props) => {
  const { user } = useContext(UserContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  let history = useHistory();

  useEffect(() => {
    if (user && user.isAuthenticated) {
      history.push("/");
    }
  }, []);

  const isValidInput = () => {
    setObjCheckInput(defaultValidInput);

    if (!email) {
      toast.error("Email is required");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      toast.error("Please enter a valid email address");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    if (!phone) {
      setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
      toast.error("Phone is required");
      return false;
    }
    if (!password) {
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      toast.error("Password is required");
      return false;
    }

    if (password !== confirmPassword) {
      setObjCheckInput({
        ...defaultValidInput,
        isValidConfirmPassword: false,
      });
      toast.error("Your password is not the same");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    let check = isValidInput();

    if (check === true) {
      let serverData = await registerNewCompany(
        email,
        phone,
        companyName,
        password
      );
      if (+serverData.EC === 0) {
        toast.success(serverData.EM);
        history.push("/login");
      } else {
        toast.error(serverData.EM);
        if (+serverData.EC === 1) {
          setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
        } else if (+serverData.EC === 2) {
          setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
        }
      }
    }
  };

  useEffect(() => {
    console.log(firstName);
    console.log(lastName);
  });

  return (
    <>
      <div class="wrapper">
        <div class="d-flex align-items-center justify-content-center my-5 my-lg-0">
          <div class="container">
            <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-2">
              <div class="col mx-auto">
                <div class="card">
                  <div class="card-body">
                    <div class="border p-4 rounded">
                      <Link to="/">
                        <div class="text-center">
                          <img
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top me-3"
                            alt="Logo"
                          />
                          <h3 class="">Register Company</h3>
                        </div>
                      </Link>
                      <div className="mb-1">
                        <p className="gap-1">
                          Already have an account?
                          <Link to="/login">Login here</Link>
                        </p>
                        <p className="gap-1">
                            Register with Client?
                            <Link to="/register"> Click here</Link>
                          </p>
                      </div>
                      <div class="form-body">
                        <form class="row g-3">
                          <div class="col-12">
                            <label for="inputEmailAddress" class="form-label">
                              Email Address
                            </label>
                            <input
                              type="text"
                              className={
                                objCheckInput.isValidEmail
                                  ? "form-control"
                                  : "form-control is-invalid"
                              }
                              placeholder="Email address"
                              value={email}
                              onChange={(event) => setEmail(event.target.value)}
                            />
                          </div>
                          <div class="col-12">
                            <label for="inputEmailAddress" class="form-label">
                              Phone Number
                            </label>
                            <input
                              type="number"
                              className={
                                objCheckInput.isValidPhone
                                  ? "form-control"
                                  : "form-control is-invalid"
                              }
                              placeholder="Phone number"
                              value={phone}
                              onChange={(event) => setPhone(event.target.value)}
                            />
                          </div>
                          <div class="col-12">
                            <label for="inputEmailAddress" class="form-label">
                              Company name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Company name"
                              value={companyName}
                              onChange={(event) =>
                                setCompanyName(event.target.value)
                              }
                            />
                          </div>
                          <div class="col-12">
                            <label for="inputChoosePassword" class="form-label">
                              Password
                            </label>
                            <div class="input-group" id="show_hide_password">
                              <input
                                type="password"
                                className={
                                  objCheckInput.isValidPassword
                                    ? "form-control"
                                    : "form-control is-invalid"
                                }
                                placeholder="Password"
                                value={password}
                                onChange={(event) =>
                                  setPassword(event.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div class="col-12">
                            <label for="inputChoosePassword" class="form-label">
                              Re-Enter Password
                            </label>
                            <div class="input-group" id="show_hide_password">
                              <input
                                type="password"
                                className={
                                  objCheckInput.isValidConfirmPassword
                                    ? "form-control"
                                    : "form-control is-invalid"
                                }
                                placeholder="Re-enter Password"
                                value={confirmPassword}
                                onChange={(event) =>
                                  setConfirmPassword(event.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div class="col-12">
                            <div class="d-grid">
                              <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => handleRegister()}
                              >
                                Register
                              </button>
                            </div>
                          </div>
                        </form>
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
  );
};

export default Register2;
