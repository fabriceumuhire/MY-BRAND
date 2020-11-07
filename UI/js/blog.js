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
                        <a href="./view_article.html" class="card__link" id="${key}" onclick="view_post(this.id)">View Article</a>
                    </div>
                </div>
            </div>`;
    });
});