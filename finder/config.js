'use strict';

const defaultConfig = {
  title: 'PRP drop-off details map',
  description:
    'This map shows the families and seniors who our volunteers support every week by using their bikes to deliver groceries to them for our partner food banks. You can search by address to sort the list below by distance. You can also filter the list by group or solo route and if the deliver is to a house or apartment. Once you signup to volunteer a link to the fully delivery details will be emailed to you.',
  mapbox_token:
    'pk.eyJ1IjoibWF4YnVydG8iLCJhIjoiY2t5MHZwNnI2MDU1bjJ2cGUwYXhqYndpbCJ9.31g_YC48d2c_HDyPD_XhUA',
  sheet_url: 'https://docs.google.com/spreadsheets/d/1TCGYI8tr8qI7Rtcqu-XqobbYHEqin9BpKjNGTKzD9PE/gviz/tq?tqx=out:csv&sheet=detail',
  sheet_columns: {
    name: 'Name', 
    address: 'Address', 
    phone: 'Phone',
    latitude: 'Latitude',
    longitude: 'Longitude',
  },
  search_fields: [
    'Name',
    'Address',
  ],
  map_center: [-122.335126, 47.640467],
  map_style: 'mapbox://styles/maxburto/cl9lxhtgt000j14qh5hwk08ra',
  map_zoom: 11,
  map_filters: [
     {
      type: 'dropdown',
      title: 'Route: ',
      columnHeader: 'Route',
      listItems: [
        'New volunteer orientation',
        'Solo - Solo deliveries and pantry restocks',
        'Group - Ravenna route - Meet for coffee after',
        'Group - University District route - Meet for coffee aft',
        'Group - University District route - Meet for coffee aft',
        '[A] Northwest',
        '[A] South',
        '[A] West',
        '[A] East',
        '[A] North',
        '[A] Southeast',
        '[A] Southeast',
        '[B] West'
      ],
    },
    {
      type: 'checkbox',
      title: 'Location type: ',
      columnHeader: 'location-type', // Case sensitive - must match spreadsheet entry
      listItems: ['House', 'Interior apartment', 'Apartment with an outside facing door', 'Food Bank'], // Case sensitive - must match spreadsheet entry; This will take up to six inputs but is best used with a maximum of three;
    },
    {
      type: 'checkbox',
      title: 'Week: ',
      columnHeader: 'week', // Case sensitive - must match spreadsheet entry
      listItems: ['[A]', '[B]'], // Case sensitive - must match spreadsheet entry; This will take up to six inputs but is best used with a maximum of three;
    },
    {
      type: 'dropdown',
      title: 'Campaign ID: ',
      columnHeader: 'CampaignId',
      listItems: [
        'UDFB_GD',
        'WCFB_GD',
        'ECFB_GD',
        'UDFB_FR',
        'NHL_LFPR',
      ],
    },
  ],
  popupInfo: {
      title: 'Name',
      bags: 'BagOrBox',
      entrancePhoto: 'EntrancePhotoLink',
      phone: 'Phone',
      address: 'Address',
      addressLink: 'GoogleMapsDirectLink',
      unit: 'Unit',
      deliveryInstructions: 'Notes',
      riderFeedbackLink: 'RiderFeedbackLink'
  },
}

const previewConfig = {
  title: 'PRP drop-off preview map',
  sheet_url: 'https://docs.google.com/spreadsheets/d/1TCGYI8tr8qI7Rtcqu-XqobbYHEqin9BpKjNGTKzD9PE/gviz/tq?tqx=out:csv&sheet=preview'
}

// eslint-disable-next-line no-unused-vars
var config = defaultConfig;

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('preview') === 'true') {
  config = Object.assign(config, previewConfig);
}
