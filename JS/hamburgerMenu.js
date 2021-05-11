const hamburgerIcon = document.querySelector(".hamburger-icon")
const hamburgerMenu = document.querySelector(".hamburger-menu")
const body = document.querySelector("body")
const header = document.querySelector("header")

hamburgerIcon.addEventListener("click", ()=>{
    hamburgerMenu.classList.toggle("hamburger-menu-active")
    hamburgerIcon.classList.toggle("hamburger-animation")
    body.classList.toggle("overflow-hidden")
  
})

