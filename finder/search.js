// Search initialization
function registerSearch(dataset) {
  const searchWrapper = document.querySelector('.search-wrapper');
  const inputBox = searchWrapper.querySelector('input');
  const listings = document.querySelector('.listings').getElementsByClassName('item');
  const noResults = document.getElementById('listing-none');

  inputBox.oninput = function () {
    const userInput = this.value;
    let results = dataset.map((elem) => elem.properties.id)
    if (userInput.length > 0) {
      results = getResults(userInput, config.search_fields, dataset);
    }

    if (results.length == 0) {
      noResults.classList.remove('no-search-match');
    } else {
      noResults.classList.add('no-search-match');
    } 

    for (i = 0; i < listings.length; i++) {
      let item_id = listings[i].getAttribute('id').split('-')[1];

      if (item_id == 'none') {
        continue;
      } else {
        item_id = Number(item_id);
      }

      if (results.includes(item_id)) {
        listings[i].classList.remove('no-search-match');
      } else {
        listings[i].classList.add('no-search-match');
      }
    }
  };
}

// Returns a list of results matching specified key and satisfying filter functions
// Assumes 'dataset' is an array of Features objects from csv2json
function getResults(key, search_fields, dataset) {
  const results = [];
  for (i = 0; i < dataset.length; i++) {
    for (field of search_fields) {
      if (fuzzySearch(dataset[i].properties[field], key)) {
        results.push(item.properties.id);
        break;
      }
    }
  }
  return results;
}

// Returns boolean for whether key fuzzily matches the phrase.
// "Fuzzy" means the key characters exist, in sequence, but not necessarily without
//   interruption, in the phrase.
// Adapted from https://stackoverflow.com/a/15252131
function fuzzySearch(phrase, key) {
    var hay = phrase.toLowerCase(), i = 0, n = -1, l;
    key = key.toLowerCase();
    for (; l = key[i++] ;) if (!~(n = hay.indexOf(l, n + 1))) return false;
    return true;
};
