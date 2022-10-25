//https://maxburto.github.io/prp-details-map/finder/?campaign-id=UDFB_GD

'use strict';

// load parameters from url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const filterParams = urlParams.get('campaign-id');
const previewParams = urlParams.get('preview');

const previewTitle = "PRP drop-off preview map";
const detailsTitle = "PRP drop-off details map";
let outputCTitle = '';

console.log(filterParams);

// Choose to load either the full details sheet, or the review sheet
const detailedCSV = 'https://docs.google.com/spreadsheets/d/1TCGYI8tr8qI7Rtcqu-XqobbYHEqin9BpKjNGTKzD9PE/gviz/tq?tqx=out:csv&sheet=detail';
const previewCSV = 'https://docs.google.com/spreadsheets/d/1TCGYI8tr8qI7Rtcqu-XqobbYHEqin9BpKjNGTKzD9PE/gviz/tq?tqx=out:csv&sheet=preview';
let outputCSV = '';

if (previewParams = true) {
  outputCSV = previewCSV;
  outputCTitle = previewTitle;
} else {
  outputCSV = detailedCSV;
  outputCTitle = detailsTitle;
}

// eslint-disable-next-line no-unused-vars
const config = {
  style: 'mapbox://styles/mapbox/outdoors-v11',
  accessToken:
    'pk.eyJ1IjoibWF4YnVydG8iLCJhIjoiY2t5MHZwNnI2MDU1bjJ2cGUwYXhqYndpbCJ9.31g_YC48d2c_HDyPD_XhUA',
  CSV: outputCSV,
  center: [-122.335126, 47.640467],
  zoom: 11,
  defaultFilter: {
    CampaignId: filterParams,
    preview: previewParams
  },
  title: outputCTitle,
  description:
    'This map shows the families and seniors who our volunteers support every week by using their bikes to deliver groceries to them for our partner food banks. You can search by address to sort the list below by distance. You can also filter the list by group or solo route and if the deliver is to a house or apartment. Once you signup to volunteer a link to the fully delivery details will be emailed to you.',
  sideBarInfo: ['Client Name', 'Address', 'Phone'],
  popupInfo: {
      title: 'Client Name',
      bags: 'Bag or Box',
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
      columnHeader: 'location-type', // Case sensitive - must match spreadsheet entry
      listItems: ['House', 'Interior apartment', 'Apartment with an outside facing door', 'Food Bank'], // Case sensitive - must match spreadsheet entry; This will take up to six inputs but is best used with a maximum of three;
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
};
