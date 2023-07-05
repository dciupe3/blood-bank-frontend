import MapComponent from "../../components/ui/Map";
import { useEffect, useState } from "react";

function MapPage() {
  const [isLoading, setIsLoading] = useState(true);

  const [loadedLocations, setLoadedLocations] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8080/api/location/locations")
      .then((response) => {
        return response.json();
      })
      .then((data) => {

        const locations = data.map((locationData) => {
            return {
                id: locationData.id,
                name: locationData.name,
                location: { 
                    lat: locationData.lat, 
                    lng: locationData.lng 
                },
                photo: locationData.photo,
                address: locationData.address,
                startOperatingHours: locationData.startOperatingHours,
                endOperationgHours: locationData.endOperatingHours
            };
        });

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

  return <MapComponent locations = {loadedLocations} />;
}

export default MapPage;
