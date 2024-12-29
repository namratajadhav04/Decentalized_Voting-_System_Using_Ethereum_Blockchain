import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/overview', (req: Request, res: Response) => {
  // Fetch real-time statistics data (replace with your actual data fetching logic)
  res.json({
    totalElections: 3, 
    registeredVoters: 5, 
    activeVotes: 50, 
    completedElections: 12, 
    pendingApprovals: 5
  });
});

export default router;
