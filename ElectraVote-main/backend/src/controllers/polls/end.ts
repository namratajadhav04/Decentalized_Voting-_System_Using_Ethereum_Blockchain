import { Request, Response } from "express";
import ElectionContract, { web3 } from "../../web3";
import memoryCache from "memory-cache";

export default async (_: Request, res: Response) => {
  const accounts = await web3.eth.getAccounts();
  const instance = await ElectionContract.deployed();

  const status = await instance.getStatus();

  if (status !== "running") {
    return res.status(400).send("Election not started");
  }

  await instance.endElection({ from: accounts[0] });

  // Get the votes from the smart contract
  const votes = await instance.getVotes();

  // Determine the winner based on the votes
  const winner = Object.keys(votes).reduce((a, b) => (votes[a] > votes[b] ? a : b));

  // Clear the cache
  memoryCache.clear();

  // Return both the votes and the winner
  return res.send({ votes, winner });
};
