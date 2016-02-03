/*! nprocess v0.0.0 - MIT license */

'use strict';

/**
 * Module dependencies
 */

var MProcess = require("mprocess")
var ThrottleInstance = new (require("throttle-exec"))(10)
var Promise = require("bluebird")
var underscore = require("underscore")

/**
 * Module exports
 */

function callScript(processArgs){
  return new Promise(function(resolve,reject){
    var code = null
    var output = "" 
    var after = underscore.after(2, function(){
      if(code == 0){
        var n = output.length-1
        output = (output[n]==='\n') ? output.slice(0, n) : output
        resolve(output)
      }else{
        reject(new Error("Error on executing script : "+code.code))
      }
    })
    var realArgs = processArgs.slice(0)
    var cmdStr = realArgs[0]
    var cmdArgs = realArgs.slice(1)
    var instance = new MProcess(cmdStr, cmdArgs, MProcess.SPAWN, { cwd : __dirname })
    instance.run()
    instance
      .getProcess()
      .stdout
      .on("data",function(out){
        output += out.toString()
      })
      .on("close",function(){
        after()
      })
    instance
      .done(function(c){
        code = c
        after()
      })  
  })
}

function run (command){
  var processArgs = command.split(' ')
  return callScript(processArgs)
}

function runMulti (commands){
  var proms = commands
    .map(function (command) {
      return run(command)
    })
  return Promise.all(proms)
}


ThrottleInstance.registerFunction("run", run)
ThrottleInstance.registerFunction("runMulti", runMulti)
module.exports = {
  run: function (str) {
    return ThrottleInstance.registerAction("run", [str])
  },
  runMulti: function (str) {
    return ThrottleInstance.registerAction("runMulti", [str])
  }, 
}

/**
 * @param {}
 * @return {}
 * @api public
 */
