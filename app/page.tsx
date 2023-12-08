import Image from 'next/image'
import Head from 'next/head'
'use client'
import { useState, useEffect } from 'react'

let currentLat = 0
let currentLong = 0
export default function Home() {
  const [address, setAddress] = useState('');
  useEffect(()=> {
    navigator.geolocation.getCurrentPosition(function(position) {
      currentLat = position.coords.latitude
      currentLong =  position.coords.longitude
    });
  })
  return (
    <div>
      <body>
        <button className={'options'} onClick={() => setCat("library")}>Library</button>    
        <button className={'options'} onClick={() => setCat("park")}>Park</button> 
        <button className={'options'} onClick={() => setCat("cafe")}>Cafe</button> 
        <button className={'options'} onClick={() => setCat("tourism")}>Tourism</button> 
        <button className={'options'} onClick={() => setCat("entertainment")}>Entertainment</button> 
        <button className={'gen'}>Generate Places!</button>
        <form onSubmit={() => sendReq(address)} className={'form'}>
          <input type="text" name="address" onChange = {e => {setAddress(e.currentTarget.value);}} className={'input'}></input>
          <button type="submit" name="submit">submit</button>
        </form>
        <div id='addressContainer'></div>
      </body>
    </div>
  )
}

let category=''
const setCat = (cat: string) =>{
  category = cat
  console.log(category)
}

function sendReq(a: string){
  fetch("http://localhost:3000/api/hello", {
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
  .then((response) => response.json())
  .then((json) => console.log(json));
}