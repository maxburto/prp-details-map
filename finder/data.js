// Loading data from CSV
const csv_config = {
  latfield: config.sheet_columns.latitude,
  lonfield: config.sheet_columns.longitude,
}

function getGeoJsonFromCsv(csvString) {
  return csv2geojson.csv2geojson(csvString, csv_config,
    function(err, data) {
      data.features.forEach((data, i) => {
        data.properties.id = i;
      });
  });
}

async function loadDataFromSheet(sheetURL) {
  let data = await fetch(sheetURL, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/text' }),
  })
    .then(response => response.text() )
    .then(function(csv) {
      var filtered;
      var geojson = csv2geojson.csv2geojson(csv, csv_config,
        function(err, fs) {
          fs.features.forEach((fs, i) => {
            fs.properties.id = i;
          });
          filtered = fs;
      });
      return filtered;
    }) 
    .catch((error) => {
      console.error('Error:', error);
    });

  return data;
}
