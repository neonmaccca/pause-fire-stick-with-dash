module.exports = {
  dashButton: {
    interface: null,
    //Dash Button Mac
    mac: null
  },
  androidDevice: {
    IP: null,
    adbCmd: null
    //you can send key codes to play and pause the media playing etc
    //"adb shell input keyevent 85" will play/pause whatever media is currently playing
    //you also use monkey to launch activities
    //below just launches an app
    //"adb shell monkey -p org.jw.jwlibrary.mobile -c android.intent.category.LAUNCHER 1"
    //below will rick roll
    //"adb am start -a android.intent.action.VIEW -d "http://www.youtube.com/watch?v=YRhFSWz_J3I"

  }
}
