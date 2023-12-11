
import Head from 'next/head'

'use client';
import Image from 'next/image'
import { useRef, useState, useEffect, FormEvent } from 'react'
import ReactDOM from 'react-dom'



let currentLat = 0
let currentLong = 0
export default function Home() {
  const [address, setAddress] = useState('');
  useEffect(()=> {
    navigator.geolocation.getCurrentPosition(function(position) {
      currentLat = position.coords.latitude
      currentLong =  position.coords.longitude
      console.log(currentLat)
    });
  })
  //ReactDOM.render(map, document.getElementById("mapcontainer"));
  return (
    <div  id='container'>
      <body id="body">
        <div id="header">
          <div id='imageContainer'>
            <Image src={"/logo.png"} alt="logo" height={100} width={200} />
          </div>
        </div>
        <div id="bottom">
          <div id="leftContainer">
            <button className={'options'} onClick={() => setCat('education.library')}>Library</button>    
            <button className={'options'} onClick={() => setCat("leisure")}>Park</button> 
            <button className={'options'} onClick={() => setCat('commercial.food_and_drink.coffee_and_tea,commercial.food_and_drink.bakery,catering.cafe.coffee_shop')}>Cafe</button>
            <button className={'options'} onClick={() => setCat('catering.restaurant')}>Restaurants</button> 
            <button className={'options'} onClick={() => setCat("commercial")}>Shopping</button>     
            <button className={'options'} onClick={() => setCat("tourism")}>Tourism</button> 
            <button className={'options'} onClick={() => setCat("entertainment")}>Entertainment</button> 
          </div>
          <div id="centerContainer">
            <div id="mapcontainer"></div>
            <form onSubmit={(e) => sendReq(e, address)} className={'form'}>
              <input type="text" name="address" onChange = {(e) => {setAddress(e.currentTarget.value);}} className={'input'}></input>
              <button type="submit" name="submit" id="submit">Find Places!</button>
            </form>
          </div>
          <div id="rightContainer">
            <div className={'destinations'} id='dest'>{placeDisplay}</div>
          </div>
        </div>
      </body>
    </div>
  )
}

let category=''
const setCat = (cat: string) =>{
  category = cat
  console.log(category)
}
type Place = {
  name: string;
  address_line2: string;
  city: string;
  state: string;
  country: string;
  lat: number;
  lon: number;
};
let placeDisplay = ''
export async function sendReq(e: FormEvent<HTMLFormElement>, a: string){
  
  e.preventDefault();
  const res = await fetch("http://localhost:3000/api/address", {
    method: "POST",
    body: JSON.stringify({
      lat: currentLat,
      long: currentLong,
      address: a,
      category: category
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  const data = await res.json()
  const placesArray = data.responseData.properties;
  const placeElements = placesArray.map((place: Place, index: number) => (
    <div key={index} className="place">
      <button className="bold-button" onClick={() => marker(place.lat,place.lon)}><span className="text">{place.name}</span></button>
      <p>{place.address_line2}</p>
    </div>
  ));
  // for (let i = 0; i < placesArray.length; i++) {
  //   const place = getAddressHTML(placesArray[i]);
  //   placeDisplay += ReactDOMServer.renderToStaticMarkup(place);
  // }
  ReactDOM.render(placeElements, document.getElementById('dest'));

  
}
// export function Map() {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng] = useState(currentLong);
//   const [lat] = useState(currentLat);
//   const [zoom] = useState(14);
//   const [API_KEY] = useState();

//   useEffect(() => {
//     if (map.current) return; // stops map from intializing more than once


//     map.current = new maplibregl.Map({
//       container: mapContainer.current,
//       style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
//       center: [lng, lat],
//       zoom: zoom
//     });

//   }, [API_KEY, lng, lat, zoom]);

//   return (
//     <div className="map-wrap">
//       <div ref={mapContainer} className="map" />
//     </div>
//   );
// }


function marker(lat: number, long: number){
  //placeDisplay = '<div class=place><h1>'+ places.name+'</h1>'+'<p>'+places.address_line2.split(',')[0]+'</p></div>'
  //document.getElementById("dest")?.innerHTML(placeDisplay)
  //console.log(placeDisplay)
  console.log("hey")


}
