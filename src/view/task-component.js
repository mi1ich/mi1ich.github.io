import {createElement} from './render.js';

function createTaskTemplate() {
  return `<li>Название первой задачи</li>`;
}

export default class TaskComponent {
  getTemplate() {
    return createTaskTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
