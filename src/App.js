import Appbar from './Components/Appbar';
import SignUp from './Pages/Signup';
import Signin from "./Pages/Signin";
import ARMSLandingPage from "./Pages/ARMSLandingPage";
import ReportForm from "./Pages/ReportForm";
import ARMSStudentDashboard from './Pages/ARMSStudentDashboard';
import FacultyIssueReportForm from './Pages/FacultyIssueReportForm';
import AdminLogin from './Pages/AdminLogin';
import ARMSAdminDashboard from './Pages/ARMSAdminDashboard';
import ARMSGuidelinesPage from './Pages/ARMSGuidelinesPage';
import UniversityDashboard from './Pages/UniversityDashboard';
import UniversityLogin from './Pages/UniversityLogin';
import RaggingAct1998Page from './Pages/RaggingAct1998Page';
import PrivacyPolicyPage from './Pages/PrivacyPolicyPage';
import TermsOfServicePage from './Pages/TermsOfServicePage';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
     <Router>
      

      <Routes>
        <Route path="/" element={<ARMSLandingPage />} />
        <Route path="/ARMSStudentDashboard" element={<ARMSStudentDashboard />} />
        <Route path="/FacultyIssueReportForm" element={<FacultyIssueReportForm />} />
        <Route path="/report" element={<ReportForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/ARMSAdminDashboard" element={<ARMSAdminDashboard />} />
        <Route path="/ARMSGuidelinesPage" element={<ARMSGuidelinesPage />} />
        <Route path="/UniversityDashboard" element={<UniversityDashboard />} />
        <Route path="/UniversityLogin" element={<UniversityLogin />} />
        <Route path="/RaggingAct1998Page" element={<RaggingAct1998Page />} />
        <Route path="/PrivacyPolicyPage" element={<PrivacyPolicyPage />} />
        <Route path="/TermsOfServicePage" element={<TermsOfServicePage />} />

        
      </Routes>
    </Router>
    </div>
  );
}

export default App;
