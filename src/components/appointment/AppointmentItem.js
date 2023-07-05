import classes from "./AppointmentItem.module.css";
import Card from '../ui/Card';

function AppointmentItem(props) {
    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.content}>
                    <h3>Appointment</h3>
                    <p>{props.locationName}</p>
                    <address>{props.locationAddress}</address>
                    <p>{props.donorName}</p>
                    <p>{props.bloodType}</p>
                    <p>{props.date}</p>
                </div>
            </Card>
        </li>
    )
}

export default AppointmentItem;