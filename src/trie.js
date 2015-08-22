'use strict';

function isString(word) {
  return Object.prototype.toString.call(word) === '[object String]';
}

class TrieNode {
  constructor () {
    this.children = new Map();
  }
}

class Trie {
  constructor() {
    this._root = new TrieNode();
  }

  insert (word, root, value) {
    if (! isString(word)) {
      throw new TypeError('word must be a string');
    }

    if (! word.length) {
      throw new Error('word has no length');
    }

    root = root || this._root;
    value = value || word;

    var letter = word.charAt(0);
    var nextNode = root.children.get(letter);
    if (! nextNode) {
      nextNode = new TrieNode();
      root.children.set(letter, nextNode);
    }

    if (word.length === 1) {
      nextNode.value = value;
    } else {
      var rest = word.slice(1);
      this.insert(rest, nextNode, value);
    }
  }

  find (word, root) {
    if (! isString(word)) {
      throw new TypeError('word must be a string');
    }

    if (! word.length) {
      throw new Error('word has no length');
    }

    root = root || this._root;

    var letter = word.charAt(0);
    var nextNode = root.children.get(letter);
    if (! nextNode) {
      return false;
    }

    if (word.length === 1) {
      return !! nextNode.value;
    } else {
      return this.find(word.slice(1), nextNode);
    }
  }

  traverse (accumulator, root) {
    accumulator = accumulator || [];
    root = root || this._root;

    if (root.value) {
      accumulator.push(root.value);
    }

    root.children.forEach((nextNode, letter) => {
      this.traverse(accumulator, nextNode)
    }, this);

    return accumulator;
  }
};

module.exports = Trie;
