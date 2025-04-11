import TaskComponent from "../view/task-component.js";
import TasksListComponent from "../view/taskslist-component.js";
import TaskBoardComponent from "../view/taskboard-component.js";
import ClearButtonComponent from "../view/clearbutton-component.js";
import EmptyComponent from "../view/empty-component.js";
import { render } from "../framework/render.js";

export default class TasksBoardPresenter {
    #taskBoardComponent = new TaskBoardComponent();
    #boardContainer = null;
    #tasksModel = null;
    #boardTasks = [];

    constructor({boardContainer, tasksModel}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.tasks];
        render(this.#taskBoardComponent, this.#boardContainer);
        this.#boardTasks.forEach((tasksList) => {
            this.#renderTasksList(tasksList.status, tasksList.taskslist);
        });
        this.#renderClearButton();
    }

    #renderTask(task, container) {
        const tasksContainer = container.element.querySelector('.tasks');
        if (tasksContainer) {
            render(new TaskComponent(task), tasksContainer);
        }
    }

    #renderTasksList(status, tasks) {
        const list = new TasksListComponent(status);
        render(list, this.#taskBoardComponent.element);
        if (tasks.length === 0) {
            this.#renderEmptyComponent(list)
        } 
        else {
            tasks.forEach((task) => {
                this.#renderTask(task, list);
            })
        }
    }

    #renderClearButton() {
        const basketContainer = document.querySelector('.basket');
        const tasksInBasket = basketContainer?.querySelector('li');
        if (basketContainer && tasksInBasket) {
            render(new ClearButtonComponent(), basketContainer);
        }
    }

    #renderEmptyComponent(container) {
        render(new EmptyComponent(), container.element);
    }
}
