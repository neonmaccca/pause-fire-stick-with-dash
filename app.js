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

function killServer(callBack) {
    var kill = exec('adb kill-server');
    kill.stdout.on('data', function(data) {
        result += 'Kill server result \n'
        result += data
    })
    kill.on('close', function() {
        if (result == '') {
            result += 'Kill server done \n'
        }
        if (callBack) {
            callBack(null)
        }
    })
}

function tcpip(callBack) {
    var tcpip = exec('adb tcpip 5555')
    tcpip.stdout.on('data', function(data) {
        result += 'tcpip result \n'
        result += data
    })
    tcpip.stdout.on('close', function(data) {
        if (callBack) {
            callBack(null)
        }
    })
}

function connect(callBack) {
    var connectIP = exec('adb connect ' + ip + ':5555')
    connectIP.stdout.on('data', function(data) {
        result += 'connect result \n'
        result += data
    })
    connectIP.stdout.on('close', function(data) {
        if (callBack) {
            callBack(null)
        }
    })
}

function sendKey85(callBack) {
    var sendKeys = exec('adb shell input keyevent 85')
    sendKeys.stdout.on('close', function(data) {
        if (callBack) {
            callBack(null)
        }
    })
}

function monkeyDo(callBack) {
    setTimeout(function() {
        var sendKeys = exec('adb shell monkey -p ' + activity + ' -c android.intent.category.LAUNCHER 1')
        sendKeys.stdout.on('close', function(data) {
            if (callBack) {
                callBack(null, result)
            }
        })
    }, 1000)
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
