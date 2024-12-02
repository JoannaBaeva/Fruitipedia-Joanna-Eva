import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';

const detailsTemplate = (fruit, onDelete) => html`
    <div id="details-wrapper">
        <img src=${fruit.imageUrl} alt="${fruit.name}" />
        <h2 id="details-title">${fruit.name}</h2>
        <div id="details-description">
            <p><strong>Description:</strong> ${fruit.description}</p>
            <p id="nutrition"><strong>Nutrition:</strong> ${fruit.nutrition}</p>
        </div>
        ${fruit.isOwner
            ? html`
                  <div id="action-buttons">
                      <a href="/edit/${fruit._id}" class="button">Edit</a>
                      <a @click=${onDelete} class="button">Delete</a>
                  </div>
              `
            : nothing}
    </div>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id; 
    const fruit = await service.getById(id);

    if (ctx.user) {
        fruit.isOwner = ctx.user._id === fruit._ownerId;
    }

    ctx.render(detailsTemplate(fruit, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this fruit?');
        if (choice) {
            await service.deleteById(id);
            ctx.page.redirect('/');
        }
    }
}