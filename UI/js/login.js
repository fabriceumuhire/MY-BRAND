firebase.auth().onAuthStateChanged((user) => {
      window.user = user;
  });
  document.querySelector('#submit').addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
      return new Promise((resolve,reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((res) => {
          resolve(res);
          console.log("Logged in");
          window.location = "../admin_blog.html";
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email"){
            window.alert("Enter correct email");
        }
        if (error.code === "auth/user-not-found"){
            window.alert("Email not found");
        }
        if (error.code === "auth/wrong-password"){
          window.alert("Wrong Password");
          }
        if (error.code === "auth/network-request-failed"){
            window.alert("Please try again")
        }
      console.log(error.message);
      });
  });
});