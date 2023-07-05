import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CreateDoctorForm from "../../components/doctor/CreateDoctorForm";
import LayoutMini2 from "../../components/layout/general/LayoutMini2";

function CreateDoctor() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/location/locations")
      .then((response) => response.json())
      .then((data) => setLocations(data));
  }, []);

  function signUpHandler(signUpData) {
    fetch("http://localhost:8080/api/admin/doctor", {
      method: "POST",
      body: JSON.stringify(signUpData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      navigate("/admin", { replace: true });
    });
  }

  return (
    <LayoutMini2>
      <section>
        <h1>Create doctor</h1>
        <CreateDoctorForm onSignUp={signUpHandler} locations = {locations}  />
      </section>
    </LayoutMini2>
  );
}

export default CreateDoctor;
