const enquiry = document.querySelector('#enquiry_list');
const form = document.querySelector('#add_enquiry');

function renderEnquiry(doc) {
    let li = document.createElement('li');
    let name = document.createElement('div');
    let email = document.createElement('div');
    let subject = document.createElement('div');
    let message = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent =doc.data().name;
    email.textContent =doc.data().email;
    subject.textContent =doc.data().subject;
    message.textContent =doc.data().message;

    li.appendChild(email);
    li.appendChild(message);
    

    enquiry.appendChild(li);
}

db.collection('enquiries').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderEnquiry(doc); 
    });
});

//Saving data

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('enquiries').add({
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value
    });
    form.name.value ='';
    form.email.value ='';
    form.subject.value ='';
    form.message.value ='';
});