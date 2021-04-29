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
        <img src="${image.media_details.sizes.medium.source_url}" alt="${image.alt_text}>
        ${blog.content.rendered}
    `
    }

    contentToPage.innerHTML += newDiv;

    
}
