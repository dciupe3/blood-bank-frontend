import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import classes from "./MainNavigationAdmin.module.css";

function MainNavigationAdmin() {
  const navigate = useNavigate();

  const logOutData = {
    userType: localStorage.getItem("userType"),
    userId: localStorage.getItem("userId"),
    token: localStorage.getItem("token"),
  };

  const logoutHandler = () => {
    fetch("http://localhost:8080/user/logout", {
      method: "POST",
      //   credentials: 'include',
      body: JSON.stringify(logOutData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        localStorage.removeItem("userId");

        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    });
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Admin Page</div>
      <div>{localStorage.getItem("userType")}</div>
      <div>{localStorage.getItem("userId")}</div>
      <nav>
        <ul>
          <li>
            <Link to="/admin/create-doctor">Create Doctor</Link>
          </li>
          <li>
            <Link to="/admin/doctors">All Doctors</Link>
          </li>
          <li>
            <Link to="/login" onClick={logoutHandler}>
              Log out
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigationAdmin;
