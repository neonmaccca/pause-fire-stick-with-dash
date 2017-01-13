var exec = require('child_process').exec,
    waterfall = require('async-waterfall'),
    arpdash = require("arp-dash")
    arpdash = require("arp-dash"),
    opts = {
        interface: 3,
        mac: "ac:63:be:08:c1:7a"
    },
    count = 0,
    time = 0,
    errors = [],
    ip = '192.168.0.102',
    result = '',
    activity = 'org.jw.jwlibrary.mobile',
    tasks = [killServer,
        tcpip,
        connect
    ]


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
    docmd('adb connect ' + ip + ':5555')
    callBack()
}

function sendKey85(callBack) {
    docmd('adb shell input keyevent 85')
    if(callBack){
      callBack()
    }
}

function monkeyDo(callBack) {
    docmd('adb shell monkey -p ' + activity + ' -c android.intent.category.LAUNCHER 1')
    if(callBack){
      callBack()
    }

}

function controller() {
    var devices = exec('adb devices')
    devices.stdout.on('data', function(data) {
        if (data.search(ip) == -1) {
            waterfall(tasks, function(err, result) {
                console.log(result)
            })
        }
    })
}

controller()

arpdash.listen(opts, function(data) {
    if (time == 0) {
        time = Math.floor(Date.now() / 1000)
        sendKey85()
        monkeyDo()
        console.log("arp one")
    } else {
        var newTime = Math.floor(Date.now() / 1000)
        console.log(newTime - time)
        if ((newTime - time) > 6) {
            sendKey85()
        }
        time = newTime
    }
});
