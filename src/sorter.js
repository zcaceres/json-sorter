'use strict';

var sourceJSON = [
  {
    name: 'Rolling Stones',
    members: ['Mick Jagger', 'Keith Moon'],
    yearsActive: 1979
  },
  {
    name: 'Cream',
    members: ['Eric Clapton', 'Ginger Baker'],
    yearsActive: 1979
  },
];

function setup(sourceJSON) {
  var stringJSON = JSON.stringify(sourceJSON);
  sourceJSON = flatten(JSON.parse(stringJSON));
}

function flatten(json) {
  var needToFlatten = true;
  while (needToFlatten) {
    json = flattenArr(json);
    needToFlatten = containsObject(json);
  }
  return json;
}

function containsObject(arr) {
  return arr.some(el => Object.keys(el).some(k => typeof el[k] === 'object'));
}

function flattenArr(json) {
  var newArray = json.map(item => {
    var newObj = {};
    Object.keys(item).forEach(key => {
      if (typeof item[key] === 'object') {
        Object.keys(item[key]).forEach(innerKey => {
          newObj[`${key}_${innerKey}`] = item[key][innerKey];
        });
      } else {
        newObj[key] = item[key];
      }
    });
    return newObj;
  });
  return newArray;
}

function keysContainInput(obj, input) {
  return Object.keys(obj).some((el) => {
    return el.toString().toLowerCase().includes(input);
  });
}

function valsContainInput(obj, input) {
  return Object.keys(obj).some((el) => {
    return obj[el].toString().toLowerCase().includes(input);
  });
}

function filterUserInput(e) {
  var currVal = e.target.value.toLowerCase();
  while (layout.firstChild) {
    layout.removeChild(layout.firstChild);
  }
  if (!e.target.value) {
    return;
  }
  var resultArr = sourceJSON.filter(obj => {
    return keysContainInput(obj, currVal) || valsContainInput(obj, currVal)
  });
  resultArr.forEach((res) => {
    var resultStringified = (typeof res !== 'string' && typeof res !== 'number') ? JSON.stringify(res) : res;
    var p = document.createElement('p');
    layout.appendChild(p);
  });
}

function registerEventListeners() {
  document.getElementById('filterByInput').addEventListener('input', filterUserInput);
}

var layout = document.getElementById('filteredData');
var trie = setup(sourceJSON);
registerEventListeners();
