export function createAbout() {
    const content = document.querySelector("#content");
    
    const contactText = document.createElement("p");
    contactText.textContent = "About Page";
    content.appendChild(contactText);
}