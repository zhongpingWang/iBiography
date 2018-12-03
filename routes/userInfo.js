
const express = require("express");

import express from '';
import Order from '../controller/v1/order'
const router = express.Router();

router.get('/v2/users/:user_id/orders', Order.getOrders)