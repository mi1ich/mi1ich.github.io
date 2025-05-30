import { render } from "../framework/render.js";
import TaskComponent from "../view/task-component.js";
import TaskBoardComponent from "../view/taskboard-component.js";
import TasksListComponent from "../view/taskslist-component.js";
import EmptyComponent from "../view/empty-component.js";

export default class TasksBoardPresenter {
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

    init() {
        this.#renderBoard();
    }

    #renderBoard() {
        if (this.#tasksModel.tasks.length != this.#boardtasks.length) {
            this.#boardtasks = [...this.#tasksModel.tasks];
        }

        render(this.#taskDeskComponent, this.#boardContainer);

        this.#boardtasks.forEach((taskList) => {
            this.#renderTaskList(taskList.status, taskList.tasks);
        });

        this.#renderClearButton();
    }

    createTask() {
        const taskTitle = document.querySelector('.add-new').value.trim();
        if (!taskTitle) {
            return;
        }

        this.#tasksModel.addTask(taskTitle);

        document.querySelector('.add-new').value = '';
    }

    clearBasket() {
        this.#tasksModel.removeBasketTask();
    }

    #renderTaskList(status, tasks) {
        const list = new TasksListComponent(status);

        render(list, this.#taskDeskComponent.element);

        tasks.length === 0 ? this.#renderEmptyComponent(list) : tasks.forEach((task) => {
            this.#renderTask(task.name, list);
        });
    }

    #renderTask(task, container) {
        render(new TaskComponent(task), container.element.querySelector('.task-container'));
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

    #handleModelChange() {
        this.#clearBoard();
        this.#renderBoard();
    }
}
