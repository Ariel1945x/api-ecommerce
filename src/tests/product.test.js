
const request = require('supertest');
const app = require('../app');
const Image = require('../models/Images')
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

test("GET /products", async () => {
    const res = await request(app).get("/products")
    expect(res.status).toBe(200)
})

test("POST /products", async () => {
    const body = {
        title: "asdfg",
        description: "asdfghjklñqwertyuiopzxcvbnmñ",
        brand: "zxcv",
        price: "123.00"
    }
    const res = await request(app).post("/products").send(body).set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201)
})

test("GET /products/:id", async () => {
    const res = await request(app).get(`/products/${id}`)
    expect(res.status).toBe(200)
})

test("PUT /products/:id", async () => {
    const body = {
        title: "asdfg"
    }
    const res = await request(app).put(`/products/${id}`).send(body).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
})

test("POST /products/:id/images", async () => {
    const image = await Image.create({ url: 'https://alamadre.jpg', publicId: 'id' })
    const res = await request(app).post(`/products/${id}/images`).send([image.id]).set('Authorization', `Bearer ${token}`)
    await image.destroy()
    expect(res.status).toBe(200)
})

test("DELETE /products/:id", async () => {
    const res = await request(app).delete(`/products/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
})