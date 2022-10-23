'use strict';

// eslint-disable-next-line no-unused-vars
const config = {
  style: 'mapbox://styles/mapbox/outdoors-v11',
  accessToken:
    'pk.eyJ1IjoibWF4YnVydG8iLCJhIjoiY2t5MHZwNnI2MDU1bjJ2cGUwYXhqYndpbCJ9.31g_YC48d2c_HDyPD_XhUA',
  CSV: 'https://docs.google.com/spreadsheets/d/1TCGYI8tr8qI7Rtcqu-XqobbYHEqin9BpKjNGTKzD9PE/gviz/tq?tqx=out:csv&sheet=data',
  center: [-122.335126, 47.640467],
  zoom: 10,
  title: 'PRP drop-off details map',
  description:
    'Replace with information about your application. Ex. You can search by address to sort the list below by distance. You can also filter the list by language support options, which days a location is open, and whether they have devices to use to complete the survey by phone or online.',
  sideBarInfo: ['Client Name', 'Address', 'Phone'],
  popupInfo: {
      title: 'Client Name',
      entrancePhoto: 'Entrance Photo Link',
      phone: 'Phone',
      address: 'Address',
      addressLink: 'Google Maps Direct Link',
      unit: 'Unit',
      deliveryInstructions: 'Short Description',
      riderFeedback: 'Rider Feedback',
      riderFeedbackLink: 'Rider Feedback Link'
    },
  filters: [
     {
      type: 'dropdown',
      title: 'Route: ',
      columnHeader: 'Route',
      listItems: [
        'New volunteer orientation',
        'Solo - Solo deliveries and pantry restocks',
        'Group - Ravenna route - Meet for coffee after',
        'Group - University District route - Meet for coffee aft'
      ],
    },
    {
      type: 'checkbox',
      title: 'Location type: ',
      columnHeader: 'Location type', // Case sensitive - must match spreadsheet entry
      listItems: ['House', 'Interior apartment', 'Apartment with an outside facing door', 'Food Bank'], // Case sensitive - must match spreadsheet entry; This will take up to six inputs but is best used with a maximum of three;
    },
    {
      type: 'dropdown',
      title: 'Campaign ID: ',
      columnHeader: 'Campaign ID',
      listItems: [
        'UDFB_GD',
        'WCFB_GD',
        'ECFB_GD',
        'UDFB_FR',
        'NHL_LFPR',
      ],
    },
  ],
};
