function ChainableRegex(re) {
  if(re instanceof ChainableRegex) {
    this.lhs = re;
  } else if(re instanceof RegExp) {
    this.lhs = re;
  } else if(typeof re == 'string') {
    this.lhs = new RegExp(re);
  } else {
    throw new TypeError("Must pass a RegExp");
  }

  this.rhs = null;
  this.operation = null;
  this.or = function(rhs) {
    var re = new ChainableRegex(this);
    re.rhs = new ChainableRegex(rhs);
    re.operation = 'or';
    return re;
  }
  this.and = function(rhs) {
    var re = new ChainableRegex(this);
    re.rhs = new ChainableRegex(rhs);
    re.operation = 'and';
    return re;
  }
  this.nand = function(rhs) {
    var re = new ChainableRegex(this);
    re.rhs = new ChainableRegex(rhs);
    re.operation = 'nand';
    return re;
  }
  this.nor = function(rhs) {
    var re = new ChainableRegex(this);
    re.rhs = new ChainableRegex(rhs);
    re.operation = 'nor';
    return re;
  }
  this.not = function() {
    var re = new ChainableRegex(this);
    if(arguments.length > 0) return this.nand(arguments[0]);
    re.operation = 'not';
    return re;
  }
  this.test = function(arg) {
    if(this.operation === null) {
      return this.lhs.test(arg);
    }
    if(this.operation == 'not') {
      return !this.lhs.test(arg);
    }
    if(this.operation == 'and') {
      return this.lhs.test(arg) && this.rhs.test(arg);
    }
    if(this.operation == 'nand') {
      return !(this.lhs.test(arg) && this.rhs.test(arg));
    }
    if(this.operation == 'or') {
      return this.lhs.test(arg) || this.rhs.test(arg);
    }
    if(this.operation == 'nor') {
      return !(this.lhs.test(arg) || this.rhs.test(arg));
    }
  }
};

module.exports = ChainableRegex;
