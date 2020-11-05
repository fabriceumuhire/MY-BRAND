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

function delete_post(key){
    firebase.database().ref('blogs/'+key).remove();
    console.log("Post deleted")
}


const query = document.querySelector("#blog");
const dbRefBlog = firebase.database().ref("blogs").orderByKey();

dbRefBlog.on("value", blogs => {
    /* if(blogs.exists()){
        let blogHTML = ""; */
        blogs.forEach(singleBlog => {
            let key = singleBlog.key;

            query.innerHTML += singleBlog.val().body;
            /* blogHTML += "<div class='card'>";
                blogHTML += "<div> <img width = 500 height = 220 />";
                    blogHTML += blogs.val.imageURL;
                blogHTML += "</div>";
                blogHTML += "<div style='text-align:justify'>";
                    blogHTML += blogs.val().body;
                blogHTML += "</div>";
            blogHTML += "</div>"; */
        });
});







/* 
dbRefKey.once("value")
  .then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      let key = childSnapshot.key;
      query.innerHTML += "<p>" + childSnapshot.val().title;
  });
}); */
