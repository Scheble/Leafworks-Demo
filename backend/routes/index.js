import { Router } from 'express';
import { param, header } from 'express-validator';

import {
  getTicketsIamCollaborator,
  removeTicketCollaborators,
} from '../controllers/me.controller';
import {
  validateRequest,
  validateGlobalRequestLimits,
  validateUserRequestLimits,
} from '../middlewares/validator.middleware';

const router = Router();

// Me
router.get(
  '/me/tickets/ccd',
  header('user-id').isInt(),
  validateRequest,
  getTicketsIamCollaborator
);

router.delete(
  '/me/tickets/:ticketId/ccd',
  header('user-id').isInt(),
  param('ticketId').isInt(),
  validateRequest,
  validateGlobalRequestLimits,
  validateUserRequestLimits,
  removeTicketCollaborators
);

export default router;
