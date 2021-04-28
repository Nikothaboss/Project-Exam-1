const contentToPage = document.querySelector(".container") 
const url = `https://nikolaireedlarsen.no//wp-json/wp/v2/posts?_embed=true`

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
            console.log(imgDetails.source_url)
            newDiv +=`
                <img src="${imgDetails.source_url}" >
                <h3>${post.title.rendered}</h3>
            `
            contentToPage.innerHTML += newDiv;
        }
        
    }

}