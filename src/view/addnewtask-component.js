import {createElement} from './render.js';

function createAddNewTaskTemplate() {
  return `
    <div class="new-task">
      <h1>Новая задача</h1>
      <div class="bottom-group">
        <input placeholder="Название задачи..." type="text">
        <button>+ Добавить</button>
      </div>
    </div>
  `;
}

export default class AddNewTaskComponent {
  getTemplate() {
    return createAddNewTaskTemplate();
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
