import { Router } from "express";
import productsRouter from "./products-router";
import usersRouter from "./users-router";
import cartsRouter from "./carts-router";

const router = Router();

router.use('/api/products', productsRouter);
router.use('/api/users', usersRouter); 
router.use('/api/cart', cartsRouter);

export default router;