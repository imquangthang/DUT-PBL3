import { Switch, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import EditJob from "../components/Job/EditJob";
import Job from "../components/Job/Job";
import JobInfo from "../components/Job/JobInfo";
import CompanyJobInfoStatus from "../components/Company/CompanyJobInfoStatus";
import NotFound from "../components/NotFound/NotFound";
import CompanyJob from "../components/Company/CompanyJob";
import CompanyJobStatus from "../components/Company/CompanyJobStatus";
import Company from "../components/Company/Company";
import CompanyInformation from "../components/Profile/CompanyInformation";

const CompanyRoutes = (props) => {
  return (
    <>
      <Switch>
        <PrivateRoutes path="/edit-jobs" component={EditJob} />
        <PrivateRoutes path="/job" component={Job} />
        <PrivateRoutes path="/company-jobs" component={CompanyJob} />
        <PrivateRoutes
          path="/company-jobs-status"
          component={CompanyJobStatus}
        />
        <PrivateRoutes path="/job-info/:id" component={JobInfo} />
        <PrivateRoutes path="/job-info-status/:id" component={CompanyJobInfoStatus} />
        <PrivateRoutes path="/company-information" component={CompanyInformation} />

        <Route path="/Company" exact>
          <Company />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default CompanyRoutes;
