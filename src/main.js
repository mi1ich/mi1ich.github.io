import HeaderComponent from './view/header-component.js';
import AddNewTaskComponent from './view/addnewtask-component.js';
import TaskComponent from './view/task-component.js';
import TaskBoardComponent from './view/taskboard-component.js';
import TasksListComponent from './view/taskslist-component.js';
import {render, RenderPosition} from './framework/render.js';

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');
const boardContainer = document.querySelector('.board-app__main');

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new AddNewTaskComponent(), formContainer);
render(new TaskBoardComponent(), boardContainer);
