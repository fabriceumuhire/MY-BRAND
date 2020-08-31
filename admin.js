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

const email = document.getElementById("email");
const password = document.getElementById("password");
const login = document.getElementById("login");

login.addEventListener('click', e => {
    const email = email.value;
    const pass = password.value;
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(message));
})