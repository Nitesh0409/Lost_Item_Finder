// src/pages/Home.jsx
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <h1>Lost Something? Found Something?</h1>
      <p>We help you find your items quickly on campus.</p>
      <div className="home-buttons">
        <Link to="/report-lost" className="btn">
          Report Lost
        </Link>
        <Link to="/report-found" className="btn">
          Report Found
        </Link>
      </div>
    </div>
  );
}

export default Home;
