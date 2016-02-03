var expect = require('chai').expect
var Promise = require('bluebird')
var nprocess = require('../nprocess')

describe('nprocess()', function () {

  it('run single instance', function () {
    return nprocess
      .run('node ./resource/fixtures/fib.js 10')
      .then(function(result){
        expect(result).to.equal('55')
      })
  })

  it('run multiple instance', function () {
    var params = [ '30', '31', '32', '33', '34']
    var answers = [ '832040', '1346269', '2178309', '3524578', '5702887' ]
    var proms = params
      .map(function (param) {
        return nprocess.run('node ./resource/fixtures/fib.js '+param)
      })
    return Promise.all(proms)
      .then(function (result) {
        result.forEach(function (item, idx) {
          expect(item).to.equal(answers[idx])
        })
      })
  })

})
