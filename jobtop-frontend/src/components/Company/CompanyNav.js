import React, { useContext, useEffect, useState } from "react";
import "./CompanyNav.scss";
import {
  NavLink,
  useLocation,
  useHistory,
  Link,
} from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../../context/UserContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../logo.png";
import { getUserAccount, logoutUser } from "../../services/userService";
import { toast } from "react-toastify";

const CompanyNav = (props) => {
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
    location.pathname === "/company" ||
    /^\/job-info\/\d+$/.test(location.pathname)
  ) {
    return (
      <>
        <section id="sidebar">
          <NavLink to="/company">
            <div class="brand">
              <img
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top mx-1"
                alt="Logo"
              />
              <span className="text">Company</span>
            </div>
          </NavLink>
          <ul class="side-menu top">
            <li>
              <NavLink to="/company-jobs">Company jobs</NavLink>
            </li>
            <li>
              <NavLink to="/company-jobs-status">Check jobs</NavLink>
            </li>
            <li>
              <Link
                to={{
                  pathname: "/company-information",
                  state: {
                    email: user.account.email,
                  },
                }}
              >
                Information
              </Link>
            </li>
          </ul>
          <ul class="side-menu">
            <li>
              <NavLink to="/login" class="logout">
                <span onClick={() => handleLogout()}>Log out</span>
              </NavLink>
            </li>
          </ul>
        </section>

        <div className="navbar-light bg-light" id="sidebar2">
          <div className="nav-header container">
            <Navbar expand="lg" className="bg-body-tertiary" bg="header">
              <Navbar.Brand href="/company">
                <h3 className="brand">
                  <img
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top mx-3"
                    alt="Logo"
                  />
                  <span className="brand-name">Company</span>
                </h3>
              </Navbar.Brand>
              <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <NavLink to="/company-jobs" className="nav-link">
                      Company jobs
                    </NavLink>
                    <NavLink to="/company-jobs-status" className="nav-link">
                      Check status jobs
                    </NavLink>
                  </Nav>
                  <Nav>
                    <NavDropdown title="Settings" id="basic-nav-dropdown">
                      <NavDropdown.Item>Change Password</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item>
                        <span onClick={() => handleLogout()}>Log out</span>
                      </NavDropdown.Item>
                    </NavDropdown>
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

export default CompanyNav;
