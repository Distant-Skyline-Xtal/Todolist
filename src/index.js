import { createHomePage } from "./homepage.js";
import { createAbout } from "./about.js";
import { createMenu } from "./menu.js";
import { createContact } from "./contact.js";
import "./style.css";


function clearBody() {
    const body = document.querySelector("#content");
    while(body.firstChild) { 
        body.removeChild(body.lastChild);
    }
}

clearBody();
createHomePage();


const buttons = Array.from(document.querySelectorAll("button"));

for (const btn of buttons) {
    btn.addEventListener("click", (event) => {
        clearBody();
        if (event.target.textContent === "Home") {
            createHomePage();
        }
        else if (event.target.textContent === "About") {
            createAbout();
        }
        else if (event.target.textContent === "Menu") {
            createMenu();
        }
        else {
            createContact();
        }
    });
}




