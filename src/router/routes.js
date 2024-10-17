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
import CreateProject from "../pages/developer/createProject/CreateProject";
import Sidebar from "../pages/project/Sidebar";
import CreateProject2 from "../pages/developer/createProject/CreateProject2";
import CreateProject3 from "../pages/developer/createProject/CreateProject3";
import ProjectList from "../pages/investor/ProjectList";
import InvestorDashboard from "../pages/investor/InvestorDashboard";
import DeveloperDashboard from "../pages/developer/DeveloperDashboard";
import DashboardRoutes from "./DashboardRoutes";

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
  {
    path: "/admin-dashboard/*",
    key: "AdminDashboard",
    exact: true,
    element: <DashboardRoutes />,
  },
  
];

export default ROUTES;
