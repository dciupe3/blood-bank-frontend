import AppointmentForDoctorItem from "./AppointmentForDoctorItem";
import classes from "./AppointmentList.module.css";


function AppointmentForDoctorList(props) {
  return (
    <ul className={classes.list}>
      {props.appointments.map((appointment) => (
        <AppointmentForDoctorItem
          key={appointment.id}
          id={appointment.id}
          donorName={appointment.donorName}
          bloodType={appointment.bloodType}
          locationName={appointment.locationName}
          locationAddress={appointment.locationAddress}
          donorPhone = {appointment.donorPhone}
          donorEmail = {appointment.donorEmail}
          date={appointment.date}
        />
      ))}
    </ul>
  );
}

export default AppointmentForDoctorList;
