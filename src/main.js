import HeaderComponent from './view/header-component.js';
import AddNewTaskComponent from './view/addnewtask-component.js';
import {render, RenderPosition} from './framework/render.js';

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task');

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer);
