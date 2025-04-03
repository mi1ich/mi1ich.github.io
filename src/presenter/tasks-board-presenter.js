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
        for (const tasksList of this.#boardTasks) {
            const status = tasksList.status;
            const tlist = new TasksListComponent({status});
            render(tlist, this.#taskBoardComponent.getElement());
            for (const task of tasksList.taskslist) {
                render(new TaskComponent({task: task}), tlist.getElement('.tasks'));
            }
        }
    }
}
