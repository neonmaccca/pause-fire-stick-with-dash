var config = require('./config/config.js')
var dashAdb = require('./controller/app.js')

config.arpDash.interface = 3
config.arpDash.mac = "ac:63:be:08:c1:7a"
config.android.IP = "192.168.0.102"
config.android.adbCmd = "adb shell input keyevent 85"

dashAdb.initialize()
dashAdb.listen()
