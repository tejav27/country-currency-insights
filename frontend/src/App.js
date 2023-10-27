import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import "./App.css";
import LoginView from "./views/LoginView";
import HomeView from "./views/HomeView";
import "./App.css";
import { AuthContext } from "../src/context/AuthContext";

function App() {
  const { token } = useContext(AuthContext);
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={token ? <HomeView /> : <LoginView />} />
          <Route path="/login" element={<LoginView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
