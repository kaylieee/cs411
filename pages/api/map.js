import React, { useRef, useEffect } from 'react'
import maplibreg1 from 'maplibre-gl'
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import {maptilerKey} from './config.js'


const Map = ({currentLat, currentLong}) => {
    const mapContainer = useRef(null)
    const map = useRef(null)
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

export default Map;