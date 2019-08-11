import {ProductModel} from '../models/Product';
import express from 'express';

const router = express.Router();
//  => /v1/products

router.get('/', async (req,res) => {
    const {categories} = req.query;
    const categoryList = categories ? categories.split(',') : [];
    const products = await ProductModel.find(
            categoryList.length > 0 ? 
            { categories: {$in: categoryList}} : 
            undefined
        ) || [];
    res.send(products);
});

router.get('/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const product = await ProductModel.findById(id)
        if(product){
            res.send(product);
        } else {
            res.status(404).end();
        }
    } catch (ex) {
        res.status(404).end();
    }
});

router.post('/', async (req,res) => {
    if(!req.isAdmin){
        res.status(403).end();
    }
    const product = await ProductModel.create(req.body);
    if (product){
        res.status(200).end();
    } else {
        res.status(500).end();
    }
});

router.put('/:id', async (req,res) => {
    if(!req.isAdmin){
        res.status(403).end();
    }
    const id = req.params.id;
    ProductModel.findByIdAndUpdate(id, req.body, (err) => {
        if (err){
            res.status(500).end();
        } else {
            res.status(200).end();
        }
    });
    
});

router.delete('/:id', async (req,res) => {
    if(!req.isAdmin){
        res.status(403).end();
    }
    const id = req.params.id;
    ProductModel.findByIdAndDelete(id, (err) => {
        if (err){
            res.status(500).end();
        } else {
            res.status(200).end();
        }
    });
    
});

module.exports = router;