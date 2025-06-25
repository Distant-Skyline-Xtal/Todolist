export function createMenu() {
    const content = document.querySelector("#content");
    
    const contactText = document.createElement("p");
    contactText.textContent = "Menu Page";
    content.appendChild(contactText);
}