

export class ProjectController { 
    constructor(projectService, projectView, projectFormView, todoFormView) {
        this.projectService = projectService;
        this.projectView = projectView;
        this.projectFormView = projectFormView;
        this.todoFormView = todoFormView;
        this.setupEventListeners();
    }

    setupEventListeners() {
        //Store functions onto the event listeners
        this.projectView.onAddProject(() => {
            this.projectFormView.render();
        });
        console.log("setting up project form view events");
        this.projectFormView.onProjectCreate((title, description) => {
            console.log("creating project!");
            let project = this.projectService.createProject(title, description);
            this.projectView.renderProject(project);
            this.projectFormView.removePopup();
        });

        this.projectFormView.onCancel(() => {
            this.projectFormView.removePopup();
        });

        this.projectView.onProjectDelete((projectId) => {
            this.projectService.deleteProject(projectId);
            this.projectView.removeProject(projectId);
        });

        this.projectView.onAddTodo((projectId) => {
            console.log("onAddTodo");

            this.todoFormView.render(projectId);
        });

        this.projectView.onDeleteTodo((projectId, todoId) => {
            this.projectService.deleteTodoItem(projectId, todoId);
            this.projectView.removeTodoItem(projectId, todoId);
        })

        this.todoFormView.onTodoCreate((projectId, title, description, priority) => {
            let todoItem = this.projectService.addToDoItem(projectId,
                {title: title,
                description: description,
                dateDue: new Date(),
                priority: priority});

                this.todoFormView.removePopup();

                this.projectView.renderTodoItem(todoItem, projectId);
        });

        this.todoFormView.onCancel(() => {
            this.todoFormView.removePopup();
        })
    }
}