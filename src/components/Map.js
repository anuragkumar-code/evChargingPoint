import React, { useEffect, useRef } from 'react';
import Container from '@mui/material/Container';

const Map = ({ chargingPoints }) => {
    console.log(chargingPoints);
    const availblePoints = [];
    if(chargingPoints.status == 'OK'){
        availblePoints.push(chargingPoints.data.)
    }
  const mapRef = useRef(null);

  useEffect(() => {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=API_KEY`;
    googleMapScript.async = true;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener('load', () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 0, lng: 0 },
        zoom: 10,
      });

      // Place markers for charging points
        chargingPoints.forEach((point) => {
            new window.google.maps.Marker({
                position: { lat: point.data.lat, lng: point.data.lng },
                map: map,
                title: point.name,
            });
        });
    });

    return () => {
      window.document.body.removeChild(googleMapScript);
    };
  }, [chargingPoints]);

  return (
    <Container maxWidth="lg">
      <div ref={mapRef} style={{ height: '500px', width: '100%', margin:'25px' }} />
    </Container>
  );
};

export default Map;
