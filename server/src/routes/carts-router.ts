import { Router } from "express";
import cartsController from "../controllers/carts-controller";
import authMiddleware from "../../middlewares/auth-middleware";

const router = Router();

router.get('/getcart', authMiddleware, cartsController.getCart);
router.post('/add', authMiddleware, cartsController.addProductCart);
router.post('/addwish', authMiddleware, cartsController.addProductWish);
router.post('/removewish', authMiddleware, cartsController.removeProductWish);
router.post('/removecart', authMiddleware, cartsController.removeProductCart);
router.post('/buycart', authMiddleware, cartsController.buyProducts);

export default router; 