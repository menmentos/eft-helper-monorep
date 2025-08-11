import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
export default function MapView({ boss }){
  useEffect(()=>{
    const el = document.getElementById('mapview');
    if(!el) return;
    el.innerHTML='';
    const m = L.map('mapview',{center:[55.75,37.61],zoom:12});
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(m);
    if(boss && boss.spawnLocations){
      boss.spawnLocations.forEach((s, idx)=>{
        const lat = s.lat || 55.75 + (idx * 0.01);
        const lng = s.lng || 37.61 + (idx * 0.01);
        const color = (s.chance>=75)?'red':(s.chance>=50)?'orange':(s.chance>=25)?'yellow':'green';
        const circle = L.circleMarker([lat,lng], { radius:10, color }).addTo(m);
        circle.bindPopup(`<b>${boss.name}</b><br/>${s.map}<br/>chance: ${s.chance||'N/A'}`);
      });
    }
    return ()=> m.remove();
  },[boss]);
  return (<div><h2>Map View</h2><div id='mapview' style={{height:480}}></div></div>);
}
