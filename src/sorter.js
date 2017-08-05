'use strict';

var sourceJSON = [
  {
    title: 'Mailchimp configuration',
    price: 120,
    time: 3,
    tags: ['mailchimp', 'setup', 'easy']
  },
  {
    title: 'Error in mailing list',
    price: 20,
    time: 1,
    tags: ['mailchimp', 'bugs']
  },
  {
    title: 'Newsletter Setup Mailchimp',
    price: 100,
    time: 5,
    tags: ['mailchimp', 'squarespace']
  },
  {
    title: 'Broken Signup form',
    price: 120,
    time: 3,
    tags: ['mailchimp', 'setup', 'easy']
  },
  {
    title: 'Button CSS',
    price: 40,
    time: 2,
    tags: ['css', 'design', 'wordpress']
  },
];

function setup(sourceJSON) {
  var stringJSON = JSON.stringify(sourceJSON);
  var jsonArr = flatten(JSON.parse(stringJSON));
  console.log(jsonArr);
  var trie = createTrie();
  jsonArr.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      var val = obj[key].toString().toLowerCase();
      // console.log(obj[key], val);
      trie.insert(val, obj);
    });
  });
  return trie;
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

function filterUserInput(e) {
  var currVal = e.target.value.toLowerCase();
  while (layout.firstChild) {
    layout.removeChild(layout.firstChild);
  }
  if (!e.target.value) {
    return;
  }
  var resultArr = trie.autoComplete(currVal);
  resultArr.forEach((res) => {
    var resultStringified = (typeof res !== 'string' && typeof res !== 'number') ? JSON.stringify(res) : res;
    var li = document.createElement('li');
    var p = document.createElement('p');
    p.innerHTML = resultStringified;
    li.appendChild(p);
    layout.appendChild(li);
  });
}

function registerEventListeners() {
  document.getElementById('filterByInput').addEventListener('input', filterUserInput);
}

var layout = document.getElementById('filteredData');
var trie = setup(sourceJSON);
registerEventListeners();
