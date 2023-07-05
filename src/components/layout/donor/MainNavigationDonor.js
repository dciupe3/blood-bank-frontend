import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import classes from "./MainNavigationDonor.module.css";

function MainNavigationDonor() {
  const navigate = useNavigate();

  const logOutData = {
    userType: localStorage.getItem("userType"),
    userId: localStorage.getItem("userId"),
    token: localStorage.getItem("token"),
  };

  const logoutHandler = () => {
    // Call logout endpoint
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
        // Handle logout error
        console.error("Logout failed");
      }
    });
  };

  const deleteHandler = () => {
    fetch(`http://localhost:8080/api/donor/${logOutData.userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("userType");
          localStorage.removeItem("userId");

          navigate("/login");
        } else {
          console.error("Account deletion failed");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            {" "}
            <Link to="/donor">
              {" "}
              <div className={classes.logo}>Donor Page</div>
            </Link>
          </li>
        </ul>
      </nav>
      {/* <div>{localStorage.getItem("userType")}</div>
      <div>{localStorage.getItem("userId")}</div> */}
      <nav>
        <ul>
          <li>
            <Link to="/donor/locations">Locations</Link>
          </li>
          <li>
            <Link to="/donor/map">Map</Link>
          </li>
          <li>
            <Link to="/donor/appointments">Appointments</Link>
          </li>
          <li>
            <Link to="/login" onClick={deleteHandler}>
              Delete Account
            </Link>
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

export default MainNavigationDonor;
