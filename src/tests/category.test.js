
const request = require('supertest');
const app = require('../app');

let id;
let token;

beforeAll(async () => {
    const body = {
        email: "test.com",
        password: "1234"
    }
    const res = await request(app).post('/users/login').send(body)
    token = res.body.token
})

test("GET /category", async () => {
    const res = await request(app).get("/categories")
    expect(res.status).toBe(200)
})

test("POST /category", async () => {
    const body = {
        name: "asdf"
    }
    const res = await request(app).post("/categories").send(body).set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201)
})

test("PUT /category/:id", async () => {
    const body = {
        name: "asdf"
    }
    const res = await request(app).put(`/categories/${id}`).send(body).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
})

test("DELETE /category/:id", async () => {
    const res = await request(app).delete(`/categories/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
})