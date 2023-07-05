import { useState, useEffect } from "react";
import LocationList from "../../components/location/LocationList";

function LocationsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedLocations, setLoadedLocations] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "http://localhost:8080/api/location/locations"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const locations = [];

        for (const key in data) {
          const location = {
            id: key,
            ...data[key],
          };

          locations.push(location);
        }

        setIsLoading(false);
        setLoadedLocations(locations);
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
      <h1>All Locations</h1>
      <LocationList locations={loadedLocations} />
    </section>
  );
}

export default LocationsPage;
