import React, { useRef, useEffect, useState } from 'react'
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import {maptilerKey} from './config.js'


const Map = ({currentLat, currentLong}) => {
    const mapContainer = useRef(null)
    const map = useRef(null)
    const [mapLoaded, setMapLoaded] = useState(false)
    maptilersdk.config.apiKey = maptilerKey

    useEffect(() =>{
        if (map.current) return
        
        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.STREETS,
            zoom: 10,
            })
        map.current.on('load', () => {
            setMapLoaded(true)
        })
    }, [])
    
    useEffect(() => {
        if (mapLoaded) {
            
            map.current.flyTo({
                center: [currentLong, currentLat],
                essential: true,
            })

            map.current.getLayer('markers') && map.current.removeLayer('markers')
            map.current.getSource('markers') && map.current.removeSource('markers')

            const marker = new maptilersdk.Marker({
                color: "#107AB0",
            }).setLngLat([currentLong, currentLat])
            .addTo(map.current)

            new maptilersdk.Popup({offset: 25})
                .setLngLat([currentLong, currentLat])
                .setHTML('<h3>Current Location</h3>')
                .addTo(map.current)
        }
    }, [currentLong, currentLat, mapLoaded])

    
    
    return (
        <div className="map-wrap">
            <div ref={mapContainer} class="map"/>
        </div>
    )

    
}

export default Map;