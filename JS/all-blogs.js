const contentToPage = document.querySelector(".carousel-container") 

const url = `https://nikolaireedlarsen.no/wp-json/wp/v2/posts?_embed=true&per_page=100`
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
                    <div class="image-container"><a href="single-blog.html?id=${post.id}"><img src="${imgDetails.source_url}" alt="${imgDetails.alt_text}" class"slide-pic"></a></div>
                    <div class="card-info">
                        <h2>${post.title.rendered}</h2>
                        ${imgDetails.caption.rendered}
                    </div>
                </div>
            `
            contentToPage.innerHTML += newDiv;
        }
        
    }
}


// ! Carousel
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let counter = 0;
const size = (260 + 40) * 4;

nextBtn.addEventListener("click", () =>{
    counter ++ ; 
    contentToPage.style.transform = "translateX(" + (-size * counter) + "px)";
    if(counter > 2) {
        counter = 0
        contentToPage.style.transform = "translateX(0px)";
    }
    console.log( counter)
})

prevBtn.addEventListener("click", () =>{
    counter -- ; 
    contentToPage.style.transform = "translateX(" + (size * counter) + "px)";
    if(counter <= 1) {
        contentToPage.style.transform = "translateX(" + (-size * counter) + "px)";
    }
    if(counter <= 0){
        counter = 0;
        contentToPage.style.transform = "translateX(0px)";
    }
    console.log( counter)
})



