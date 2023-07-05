import classes from "./AppointmentItem.module.css";
import Card from '../ui/Card';

function AppointmentForDoctorItem(props) {
    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.content}>
                    <h3>Appointment</h3>
                    <p>{props.donorName}</p>
                    <p>{props.bloodType}</p>
                    <p>{props.donorPhone}</p>
                    <p>{props.donorEmail}</p>
                    <p>{props.date}</p>
                    <address>{props.locationAddress}</address>
                </div>
            </Card>
        </li>
    )
}

export default AppointmentForDoctorItem;