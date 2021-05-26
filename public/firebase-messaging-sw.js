importScripts('https://www.gstatic.com/firebasejs/8.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.5.0/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyBUiHpINxie7OV1Rx_wfFybKtBoyJV-N8g",
    authDomain: "pwitter-19436.firebaseapp.com",
    databaseURL: "https://pwitter-19436-default-rtdb.firebaseio.com/",
    projectId: "pwitter-19436",
    storageBucket: "pwitter-19436.appspot.com",
    messagingSenderId: "1089970872567",
    appId: "1:1089970872567:web:30396cfe1f2e05893a73f2",
    measurementId: "G-G6BFZ76B52"
};

firebase.initializeApp(firebaseConfig);
const messaging=firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log(payload);
    const notification=JSON.parse(payload);
    const notificationOption={
        body:notification.body,
        icon:notification.icon
    };
    return self.registration.showNotification(payload.notification.title,notificationOption);
});