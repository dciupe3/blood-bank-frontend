import { useState, useEffect } from "react";
import AppointmentForDoctorList from "../../components/appointment/AppointmentForDoctorList";
import DatePicker from "react-datepicker";
import { format } from "date-fns";



function DoctorAppointmentsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedAppointments, setLoadedApointments] = useState([]);
  const [locationName, setLocationName] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAll, setShowAll] = useState(true);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    setIsLoading(true);
    let url;
    if (showAll) {
      url = `http://localhost:8080/api/appointment/doctor/${localStorage.userId}?page=${page}&size=${itemsPerPage}`;
    } else {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      url = `http://localhost:8080/api/appointment/doctor/${localStorage.userId}/${formattedDate}`;
    }
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const appointments = [];

        for (const key in data) {
          const appointment = {
            id: key,
            ...data[key],
          };
          setLocationName(appointment.locationName);
          appointments.push(appointment);
        }
        setIsLoading(false);
        setLoadedApointments(appointments);
      });
  }, [showAll, selectedDate, itemsPerPage, page]);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>{locationName}</h1>
      <DatePicker 
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy/MM/dd"
      />
      <label style={{margin: "0 10px"}}>
        Show all appointments
        <input 
          type="checkbox"
          checked={showAll}
          onChange={() => setShowAll(!showAll)}
        />
      </label>

      <select style={{margin: "0 10px"}}
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(e.target.value)}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
      <button style={{margin: "0 12px"}} onClick={() => setPage((page) => Math.max(page - 1, 0))}>
        Previous Page
      </button>
      <button style={{margin: "0 1px"}} onClick={() => setPage((page) => page + 1)}>Next Page</button>

      <h2>Appointments: </h2>
      <AppointmentForDoctorList appointments={loadedAppointments} />
    </section>
  );
}

export default DoctorAppointmentsPage;
