# nprocess

[![Build Status](https://api.travis-ci.org/nolimitid/nprocess.png?branch=master)](http://travis-ci.org/nolimitid/nprocess)


## Installation

Install with npm:

```sh
npm install --save nprocess
```


## Usage

### run single command

```js
var nprocess = require('../nprocess')
nprocess
  .run('echo something')
  .then(console.log)
// 'something'
```

### run multiple commands

```js
var nprocess = require('../nprocess')
var commands = [
  "echo hey",
  "echo ho",
  "echo let's go",
]
return nprocess
  .runMulti(commands)
  .then(console.log)
// [ 'hey', 'ho', 'let\'s go' ]
```


## Testing

From the repo root:

```sh
npm install
npm test
```
