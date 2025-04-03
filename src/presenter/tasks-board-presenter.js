import TaskComponent from "../view/task-component.js";
import TasksListComponent from "../view/taskslist-component.js";
import TaskBoardComponent from "../view/taskboard-component.js";
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
        this.#boardTasks = [...this.#tasksModel.getTasks()];
        render(this.#taskBoardComponent, this.#boardContainer);
        for (let i = 0; i < 4; i++) {
            const tasksListComponent = new TasksListComponent();
            render(tasksListComponent, this.#taskBoardComponent.getElement());
            for (let j = 0; j < this.#boardTasks.length; j++) {
                const taskComponent = new TaskComponent();
                render(taskComponent, tasksListComponent.getElement());
            }
        }
    }
}
