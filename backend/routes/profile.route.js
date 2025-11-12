import { Router } from 'express';
import { getProfiles,
         getProfileId,
         idUnlocked } from "../controllers/profile.controller.js"

const router = Router()

router.route('/').get(getProfiles);
router.route('/:id').get(getProfileId);
router.route('/unlock/:id').post(idUnlocked);

export default router;