import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./Map.module.css";
import { format } from "date-fns";

function MapComponent({ locations }) {
  const mapStyles = {
    height: "81vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 46.7694,
    lng: 23.589, // coordinates for Cluj-Napoca
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableDates, setAvailableDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const clickOpenHandler = (location) => {
    setSelectedLocation(location);

    setLoading(true);
    setSelectedDate(null);
    fetch(
      `http://localhost:8080/api/location/${location.id}/available-dates`
    )
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

    setOpenDialog(true);
  };

  const closeHandler = () => {
    setOpenDialog(false);
  };

  const formatDate = (date) => {
    return format(date, "yyyy-MM-dd"); //pentru ca data arata asa : 2023-06-23T10:33:07.833Z 13
  };

  const confirmHandler = () => {
    const date = formatDate(selectedDate);
    const locationId = selectedLocation.id;
    const donorId = localStorage.getItem("userId");
    const data = { donorId, locationId, date, checked}; // JSON

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
    <LoadScript googleMapsApiKey="AIzaSyBCGZeRftxdqscz9drl0dYGJNZ_yrLao0s">
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
        {locations.map((item, index) => {
          return (
            <Marker
              key={index}
              position={item.location}
              onClick={() => clickOpenHandler(item)}
            />
          );
        })}
      </GoogleMap>

      <Dialog open={openDialog} onClose={closeHandler}>
        <DialogTitle>{"Location Details"}</DialogTitle>
        <DialogContent style={{ minHeight: "470px", minWidth: "300px" }}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            //if selected location exist face si restul
            selectedLocation && (
              <>
                <div className={classes.image}>
                  <img
                    src={selectedLocation.photo}
                    alt={selectedLocation.photo}
                  />
                </div>
                <p>Name: {selectedLocation.name}</p>
                <p>
                  Operating Hours: {selectedLocation.startOperatingHours} -{" "}
                  {selectedLocation.endOperationgHours}
                </p>
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
              </>
            )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler}>Cancel</Button>
          <Button onClick={confirmHandler} disabled={selectedDate === null}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </LoadScript>
  );
}

export default MapComponent;
