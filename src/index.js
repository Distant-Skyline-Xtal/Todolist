import "./style.css";

import { ProjectService } from "./services/ProjectService.js";
import { StorageService } from "./services/StorageService.js";
import { ProjectView } from "./views/projectDashboardDisplay.js";
import { AppController } from "./controllers/AppController.js";
import { ProjectFormView } from "./views/projectFormView.js";
import { TodoFormView } from "./views/todoFormView.js";


// Initialize services
const storageService = new StorageService();
const projectService = new ProjectService();

// Initialize Views
const dashboardView = new ProjectView();
const projectFormView = new ProjectFormView();
const todoFormView = new TodoFormView();

// Initialize Controller
const appController = new AppController(
    projectService, 
    storageService,
    dashboardView,
    projectFormView,
    todoFormView
    );

appController.initialize();
