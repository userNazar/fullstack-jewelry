import { Router } from "express";
import productsController from "../controllers/products-controller";
import adminMiddleware from "../../middlewares/admin-middleware";


const router = Router();

router.get('/', productsController.getAllProducts);
router.get('/:name', productsController.filterByName);
router.get('/product/:_id', productsController.getOneProduct);
router.post('/create', adminMiddleware, productsController.createProduct);
router.post('/delete', adminMiddleware, productsController.deleteProduct);
router.get('/search/:name', productsController.findBySearch);

export default router;