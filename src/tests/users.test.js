
const request = require('supertest');
const app = require('../app');

let id;
let token;

test("POST /user", async () => {
    const body = {
        firstName: "asd",
        lastName: "fgh",
        email: "jkl.com",
        password: "1234",
        phone: "1234567"
    }
    const res = await request(app).post('/users').send(body)
    id = res.body.id
    expect(res.status).toBe(201)
})

test("POST /user/login", async () => {
    const body = {
        email: "jkl.com",
        password: "1234"
    }
    const res = await request(app).post('/users/login').send(body)
    token = res.body.token
    expect(res.status).toBe(201)
})

test("GET /user", async () => {
    const res = await request(app).get('/users').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
})

test("GET /user/:id", async () => {
    const res = await request(app).get(`/users/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
})

test("PUT /user/:id", async () => {
    const body = {
        firstName: "qwe",
    }
    const res = await request(app).put(`/users/${id}`).send(body).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
})

test("DELETE /user/:id", async () => {
    const res = await request(app).delete(`/users/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
})