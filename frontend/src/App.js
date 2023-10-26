import "./App.css";
import LoginView from "./views/LoginView";
import HomeView from "./views/HomeView";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
// import useAxiosInterceptor from "./useAxiosInterceptor";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<LoginView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

