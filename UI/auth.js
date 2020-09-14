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

const auth = firebase.auth();
function signIn(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email.value,password.value);
    promise.then(function(user) {
        window.location = "./view_blog.html";
    })
    promise.catch(e => alert(e.message));
}