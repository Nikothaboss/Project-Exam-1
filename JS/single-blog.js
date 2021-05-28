const getQS = document.location.search;
const params = new URLSearchParams(getQS);
const id = params.get("id");


const url = `https://nikolaireedlarsen.no/wp-json/wp/v2/posts/${id}?_embed=true`;

const contentToPage = document.querySelector(".single-blog-container");
const modal = document.querySelector(".modal");
const loading =  document.querySelector(".loading");
// const body = document.querySelector("body") <-- Body er hentet i hamburgerMenu.js så trenger ikke hente den på nytt



fetch(url, {
    "method": "GET",  
})
.then(response => response.json())
.then(data => singleBlogTemplate(data)) 
.catch(err =>{
    console.error(err)
}) 
.finally(()=>loading.style.display = "none")



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
    modal.innerHTML += `<img src="${image.source_url}" alt="${image.alt_text}" class="modal-img modal-img-${blog.slug}">`
    }

    contentToPage.innerHTML += newDiv;
    
}

const modalFunc = () =>{
    modal.style.display = "flex"
    body.classList.add("overflow-hidden")
    document.documentElement.scrollTop = 0; //scroll til topp - Chrome, Firefox, IE and Opera
    // document.body.scrollTop = 0; // Scroll til topp - Safari
}

modal.addEventListener("click", ()=>{
    document.body.scrollTop = 0;
    modal.style.display = "none"
    body.classList.remove("overflow-hidden")
})









