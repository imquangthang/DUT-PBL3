import React, { useContext, useEffect, useState } from "react";
import "./AdminNav.scss";
import {
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
    location.pathname === "/admin" ||
    /^\/job-info\/\d+$/.test(location.pathname)
  ) {
    return (
      <>
        <section id="sidebar">
          <NavLink to="/admin">
            <div class="brand">
              <img
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top mx-1"
                alt="Logo"
              />
              <span className="text">Admin</span>
            </div>
          </NavLink>
          <ul class="side-menu top">
            <li>
              <NavLink to="/accounts">
                <span class="text">Account</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/roles">
                <span class="text">Roles</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/group-role">
                <span class="text">Group-role</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/edit-jobs">
                <span class="text">Edit Jobs</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/edit-company">
                <span class="text">Edit Company</span>
              </NavLink>
            </li>
          </ul>
          <ul class="side-menu">
            <li>
              <NavLink to="#" class="logout">
                <span onClick={() => handleLogout()}>Log out</span>
              </NavLink>
            </li>
          </ul>
        </section>

        <div className="navbar-light bg-light" id="sidebar2">
          <div className="nav-header container">
            <Navbar expand="lg" className="bg-body-tertiary" bg="header">
              <Navbar.Brand to="/admin">
                <h3 className="brand">
                  <img
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top mx-3"
                    alt="Logo"
                  />
                  <span className="brand-name">Admin</span>
                </h3>
              </Navbar.Brand>
              <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <NavLink to="/accounts" className="nav-link">
                      Account
                    </NavLink>
                    <NavLink to="/roles" className="nav-link">
                      Roles
                    </NavLink>
                    <NavLink to="/group-role" className="nav-link">
                      Group-Role
                    </NavLink>
                    <NavLink to="/edit-jobs" className="nav-link">
                      Edit Jobs
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
      // <>
      //   <div className="navbar-light bg-light">
      //     <div className="nav-header container">
      //       <Navbar expand="lg" className="bg-body-tertiary" bg="header">
      //         <Navbar.Brand to="/admin">
      //           <h3 className="brand">
      //             <img
      //               src={logo}
      //               width="30"
      //               height="30"
      //               className="d-inline-block align-top mx-3"
      //               alt="Logo"
      //             />
      //             <span className="brand-name">Admin</span>
      //           </h3>
      //         </Navbar.Brand>
      //         <Container>
      //           <Navbar.Toggle aria-controls="basic-navbar-nav" />
      //           <Navbar.Collapse id="basic-navbar-nav">
      //             <Nav className="me-auto">
      //               <NavLink to="/accounts" className="nav-link">
      //                 Account
      //               </NavLink>
      //               <NavLink to="/roles" className="nav-link">
      //                 Roles
      //               </NavLink>
      //               <NavLink to="/group-role" className="nav-link">
      //                 Group-Role
      //               </NavLink>
      //               <NavLink to="/edit-jobs" className="nav-link">
      //                 Edit Jobs
      //               </NavLink>
      //             </Nav>
      //             <Nav>
      //               <NavDropdown title="Settings" id="basic-nav-dropdown">
      //                 <NavDropdown.Item>Change Password</NavDropdown.Item>
      //                 <NavDropdown.Divider />
      //                 <NavDropdown.Item>
      //                   <span onClick={() => handleLogout()}>Log out</span>
      //                 </NavDropdown.Item>
      //               </NavDropdown>
      //             </Nav>
      //           </Navbar.Collapse>
      //         </Container>
      //       </Navbar>
      //     </div>
      //   </div>
      // </>
    );
  } else {
    return <></>;
  }
};

export default NavHeader;
