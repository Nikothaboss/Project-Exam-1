const contentToPage = document.querySelector(".container") 
const url = `https://nikolaireedlarsen.no/wp-json/wp/v2/posts?_embed=true`
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
            console.log(imgDetails.media_details.sizes.medium)
            newDiv +=`
                <h3>${post.title.rendered}</h3>
                <a href="single-blog.html?id=${post.id}"><img src="${imgDetails.media_details.sizes.medium.source_url}"></a>
                
            `
            contentToPage.innerHTML += newDiv;
        }
        
    }

}