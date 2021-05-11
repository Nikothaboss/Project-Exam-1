const getQS = document.location.search;
const params = new URLSearchParams(getQS);
const id = params.get("id");
console.log(id);

const url = `https://nikolaireedlarsen.no/wp-json/wp/v2/posts/${id}?_embed=true`;

const contentToPage = document.querySelector(".single-blog-container");

fetch(url, {
    "method": "GET",  
})
.then(response => response.json())
.then(data => singleBlogTemplate(data)) 
.catch(err =>{
    console.error(err)
}) 

const singleBlogTemplate =(blog)=>{
    console.log(blog)
    document.title = blog.title.rendered;
    let images = blog._embedded["wp:featuredmedia"];
    let newDiv = ``;
    for(image of images){
    console.log(image.media_details.sizes.medium.source_url)    
    newDiv += `
        <div class="img-container">
            <img src="./img/stark-logo.png">
            <div class="post-info">
                <div class="author">
                    <i class="fas fa-user fa-2x"></i>
                    <p>Author: ${blog._embedded.author[0].name}</p>
                </div>
                <div class="posted-time">
                    <i class="fas fa-clock fa-2x"></i>
                    <p>Date: ${blog.date}</p>
                </div>
            </div>
        </div>
        <div class="content content-${blog.slug}">
        <img src="${image.source_url}" alt="${image.alt_text}" class="single-post-img single-post-img-${blog.slug}">
        <h1>${blog.title.rendered}</h1>
        ${blog.content.rendered}
        </div>
    `
    }

    contentToPage.innerHTML += newDiv;

    
}
