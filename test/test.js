var CRegExp = require("../index");
var should = require('should');

describe('ChainableRegex', function(){
  describe('test', function(beforeExit, assert) {
    it('should work with simple regex', function() {
      var cr = new CRegExp(/asdf/);
      cr.test("asdf").should.be.true;
      cr.test("asdfasdf").should.be.true;
      cr.test("fsda").should.be.false;
    });
  });
  describe('constructor', function(be, assert) {
    it('should construct from string regexes', function() {
      var cr = new CRegExp("\\(a\\+\\)\\^[0-9]");
      cr.test('(a+)^0').should.be.true;
      cr.test('aaa0').should.be.false;
    });
    it('should construct from its own type', function() {
      var cr = new CRegExp("\\(a\\+\\)\\^[0-9]");
      var cr2 = new CRegExp(cr);
      cr.test('(a+)^0').should.be.true;
      cr2.test('aaa0').should.be.false;
    });
  });
  describe('and', function(beforeExit, assert) {
    it('should work with simple regexes', function() {
      var cr = new CRegExp(/^a/).and(/b$/)
      cr.test("ab").should.be.true;
      cr.test("abutnotendingwithbee").should.be.false;
      cr.test("notstartingwitha").should.be.false;
    });
  });

  describe('or', function(beforeExit, assert) {
    it('should or two things', function(){
      var cr = new CRegExp(/^a/).or(/b$/)
      cr.test("ab").should.be.true;
      cr.test("a").should.be.true;
      cr.test("b").should.be.true;
      cr.test("c").should.be.false;
      cr.test("c").should.be.false;
    });
  });

  describe('not', function(beforeExit, assert) {
    it('should not single regexes', function(){
      var cr = new CRegExp(/^a/).not();
      cr.test("ab").should.be.false;
      cr.test("b").should.be.true;
    });
    // This 'should' description is horribly confusing
    it('should not and regexes', function() {
      // !(a && b)
      var cr = new CRegExp(/^a/).and(/b$/).not();
      cr.test("ab").should.be.false;
      cr.test("a").should.be.true;
      cr.test("c").should.be.true;
    });
    it('should not or regexes', function(){
      // !(a || b)
      var cr = new CRegExp(/^a/).or(/b$/).not();
      cr.test("ab").should.be.false;
      cr.test("a").should.be.false;
      cr.test("c").should.be.true;
    });
    it('should not and+or regexes', function(){
      // !(a && asdf || fsda)
      var cr = new CRegExp(/^a/).and(/asdf/).or(/fsda/).not();
      cr.test('asdf').should.be.false;
      cr.test('fsda').should.be.false;
      cr.test('basdf').should.be.true;
      cr.test('c').should.be.true;
    });
    it('should default to and with arg', function() {
      var cr = new CRegExp(/^a/).not(/asdf/);
      cr.test("abcd").should.be.true;
      cr.test("asdf").should.be.false;
    });
  });
  describe('nand', function(beforeExit, assert) {
    it('should work for simple regexes', function() {
      var cr = new CRegExp(/^a/).nand(/b$/);
      cr.test("abcd").should.be.true;
      cr.test("cdab").should.be.true;
      cr.test("asdb").should.be.false;
    });
    it('should work for chained regexes', function() {
      var cr1 = new CRegExp(/^a/).and(/b$/);
      var cr2 = new CRegExp(/^.a/).or(/b.$/);
      var cr = cr1.nand(cr2);
      // It does not both (start with a and end with b), (have a as the second to first or last character)
      cr.test("asdb").should.be.true;
      cr.test("aabb").should.be.false;
      cr.test("acbb").should.be.false;
      cr.test("zazz").should.be.true;
    });
  });

  describe('nor', function(beforeExit, assert) {
    it('should work for simple regexes', function() {
      var cr = new CRegExp(/^a/).nor(/b$/);
      cr.test('ab').should.be.false;
      cr.test('as').should.be.false;
      cr.test('db').should.be.false;
      cr.test('zz').should.be.true;
    });
  });
});
