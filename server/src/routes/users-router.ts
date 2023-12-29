import { Router } from "express";
import usersController from "../controllers/users-controller";
import authMiddleware from "../../middlewares/auth-middleware";
import adminMiddleware from "../../middlewares/admin-middleware";

const router = Router();

router.post('/signup', usersController.signUp);
router.post('/login', usersController.login);
router.post('/logout', usersController.logout);
router.get('/refresh', usersController.refresh);
router.get('/activate/:link', usersController.activate);
router.get('/users', adminMiddleware, usersController.getUsers);
router.patch('/renew', authMiddleware, usersController.renew);

export default router;