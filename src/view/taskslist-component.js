import {createElement} from './render.js';

function createTasksListTemplate() {
  return `
    <div class="tasks-list">
      <h3>Название блока</h3>
      <ul class="tasks">
      </ul>
    </div>
  `;
}

export default class TasksListComponent {
  getTemplate() {
    return createTasksListTemplate();
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
