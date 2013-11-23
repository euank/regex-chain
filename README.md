regex-chain
===========

Chain regexes together in nodejs

Installation
------------

`npm install regex-chain`

Usage
-----

    var RegexChain = require('regex-chain');
    var containsNumbers = new RegexChain(/[0-9]/);
    var containsLetters = new RegexChain(/[a-zA-Z]/);
    console.log("asdf09 contains letters and numbers: " + containsLetters.and(containsNumbers).test("asdf09"));
    console.log("asdf contains letters and numbers: " + containsLetters.and(containsNumbers).test("asdf"));


Todo
----
 - Generate some documentation. For now, just skim the unit tests or code
 - Allow more than just `.test` method. `exec` would be the best one



