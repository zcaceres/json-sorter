'use strict';

var sourceJSON = [
  {
    title: 'Mailchimp configuration',
    price: 120,
    time: 3,
    tags: ['mailchimp', 'setup', 'easy'],
    people: {
      client: 'John Smith',
      expert: 'Charlie'
    }
  },
  {
    title: 'Error in mailing list',
    price: 20,
    time: 1,
    tags: ['mailchimp', 'bugs'],
    people: {
      client: 'Great Consulting',
      expert: 'Charlie'
    }
  },
  {
    title: 'Newsletter Setup Mailchimp',
    price: 100,
    time: 5,
    tags: ['mailchimp', 'squarespace'],
    people: {
      client: 'Ashley Koff',
      expert: 'Charlie'
    }
  },
  {
    title: 'Broken Signup form',
    price: 120,
    time: 3,
    tags: ['mailchimp', 'setup', 'easy'],
    people: {
      client: 'Do You Remember',
      expert: 'Charlie'
    }
  },
  {
    title: 'Button CSS',
    price: 40,
    time: 2,
    tags: ['design', 'wordpress'],
    people: {
      client: 'Jane Smith',
      expert: 'Charlie'
    }
  },
];

function setup(sourceJSON) {
  var stringJSON = JSON.stringify(sourceJSON);
  sourceJSON = flatten(JSON.parse(stringJSON));
  // var trie = createTrie();
  // jsonArr.forEach((obj) => {
  //   Object.keys(obj).forEach((key) => {
  //     var val = obj[key].toString().toLowerCase();
  //     // console.log(obj[key], val);
  //     trie.insert(val, obj);
  //   });
  // });
  // return trie;
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
  // console.log('obj', obj)

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
  })
  // var resultArr = trie.autoComplete(currVal);
  resultArr.forEach((res) => {
    var resultStringified = (typeof res !== 'string' && typeof res !== 'number') ? JSON.stringify(res) : res;
    var p = document.createElement('p');
    var h2 = document.createElement('h2');
    var h3 = document.createElement('h3');
    p.innerHTML = 'Tags: ' + res.tags;
    h2.innerHTML = res.title;
    h3.innerHTML = 'Price: ' + res.price;
    layout.appendChild(h2);
    layout.appendChild(h3);
    layout.appendChild(p);
  });
}

function registerEventListeners() {
  document.getElementById('filterByInput').addEventListener('input', filterUserInput);
}

var layout = document.getElementById('filteredData');
var trie = setup(sourceJSON);
registerEventListeners();
