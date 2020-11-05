const query = document.querySelector("#queries");
const dbRefKey = firebase.database().ref("queries").orderByKey();
dbRefKey.once("value")
  .then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      let key = childSnapshot.key;
      query.innerHTML += childSnapshot.val().email  + ": " + "<br>";
      query.innerHTML += childSnapshot.val().message + "<br>" + "<hr>";
  });
});

const dbRef = firebase.database().ref("queries");
document.getElementById("add_enquiry").addEventListener("submit", submitform);

function submitform(e){
    e.preventDefault();
    const nameV = getInputVal("name");
    const emailV = getInputVal("email");
    const subjectV = getInputVal("subject");
    const messageV = getInputVal("message");

    saveQuery(nameV,emailV,subjectV,messageV);

    document.getElementById("add_enquiry").reset();
}

function getInputVal(id){
    return document.getElementById(id).value;
}

function saveQuery(nameV,emailV,subjectV,messageV){

    if(nameV === '' || emailV === '' || subjectV === '' || messageV === ""){
        alert("Field cannot be empty");
    }
    else if(nameV.length < 5){
        alert("Name should have at least 5 char.");
    }
    else if(subjectV.length < 15){
        alert("Subject should have at least 15 char.");
    }
    else if(messageV.length < 50){
        alert("Message should have at least 50 char.");
    }
    else {
        let newQueryRef = dbRef.push();
        newQueryRef.set({
            name: nameV,
            email: emailV,
            subject: subjectV,
            message: messageV
        });
        alert("Message has been sent");
    }
}