import { useState } from "react";
import Card from "../ui/Card";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

import classes from "./LocationItem.module.css";

function LocationItem(props) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableDates, setAvailableDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const openHandler = () => {
    setLoading(true);
    setSelectedDate(null);
    fetch(`http://localhost:8080/api/location/${props.id}/available-dates`)
      .then((response) => {
        return response.json();
      })
      .then((dates) => {
        // Convert the dates from strings to Date objects
        const dateObjects = dates.map((date) => new Date(date));
        setAvailableDates(dateObjects);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));

    setOpen(true);
  };
  const closeHandler = () => setOpen(false);

  // const formatDate = (date) => {
  //   return date.toISOString().split("T")[0]; //pentru ca data arata asa : 2023-06-23T10:33:07.833Z 13
  // };

  //time zone diferite si face cu o zi in spate
  // folosesc functia format din libraria date-fns
  const formatDate = (date) => {
    return format(date, "yyyy-MM-dd"); //pentru ca data arata asa : 2023-06-23T10:33:07.833Z 13
  };

  const confirmHandler = () => {
    const date = formatDate(selectedDate);
    const locationId = props.id;
    const donorId = localStorage.getItem("userId");
    const data = { donorId, locationId, date, checked }; // JSON

    fetch("http://localhost:8080/api/appointment/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      closeHandler();
    });
  };

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.photo} alt={props.photo} />
        </div>
        <div className={classes.content}>
          <h3>{props.name}</h3>
          <address>{props.address}</address>
          <p>
            {props.startOperatingHours} - {props.endOperatingHours}
          </p>
          <p>{props.maxDonations}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={openHandler}>Appointment</button>
        </div>
      </Card>
      <Dialog open={open} onClose={closeHandler}>
        <DialogTitle>Set Appointment Date</DialogTitle>
        <DialogContent style={{ minHeight: "400px", minWidth: "300px" }}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                  Send email
                </label>
              </div>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy/MM/dd"
                includeDates={availableDates}
              />
              
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler}>Cancel</Button>
          <Button onClick={confirmHandler} disabled={selectedDate === null}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </li>
  );
}

export default LocationItem;
