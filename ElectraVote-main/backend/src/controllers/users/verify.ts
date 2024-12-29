import { Request, Response } from "express";
import { User } from "../../entity/User"; 
import { sendEmail } from "../../sendEmail"; 

export default async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).send({ error: "User ID is required" });
  }

  let user;
  try {
    user = await User.findOneOrFail({ where: { id: userId } });
  } catch (error) {
    return res.status(404).send({ error: "User not found" });
  }

  if (user.verified) {
    return res.status(400).send({ error: "User is already verified" });
  }

  user.verified = true;

  try {
    await User.save(user); 
  } catch (error) {
    return res.status(500).send({ error: "Failed to update user" });
  }

  const subject = "ElectraVote Account Verification";
  const message = `
    Dear ${user.name},

    Congratulations! Your account on ElectraVote has been successfully verified.

    Thank you for being a part of our blockchain-based voting system, where transparency and security are our top priorities.

    If you have any questions or need further assistance, please feel free to contact us.

    Best regards,
    The ElectraVote Team
    [Your Website URL]
    [support@electravote.com]
  `;

  try {
    await sendEmail(user.email, subject, message);
    return res.send({ message: "User verified and email sent." });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).send({ error: "Verification email failed to send." });
  }
};
