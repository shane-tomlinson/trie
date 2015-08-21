
function isString(word) {
  return Object.prototype.toString.call(word) === '[object String]';
}

function TrieNode (letter) {
  this.children = {};
  this.letter = letter;
}

var Trie = {
  _root: null,

  insert: function (word, root, value) {
    if (! isString(word)) {
      throw new TypeError('word must be a string');
    }

    if (! word.length) {
      throw new Error('word has no length');
    }

    if (! this._root) {
      this._root = new TrieNode();
    }

    root = root || this._root;
    value = value || word;

    var letter = word.charAt(0);
    var nextNode = root.children[letter];
    if (! nextNode) {
      nextNode = new TrieNode(letter);
      root.children[letter] = nextNode;
    }

    if (word.length === 1) {
      nextNode.value = value;
    } else {
      var rest = word.slice(1);
      this.insert(rest, nextNode, value);
    }
  },

  find: function (word, root) {
    if (! isString(word)) {
      throw new TypeError('word must be a string');
    }

    if (! word.length) {
      throw new Error('word has no length');
    }

    if (! this._root) {
      return false;
    }

    root = root || this._root;

    var letter = word.charAt(0);
    var nextNode = root.children[letter];
    if (! nextNode) {
      return false;
    }

    if (word.length === 1) {
      return !! nextNode.value;
    } else {
      var rest = word.slice(1);
      return this.find(rest, nextNode);
    }
  },

  traverse: function (accumulator, root) {
    if (! this._root) {
      return [];
    }

    accumulator = accumulator || [];
    root = root || this._root;

    if (root.value) {
      accumulator.push(root.value);
    }

    for (var letter in root.children) {
      var nextNode = root.children[letter];
      this.traverse(accumulator, nextNode);
    }

    return accumulator;
  }
};

module.exports = Trie;
