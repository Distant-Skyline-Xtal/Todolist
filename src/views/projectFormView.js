export class ProjectFormView {

    constructor() {
        this.eventHandlers = {};
    }

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

    handleClick(event) {
        const target = event.target;
        if (target.matches('.create-project-btn')) {
            console.log("clicked create project button");
            const title = this.nameInput.value;
            const description = this.descriptionInput.value;
            if (this.eventHandlers.onProjectCreate) {
                console.log("invoking onProjectCreate");
                this.eventHandlers.onProjectCreate(title, description);
            }
        }
        else if (target.matches('.cancel-btn')) {
            this.eventHandlers.onCancel();
        }
    }

    render() {
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
        this.createButton.classList.add("create-project-btn");
        this.createButton.textContent = "Create Project";

        this.cancelButton = document.createElement("button");
        this.cancelButton.classList.add("button-text");
        this.cancelButton.classList.add("cancel-btn");
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

        this.setupEventDelegation();
        return this.#overlayDiv;
    }

    setupEventDelegation() {
        this.#overlayDiv.addEventListener("click", (event) => {
            this.handleClick(event);
        });
    }


    removePopup() {
        let content = document.querySelector("#content");
        let overlay = document.querySelector("#overlay");
        content.removeChild(overlay);
    }

    onProjectCreate(handler) {this.eventHandlers.onProjectCreate = handler;}
    onCancel(handler) {this.eventHandlers.onCancel = handler}
}