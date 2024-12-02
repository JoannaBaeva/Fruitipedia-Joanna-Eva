import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import * as userService from '../api/user.js';

const loginTemplate = (onSubmit, errorMessage) => html`
	<section id="login">
		<div class="form">
			<h2>Login</h2>
			${errorMessage
				? html`<div class="error">${errorMessage}</div>`
				: ''}
			<form class="login-form" @submit=${onSubmit}>
				<input
					type="text"
					name="email"
					id="email"
					placeholder="Email"
				/>
				<input
					type="password"
					name="password"
					id="password"
					placeholder="Password"
				/>
				<button type="submit">Login</button>
				<p class="message">
					Not registered? <a href="/register">Create an account</a>
				</p>
			</form>
		</div>
	</section>
`;

export async function loginPage(ctx) {
	let errorMessage = null;
	ctx.render(loginTemplate(createSubmitHandler(ctx, onSubmit), errorMessage));

	async function onSubmit(ctx, data, event) {
		if (data.email === '' || data.password === '') {
			errorMessage = 'All fields are required!';
			ctx.render(loginTemplate(createSubmitHandler(ctx, onSubmit), errorMessage));
			return;
		}

		try {
			await userService.login(data.email, data.password);
			event.target.reset();
			ctx.page.redirect('/');
		} catch (err) {
			errorMessage = 'Login failed. Please check your email and password.';
			ctx.render(loginTemplate(createSubmitHandler(ctx, onSubmit), errorMessage));
		}
	}
}
