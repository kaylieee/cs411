import React, { useRef, useEffect } from 'react'
import maplibreg1 from 'maplibre-gl'
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";

import {maptilerKey} from './config.js'
{
    var mapContainer;
}
{
    var map;
}

const Map = ({currentLat, currentLong}) => {
    mapContainer = useRef(null)
    map = useRef(null)
    maptilersdk.config.apiKey = maptilerKey

    useEffect(() =>{
        if (map.current) return

        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.STREETS,
            center: [currentLong, currentLat],
            zoom: 12,
            })

    }, [currentLong, currentLat, 12])

    return (
        <div className="map-wrap">
            <div ref={mapContainer} class="map"/>
        </div>
    )


}

export const processData = (name,lt,ln,dist,dur) => {
    
    console.log("hello")
    

    const marker = new maptilersdk.Marker({color:"#0B3A65"})
    .setLngLat([ln,lt])
    .setPopup(new maptilersdk.Popup().setHTML('<h1>'+name+'</h1><p>'+dist+"miles"+'<br>'+dur+" minute walk"+'</p>'))
    .addTo(map.current);
};

export default Map;

