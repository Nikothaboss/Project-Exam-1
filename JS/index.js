const contentToPage = document.querySelector(".carousel-container") ;
const loading = document.querySelector(".loading");

const url = `https://nikolaireedlarsen.no/wp-json/wp/v2/posts?_embed=true&per_page=100`;
document.title = "Exam | Nikolai";

fetch(url, {
    "method": "GET",  
})
.then(response => response.json())
.then(data => standardTemplate(data)) 
.catch(err =>{
    console.error(err);
}) 
.finally(()=>loading.style.display = "none");

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
            `;
            contentToPage.innerHTML += newDiv;
        }  
    }
};


// ! Carousel
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const container = document.querySelector(".container");


const size = (260 + 80);
const reset = "translateX(0px)";
let counter = 0;



nextBtn.addEventListener("click", () =>{
    counter ++ ; 
    contentToPage.style.transform = `translateX(${(-size*counter)}px)`;
        if(container.clientWidth === 1743 && counter > 7){ 
            counter = 0;
            contentToPage.style.transform = reset;
        }else if(container.clientWidth === 1400 && counter > 8){ 
            counter = 0;
            contentToPage.style.transform = reset;
        }else if(container.clientWidth === 1060 && counter > 9){ 
            counter = 0;
            contentToPage.style.transform = reset;
        }else if(container.clientWidth === 720 && counter > 10){ 
            counter = 0;
            contentToPage.style.transform = reset;
        }else if(container.clientWidth <= 380 && counter > 11){ 
            counter = 0;
            contentToPage.style.transform = reset;
        }
});

prevBtn.addEventListener("click", () =>{
    counter -- ; 
    contentToPage.style.transform = `translateX(${(-size*counter)}px)`;
    if(counter <= 0){
        counter = 0;
        contentToPage.style.transform = reset;
    }
});



