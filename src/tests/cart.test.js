
const request = require('supertest');
const app = require('../app');
require('../models')

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

test("GET /carts", async () => {
    const res = await request(app).get("/carts").set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
})

test("POST /carts", async () => {
    const body = {
        quantity: 5
    }
    const res = await request(app).post("/carts").send(body).set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201)
})

test("PUT /carts/:id", async () => {
    const body = {
        quantity: 1
    }
    const res = await request(app).put(`/carts/${id}`).send(body).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
})

test("DELETE /carts/:id", async () => {
    const res = await request(app).delete(`/carts/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
})