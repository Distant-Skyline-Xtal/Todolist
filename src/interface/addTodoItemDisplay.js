export class AddTodoItemDisplay {

    #overlayDiv;
    #popupDiv;
    #todoItemForm;
    nameInput;
    #nameLabel;

    descriptionInput;
    #descriptionLabel;

    #priorityLabel;
    priorityOptions;

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
        this.#popupDiv.textContent = "Create New Todo Item";

        // Create Form
        this.#todoItemForm = document.createElement("form");
        this.#todoItemForm.setAttribute("id", "addProjectForm");
        this.#todoItemForm.setAttribute("method", "");

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


        // Create priority dropdown
        this.#priorityLabel = document.createElement("label");
        this.#priorityLabel.setAttribute("for", "priority");
        this.#priorityLabel.textContent = "Priority: ";

        let options = ["Low", "Medium", "High"];
        this.priorityOptions = document.createElement("select");
        this.priorityOptions.setAttribute("id", "priority");
        this.priorityOptions.setAttribute("name", "priority");
        
        for(let option of options) {
            let optionElement = document.createElement("option");
            optionElement.setAttribute('value', option);
            optionElement.text = option;
            this.priorityOptions.appendChild(optionElement);
        }

        //Create Buttons
        this.#buttonsHolder = document.createElement("div");
        this.#buttonsHolder.classList.add("button-holder");

        this.createButton = document.createElement("button");
        this.createButton.classList.add("button-text");
        this.createButton.textContent = "Create Todo Item";

        this.cancelButton = document.createElement("button");
        this.cancelButton.classList.add("button-text");
        this.cancelButton.textContent = "Cancel";

        content.appendChild(this.#overlayDiv);
        this.#popupDiv.appendChild(this.#todoItemForm);
        this.#todoItemForm.appendChild(this.#nameLabel);
        this.#todoItemForm.appendChild(this.nameInput);
        this.#todoItemForm.appendChild(this.#descriptionLabel);
        this.#todoItemForm.appendChild(this.descriptionInput);
        this.#todoItemForm.appendChild(this.#priorityLabel);
        this.#todoItemForm.appendChild(this.priorityOptions);


        this.#popupDiv.appendChild(this.#buttonsHolder);
        this.#buttonsHolder.appendChild(this.cancelButton);
        this.#buttonsHolder.appendChild(this.createButton);

        this.cancelButton.addEventListener("click", () => {this.deletePopup();});
    }

    deletePopup() {
        let content = document.querySelector("#content");
        content.removeChild(this.#overlayDiv);
    }
}