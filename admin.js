        // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBIRRiFPxqQ1dRhjIAg0gzzQo7PfYCuSo8",
    authDomain: "tech-u-blog.firebaseapp.com",
    databaseURL: "https://tech-u-blog.firebaseio.com",
    projectId: "tech-u-blog",
    storageBucket: "tech-u-blog.appspot.com",
    messagingSenderId: "1029044573579",
    appId: "1:1029044573579:web:cfa5c2820cedb2dbb94b8e",
    measurementId: "G-FGBVGDH3YL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function login(){
    var userEmail = document.getElementById("email").value;
    var userPass = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(userEmail, UserPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: " + errorMessage);
        // ...
      });
}