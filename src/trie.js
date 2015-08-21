
function isString(word) {
  return Object.prototype.toString.call(word) === '[object String]';
}

var TrieNode = {
};

var Trie = {
  insert: function (word) {
    if (! isString(word)) {
      throw new TypeError('word must be a string');
    }

    if (! word.length) {
      throw new Error('word has no length');
    }

    if (! this._root) {
      this._root = {};
    }

    var currNode = this._root;
    var length = word.length;
    for (var i = 0; i < length; ++i) {
      var letter = word.charAt(i);
      if (! (letter in currNode)) {
        var newNode = Object.create(TrieNode);
        newNode.letter = letter;
        currNode[letter] = newNode;
      }
      currNode = currNode[letter];
    }

    currNode.leaf = true;
  },

  find: function (word) {
    if (! isString(word)) {
      throw new TypeError('word must be a string');
    }

    if (! word.length) {
      throw new Error('word has no length');
    }

    if (! this._root) {
      return false;
    }

    var currNode = this._root;
    var length = word.length;
    for (var i = 0; i < length; ++i) {
      var letter = word.charAt(i);
      if (! (letter in currNode)) {
        return false;
      }
      currNode = currNode[letter];
    }
    return !! currNode.leaf;
  }
};

module.exports = Trie;
