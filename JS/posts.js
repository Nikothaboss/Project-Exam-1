const contentToPage = document.querySelector(".posts-container");
const viewMoreBtn = document.querySelector(".view-more")

let url = `https://nikolaireedlarsen.no/wp-json/wp/v2/posts?_embed=true&per_page=8`
let url2 = `https://nikolaireedlarsen.no/wp-json/wp/v2/posts?_embed=true&per_page=12`
document.title = "Exam | Nikolai"

fetch(url, {
    "method": "GET",  
})
.then(response => response.json())
.then(data => standardTemplate(data)) 
.catch(err =>{
    console.error(err)
}) 

const standardTemplate=(posts)=>{
    for(post of posts){
        let newDiv = ``;
        console.log(post);
        let media = post._embedded["wp:featuredmedia"];
        for(imgDetails of media){
            newDiv +=`
            <div class="card ${post.slug}">
                <div class="image-container"><a href="single-blog.html?id=${post.id}"><img src="${imgDetails.source_url}" alt="${imgDetails.alt_text}" class="z-index-high"></a></div>
                <div class="card-dark-fade-bg">
                <a href="single-blog.html?id=${post.id}"><p></p></a> 
                </div>
                <div class="card-info">
                    <h2>${post.title.rendered}</h2>
                    <div class="card-content">
                        ${imgDetails.caption.rendered}
                        <a href="single-blog.html?id=${post.id}" class="read-more-btn">Read More</a>
                    </div>
                </div>
            </div>
        `
            contentToPage.innerHTML += newDiv;
        }  
    }
}

viewMoreBtn.addEventListener("click", () =>{
    fetch(url2, {
        "method": "GET",  
    })
    .then(response => response.json())
    .then(contentToPage.innerHTML = "")
    .then(data => standardTemplate(data)) 
    .catch(err =>{
        console.error(err)
    }) 
})