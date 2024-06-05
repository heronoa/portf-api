import { Router } from "express";
import multer from "multer";

import { authMiddleware } from "../../../middlewares/auth";
import { AuthController } from "../controllers/AuthController";
import { CostumersController } from "../controllers/CostumersController";
import { DebtsController } from "../controllers/DebtsController";

const router = Router();

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.post("/login", AuthController.token);
router.post("/forgotpassword", AuthController.forgotPassword);
router.post("/updatepassword", AuthController.updatePassword);
router.post("/validatetoken", AuthController.validateToken);
router.get("/authping", authMiddleware, AuthController.ping);
router.get("/costumers", authMiddleware, CostumersController.getAllCostumers);
router.get(
  "/costumers/:id",
  authMiddleware,
  CostumersController.getSingleCostumer,
);
router.get("/debts", authMiddleware, DebtsController.getAllDebts);
router.get("/debts/:id", authMiddleware, DebtsController.getSingleDebt);
router.post(
  "/debts/add",
  authMiddleware,
  upload.single("file") as any,
  DebtsController.addDebt,
);
router.post(
  "/debts/update",
  authMiddleware,
  upload.single("file") as any,
  DebtsController.updateDebt,
);
router.post("/debts/remove", authMiddleware, DebtsController.removeDebt);
router.post(
  "/costumers/add",
  authMiddleware,
  upload.fields([
    {
      name: "cpfDoc",
      maxCount: 1,
    },
    {
      name: "rgDoc",
      maxCount: 1,
    },
    {
      name: "otherDoc",
      maxCount: 1,
    },
  ]) as any,
  CostumersController.addCostumer,
);
router.post(
  "/costumers/remove",
  authMiddleware,
  CostumersController.removeCostumer,
);
router.post(
  "/costumers/update",
  authMiddleware,
  upload.fields([
    {
      name: "cpfDoc",
      maxCount: 1,
    },
    {
      name: "rgDoc",
      maxCount: 1,
    },
    {
      name: "otherDoc",
      maxCount: 1,
    },
  ]) as any,
  CostumersController.updateCostumer,
);
router.get("/debt/getlate", authMiddleware, DebtsController.sendLateMessages);
router.post("/debts/notify", authMiddleware, DebtsController.sendNotify);

export default router;
