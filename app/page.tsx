import Image from 'next/image'
import Head from 'next/head'
'use client'
import { useState, useEffect } from 'react'

export default function Home() {
  return (
    <div>
      <body>
        <button className={'options'} onClick={getLocation}>getlocation</button>  
        <button className={'options'} onClick={setCatLib}>Library</button>    
        <button className={'options'} onClick={setCatPark}>Park</button> 
        <button className={'options'}>Cafe</button> 
        <button className={'options'}>Tourism</button> 
        <button className={'options'}>Entertainment</button> 
        <button className={'gen'}>Generate Places!</button>
        <form method="POST" action="/api/hello" className={'form'}>
          <input type="text" name="address" className={'input'}></input>
          <button type="submit" name="submit">submit</button>
        </form>
        <div id='addressContainer'></div>
      </body>
    </div>
  )
}

let category=''
const setCatLib = () =>{
  category = "library"
  console.log(category)
}
const setCatPark = () =>{
  category = "park"
  console.log(category)
}

function getLocation(){
  useEffect(()=> {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  })
}