import { render } from "../framework/render.js";
import TaskComponent from "../view/task-component.js";
import TaskBoardComponent from "../view/taskboard-component.js";
import TasksListComponent from "../view/taskslist-component.js";
import EmptyComponent from "../view/empty-component.js";
import LoadingViewComponent from "../view/loading-view-component.js";
import { UserAction, StatusLabel } from "../const.js";

export default class TasksBoardPresenter {
    #loadingComponent = new LoadingViewComponent();
    #taskDeskComponent = new TaskBoardComponent();
    #clearButtonComponent = null;
    #boardContainer = null;
    #boardtasks = [];
    #tasksModel = null;

    constructor({boardContainer, tasksModel, clearButtonComponent}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;

        this.#clearButtonComponent = clearButtonComponent;
        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
    }

    async init() {
        render(this.#loadingComponent, this.#boardContainer);
        await this.#tasksModel.init();
        this.#clearBoard();
        this.#renderBoard();
    }

    #renderBoard() {
        if (this.#tasksModel.tasks.length != this.#boardtasks.length) {
            this.#boardtasks = [...this.#tasksModel.tasks];
        }

        render(this.#taskDeskComponent, this.#boardContainer);

        const allStatuses = Object.keys(StatusLabel);

        allStatuses.forEach((status) => {
            const tasksForStatus = this.#boardtasks.find(taskList => taskList.status === status)?.tasks || [];
            this.#renderTaskList(status, tasksForStatus);
        });

        this.#renderClearButton();
    }

    async createTask() {
        const taskTitle = document.querySelector('.add-new').value.trim();
        if (!taskTitle) {
            return;
        }

        try {
            await this.#tasksModel.addTask(taskTitle);
            document.querySelector('.add-new').value = '';
        } catch(err) {
            console.error('Ошибка при создании задачи: ', err);
            throw err;
        }
    }

    async clearBasket() {
        try {
            await this.#tasksModel.removeBasketTask();
        } catch(err) {
            console.error('Ошибка при очистке корзины: ', err);
        }
    }

    #renderTaskList(status, tasks) {
        const list = new TasksListComponent(status, this.#handleTaskDrop.bind(this));
        render(list, this.#taskDeskComponent.element);

        tasks.length === 0 
            ? this.#renderEmptyComponent(list) 
            : tasks.forEach((task) => this.#renderTask(task, list));

        this.#loadingComponent.element.style = 'display: none;';
    }

    #renderTask(task, container) {
        render(new TaskComponent(task), container.element.querySelector('ul'));
    }

    #renderClearButton() {
        const basketContainer = document.querySelector('.basket');

        const basketTasks = basketContainer?.querySelector('li');

        if (basketContainer && basketTasks) {
            render(this.#clearButtonComponent, basketContainer);
        }
    }

    #renderEmptyComponent(container) {
        render(new EmptyComponent(), container.element);
    }

    #clearBoard() {
        this.#taskDeskComponent.element.innerHTML = '';
    }

    #handleModelChange(event, payload) {
        switch(event) {
            case UserAction.ADD_TASK:
            case UserAction.UPDATE_TASK:
            case UserAction.DELETE_TASK:
                this.#clearBoard();
                this.#renderBoard();
                break;
        }
    }

    async #handleTaskDrop(newStatus, taskId, droppedTask) {
        try {
            await this.#tasksModel.updateTaskStatus(newStatus, taskId, droppedTask);
        } catch(err) {
            console.error('Ошибка при обновлении статуса задачи: ', err);
        }
    }
}
