import "./App.scss";
import NavHeader from "./components/Navigation/NavHeader";
import AdminNav from "./components/Admin/AdminNav";
import CompanyNav from "./components/Company/CompanyNav";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect, useState, useContext } from "react";
import AppRoutes from "./routes/AppRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import CompanyRoutes from "./routes/CompanyRoutes";
import { Rings } from "react-loader-spinner";
import { UserContext } from "./context/UserContext";
import Scrollbars from "react-custom-scrollbars-2";

const App = () => {
  const { user } = useContext(UserContext);
  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    let windowHeight = window.innerHeight;
    setScrollHeight(windowHeight);
    console.log("user:");
    console.log(user);
  }, [user]);

  return (
    <Scrollbars autoHide style={{ height: scrollHeight }}>
      <Router>
        {user && user.isLoading ? (
          <div className="loading-container">
            <Rings
              height="100"
              width="100"
              color="#1877f2"
              ariaLabel="loading"
            />
            <div>Loading data...</div>
          </div>
        ) : (
          <>
            {user &&
            user.account &&
            user.account.groupWithRoles &&
            user.account.groupWithRoles.name === "Admin" ? (
              <>
                <div className="row gap-0">
                  <div className="app-header col-md-0 col-lg-2">
                    <AdminNav />
                  </div>
                  <div className="app-container col-md-12 col-lg-10">
                    <AdminRoutes />
                  </div>
                </div>
              </>
            ) : (
              <>
                {user &&
                user.account &&
                user.account.groupWithRoles &&
                user.account.groupWithRoles.name === "Customer" ? (
                  <>
                    <div className="row gap-0">
                      <div className="app-header col-md-0 col-lg-2">
                        <CompanyNav />
                      </div>
                      <div className="app-container col-md-12 col-lg-10">
                        <CompanyRoutes />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="app-header">
                      <NavHeader />
                    </div>

                    <div className="app-container">
                      <AppRoutes />
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Scrollbars>
  );
};

export default App;
