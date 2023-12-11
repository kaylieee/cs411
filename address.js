
import React from 'react';
import Radar from 'radar-sdk-js';
//const axiosRequest = require("axios");


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
    //geocode address entered in form 
    const radarApiKey = ''; // Replace with your Radar API key
    const radarApiUrl = `https://api.radar.io/v1/geocode/forward?query=${encodeURIComponent(address)}`;
    //api call to radar
    const radarApiResponse = await fetch(radarApiUrl, {
      method: 'GET',
      headers: {
          'Authorization': radarApiKey,
        },
        });
  
        const radarApiData = await radarApiResponse.json();
  
        // Extract coordinates from the Radar API response
        const { latitude, longitude } = radarApiData.addresses[0];
  
        console.log('Coordinates:', { latitude, longitude });
        //formatting the response to return a json with a list of places 
        let newarr = getPlaces(lat,long,latitude,longitude,category)
        res.status(200).json({ text: "hello" })
        //res.status(200).send(newarr);
       
        
  
        // Respond with the coordinates or any other data you need
        
      } catch (error) {
        console.error('Error calling Radar API:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    
    }
    
  }

  async function getPlaces(lat,long,lat1,long1,cat){
    //const nu = prompt("How many places do you want to search for?:");
    //let num = parseInt(nu);
    try{
      let response = await fetch('https://api.geoapify.com/v2/places?categories='+cat+'&filter=rect:'+long+','+lat+','+long1+','+lat1+'&bias=proximity:'+long+','+lat+'&limit=3&apiKey=')
      const places = await response.json();
      places.features.forEach((place) => {
        if (place.properties !== undefined) {
          const { name, address_line2, city, state, country, lat, lon } = place.properties;
          if (arraybool(name)) {
            array.push(place.properties);
          }
        }
      });
      console.log(array);
      return array;
    }
      catch (error) {
        console.error('Error fetching data:', error);
        // Handle error appropriately
        return [];
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
  
