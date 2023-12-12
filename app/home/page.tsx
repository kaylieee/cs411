
import Head from 'next/head'

'use client';
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Map from '../../pages/api/map'

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
  return (
    <div  id='container'>
      <body id="body">
        <div id="header">
          <div id='imageContainer'>
            <Image src={"/logo.png"} alt="logo" height={100} width={200} />
          </div>
          <div id='welcome_name' className="welcome_name">
            <h1 id='name'>Welcome: </h1>
          </div>
        </div>
        <div id="bottom">
          <div id="leftContainer">
            <button className={'options'} onClick={() => setCat("library")}>Library</button>    
            <button className={'options'} onClick={() => setCat("park")}>Park</button> 
            <button className={'options'} onClick={() => setCat("cafe")}>Cafe</button> 
            <button className={'options'} onClick={() => setCat("tourism")}>Tourism</button> 
            <button className={'options'} onClick={() => setCat("entertainment")}>Entertainment</button>
          </div>
          <div id="centerContainer">
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

export async function sendReq(e: Event, a: string){
  placeDisplay = ''
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
  const placesArray = data.responseData.properties
  handleData(placesArray)
}

let placeDisplay = ''
function handleData(places: Array<JSON>){
  for(let i = 0; i < places.length; i++){
    placeDisplay += '<div class=place><h1>'+places[i].name+'</h1>'+'<p>'+places[i].address_line2.split(',')[0]+'</p></div>'
  }
  console.log(placeDisplay)
  document.getElementById('dest').innerHTML = placeDisplay
}

let params = {}
let regex = (/([^&=]+)=([^&]*)/g)
let m;
while(m=regex.exec(location.href)){
  params[decodeURIComponent(m[1])] = decodeURIComponent(m[2])
}
if(Object.keys(params).length > 0){
  localStorage.setItem('authInfo', JSON.stringify(params))
}

window.history.pushState({}, document.title, "/" + "home")

let infoString = localStorage.getItem('authInfo')
let info: Params | null = infoString? JSON.parse(infoString) : null;

if (info){
  console.log(info)
  console.log(info['access_token'])
  console.log(info['expires_in'])

  if (info['access_token']){
    fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${info['access_token']}`,
      },
    })
    .then((data) => data.json())
    .then((userInfo) => {
      console.log(userInfo)
      const nameElement = document.getElementById('name')
      if (nameElement) {
        nameElement.innerHTML += userInfo.name
      }
    })
    .catch((error) => {
      console.error('Error fetching user info:', error)
    })
  }
}