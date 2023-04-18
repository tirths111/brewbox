const express = require('express');

const {protect,authorize} = require('../middleware/auth');

const statusRouter = express.Router();
const  {
    getStatus,
    getAllStatus,
    createStatus,
    updateStatus,
    deleteStatus,
    deleteAllStatus
} = require("../controllers/status-controller");


statusRouter
    .route('/')
    .get(protect,authorize('Admin'),getAllStatus)
    .post(protect,authorize('Admin'),createStatus)
    .delete(protect,authorize('Admin'),deleteAllStatus);

statusRouter
    .route('/:id')
    .get(protect,authorize('Admin'),getStatus)
    .delete(protect,authorize('Admin'),deleteStatus)
    .put(protect,authorize('Admin'),updateStatus);


module.exports= statusRouter;