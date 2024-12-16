import { Router } from "express";
import productsRouter from "./products-router";
import usersRouter from "./users-router";
import cartsRouter from "./carts-router";
import mailRouter from "./mail-router";

const router = Router();

router.use('/api/products', productsRouter);
router.use('/api/users', usersRouter); 
router.use('/api/cart', cartsRouter);
router.use('/api/mail', mailRouter);

export default router;