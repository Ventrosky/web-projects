
import {UserModel} from '../models/User';

import express from 'express';

const router = express.Router();
//  => /v1/userss

router.get('/', async (req,res) => {
    if(!req.isAdmin){
        res.status(403).end();
    }
    const users = await UserModel.find() || [];
    res.send(users);
});

router.get('/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const user = await UserModel.findById(id).catch((err)=>{
            res.status(404).end();
        });
        if(user){
            res.send(user);
        } else {
            res.status(404).end();
        }
    } catch (ex) {
        res.status(404).end();
    }
});

router.post('/', (req,res) => {
    if(!req.isAdmin){
        res.status(403).end();
    }
    const username = req.body.username;
    const email = req.body.email;
    const role = req.body.role; //TODO: Implement
    console.log("post: data =>", username, email, role);
    res.status(200).end();
});

router.post('/register', (req,res) => {
    //TODO: Implement
    res.status(200).end();
});

router.put('/:id', (req,res) => {
    if(!req.isAdmin){
        res.status(403).end();
    }
    const id = req.params.id;
    const username = req.body.username;
    const email = req.body.email;
    const role = req.body.role; //TODO: Implement
    console.log("put: data =>", username, email, role, id);
    res.status(200).end();
});

router.delete('/:id', (req,res) => {
    if(!req.isAdmin){
        res.status(403).end();
    }
    const id = req.params.id;  //TODO: Implement
    console.log("delete: data =>", id);
    res.status(200).end();
});

module.exports = router;