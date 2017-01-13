var exec = require('child_process').exec,
    waterfall = require('async-waterfall'),
    arpdash = require("arp-dash"),
    config = require('../config/config.js'),
    time = 0

function docmd(command){
  var cmd = exec(command);
  cmd.on('close', function() {
      console.log("done with "+command)
  })
}

function killServer(callBack) {
    docmd('adb kill-server')
    callBack()
}

function tcpip(callBack) {
    docmd('adb tcpip 5555')
    callBack()
}

function connect(callBack) {
    docmd('adb connect ' + config.android.IP + ':5555')
    callBack()
}

function sendADBCommand(command){
  console.log("sent command "+command)
  docmd(config.android.adbCmd)
}

function controller() {
    var devices = exec('adb devices')
    devices.stdout.on('data', function(data) {
        if (data.search(config.android.IP) == -1) {
            waterfall([killServer,
                tcpip,
                connect
            ], function(err, result) {
                console.log(result)
            })
        }
    })
}

//controller()

function listen(){
  arpdash.listen(config.arpDash, function(data) {
      if (time == 0) {
          time = Math.floor(Date.now() / 1000)
          sendADBCommand(config.android.adbCmd)
      } else {
          var newTime = Math.floor(Date.now() / 1000)
          if ((newTime - time) > 6) {
              sendADBCommand(config.android.adbCmd)
          }else{
            console.log("dealing with duplicate arps")
          }
          time = newTime
      }
  });
}


exports.initialize = controller
exports.listen = listen
