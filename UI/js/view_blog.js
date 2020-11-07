const queryBlog = document.querySelector("#view_blog");

firebase.database()
        .ref("blogs/")
        .on('value', function(snapshot) {
            let id = snapshot.key;

            //----------OR----------//
            const data = snapshot.val() || null;
            if (data) {
              const id = Object.keys(data)[0];
              console.log(id);
            }
        });
/* function view_post(key){
    firebase.database().ref("blogs/" +key)
    .on("value",snapshot =>{
        snapshot.forEach((childSnapshot)=>{
            queryBlog.innerHTML += `
            <article id="main-col">
                <h2 class="page-title">${childSnapshot.val().title}</h2>
                <img class="card__image" style="height: 180px;"  src="${childSnapshot.val().imageURL}" alt="">
                <p>${childSnapshot.val().body}</p><hr>

                <h1>Comments</h1>
                <p>Nice article, various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p><hr>
                <form class="quote">
                    <div>
                        <textarea placeholder="Comments"></textarea>
                    </div>
                    <button class="button_1" type="submit">Send</button>
                </form>
            </article>`;
        })

    });
} */