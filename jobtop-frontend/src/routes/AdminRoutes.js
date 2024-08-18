import { Switch, Route } from "react-router-dom";
import Users from "../components/ManageUsers/Users";
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Role/Role";
import GroupRole from "../components/GroupRole/GroupRole";
import EditJob from "../components/Job/EditJob";
import Job from "../components/Job/Job";
import JobInfo from "../components/Job/JobInfo";
import NotFound from "../components/NotFound/NotFound";
import Admin from "../components/Admin/Admin";
import AdminNav from "../components/Admin/AdminNav";
import EditCompany from "../components/Company/EditCompany";
import CompanyInfo from "../components/Company/CompanyInfo";
const AppRoutes = (props) => {
  return (
    <>
      <Switch>
        <PrivateRoutes path="/accounts" component={Users} />
        <PrivateRoutes path="/roles" component={Role} />
        <PrivateRoutes path="/group-role" component={GroupRole} />
        <PrivateRoutes path="/edit-jobs" component={EditJob} />
        <PrivateRoutes path="/edit-company" component={EditCompany} />
        <PrivateRoutes path="/job" component={Job} />
        <PrivateRoutes path="/company-info/:id" component={CompanyInfo} />


        <Route path="/admin" exact>
          <Admin />
        </Route>
        <Route path="/job-info/:id">
          <JobInfo />
        </Route>
        <Route path="*">
          <NotFound />
          <AdminNav />
        </Route>
      </Switch>
    </>
  );
};

export default AppRoutes;
