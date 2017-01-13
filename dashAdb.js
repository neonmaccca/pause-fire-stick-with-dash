var dashAdb = require('./controller/app.js')

dashAdb.configure({
  dashButtonInterface: 3,
  dashButtonMac: "ac:63:be:08:c1:7a",
  androidDeviceIP: "192.168.0.102",
  adbCommand: "adb shell input keyevent 85"
})

dashAdb.initialize()
dashAdb.listen()
