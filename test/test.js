var expect = require('chai').expect
var Promise = require('bluebird')
var nprocess = require('../nprocess')

describe('nprocess', function () {

  it('run()', function () {
    return nprocess
      .run([
        'node',
        './resource/fixtures/fib.js',
        '10'
      ])
      .then(function(result){
        expect(result).to.equal('55')
      })
  })

  it('runMulti()', function () {
    var commands = [
      ['node', './resource/fixtures/fib.js', '30'],
      ['node', './resource/fixtures/fib.js', '31'],
      ['node', './resource/fixtures/fib.js', '32'],
      ['node', './resource/fixtures/fib.js', '33'],
      ['node', './resource/fixtures/fib.js', '34'],
    ]
    var answers = [ '832040', '1346269', '2178309', '3524578', '5702887' ]
    return nprocess
      .runMulti(commands)
      .then(function (result) {
        result.forEach(function (item, idx) {
          expect(item).to.equal(answers[idx])
        })
      })
  })

  it('runMulti()', function () {
    return nprocess
      .run(['node', './resource/fixtures/printargs.js', '30 asd'])
      .then(function (result) {
        expect('30 asd').to.equal(result)
      })
  })

})
