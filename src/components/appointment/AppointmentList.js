import AppointmentItem from "./AppointmentItem";
import classes from "./AppointmentList.module.css";


function AppointmentList(props) {
  return (
    <ul className={classes.list}>
      {props.appointments.map((appointment) => (
        <AppointmentItem
          key={appointment.id}
          id={appointment.id}
          donorName={appointment.donorName}
          bloodType={appointment.bloodType}
          locationName={appointment.locationName}
          locationAddress={appointment.locationAddress}
          date={appointment.date}
        />
      ))}
    </ul>
  );
}

export default AppointmentList;
