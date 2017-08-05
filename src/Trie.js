// Slightly modified from implementation by yonatanmn
// [https://gist.github.com/yonatanmn/bff1b8dd80fc549da08d209f8917faa4]
//
// Modifications:
//  - Completions are not excluded when they are first finished
//  - The output array is an array of objects rather than of strings/keys

function goto(o, wp) {
  if (!wp.length) {
    return o;
  }

  var firstLetter = wp[0];
  var point = o[firstLetter];

  return point
    ? goto(point, wp.slice(1))
    : {};
}

var objSym = Symbol.for('obj');

var TrieProto = {
  insert: function(w, obj) {
    var point = this.tree;

    w.split('').forEach(function(e, i) {
      if (!point[e]) {
        point[e] = {};
      }
      point = point[e];
      if (w.length - 1 === i) {
        if (!point[objSym]) {
          point[objSym] = [];
        }
        point[objSym].push(obj);
      }
    });
  },

  autoComplete: function(wp) {
    var point = goto(this.tree, wp);
    var stack = [];

    if (point[objSym]) {
      stack.push(point[objSym]);
    }

    function reduceObjToArr(o, trace) {
      for(var k in o) {
        if (o[k][objSym]) {
          stack.push(o[k][objSym]);
        }
        reduceObjToArr(o[k], trace + k);
      }
    }

    reduceObjToArr(point, '');

    return stack;
  }
};

var TrieDesc = {
  tree: {
    value: {},
    enumerable: true
  }
};

function createTrie() {
  return Object.create(TrieProto, TrieDesc);
}
