import { useState } from 'react';
import Card from "../ui/Card";
import classes from "./DoctorItem.module.css";

function DoctorItem(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDoctor, setEditedDoctor] = useState({
    firstName: props.firstName,
    lastName: props.lastName,
    cnp: props.cnp,
    location: props.location,
    email: props.email,
    phoneNumber: props.phoneNumber,
  });

  function deleteHandler() {
    fetch(`http://localhost:8080/api/admin/doctors/${props.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Doctor deleted");
          props.onFetchDoctors();
        } else {
          console.log("Error in deletion");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function editHandler() {
    setIsEditing(true);
  }

  function cancelEditHandler() {
    setIsEditing(false);
  }

  function confirmEditHandler() {
    fetch(`http://localhost:8080/api/admin/doctors/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedDoctor)
    })
    .then(response => {
      if (response.ok) {
        console.log("Doctor updated successfully");
      } else {
        console.log("Error updating doctor");
      }
      setIsEditing(false);
      props.onFetchDoctors();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }
  

  function changeHandler(e) {
    setEditedDoctor({ ...editedDoctor, [e.target.name]: e.target.value });
  }

  return (
    <li className={classes.item}>
    <Card>
      <div className={classes.content}>
        {isEditing ? (
          <div className={classes.editing}>
            <label>First Name:</label>
            <input type="text" value={editedDoctor.firstName} name="firstName" onChange={changeHandler} />
            <label>Last Name:</label>
            <input type="text" value={editedDoctor.lastName} name="lastName" onChange={changeHandler} />
            <label>CNP:</label>
            <input type="text" value={editedDoctor.cnp} name="cnp" onChange={changeHandler} />
            <label>Location:</label>
            {/* <input type="text" value={editedDoctor.location} name="location" onChange={changeHandler} />
            <label>Email:</label> */}
            <input type="text" value={editedDoctor.email} name="email" onChange={changeHandler} />
            <label>Phone Number:</label>
            <input type="text" value={editedDoctor.phoneNumber} name="phoneNumber" onChange={changeHandler} />
            <div className={classes.editActions}>
              <button onClick={confirmEditHandler}>Confirm Edit</button>
              <button onClick={cancelEditHandler}>Cancel</button>
            </div>
          </div>
        ) : (
            <>
              <h2>{props.firstName} {props.lastName}</h2>
              <p><strong>CNP:</strong> {props.cnp}</p>
              <p><strong>Location:</strong> {props.location}</p>
              <p><strong>Email:</strong> {props.email}</p>
              <p><strong>Phone:</strong> {props.phoneNumber}</p>
              <div className={classes.actions}>
                <button onClick={editHandler}>Edit</button>
                <button onClick={deleteHandler}>Delete</button>
              </div>
            </>
          )}
        </div>
      </Card>
    </li>
  );
}

export default DoctorItem;
