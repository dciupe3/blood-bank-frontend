import classes from "./LocationList.module.css";
import LocationItem from "./LocationItem";

function LocationList(props) {
  return (
    <ul className={classes.list}>
      {props.locations.map((location) => (
        <LocationItem
          key={location.id}
          id={location.id}
          photo={location.photo}
          name={location.name}
          address={location.address}
          startOperatingHours={location.startOperatingHours}
          endOperatingHours={location.endOperatingHours}
          maxDonations={location.maxDonations}
        />
      ))}
    </ul>
  );
}

export default LocationList;
