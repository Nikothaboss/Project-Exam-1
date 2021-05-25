const getQS = document.location.search;
const params = new URLSearchParams(getQS);
const id = params.get("id");


const url = `https://nikolaireedlarsen.no/wp-json/wp/v2/posts/${id}?_embed=true`;

const contentToPage = document.querySelector(".single-blog-container");
const imgModal = document.querySelector(".modal-container");



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
    document.title = "GoB" + " | " + blog.title.rendered;
    let images = blog._embedded["wp:featuredmedia"];
    let newDiv = ``;
    for(image of images){   
    newDiv += `
        
    <div class="img-container">
    <h1>${blog.title.rendered}</h1>
    <img src="${image.source_url}" alt="${image.alt_text}" onClick="modalFunc()" class="single-post-img single-post-img-${blog.slug}">
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
        <h1 class="single-post-title-sm-scr">${blog.title.rendered}</h1>
        
        
        ${blog.content.rendered}
        </div>
    `
    }

    contentToPage.innerHTML += newDiv;
    
}

const modalFunc = () =>{
    const plsFunk = document.querySelector(".single-post-img");
    console.log(plsFunk)
}







