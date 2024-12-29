// routes/aadharVerification.ts

import { Router } from 'express';
import { Request, Response } from 'express';
import users from "../seed/users";

const router = Router();

// Aadhar verification route
router.post('/verify-aadhar', (req: Request, res: Response) => {
  const { aadharNumber } = req.body;

  // Check if the Aadhar number exists in the users array
  const user = users.find((user: { aadharNumber: any; }) => user.aadharNumber === aadharNumber);

  if (user) {
    return res.status(200).send({ verified: true, user });
  } else {
    return res.status(404).send({ verified: false, message: 'Aadhar number not found' });
  }
});

export default router;
