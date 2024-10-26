"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
let users = [];
app.get('/user', (_req, res) => {
    res.json(users);
});
app.get('/user/:id', (req, res) => {
    const result = users.find(user => user.id === parseInt(req.params.id, 10));
    res.json(result);
});
app.post('/user', (req, res) => {
    /**
     * name: 'Vitor'
     * age: 38
    */
    users.push(Object.assign(Object.assign({}, req.body), { id: users.length + 1 }));
    res.json({
        msg: "Usuario cadastrado"
    });
});
app.put('/user/:id', (req, res) => {
    /**
     * name: 'Ace'
     * age: 38
    */
    users = users.map(user => {
        if (user.id === Number(req.params.id)) {
            return Object.assign(Object.assign({}, user), req.body);
        }
        return user;
    });
    res.json({
        msg: 'Usuario atualizado'
    });
});
app.delete('/user/:id', (req, res) => {
    users = users.filter(user => user.id !== Number(req.params.id));
    res.json({
        msg: 'Usuario removido!'
    });
});
app.listen(8000, () => {
    console.log('Server ON');
});
