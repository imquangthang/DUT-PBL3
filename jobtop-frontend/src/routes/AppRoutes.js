import { Switch, Route } from "react-router-dom";
import Login from "../components/Login/Login2";
import Register2 from "../components/Register/Register2";
import Register from "../components/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import Home from "../components/Home/Home";
import Job from "../components/Job/Job";
import JobInfo from "../components/Job/JobInfo";
import NotFound from "../components/NotFound/NotFound";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Footer from "../components/Footer/Footer";
import Profile from "../components/Profile/Profile";
import CVTemplate from "../components/Profile/CVTemplate";
import { PDFViewer } from "@react-pdf/renderer";
import CompanyList from "../components/Company/CompanyList";
import CompanyInfo from "../components/Company/CompanyInfo";
import ChangePass from "../components/Password/ChangePass";

const AppRoutes = (props) => {
  const location = useLocation();
  const {
    name,
    jobTitle,
    email,
    phone,
    aboutMe,
    skills,
    education,
    experience,
    imageSrc,
  } = location.state ? location.state : {};

  console.log(location.state);

  return (
    <>
      <Switch>
        <PrivateRoutes path="/job" component={Job} />
        <PrivateRoutes path="/list-company" component={CompanyList} />
        <PrivateRoutes path="/user-profile/:username" component={Profile} />
        <PrivateRoutes path="/company-info/:id" component={CompanyInfo} />
        <PrivateRoutes path="/job-info/:id" component={JobInfo} />
        <PrivateRoutes path="/change-pass" component={ChangePass} />

        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register2 />
        </Route>
        <Route path="/register-company">
          <Register />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/CV-Template">
          <PDFViewer width="100%" height="1000">
            <CVTemplate
              name={name}
              jobTitle={jobTitle}
              email={email}
              phone={phone}
              aboutMe={aboutMe}
              skills={skills}
              education={education}
              experience={experience}
              imageSrc={imageSrc}
            />
          </PDFViewer>
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>

      {location &&
        location.pathname !== "/login" &&
        location.pathname !== "/register" && (
          <div>
            <Footer />
          </div>
        )}
    </>
  );
};

export default AppRoutes;
