import React, { useContext, useEffect, useState } from "react";
import "./NavHeader.scss";
import {
  Link,
  NavLink,
  useLocation,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../../context/UserContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../logo.png";
import { getUserAccount, logoutUser } from "../../services/userService";
import { toast } from "react-toastify";

const NavHeader = (props) => {
  const { user, logoutContext } = useContext(UserContext);
  const location = useLocation();
  const history = useHistory();

  const handleLogout = async () => {
    let data = await logoutUser(); // clear cookies
    localStorage.removeItem("jwt"); // clear local storage
    logoutContext(); // clear user in context
    if (data && +data.EC === 0) {
      toast.success("Logout succeeds...");
      history.push("/login");
    } else {
      toast.error(data.EM);
    }
  };

  const [userValid, setUserValid] = useState("");
  const checkUser = async () => {
    let response = await getUserAccount();
    if (response && response.EC === 0) {
      let group = response.DT.groupWithRoles.name;
      setUserValid(group);
    } else {
      setUserValid("");
    }
  };

  useEffect(() => {
    checkUser();
  }, [userValid, user]);

  if (
    (user && user.isAuthenticated === true) ||
    location.pathname === "/" ||
    /^\/job-info\/\d+$/.test(location.pathname)
  ) {
    return (
      <>
        <div className="navbar-light bg-light">
          <div className="nav-header container">
            <Navbar expand="lg" className="bg-body-tertiary" bg="header">
              <Navbar.Brand href="/">
                <h3 className="brand">
                  <img
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top mx-3"
                    alt="Logo"
                  />
                  <span className="brand-name">JOBTOP</span>
                </h3>
              </Navbar.Brand>
              <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <NavLink to="/" exact className="nav-link">
                      Home
                    </NavLink>
                    <NavLink to="/job" className="nav-link">
                      Jobs
                    </NavLink>
                    <NavLink to="/list-company" className="nav-link">
                      Company
                    </NavLink>
                  </Nav>
                  <Nav>
                    {user && user.isAuthenticated === true ? (
                      <>
                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                          <NavDropdown.Item>
                            <Link
                              to={{
                                pathname: `/user-profile/${user.account.username}`,
                                state: {
                                  email: user.account.email,
                                },
                              }}
                            >
                              Profile
                            </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Item>
                            <Link
                              to={{
                                pathname: "/change-pass",
                                state: {
                                  email: user.account.email,
                                },
                              }}
                            >
                              Change Password
                            </Link>
                          </NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item>
                            <span onClick={() => handleLogout()}>Log out</span>
                          </NavDropdown.Item>
                        </NavDropdown>
                      </>
                    ) : (
                      <Link className="nav-link" to="/login">
                        <button
                          className="btn btn-outline-info me-2 mb-1"
                          type="button"
                        >
                          Đăng Nhập
                        </button>
                      </Link>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default NavHeader;
