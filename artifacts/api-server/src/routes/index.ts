import { Router, type IRouter } from "express";
import healthRouter from "./health";
import chatRouter from "./chat";
import helplinesRouter from "./helplines";
import ngosRouter from "./ngos";
import legalClinicsRouter from "./legal-clinics";

const router: IRouter = Router();

router.use(healthRouter);
router.use(chatRouter);
router.use(helplinesRouter);
router.use(ngosRouter);
router.use(legalClinicsRouter);

export default router;
