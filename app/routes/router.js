import { Router } from 'express';
const router = Router();

import { register, login } from '../controller/authController.js';
import { editProfile } from '../controller/userController.js';

// router.use(function (req, res, next) {
//   res.header('Access-Controll-Allow-Headers', 'authorization, Oringin, Content-Type, Accept');
//   next();
// });

router.post('/register', register);
router.post('/login', login);
router.post('/edit_profile', editProfile);

export default router;
