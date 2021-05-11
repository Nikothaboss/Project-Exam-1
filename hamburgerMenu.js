const hamburgerIcon = document.querySelector(".hamburger-icon")
const hamburgerMenu = document.querySelector(".hamburger-menu")
const body = document.querySelector("body")

hamburgerIcon.addEventListener("click", ()=>{
    hamburgerMenu.classList.toggle("hamburger-menu-active")
    body.classList.toggle("overflow-hidden")
})

if(hamburgerMenu.classList === "hamburger-menu hamburger-menu-active"){
    hamburgerIcon.innerHTML = ""
}