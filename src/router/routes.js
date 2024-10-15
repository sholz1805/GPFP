import Login from "../pages/authentication/Login";
import SignupChoice from "../pages/authentication/SignupChoice";
import SignupDeveloper from "../pages/authentication/SignupDeveloper";
import SignupInvestor from "../pages/authentication/SignupInvestor";
import DeveloperProfile from "../pages/authentication/developerProfile/DeveloperProfile";
import ForgotPassword from "../pages/authentication/ForgotPassword";
import NewPasswordSetup from "../pages/authentication/NewPasswordSetup";
import EmailVerified from "../pages/authentication/EmailVerified";
import InvestorProfile from "../pages/authentication/investorProfile/InvestorProfile";
import NotFound from "../pages/authentication/NotFound";
// import DummyDashboard from "../pages/authentication/DummyDashboard";
import CreateProject from "../pages/dashboard/createProject/CreateProject";
import Sidebar from "../pages/dashboard/Sidebar";
import CreateProject2 from "../pages/dashboard/createProject/CreateProject2";
import CreateProject3 from "../pages/dashboard/createProject/CreateProject3";
import InvestorDashboard from "../pages/dashboard/InvestorDashboard";
import ProjectList from "../pages/dashboard/ProjectList";
import DeveloperDashboard from "../pages/dashboard/DeveloperDashboard";

const ROUTES = [
  {
    path: "/login",
    key: "Login",
    exact: true,
    element: <Login />,
  },
  {
    path: "/",
    key: "SignupChoice",
    exact: true,
    element: <SignupChoice />,
  },
  {
    path: "/signup/developer",
    key: "SignupDeveloper",
    exact: true,
    element: <SignupDeveloper />,
  },
  {
    path: "/signup/investor",
    key: "SignupInvestor",
    exact: true,
    element: <SignupInvestor />,
  },
  {
    path: "/profile-developer",
    key: "Developer",
    exact: true,
    element: <DeveloperProfile />,
  },
  {
    path: "/profile-investor",
    key: "Investor",
    exact: true,
    element: <InvestorProfile />,
  },
  {
    path: "/forgot-password",
    key: "ForgotPassword",
    exact: true,
    element: <ForgotPassword />,
  },
  {
    path: "/new-password-setup",
    key: "NewPasswordSetup",
    exact: true,
    element: <NewPasswordSetup />,
  },
  {
    path: "/auth/verify-email/:code",
    key: "EmailVerified",
    exact: true,
    element: <EmailVerified />,
  },
  {
    path: "/dashboard",
    key: "Dashboard",
    exact: true,
    element: <Sidebar />,
  },
  {
    path: "/create-project",
    key: "CreateProject",
    exact: true,
    element: <CreateProject />,
  },
  {
    path: "/create-project-page2",
    key: "CreateProject2",
    exact: true,
    element: <CreateProject2 />,
  },
  {
    path: "/create-project-page3",
    key: "CreateProject3",
    exact: true,
    element: <CreateProject3 />,
  },
  {
    path: "*",
    key: "NotFound",
    exact: true,
    element: <NotFound />,
  },
  {
    path: "/project-list",
    key: "InvestorDashboard",
    exact: true,
    element: <ProjectList />,
  },
  {
    path: "/investor-dashboard",
    key: "InvestorDashboard",
    exact: true,
    element: <InvestorDashboard />,
  },
  {
    path: "/developer-dashboard",
    key: "InvestorDashboard",
    exact: true,
    element: <DeveloperDashboard />,
  },
  
];

export default ROUTES;
