import { BrowserRouter as Router} from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from "./components/Profile";
import Programs from "./components/Programs";
import Podcasts from "./components/Podcasts";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import NavProg from "./components/NavProg";
import Leaderboard from "./components/Leaderboard";
import ProgramInfo from "./components/ProgramInfo";
import ProgramCards from "./components/ProgramCards";
import Errorpage from "./components/Errorpage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Profile" element={<Profile />} />
          <Route exact path="/Programs" element={<Programs />} />
          <Route exact path="/Profile" element={<NavProg />} />
          <Route exact path="/Leaderboard" element={<Leaderboard />} />
          <Route exact path="/ProgramInfo" element={<ProgramInfo />} />
          <Route exact path="/ProgramCards" element={<ProgramCards />} />
          <Route exact path="/Podcasts" element={<Podcasts />} />
          <Route exact path="/SignUp" element={<SignUp />} />
          <Route exact path="/LogIn" element={<LogIn />} />
          <Route element={<Errorpage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
