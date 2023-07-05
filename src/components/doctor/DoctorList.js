import DoctorItem from './DoctorItem';
import classes from './DoctorList.module.css';

function DoctorList(props) {
    return (
      <ul className={classes.list}>
        {props.doctors.map((doctor) => (
          <DoctorItem
            key={doctor.id}
            id={doctor.id}
            firstName={doctor.firstName}
            lastName={doctor.lastName}
            cnp={doctor.cnp}
            location={doctor.location}
            email={doctor.email}
            phoneNumber={doctor.phoneNumber}
            onFetchDoctors={props.onFetchDoctors}
          />
        ))}
      </ul>
    );
  }
  
  export default DoctorList;