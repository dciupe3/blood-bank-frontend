import { useState, useEffect } from "react";
import AppointmentList from "../../components/appointment/AppointmentList";

function DonorAppointmentsPage() {

    const [isLoading, setIsLoading] = useState(true);
    const [loadedAppointments, setLoadedApointments] = useState([]);

    useEffect( () => {
        setIsLoading(true);
        fetch (
            `http://localhost:8080/api/appointment/donor/${localStorage.userId}`
        )
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

                appointments.push(appointment);
            }
            setIsLoading(false);
            setLoadedApointments(appointments);
        });
    }, []); 

    if (isLoading) {
        return (
          <section>
            <p>Loading...</p>
          </section>
        );
      }
    

    return (
        <section>
            <h1>All Appointments</h1>
            <AppointmentList appointments = {loadedAppointments} />
        </section>
    );
}

export default DonorAppointmentsPage;