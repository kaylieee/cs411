
import React from 'react';
import Radar from 'radar-sdk-js';


// pages/api/address.js

export default async function handler(req, res) {
//     if (req.method === 'GET') {
//         try {
//           const { cat, home_lat, home_long } = req.query;
//           console.log(cat,home_lat,home_long);
//           res.status(200).json({ cat, home_lat, home_long });

//     }
//         catch (error) {
//         console.error('Error calling Radar API:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// }
    
    if (req.method === 'POST') {
      try {
        console.log(req.data);
        const { address } = req.body;
  
        // Call the Radar API for forward geocoding
        const radarApiKey = 'prj_live_pk_983a93248e6cd3385f674c44fd9e885e0cc8b191'; // Replace with your Radar API key
        const radarApiUrl = `https://api.radar.io/v1/geocode/forward?query=${encodeURIComponent(address)}`;
  
        const radarApiResponse = await fetch(radarApiUrl, {
          method: 'GET',
          headers: {
            'Authorization': radarApiKey,
          },
        });
  
        const radarApiData = await radarApiResponse.json();
  
        // Extract coordinates from the Radar API response
        const { latitude, longitude } = radarApiData.addresses[0];
  
        // You can use latitude and longitude for further processing
        console.log('Coordinates:', { latitude, longitude });
  
        // Respond with the coordinates or any other data you need
        res.status(200).json({ latitude, longitude });
      } catch (error) {
        console.error('Error calling Radar API:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
    else {
        res.status(405).json({ message: 'Method Not Allowed' });
      } 
    
  }
  
