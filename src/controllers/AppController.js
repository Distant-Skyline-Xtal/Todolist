import { ProjectController } from './ProjectController.js';
import { ProjectView } from '../views/projectDashboardDisplay.js';


export class AppController {

    constructor(projectService, storageService, projectView, 
        projectFormView, todoFormView) {
        this.projectService = projectService;
        this.storageService = storageService;
        this.projectView = projectView;
        this.projectFormView = projectFormView;
        this.todoFormView = todoFormView;

        this.projectController = new ProjectController(projectService,
             projectView, 
             projectFormView,
             todoFormView);
    }

    initialize() {
        this.renderInitialState();
        this.setupEventListeners();
    }

    renderInitialState() {
        this.projectView.clearDashboard();
    }

    setupEventListeners() {

        this.projectView.onSaveData(() => {
            this.storageService.saveData(this.projectService.projects);
        });

        this.projectView.onLoadData(() => {
            const loadedData = this.storageService.loadData();

            if (loadedData) {
                this.projectService.projects = [];

                for (const projectData of loadedData) {
                    this.projectService.createProjectFromData(projectData);
                }

                this.projectView.clearDashboard();
                for(const createdProject of this.projectService.projects) {
                    this.projectView.renderProject(createdProject);
                }
            }
        });
    }

    destroy() {

    }
    
}