export class AddProjectDisplay {

    #overlayDiv;
    #popupDiv;
    #projectForm;
    nameInput;
    #nameLabel;

    descriptionInput;
    #descriptionLabel;

    #buttonsHolder;
    createButton;
    cancelButton;

    createPopup() {
        let content = document.querySelector("#content");
        this.#overlayDiv = document.createElement("div");
        this.#overlayDiv.id = "overlay";
        this.#popupDiv = document.createElement("div");
        this.#popupDiv.id = "popup";
        this.#overlayDiv.appendChild(this.#popupDiv);
        this.#popupDiv.textContent = "Create New Project";

        // Create Form
        this.#projectForm = document.createElement("form");
        this.#projectForm.setAttribute("id", "addProjectForm");
        this.#projectForm.setAttribute("method", "");

        // Create label and input for project name
        this.#nameLabel = document.createElement("label");
        this.#nameLabel.setAttribute("for", "projectName");
        this.#nameLabel.textContent = "Name: ";
        
        this.nameInput = document.createElement("input");
        this.nameInput.setAttribute("type", "text");
        this.nameInput.setAttribute("name", "projectName");
        this.nameInput.setAttribute("required", "");

        // Create label and input for description
        this.#descriptionLabel = document.createElement("label");
        this.#descriptionLabel.setAttribute("for", "projectDesc");
        this.#descriptionLabel.textContent = "Description: ";
        
        this.descriptionInput = document.createElement("input");
        this.descriptionInput.setAttribute("type", "text");
        this.descriptionInput.setAttribute("name", "projectDesc");
        this.descriptionInput.setAttribute("required", "");

        //Create Buttons
        this.#buttonsHolder = document.createElement("div");
        this.#buttonsHolder.classList.add("button-holder");

        this.createButton = document.createElement("button");
        this.createButton.classList.add("button-text");
        this.createButton.textContent = "Create Project";

        this.cancelButton = document.createElement("button");
        this.cancelButton.classList.add("button-text");
        this.cancelButton.textContent = "Cancel";

        content.appendChild(this.#overlayDiv);
        this.#popupDiv.appendChild(this.#projectForm);
        this.#projectForm.appendChild(this.#nameLabel);
        this.#projectForm.appendChild(this.nameInput);
        this.#projectForm.appendChild(this.#descriptionLabel);
        this.#projectForm.appendChild(this.descriptionInput);
        this.#popupDiv.appendChild(this.#buttonsHolder);
        this.#buttonsHolder.appendChild(this.cancelButton);
        this.#buttonsHolder.appendChild(this.createButton);

        this.cancelButton.addEventListener("click", () => {this.deletePopup();});
    }

    deletePopup() {
        let content = document.querySelector("#content");
        let overlay = document.querySelector("#overlay");
        content.removeChild(overlay);
    }
}