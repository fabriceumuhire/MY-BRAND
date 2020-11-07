const queryBlog = document.querySelector("#blog");
queryBlog.addEventListener("click", e => {
    updateBlog(e);
});

function updateBlog(e){
    let updateNode = e.target.parentNode;

    if(e.target.classList.contains("update")) {
        titleV.value = updateNode.querySelector("title").innerText;
        imageV.value = updateNode.querySelector("imageURL")
        bodyV.value = updateNode.querySelector("body").innerText;
        key.value = updateNode.key;
    }
}