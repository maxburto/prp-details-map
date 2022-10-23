'use strict';

// eslint-disable-next-line no-unused-vars
const config = {
  style: 'mapbox://styles/mapbox/outdoors-v11',
  accessToken:
    'pk.eyJ1IjoibWF4YnVydG8iLCJhIjoiY2t5MHZwNnI2MDU1bjJ2cGUwYXhqYndpbCJ9.31g_YC48d2c_HDyPD_XhUA',
  CSV: 'https://docs.google.com/spreadsheets/d/1wHpnaSjdUrgh45iRd-TGiBNqtGukNO0zbbgfTBosjaA/gviz/tq?tqx=out:csv&sheet=data',
  center: [-120.234, 47.398],
  zoom: 6,
  title: 'Replace with your title',
  description:
    'Replace with information about your application. Ex. You can search by address to sort the list below by distance. You can also filter the list by language support options, which days a location is open, and whether they have devices to use to complete the survey by phone or online.',
  sideBarInfo: ['Name', 'Address', 'Phone'],
  popupInfo: ['Name'],
  filters: [
    {
      type: 'dropdown',
      title: 'Locations',
      columnHeader: 'Campaign ID',
      listItems: [
        'UDFB_GD',
        'WCFB_GD',
        'ECFB_GD',
      ],
    },
    {
      type: 'checkbox',
      title: 'Location type: ',
      columnHeader: 'Location type', // Case sensitive - must match spreadsheet entry
      listItems: ['House', 'Interior apartment', 'Apartment with an outside facing door'], // Case sensitive - must match spreadsheet entry; This will take up to six inputs but is best used with a maximum of three;
    },
    {
      type: 'dropdown',
      title: 'Routes: ',
      columnHeader: 'Route',
      listItems: [
        'New volunteer orientation',
        'Solo - Solo deliveries and pantry restocks',
        'Group - Ravenna route - Meet for coffee after',
        'Group - University District route - Meet for coffee after',
      ],
    },
  ],
};
