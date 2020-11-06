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
    uploadTask.on('state_changed',function(snapshot){
         let progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
         console.log("upload is "+progress+" done");
    },function(error){
      console.log(error.message);
    },() => {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
           dbRef.push().set({
                 title: titleV,
                 body: bodyV,
                 counter: 10000 - counter,
                 imageURL:downloadURL
           },function(error){
               if(error){
                   window.alert("Error while uploading");
               }else{
                   window.alert("Successfully uploaded");
                   document.getElementById('add_blog').reset();
               }
           });
        });
    });

}

const queryTitle = document.querySelector("#messages");
const dbRefTitle = firebase.database().ref("blogs").orderByKey();

dbRefTitle.on("value", blogs => {
        blogs.forEach((singleBlog) => {
            let key = singleBlog.key;

            queryTitle.innerHTML = "<div style='text-align:center'>" + singleBlog.val().title + "</div>";
        });
});