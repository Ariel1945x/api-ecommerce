
const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcryp = require('bcrypt')
const jwt = require('jsonwebtoken')

const getAll = catchError(async(req, res) => {
    const results = await User.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const protect = await bcryp.hash(req.body.password, 10)
    const result = await User.create({...req.body, password: protect});
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await User.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const { firstName, lastName, phone } = req.body
    const result = await User.update(
        { firstName, lastName, phone },
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async(req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: {email} })
    const isValid = await bcryp.compare(password, user.password)
    if(!user && !isValid) return res.status(401)

    const token = jwt.sign( 
        {user},
        process.env.TOKEN_SECRET,
        {expiresIn: "1d"}
    )

    return res.status(201).json({user, token})
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login
}