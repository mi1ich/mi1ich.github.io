import {createElement} from '../framework/render.js';
import {StatusLabel, Status} from '../const.js';

function createTasksListTemplate(label, status) {
  return `
    <div class="display-tasks-list ${status}">
      <h3>${label}</h3>
      <ul class="tasks">
      </ul>
    </div>
  `;
}

export default class TasksListComponent {
  constructor(status) {
    this.status = status['status'];
  }
  
  getTemplate() {
    const label = StatusLabel[this.status];
    return createTasksListTemplate(label, this.status);
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
