
const sequelize = require('../utils/connection');
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();

        const user = await User.findOne({ where: {email: "test.com"}})
        if(!user) {
            const testUser = {
            firstName: "test",
            lastName: "test",
            email: "test.com",
            password: "1234",
            phone: "1234567890"
            }
            await request(app).post("/users").send(testUser)
        }

        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();