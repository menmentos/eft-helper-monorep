import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
export default function Map(){ useEffect(()=>{ const el=document.getElementById('map'); if(!el) return; el.innerHTML=''; const map=L.map('map').setView([55.75,37.61],12); L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map); },[]); return <div id='map' style={{height: '80vh'}}></div>; }
