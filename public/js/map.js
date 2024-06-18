
mapboxgl.accessToken=mapToken;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v10",
  center:JSON.parse(coordinates),//,//starting pos [lng,lat]
  zoom: 8,
});
console.log((coordinates));

// //Create a default Marker and add it to the map.
const marker = new mapboxgl.Marker({color:"red"})
.setLngLat(JSON.parse(coordinates))
  // .setPopup( new mapboxgl.Popup({offset:25})
  // .setHTML("<p>hii</p>")  
 .addTo(map);
//  // <h4>${listing.location}</h4><p>Exact location provided After booking !</p>`)

