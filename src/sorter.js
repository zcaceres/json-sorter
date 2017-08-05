'use strict';

var sourceJSON = [
  {
    id: '0001',
    type: 'donut',
    name: 'Cake',
    ppu: 0.55,
    batters: {
      batter: [
        {
          id: '1001',
          type: 'Regular'
        }, {
          id: '1002',
          type: 'Chocolate'
        }, {
          id: '1003',
          type: 'Blueberry'
        }, {
          id: '1004',
          type: 'Devil\'s Food'
        }
      ]
    },
    topping: [
      {
        id: '5001',
        type: 'None'
      }, {
        id: '5002',
        type: 'Glazed'
      }, {
        id: '5005',
        type: 'Sugar'
      }, {
        id: '5007',
        type: 'Powdered Sugar'
      }, {
        id: '5006',
        type: 'Chocolate with Sprinkles'
      }, {
        id: '5003',
        type: 'Chocolate'
      }, {
        id: '5004',
        type: 'Maple'
      }
    ]
  }, {
    id: '0002',
    type: 'donut',
    name: 'Raised',
    ppu: 0.55,
    batters: {
      batter: [
        {
          id: '1001',
          type: 'Regular'
        }
      ]
    },
    topping: [
      {
        id: '5001',
        type: 'None'
      }, {
        id: '5002',
        type: 'Glazed'
      }, {
        id: '5005',
        type: 'Sugar'
      }, {
        id: '5003',
        type: 'Chocolate'
      }, {
        id: '5004',
        type: 'Maple'
      }
    ]
  }, {
    id: '0003',
    type: 'donut',
    name: 'Old Fashioned',
    ppu: 0.55,
    batters: {
      batter: [
        {
          id: '1001',
          type: 'Regular'
        }, {
          id: '1002',
          type: 'Chocolate'
        }
      ]
    },
    topping: [
      {
        id: '5001',
        type: 'None'
      }, {
        id: '5002',
        type: 'Glazed'
      }, {
        id: '5003',
        type: 'Chocolate'
      }, {
        id: '5004',
        type: 'Maple'
      }
    ]
  }
];

function setup(sourceJSON) {
  var stringJSON = JSON.stringify(sourceJSON);
  var jsonArr = JSON.parse(stringJSON);
  var trie = createTrie();
  jsonArr.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      trie.insert(key.toLowerCase(), obj[key]);
    });
  });
  return trie;
}

function filterUserInput(e) {
  var currVal = e.target.value.toLowerCase();
  // while (layout.removeChild) {
  //   layout.removeChild(layout.firstChild);
  // }
  // console.log('currval', currVal, 'event', event);
  var resultArr = trie.autoComplete(currVal);
  resultArr.forEach(res => {
    var li = document.createElement('li');
    li.innerHTML = res;
    layout.appendChild(li);
  })
  console.log(resultArr);
}

function registerEventListeners() {
  document.getElementById('filterByInput').addEventListener('input', filterUserInput);
}

var layout = document.getElementById('filteredData');
var trie = setup(sourceJSON);
registerEventListeners();
