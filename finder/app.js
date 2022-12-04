// App initialization
document.addEventListener("DOMContentLoaded", function() {
  const map = createMap();

  console.log('Loading data from Google sheet...');
  loadDataFromSheet(config.sheet_url)
    .then((dataset) => map.on('load', () => {
      map.addSource('locations', {
        type: 'geojson',
        data: dataset,
      });

      console.log('Populating listings...');
      populateListings(dataset.features, map);

      console.log('Initializing search...');
      registerSearch(dataset.features);

      console.log('Adding markers...');
      addMarkers(dataset.features, map);

      // Map behaviors
      map.on('click', 'locationData', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ['locationData'],
        });
        const clickedPoint = features[0].geometry.coordinates;
        flyToLocation(clickedPoint);
        sortByDistance(clickedPoint);
        createPopup(features[0]);
      });

      map.on('mouseenter', 'locationData', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', 'locationData', () => {
        map.getCanvas().style.cursor = '';
      });
    }));
});

// Insert sidebar data 
function populateListings(features, map) {
  let listingsContainer = document.querySelector('.listings');

  for (const feature of features) {
    const listing = listingsContainer.appendChild(document.createElement('div'));
    listing.id = `listing-${feature.properties.id}`;
    listing.className = 'item';

    const link = listing.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'title';
    link.id = `link-${feature.properties.id}`;
    link.innerHTML = feature.properties[config.sheet_columns.name];

    link.addEventListener('click', () => {
      const clickedListing = feature.geometry.coordinates;
      activateFeature(feature, map);
    });

    const details = listing.appendChild(document.createElement('div'));
    details.innerHTML = feature.properties[config.sheet_columns.address];
  }
}
