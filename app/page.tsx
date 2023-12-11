
import Head from 'next/head'

'use client';
import Image from 'next/image'
import { useState, useEffect } from 'react'
interface OAuthParams{
  [key: string]: string;
}

export default function Home() {
  useEffect(() => {

  })
  return (
    <div  id='container'>
      <body id="body">
        <button className={'options'} onClick={() => LoginTime()}>Login</button>    
      </body>
    </div>
  )
}


function LoginTime(){
  let oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth"
  let form = document.createElement('form')
  form.setAttribute('method', 'GET')
  form.setAttribute('action', oauth2Endpoint)

  let params = {
    "client_id":"682181883632-49j5fpmfa6rjblchgt5ieot348j27eer.apps.googleusercontent.com",
    "redirect_uri":"http://localhost:3000/home",
    "response_type":"token",
    "scope":"https://www.googleapis.com/auth/userinfo.profile",
    "include_granted_scopes": 'true',
    'state': 'pass-through-value'
  } as OAuthParams
  for (var p in params){
    if (params.hasOwnProperty(p)){
      let input = document.createElement('input')
      input.setAttribute('type', 'hidden')
      input.setAttribute('name', p)
      input.setAttribute('value', params[p])
      form.appendChild(input)
    }
    
  }
  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}