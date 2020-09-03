const enquiry = document.querySelector('#enquiry_list');
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


    li.appendChild(myFile);
    

    enquiry.appendChild(li);
}

db.collection('blogs').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderEnquiry(doc); 
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