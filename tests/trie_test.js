var Trie = require('../src/trie');
var assert = require('chai').assert;

describe('Trie', function () {
  var trie;

  beforeEach(function () {
    trie = Object.create(Trie);
  });


  describe('find', function () {
    it('returns false if no items have been added', function () {
      assert.isFalse(trie.find('a'));
    });
  });

  describe('insert/find', function () {
    it('inserts an item into the list, find finds it', function () {
      trie.insert('a');
      trie.insert('aardvaark');
      trie.insert('bro');
      trie.insert('bromance');
      trie.insert('brother');

      assert.isTrue(trie.find('a'));
      assert.isTrue(trie.find('aardvaark'));
      assert.isFalse(trie.find('aa'));
      assert.isFalse(trie.find('aardvaar'));
      assert.isFalse(trie.find('aardvaarks'));
      assert.isFalse(trie.find('aardvaars'));

      assert.isTrue(trie.find('bro'));
      assert.isTrue(trie.find('bromance'));
      assert.isTrue(trie.find('brother'));
      assert.isFalse(trie.find('b'));
      assert.isFalse(trie.find('brot'));
      assert.isFalse(trie.find('brothers'));
    });
  });

  describe('traverse', function () {
    it('returns all items in the list', function () {
      trie.insert('bro');
      trie.insert('aardvaark');
      trie.insert('a');
      trie.insert('brother');
      trie.insert('bromance');

      var results = trie.traverse();
      assert.equal(results.length, 5);
      assert.notEqual(results.indexOf('a'), -1);
      assert.notEqual(results.indexOf('aardvaark'), -1);
      assert.notEqual(results.indexOf('bro'), -1);
      assert.notEqual(results.indexOf('brother'), -1);
      assert.notEqual(results.indexOf('bromance'), -1);
    });
  });
});

