const dbRef = firebase.database().ref("blogs");
let counter = 0;
document.getElementById("add_blog").addEventListener("submit", submitblog);

function submitblog(e){
    e.preventDefault();

    const imageV = document.getElementById("myFile").files[0];
    const titleV = document.getElementById("title").value;
    const bodyV = document.getElementById("body").value;

    let imageName=imageV.name;
    let storageRef=firebase.storage().ref('images/'+imageName);
    let uploadTask=storageRef.put(imageV);
    uploadTask.on('state_changed', snapshot =>{
         let progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
         console.log("upload is "+progress+" done");
    },error => {
      console.log(error.message);
    },() => {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
            counter++;
           dbRef.push().set({
                 title: titleV,
                 body: bodyV,
                 counter: 10000 - counter,
                 imageURL:downloadURL
           }, error => {
               if(error){
                   window.alert("Error while uploading");
               }else{
                   window.alert("Blog successfully uploaded");
                   document.getElementById('add_blog').reset();
               }
           });
        });
    });
}