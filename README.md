# pause-fire-stick-with-dash
This started out a script to talk to a fire stick but has since become a standard script to send adb commands to any android device over tcpip when a dash button is pressed.

#How to use
npm install
node dashAdb.js

#Note
This repo includes the adb binary for windows only.
If you have the Android SDK installed or the adb tools bundle and your PATH variable is set to include links to adb then you
should not need to use a binary in the project root.

#configure
Dead simple configuration.
Just replace the properties with your own and a custom adb command.
On first run it takes up to 10 seconds to be ready for dash button clicks.

```
var dashAdb = require('./controller/app.js')

dashAdb.configure({
  dashButtonInterface: 3,
  dashButtonMac: "ac:63:be:08:c1:7a",
  androidDeviceIP: "192.168.0.102",
  adbCommand: "adb shell input keyevent 85"
})

dashAdb.initialize()
dashAdb.listen()
```
