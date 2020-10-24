var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BD5SpCmPZ1lmd86Bp5mAiELBPTMF8p6dbW4L3EY_pS6jy8P75X1Au_G4ZfXMaGSLVyClyt6S0MVVmTbcXow8YMY",
   "privateKey": "BOGUiC2_lOANZXgzj82Z0QgyvZpXS_V89W7q2wvakfs"
};

webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/c4MtqqDs7xc:APA91bF691tgKBOnoxGyxaibM2Qp9N4q9H1zp24F48uz5p5ZEJ7U1xQT-BOjdCccGYW5iYCGTRcriIaYUyoMJHsbPIFsmwv4xO-mdtMwOJRk4OygOFhv5R_pNzh8JJEPxjJUPN5zn5ug",
   "keys": {
       "p256dh": "BFqg0dgxG1IeSweYUNricfk1pbd1kSadN+JCNprHQyTTVom6kXIwYXl51N82mSuwvSDLk+9Ean6mESRht/a2CPQ=",
       "auth": "bXolPnXSZG92o3Dt/zS7rw=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '244682837569',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);