import AbstractComponent from "../framework/view/abstract-component.js";

function createEmptyComponent() {
    return (
        `
        <div class=stub>
            Перетащите карточку
        </div>
        `
    );
}

export default class EmptyComponent extends AbstractComponent {
    get template() {
        return createEmptyComponent();
    }
}
