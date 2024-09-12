import Login from "../pages/authentication/Login";
import SignupChoice from "../pages/authentication/SignupChoice";
import SignupDeveloper from "../pages/authentication/SignupDeveloper";
import SignupInvestor from "../pages/authentication/SignupInvestor";
import DeveloperProfile from "../pages/authentication/developerProfile/DeveloperProfile";
import ForgotPassword from "../pages/authentication/ForgotPassword";
import NewPasswordSetup from "../pages/authentication/NewPasswordSetup";
import EmailVerified from "../pages/authentication/EmailVerified";
import InvestorProfile from "../pages/authentication/investorProfile/InvestorProfile";

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
    path: "/email-verified",
    key: "EmailVerified",
    exact: true,
    element: <EmailVerified />,
  },
];

export default ROUTES;
