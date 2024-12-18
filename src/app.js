import page from '../node_modules/page/page.mjs';

import { addSession } from './middlewares/session.js';
import { addRender } from './middlewares/render.js';

import { homePage } from './views/home.js';
import { catalogPage } from './views/catalog.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { searchPage } from './views/search.js';

import { logout } from './api/user.js';

import { getAccessToken } from './util.js';

page(addSession);
page(addRender);

page('/', homePage);
page('/catalog', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', requireLogin, createPage);
page('/details/:id', detailsPage);
page('/edit/:id', requireLogin, editPage);
page('/search', searchPage);
page('/logout', onLogout);

page.start();

function onLogout(ctx) {
	logout();
	ctx.page.redirect('/');
}

function requireLogin(ctx, next) {
	if (getAccessToken() == null) {
	  return page.redirect('/login');
	}
  
	return next();
}
