import { useNavigate } from "react-router-dom";
import classes from "./MainNavigationDoctor.module.css";
import { Link } from "react-router-dom";


function MainNavigationDoctor() {
    const navigate = useNavigate();

    const logOutData = {
        userType: localStorage.getItem("userType"),
        userId: localStorage.getItem("userId"),
        token: localStorage.getItem("token"),
      };

    const logoutHandler = () => {
        fetch("http://localhost:8080/user/logout", {
          method: "POST",
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
            // Handle logout error
            console.error("Logout failed");
          }
        });
      };

      return (
        <header className={classes.header}>
          <nav>
            <ul>
              <li>  
                {" "}
                <Link to="/doctor">
                  {" "}
                  <div className={classes.logo}>Doctor Page</div>
                </Link>
              </li>
            </ul>
          </nav>
          <nav>
            <ul>
              <li>
                <Link to="/doctor/appointments">Appointments</Link>
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

export default MainNavigationDoctor;