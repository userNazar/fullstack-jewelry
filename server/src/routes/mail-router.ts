import { Router } from "express";
import mailController from "../controllers/mail-controller";
import authMiddleware from "../../middlewares/auth-middleware";


const router = Router();

router.post('/contact', authMiddleware, mailController.sendContactMail);

export default router;