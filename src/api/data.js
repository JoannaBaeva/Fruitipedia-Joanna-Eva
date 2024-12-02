import * as api from './api.js';

const endpoints = {
	getAll: '/data/fruits?sortBy=_createdOn%20desc',
	create: '/data/fruits',
	getById: '/data/fruits/',
	deleteById: '/data/fruits/',
	editById: '/data/fruits/',
	search: (query) => `/data/fruits?where=name%20LIKE%20%22${query}%22`,
};

export async function getAll() {
	return api.get(endpoints.getAll);
}

export async function create(data) {
	return api.post(endpoints.create, data);
}

export async function getById(id) {
	const response = await fetch(`/api/fruits/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch fruit');
    }
    return await response.json();
}

export async function deleteById(id) {
    const response = await fetch(`/api/fruits/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete fruit');
    }
    return await response.json();
}

export async function deleteById(id) {
	return api.del(endpoints.deleteById + id);
}

export async function editById(id, data) {
	return api.put(endpoints.editById + id, data);
}

export async function search(query) {
	return api.get(endpoints.search(query));
}
