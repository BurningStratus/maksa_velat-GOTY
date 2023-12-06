'use strict';

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
var marker = L.marker([51.5, -0.09]).addTo(map);
const redIcon = L.icon({
    iconUrl: 'img/map-marker.png',
    iconSize: [32, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const defaultIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var loppuMarker = L.marker([48.8566,  2.3522], { icon: redIcon}).addTo(map);

marker.bindPopup("<h1><b>London, England<b></h1>");
loppuMarker.bindPopup("<h1><b>Paris, France<b></h1>");

marker.on('click', function() {
    const isConfirmed = confirm("Do you want to fly here?");

    if (isConfirmed){
        marker.setIcon(redIcon); 
        loppuMarker.setIcon(defaultIcon);
    }
});