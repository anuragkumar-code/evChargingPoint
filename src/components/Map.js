import React, { useEffect, useRef } from 'react';
import Container from '@mui/material/Container';

const Map = ({ chargingPoints }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if(chargingPoints.status === 'OK'){
      const latLngArray = chargingPoints.data.map(station => ({
        lat: station.latitude,
        lng: station.longitude,
        name: station.name 
      }));

      const googleMapScript = document.createElement('script');
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=API_KEY`;
      googleMapScript.async = true;
      window.document.body.appendChild(googleMapScript);

      googleMapScript.addEventListener('load', () => {

        const firstLocation = latLngArray[0]; 
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: firstLocation.lat, lng: firstLocation.lng },
          zoom: 10
        });

        latLngArray.forEach((point) => {
          new window.google.maps.Marker({
            position: { lat: point.lat, lng: point.lng },
            map: map,
            title: point.name,
          });
        });
      });

      return () => {
        window.document.body.removeChild(googleMapScript);
      };
    }
  }, [chargingPoints]);

  return (
    <Container maxWidth="lg">
      <div ref={mapRef} style={{ height: '500px', width: '100%', margin:'25px' }} />
    </Container>
  );
};

export default Map;
