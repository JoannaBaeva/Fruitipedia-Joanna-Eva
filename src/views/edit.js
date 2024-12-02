import { html } from '../../node_modules/lit-html/lit-html.js';
import * as service from '../api/data.js';
import { createSubmitHandler } from '../util.js';

const editTemplate = (fruit, onSubmit) => html`
<section id="edit">
<div class="form">
<h2>Edit Fruit</h2>
<form class="edit-form" @submit=${onSubmit}>
<input
type="text"
name="name"
id="name"
placeholder="Fruit Name"
.value=${fruit.name}
/>
<input
type="text"
name="imageUrl"
id="Fruit-image"
placeholder="Fruit Image URL"
.value=${fruit.imageUrl}
/>
<textarea
id="fruit-description"
name="description"
placeholder="Description"
rows="10"
cols="50"
.value=${fruit.description}
></textarea>
<textarea
id="fruit-nutrition"
name="nutrition"
placeholder="Nutrition"
rows="10"
cols="50"
.value=${fruit.nutrition}
></textarea>
<button type="submit">post</button>
</form>
</div>
</section>
`;

export async function editPage(ctx) {
const id = ctx.params.id;
const fruit = await service.getById(id);

ctx.render(editTemplate(fruit, createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
const id = ctx.params.id;

const form = event.target;
Array.from(form.elements).forEach((input) => {
if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') {
input.style.borderColor = '';
}
});

let hasEmptyFields = false;
Object.entries(data).forEach(([key, value]) => {
if (value.trim() === '') {
hasEmptyFields = true;
const field = form.querySelector(`[name="${key}"]`);
if (field) field.style.borderColor = 'red';
}
});

if (hasEmptyFields) {
return alert('All fields are required!');
}

await service.editById(id, {
name: data.name.trim(),
imageUrl: data.imageUrl.trim(),
description: data.description.trim(),
nutrition: data.nutrition.trim(),
});

event.target.reset();
ctx.page.redirect('/catalog');
}