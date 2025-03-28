import HeaderComponent from './view/header-component.js';
import {render, RenderPosition} from './render.js';

const bodyContainer= document.querySelector('.board-app');
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
