import { render, RenderPosition } from './framework/render.js';
import HeaderComponent from './view/header-component.js';
import AddNewTaskComponent from './view/addnewtask-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TasksModel from './model/task-model.js';
import ClearButtonComonent from './view/clearbutton-component.js';
import TaskApiServices from './task-apiservices.js';

const END_POINT = 'https://68396b016561b8d882b0502a.mockapi.io';
const bodyContainer = document.querySelector('.page-body');
const addTaskContainer = document.querySelector('.add-new-task-component');
const deskContainer = document.querySelector('.main-content');

const tasks = new TasksModel({
    tasksApiServices: new TaskApiServices(END_POINT)
});

const clearButtonComponent = new ClearButtonComonent({
    onClick: handleClearBasketButtonClick
});

const taskBoardPresenter = new TasksBoardPresenter({
    boardContainer: deskContainer,
    tasksModel: tasks,
    clearButtonComponent: clearButtonComponent
});

const formAddTaskComponent = new AddNewTaskComponent({
    onClick: handleAddNewTaskButtonClick
});

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(formAddTaskComponent, addTaskContainer);

taskBoardPresenter.init();

function handleAddNewTaskButtonClick() {
    taskBoardPresenter.createTask();
}

function handleClearBasketButtonClick() {
    taskBoardPresenter.clearBasket();
}
