
import Head from 'next/head'

'use client';
import Image from 'next/image'
import { useRef, useState, useEffect, FormEvent } from 'react'
import ReactDOM from 'react-dom'
import Map from './map'
import { processData } from './map'

interface Params{
  access_token: string;
  expires_in: number;
}



let currentLat = 0
let currentLong = 0
export default function Home() {
  const [address, setAddress] = useState('');
  const [geoLocationAvailable, setGeoLocationAvailable] = useState(false)
  useEffect(()=> {
    navigator.geolocation.getCurrentPosition(function(position) {
      currentLat = position.coords.latitude
      currentLong =  position.coords.longitude
      console.log(currentLat)
      setGeoLocationAvailable(true)
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
            <Map currentLat={currentLat} currentLong={currentLong}/>
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
  distance: number;
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
  const placeElements = placesArray.slice(1).map((place: Place, index: number) => (
    <div key={index} className="place">
      <button className="bold-button" onClick={() => marker(place.name,place.lat,place.lon,place.distance,0)}><span className="text">{place.name}</span></button>
      <p>{place.address_line2}</p>
    </div>
  ));
  // for (let i = 0; i < placesArray.length; i++) {
  //   const place = getAddressHTML(placesArray[i]);
  //   placeDisplay += ReactDOMServer.renderToStaticMarkup(place);
  // }
  //const last = placesArray.length -1
  marker("Your destination",placesArray[0].latitude,placesArray[0].longitude,placesArray[0].distance,placesArray[0].duration)
  ReactDOM.render(placeElements, document.getElementById('dest'));
  console.log(placesArray[0])
  


  
}
function marker(name: string,lat: number, long: number, distance: number, duration: number){
  distance *= 0.000621371
  if(duration===0){
    duration = (distance/3) *60
    duration = Math.ceil(duration)
}
  distance = Math.round(distance*100)/100

  console.log(name,distance)
  console.log("hey")
  
  processData(name,lat,long,distance,duration)
  


  
}




