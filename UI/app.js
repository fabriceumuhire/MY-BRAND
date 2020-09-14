const enquiry = document.querySelector('.cards');
const frame = document.querySelector('#enquiry_frame');
const form = document.querySelector('#add_enquiry');

function renderEnquiry(doc) {
    let li = document.createElement('li');
    let title = document.createElement('div');
    let body = document.createElement('div');
    let myFile = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    title.textContent =doc.data().title;
    body.textContent =doc.data().body;
    myFile.textContent =doc.data().myFile;

    li.appendChild(title);

    enquiry.appendChild(li);
}

db.collection('blogs').get().then((Snapshot) => {
    Snapshot.forEach((doc) => {
        var data = doc.data();
        var id = doc.id;
        document.getElementsByClassName("card__content")[0].innerHTML += title;
        });
});

//Saving data

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('blogs').add({
        title: form.title.value,
        body: form.body.value,
        myFile: form.myFile.value
    });
    form.title.value ='';
    form.body.value ='';
    form.myFile.value ='';
});