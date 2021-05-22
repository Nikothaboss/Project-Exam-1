const contentToPage = document.querySelector(".posts-container");
const viewMoreBtn = document.querySelector(".view-more")
const sortNameDes = document.querySelector(".sort-A-Z")
const sortNameAsc = document.querySelector(".sort-Z-A")


let numOfPosts = 8;
let url = `https://nikolaireedlarsen.no/wp-json/wp/v2/posts?_embed=true&per_page=8`
let viewMoreUrl = `https://nikolaireedlarsen.no/wp-json/wp/v2/posts?_embed=true&per_page=4&offset=${numOfPosts}`
let twelvePostsUrl = `https://nikolaireedlarsen.no/wp-json/wp/v2/posts?_embed=true&per_page=12`
document.title = "Exam | Nikolai"

const fetchData = (queryString, funcToRun, param = "") =>{
    fetch(queryString, {
        "method": "GET",
    })
    .then(response => response.json())
    .then(data => funcToRun(data, param)) 
    .catch(err =>{
        console.error(err)
    }) 
}


let delPrevContent = false
// ! Default template
const standardTemplate=(posts)=>{
    if(delPrevContent === true){contentToPage.innerHTML = ""}
    for(post of posts){
        let newDiv = ``;
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
fetchData(url, standardTemplate)

// ! Sorted Template
const sortedTemplate=(posts, sortBy)=>{
    if(delPrevContent === true){contentToPage.innerHTML = ""}
    posts.sort(sortBy)
    for(post of posts){
        let newDiv = ``;
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

let isSorted = false
let viewMoreClicked = false

//  ! Sorteringer
sortNameAsc.addEventListener("click", () =>{
    isSorted = true

    delPrevContent = true
    fetchData(url, sortedTemplate, sortByName)
   

    if(viewMoreClicked === true){
        fetchData(twelvePostsUrl, sortedTemplate, sortByName)
    }

    }
)


// ! View More
viewMoreBtn.addEventListener("click", () =>{
    numOfPosts += 4;
    viewMoreClicked = true;

    fetchData(viewMoreUrl, standardTemplate)

    if(isSorted === true){
        delPrevContent = true
        fetchData(twelvePostsUrl, sortedTemplate, sortByName)
    }
    
    if(numOfPosts >= 12){
        viewMoreBtn.style.display = "none"
    }
})





// ! Sorteringsfunksjoner
const sortByName =(a,b)=>{
    var name1 = a.title.rendered.toUpperCase()
    var name2 = b.title.rendered.toUpperCase()
    if(name1 < name2) return -1;
    if(name1 > name2) return 1;
    else return 0;
}