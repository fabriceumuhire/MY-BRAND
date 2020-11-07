const queryBlog = document.querySelector("#blog");
const dbRefTitle = firebase.database().ref("blogs").orderByKey();

dbRefTitle.on("value", snapshot => {
    snapshot.forEach((childSnapshot) => {
        let key = childSnapshot.key;

        queryBlog.innerHTML +=`
            <div class="card">
                <img class="card__image" src="${childSnapshot.val().imageURL}" alt="">
                <div class="card__content">
                    <p>
                        ${childSnapshot.val().title}
                    </p>
                </div>
                <div class="card__info">
                    <div>
                        <i class="material-icons">thumb_up</i>
                    </div>
                    <div>
                        <a href="./update_blog.html" class="card__link update">Update</a>
                    </div>
                    <div>
                        <a href="#" class="card__link" id="${key}" onclick="delete_post(this.id)";>Delete</a>
                    </div>
                    <div>
                        <a href="./view_article.html" class="card__link">View Article</a>
                    </div>
                </div>
            </div>`;
    });
});

function delete_post(key){
    firebase.database().ref("blogs/" +key).remove();
    window.alert("Blog deleted successfully");
}