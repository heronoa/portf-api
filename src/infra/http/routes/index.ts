import { Router } from "express";
import multer from "multer";

import { authMiddleware } from "../../../middlewares/auth";
import { AuthController } from "../controllers/AuthController";
import { ProjectsController } from "../controllers/ProjectController";

const router = Router();

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.post("/login", AuthController.token);
router.post("/forgotpassword", AuthController.forgotPassword);
router.post("/updatepassword", AuthController.updatePassword);
router.post("/validatetoken", AuthController.validateToken);
router.get("/authping", authMiddleware, AuthController.ping);
router.get("/projects", authMiddleware, ProjectsController.getAll);
router.get("/porjects/:id", authMiddleware, ProjectsController.getSingle);
router.post(
  "/projects/add",
  authMiddleware,
  upload.fields([
    {
      name: "thumb",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 9,
    },
  ]) as any,
  ProjectsController.add,
);
router.post("/costumers/remove", authMiddleware, ProjectsController.remove);
router.post(
  "/costumers/update",
  authMiddleware,
  upload.fields([
    {
      name: "thumb",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 9,
    },
  ]) as any,
  ProjectsController.update,
);
router.post("/sendcontact", authMiddleware, ProjectsController.sendContact);

export default router;
