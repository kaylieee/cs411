//import {radarKey, geoapifyKey} from './config.js'

{
  var array = new Array();
}
{
  var track = new Array();
}

export default async function handler(req, res) {
  try {
    const { lat, long, address, category } = req.body;
    const radarKey = '';

    //geocode address using radar API
    const radarApiUrl = `https://api.radar.io/v1/geocode/forward?query=${encodeURIComponent(address)}`;
    const radarApiResponse = await fetch(radarApiUrl, {
      method: 'GET',
      headers: {
          'Authorization': radarKey,
        },
      });
    const radarApiData = await radarApiResponse.json();
    const { latitude, longitude } = radarApiData.addresses[0];
    
    //call function to get places enroute
    const responseData = {
      properties: getPlaces(lat,long,latitude,longitude,category),
    }

    //send response back
    res.status(200).json({ responseData });
  } catch (error) { //error handling
    console.error('Error calling Radar API:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

function getPlaces(lat,long,lat1,long1,cat){
  //send request to geoapify
  fetch('https://api.geoapify.com/v2/places?categories='+cat+'&filter=rect:'+long+','+lat+','+long1+','+lat1+'&bias=proximity:'+long+','+lat+'&limit=3&apiKey=')
  .then(resp => resp.json())
    .then((places) => {
      //iterate through all of the places returned by geoapify
      places.features.map((place) => {
        if (place.properties !== undefined) {
          //if the place is valid create variables for all of the properties for each place 
          const {
            name,
            address_line2,
            city,
            state,
            country,
            lat,
            lon,
          } = place.properties;
          //if the place hasn't been listed before and is not undefinded set the properties of the place into json format 
          if(arraybool(name)){
            const newPlace = {
              name: name,
              address_line2: address_line2,
              city: city,
              state: state,
              country: country,
              lat: lat,
              lon: lon,
            };
            //add place to array of places
            array.push(newPlace);
          }
        }
        
      });
    });
    //return it and send it as a response 
    console.log(array);
    return array;
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

function parseCategory(c){
  if(c == "library"){
    return 'education.library';
  }
  if(c == "entertainment"){
    return 'entertainment';
  }
  if(c == "park"){
    return 'leisure.park'
  }
  if(c=="cafe"){
    return 'commercial.food_and_drink';
  }
}

