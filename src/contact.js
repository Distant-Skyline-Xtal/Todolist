export function createContact() {
    const content = document.querySelector("#content");
    
    const contactText = document.createElement("p");
    contactText.textContent = "Contact Page";
    content.appendChild(contactText);
}