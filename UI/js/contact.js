const query = document.querySelector("#queries");
let counter = 0;
const dbRefKey = firebase.database().ref("queries").orderByChild('counter');
dbRefKey.on("value", snapshot => {
    snapshot.forEach((childSnapshot) => {

        counter++;
        let key = childSnapshot.key;
        query.innerHTML += "<p style='font-weight:bold;'>" + childSnapshot.val().email  + ": " + "</p>";
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

    saveQuery(counter, nameV,emailV,subjectV,messageV);

    document.getElementById("add_enquiry").reset();
}

function getInputVal(id){
    return document.getElementById(id).value;
}

function saveQuery(counter,nameV,emailV,subjectV,messageV){

    if(nameV === '' || emailV === '' || subjectV === '' || messageV === ""){
        document.getElementById('message').style.display = "block";
        document.getElementById('message').innerHTML = "Field cannot be blank";
    }
    else if(nameV.length < 5){
        document.getElementById('message_name').style.display = "block";
        document.getElementById('message_name').innerHTML = "Enter at least 5 char.";
    }
    else if(subjectV.length < 15){
        document.getElementById('message_subject').style.display = "block";
        document.getElementById('message_subject').innerHTML = "Enter at least 15 char.";
    }
    else if(messageV.length < 50){
        document.getElementById('message').style.display = "block";
        document.getElementById('message').innerHTML = "Enter at least 50 char.";
    }
    else {
        let newQueryRef = dbRef.push();
        newQueryRef.set({ 
            counter: 10000 - counter,
            name: nameV,
            email: emailV,
            subject: subjectV,
            message: messageV
        });
        alert("Message has been sent");
    }
}