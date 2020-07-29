import * as firebase from 'firebase';
import 'firebase/auth'

let firebaseConfig = {
    apiKey: "AIzaSyBykILYecr1d_8BcviPR9vhGjd8J6go8ig",
    authDomain: "travelry-business.firebaseapp.com",
    databaseURL: "https://travelry-business.firebaseio.com",
    projectId: "travelry-business",
    storageBucket: "travelry-business.appspot.com",
    messagingSenderId: "321864740565",
    appId: "1:321864740565:web:b620e5a52a30084f573c5c"
};

try {
    firebase.initializeApp(firebaseConfig);
}
catch(err){

}
export default firebase;
