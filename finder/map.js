// Map initialization
function createMap() {
  return new mapboxgl.Map({
    accessToken: config.mapbox_token,
    center: config.map_center,
    container: 'map',
    style: config.map_style,
    zoom: config.map_zoom,
    transformRequest: transformRequest,
  });
}

var transformRequest = (url, resourceType) => {
  var isMapboxRequest =
    url.slice(8, 22) === "api.mapbox.com" ||
    url.slice(10, 26) === "tiles.mapbox.com";
  return {
    url: isMapboxRequest
      ? url.replace("?", "?pluginName=sheetMapper&")
      : url
  };
};

// Markers and popups
function addMarkers(data, map) {
  for (const marker of data) {
    const el = document.createElement('div');
    el.id = `marker-${marker.properties.id}`;
    el.className = 'marker';

    el.addEventListener('click', (e) => {
      activateFeature(marker, map);
    });

    new mapboxgl.Marker(el, { offset: [0, -23] })
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);
  }
}

function activateFeature(feature, map) {
  flyToStore(feature, map);
  createPopUp(feature, generatePopupHTML(feature), map);

  const activeItem = document.getElementsByClassName('active');
  e.stopPropagation();

  if (activeItem[0]) {
    activeItem[0].classList.remove('active');
  }

  const listing = document.getElementById(`listing-${marker.properties.id}`);
  listing.classList.add('active');
}

function flyToStore(feature, map, zoom = 15) {
  map.flyTo({
    center: feature.geometry.coordinates,
    zoom: zoom
  });
}

function createPopUp(feature, popupHTML, map) {
  const popUps = document.getElementsByClassName('mapboxgl-popup');
  /** Check if there is already a popup on the map and if so, remove it */
  if (popUps[0]) popUps[0].remove();

  const popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(popupHTML)
    .addTo(map);
}

function generatePopupHTML(feature) {
  let popupHTML = ''
  if (config.defaultFilter.preview === "true") {
    popupHTML = '<h3>' + feature.properties[config.popupInfo.title] + '</h3>'
    +
    '<h4><b>Details: </b>' + feature.properties[config.popupInfo.Phone] + '</h4>'
    +
    '<h4><b>Route: </b>' + feature.properties[config.popupInfo.unit] + '</h4>'
    +
    '<h4> <a class="txt-underline-on-hover link" href="' + feature.properties[config.popupInfo.addressLink] + '" target="_blank"><b>Map link</b></h4>';
  } else {
    popupHTML = '<h3>' + feature.properties[config.popupInfo.title] + ' - ' + feature.properties[config.popupInfo.bags] + 'bag(s) </h3>'
    +
    '<img src="' + feature.properties[config.popupInfo.entrancePhoto] + '" width="300">'
    +
    '<h4><b>Phone: </b><a href="'+feature.properties[config.popupInfo.phone]+'">'+feature.properties[config.popupInfo.phone]+'</a></h4>'
    +
    '<h4> <a class="txt-underline-on-hover link" href="' + feature.properties[config.popupInfo.addressLink] + '" target="_blank"><b>Address: </b>' + feature.properties[config.popupInfo.address] + '</a> </h4>'
    +
    '<h4><b>Unit: </b>' + feature.properties[config.popupInfo.unit] + '</h4>'
    +
    '<p><b>Delivery Instructions: </b>' + feature.properties[config.popupInfo.deliveryInstructions] + '</p>'
     +
    '<h5> <a class="txt-underline-on-hover link" href="' + feature.properties[config.popupInfo.riderFeedbackLink] + '" target="_blank">Send the food bank feedback</a> </h5>';
  }
}
