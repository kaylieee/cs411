
import React from 'react';
import Radar from 'radar-sdk-js';

{
  var array = new Array();
}
{
  var track = new Array();
}



// pages/api/address.js

export default async function handler(req, res) {
  try {
    console.log(req.body);
    const { lat, long, address, category } = req.body;
  
    const radarApiKey = 'apikey'; // Replace with your Radar API key
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
        const responseData = {
          properties: getPlaces(lat,long,latitude,longitude,category),
        }
        
  
        // Respond with the coordinates or any other data you need
        res.status(200).json(responseData);
      } catch (error) {
        console.error('Error calling Radar API:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    
    }
    
  }

  function getPlaces(lat,long,lat1,long1,cat){
    //const nu = prompt("How many places do you want to search for?:");
    //let num = parseInt(nu);
    fetch('https://api.geoapify.com/v2/places?categories='+cat+'&filter=rect:'+long+','+lat+','+long1+','+lat1+'&bias=proximity:'+long+','+lat+'&limit=3&apiKey=apikey')
    .then(resp => resp.json())
      .then((places) => {
        places.features.map((place) => {
          console.log(place)
          if (place.properties !== undefined) {
            const {
              name,
              address_line1,
              city,
              state,
              country,
              lat,
              lon,
            } = place.properties;
            if(arraybool(name)){
              const newPlace = {
                name: name,
                address_line1: address_line1,
                city: city,
                state: state,
                country: country,
                lat: lat,
                lon: lon,
              };
              array.push(newPlace);
            }
          }
          
        });
        
      });
      return array;
  }
  function getAddressHTML(place) {
    const {
      name,
      address_line1,
      city,
      state,
      country,
      lat,
      lon,
    } = place.properties;
    if(arraybool(name)){
      const newPlace = {
        name: name,
        address_line1: address_line1,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lon: lon,
      };
      array.push(newPlace);
    }
  }

  
  function arraybool(name){
    if(name==="undefined"){
      return false;
    }
    if(!track.includes(name)){
      track.push(name);
      return true;
    }
    else{
      return false;
    }
  }
  
