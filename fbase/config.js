const admin = require('firebase-admin');
var cron = require('node-cron');

var serviceAccount = require("{firebase-adminsdk file path}");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore =  admin.firestore();

// 00초 00분 00시 일 월 요일
cron.schedule('0 0 0 * * *', function(){
  // 0:0:0 마다 스케줄
  console.log("cron is working now!")

  const userDocRef = firestore.collection('users')

  const snapshot = userDocRef.get();
  snapshot.then(ref => {
    ref.forEach(doc => {
      var oldValue = doc.get('point');
      var addValue = doc.get('today');
      
      userDocRef.doc(doc.id).update({
        today: 0,
        point: oldValue + addValue
      }); // update
      
      console.log(doc.id, 'has been updated by cron...!');

    }); // forEach
  }); // then

}); // cron

module.exports = firestore;