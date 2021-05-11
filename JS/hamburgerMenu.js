const hamburgerIcon = document.querySelector(".hamburger-icon")
const hamburgerMenu = document.querySelector(".hamburger-menu")
const hamurgerLinks = document.querySelectorAll(".hamburger-links li")
const body = document.querySelector("body")

hamburgerIcon.addEventListener("click", ()=>{
    hamburgerMenu.classList.toggle("hamburger-menu-active")
    hamburgerIcon.classList.toggle("hamburger-animation")
    body.classList.toggle("overflow-hidden")

    // * Animate links
    hamurgerLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = "";
        } else{
            link.style.animation = `hamburgerLinkFade 0.5s ease forwards ${index / 7 +0.3}s`;
        }
    });
  
})

