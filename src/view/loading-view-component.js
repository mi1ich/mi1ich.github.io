import AbstractComponent from "../framework/view/abstract-component.js";

function createLoadingTemplate() {
    return (
        `
        <p class=board-no-task>
            Подождите...
        </p>
        `
    );
}

export default class LoadingViewComponent extends AbstractComponent {
    get template() {
        return createLoadingTemplate();
    }
}
