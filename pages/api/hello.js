function geocodes(address){
    Radar.initialize(radarKey);
    Radar.forwardGeocode({query:address})
    .then((result) => {
      console.log(result);
      home_latitude = result.addresses[0].latitude;
      home_longitude = result.addresses[0].longitude;
      // do something with addresses
    })
    .catch((err) => {
      // handle error
      console.error(err);
    });
  
}

function geocodes_loc(address){
    Radar.initialize(radarKey);
    Radar.forwardGeocode({query:address})
    .then((result) => {
      console.log(result);
      dest_latitude = result.addresses[0].latitude;
      dest_longitude = result.addresses[0].longitude;
      getPlaces(home_latitude,home_longitude,dest_latitude,dest_longitude);
      // do something with addresses
    })
    .catch((err) => {
      // handle error
      console.error(err);
    });
}

function getPlaces(lat,long,lat1,long1){
    fetch('https://api.geoapify.com/v2/places?categories='+string+'&filter=rect:'+long+','+lat+','+long1+','+lat1+'&bias=proximity:'+long+','+lat+'&limit='+'3'+'&apiKey='+geoapifyKey)
    .then(resp => resp.json())
      .then((places) => {
        for(let i=0; i< num; i++){
          const placeHTML = getAddressHTML(places.features[i],i);
          document.getElementById('addressContainer').innerHTML += placeHTML;
        }
        
      });
  
  }


export default function handler(req, res) {
    res.status(200).json({ text: 'Hello' });
    console.log('test123')
  }