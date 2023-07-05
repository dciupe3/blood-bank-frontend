import { useState, useEffect } from "react";
import DoctorList from "../../components/doctor/DoctorList";

function AllDoctorsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedDoctors, setLoadedDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  function fetchDoctors() {
    setIsLoading(true);
    fetch("http://localhost:8080/api/admin/doctors")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const doctors = [];

        for (const key in data) {
          const doctor = {
            id: key,
            ...data[key],
          };

          doctors.push(doctor);
        }

        setIsLoading(false);
        setLoadedDoctors(doctors);
      });
  }

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Doctors</h1>
      <DoctorList doctors={loadedDoctors} onFetchDoctors={fetchDoctors} />
    </section>
  );
}

export default AllDoctorsPage;
