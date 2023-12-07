import Image from 'next/image'
import Head from 'next/head'
'use client'
import { useState, useEffect } from 'react'

let currentLat = 0
let currentLong = 0
export default function Home() {
  useEffect(()=> {
    navigator.geolocation.getCurrentPosition(function(position) {
      currentLat = position.coords.latitude
      currentLong =  position.coords.longitude
    });
  })
  return (
    <div>
      <body>
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