import { User } from '../models/user.model.js';
import { goalTarget, questions } from '../utils/data/questions.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Admin } from '../models/admin.model.js';
import signToken from '../utils/signJwt.js';
import { Session } from '../models/session.model.js';
import mongoose from 'mongoose';
import { personalities } from '../utils/data/personalities.js';

dotenv.config();



export const handleCreateUser = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const admin = await Admin.findOne();

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    if (!admin.active) {
      return res.status(403).json({ message: 'No Active Session' });
    }




    const shuffledQuestionIds = questions.map(q => q.id);
    const sq = jwt.sign({ sequence: shuffledQuestionIds }, process.env.JWT_SECRET, { expiresIn: '1d' });

    const newUser = new User({
      name,
      email,
      session: admin.current_session,
      responses: [],
      answered_count: 0,
      wealth: 10000,
      investment: 500,
      sq: sq,
      phone: phone || null,
    });

    const token = signToken(newUser._id.toString(), "USER")

    await newUser.save();

    const updatedSession = await Session.findByIdAndUpdate(
      newUser.session,
      { $inc: { totalPlayers: 1 } },
      { new: true }
    )


    return res.status(201).json({ user: newUser._id, session: newUser.session, sq, token, totalPlayers: updatedSession.totalPlayers });

  } catch (error) {
    console.log('Error creating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const handleGetUser = async (req, res) => {
  const userId = req.query.user;

  try {
    const [userData, admin, session] = await Promise.all([
      User.findById(userId),
      Admin.findOne(),
      User.findById(userId).then(user => user?.session ? Session.findById(user.session).select("totalPlayers") : null)
    ]);

    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    if (!userData.session || userData.session.toString() !== admin.current_session?.toString()) {
      return res.status(403).json({ success: false, message: `Session mismatch: ${userData.session} vs ${admin.current_session}` });
    }

    let goalReachPercentage;

    const result = await User.aggregate([
      { $match: { session: userData.session } },
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          wealthyUsers: { $sum: { $cond: [{ $gt: [{ $add: ['$wealth', '$investment'] }, goalTarget] }, 1, 0] } }
        }
      },
      { $project: { percentage: { $multiply: [{ $divide: ['$wealthyUsers', '$totalUsers'] }, 100] } } }
    ]);


    goalReachPercentage = result.length ? result[0].percentage : 0;

    res.status(200).json({
      success: true,
      user: userData._id,
      name: userData.name,
      email: userData.email,
      session: userData.session,
      sq: userData.sq,
      wealth: userData.wealth,
      totalPlayers: session?.totalPlayers || 0,
      investment: userData.investment,
      goalReachPercentage: goalReachPercentage,
      answered: userData.answered_count,
    });

  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export const countUsersInSession = async (sessionId) => {
  return await User.countDocuments({ session: sessionId });
};

export const handleAnalysis = async (req, res) => {
  const userId = req.query.userId;
  console.log("userId", userId);

  try {
    const userDetails = await User.findById(new mongoose.Types.ObjectId(userId));

    const personalityList = ["Disciplined_Saver", "Balanced_Spender", "The_Hustler", "Hopeful_Borrower", "Live_for_today_Spender"];

    console.log("userDetails", userDetails);
    let maxValue = 0;
    let maxPersonalities;
    personalityList.forEach(personality => {
      if (userDetails[personality] > maxValue) {
        maxValue = userDetails[personality];
      }
    });

    // Find personalities with the maximum value and then extracting personlity

    if (maxValue <= 0)
      return res.status(400).json({
        success: false,
        message: "Score is zero",
      });

    maxPersonalities = personalityList.filter(personality => userDetails[personality] === maxValue);

    if (maxPersonalities[0]) {
      let personalityName = maxPersonalities[0].replaceAll("_", " ");
      console.log(personalityName);

      const personalityDescription = personalities.find(personality => personality.personality === personalityName);
      console.log("personalityDescription", personalityDescription);

      return res.status(200).json({
        success: true,
        message: "Data fetched successfully.",
        analyticsData: {
          name: userDetails.name,
          email: userDetails.email,
          score: {
            Disciplined_Saver: userDetails.Disciplined_Saver,
            Balanced_Spender: userDetails.Balanced_Spender,
            The_Hustler: userDetails.The_Hustler,
            Hopeful_Borrower: userDetails.Hopeful_Borrower,
            Live_for_today_Spender: userDetails.Live_for_today_Spender
          },
          avgResponseTime: userDetails.avgResponseTime,
          // personalityDescription: personalityDescription,
          personalityName: personalityName,
          subCategory: personalityDescription.subCategory,
          strengths: personalityDescription.strengths,
          challenges: personalityDescription.challenges
        },

      })
    }
    else {
      return res.status(400).json({
        success: false,
        message: "No personlity matched"
      })
    }
  }
  catch (err) {
    console.log(err);
  }
}
