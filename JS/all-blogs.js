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
const container = document.querySelector(".container")

let counter = 0;
const size = (260 + 80);
const reset = "translateX(0px)" 


nextBtn.addEventListener("click", () =>{
    counter ++ ; 
    const moveCarousel = `translateX(${-size * counter}px)`
    contentToPage.style.transform = moveCarousel;
        if(container.clientWidth === 1403 && counter > 8){ 
            counter = 0
            contentToPage.style.transform = reset
        }else if(container.clientWidth === 1060 && counter > 9){ 
            counter = 0
            contentToPage.style.transform = reset
        }else if(container.clientWidth === 720 && counter > 10){ 
            counter = 0
            contentToPage.style.transform = reset
        }else if(container.clientWidth <= 380 && counter > 11){ 
            counter = 0
            contentToPage.style.transform = reset
        }
    console.log( container.clientWidth)
})

prevBtn.addEventListener("click", () =>{
    const moveCarousel = `translateX(${-size * counter}px)`
    counter -- ; 
    contentToPage.style.transform = moveCarousel;
    if(counter <= 0){
        counter = 0;
        contentToPage.style.transform = reset;
    }
    console.log( counter)
})



