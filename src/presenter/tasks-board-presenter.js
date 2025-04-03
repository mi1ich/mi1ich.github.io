import TaskComponent from "../view/task-component.js";
import TasksListComponent from "../view/taskslist-component.js";
import { render } from "../framework/render.js";

export default class TasksBoardPresenter {
    tasksBoardComponent = new TaskBoardComponent();
    taskListComponent = new TasksListComponent();

    constructor({boardContainer}) {
        this.boardContainer = boardContainer;
    }

    init() {
        render(this.taskBoardComponent, this.boardContainer);
        for (let i = 0; i < 4; i++) {
            const tasksListComponent = new TasksListComponent();
            render(tasksListComponent, this.tasksBoardComponent.getElement());
            for (let j = 0; j < 4; j++) {
                const taskComponent = new TaskComponent();
                render(taskComponent, tasksListComponent.getElement());
            }
        }
    }
}
