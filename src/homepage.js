import backgroundImageSrc from "./images/japan-alleyway.jpg";

export function createHomePage() {
    const body = document.querySelector("#content");

    const heroImage = document.createElement("div");
    heroImage.classList.add("hero-iamge");
    body.appendChild(heroImage);

    const backgroundImg = document.createElement("img");
    backgroundImg.classList.add("hero-image");
    backgroundImg.src = backgroundImageSrc;
    backgroundImg.alt = "Japan alleyway at night";
    heroImage.appendChild(backgroundImg);
    
    const headerContainer = document.createElement("div");
    headerContainer.classList.add("header-container");
    const header = document.createElement("h1");
    header.textContent = "Traditional Food from Osaka";
    headerContainer.appendChild(header);
    heroImage.appendChild(headerContainer);
    
    const intro = document.createElement("div");
    intro.classList.add("intro");
    const introText = document.createElement("p");
    introText.classList.add("body-text");
    introText.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum eum velit magni eaque illum fuga saepe assumenda modi deleniti dignissimos? In iste odit voluptatum minus vel. Nisi neque eligendi in!";
    intro.appendChild(introText);
    body.appendChild(intro);
}