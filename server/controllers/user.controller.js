import { User } from "../models/user.model.js";
import { goalTarget, SET_1, SET_2,
  //  trigger_SET_1, trigger_SET_2 
  } from "../utils/data/questions.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Admin } from "../models/admin.model.js";
import signToken from "../utils/signJwt.js";
import { Session } from "../models/session.model.js";
import mongoose from "mongoose";
import { personalities } from "../utils/data/personalities.js";
import { shuffleQuestions } from "../utils/shuffleArray.js";
import { Offer } from "../models/offers.model.js";

dotenv.config();

function aggregateValues(set) {
  const aggregatedValues = {
    Max_Disciplined_Saver: 0,
    Max_Balanced_Spender: 0,
    Max_The_Hustler: 0,
    Max_Hopeful_Borrower: 0,
    Max_Live_for_today_Spender: 0
  };

  set.forEach(item => {
    Object.values(item.options).forEach(option => {
      if (option.Disciplined_Saver > 0) {
        aggregatedValues.Max_Disciplined_Saver += option.Disciplined_Saver;
      }
      if (option.Balanced_Spender > 0) {
        aggregatedValues.Max_Balanced_Spender += option.Balanced_Spender;
      }
      if (option.The_Hustler > 0) {
        aggregatedValues.Max_The_Hustler += option.The_Hustler;
      }
      if (option.Hopeful_Borrower > 0) {
        aggregatedValues.Max_Hopeful_Borrower += option.Hopeful_Borrower;
      }
      if (option.Live_for_today_Spender > 0) {
        aggregatedValues.Max_Live_for_today_Spender += option.Live_for_today_Spender;
      }
    });
  });

  return aggregatedValues;
}

const evaluatingOfferPercentage = async () => {
  try {
    const totaluser = await User.countDocuments();
    const offers = await Offer.aggregate([
      {
        $project: {
          offer: 1,
          count: 1,
          percentage: {
            $cond: {
              if: { $eq: [{ $literal: totaluser }, 0] },
              then: 0,
              else: {
                $round: [
                  { $multiply: [{ $divide: ["$count", totaluser] }, 100] },
                  0
                ]
              }
            }
          }
        }
      }
    ]);

    return offers;
  }
  catch (error) {
    console.log();
    return [];
  }
}


export const handleCreateUser = async (req, res) => {
  const { name, email, phone, companyName } = req.body;

  try {
    const admin = await Admin.findOne();

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    if (!admin.active) {
      return res.status(403).json({ message: "No Active Session" });
    }

    // const shuffledQuestionIds = questions.map((q) => q.id);

    // Removed Shuffeling of questions

    // const shuffledQuestionArray = shuffleQuestions(SET_1, trigger_SET_1);

    // const questionIdsArray = shuffledQuestionArray.map((q) => q.id);
    const questionIdsArray = SET_1.map((q) => q.id);
    

    console.log("shuffledQuestionArray", questionIdsArray);
    const sq = jwt.sign(
      { sequence: questionIdsArray },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const newUser = new User({
      name,
      email,
      phone: phone || null,
      companyName,
      session: admin.current_session,
      responses: [],
      answered_count: 0,
      sq: sq,
    });

    const token = signToken(newUser._id.toString(), "USER");

    await newUser.save();

    const updatedSession = await Session.findByIdAndUpdate(
      newUser.session,
      { $inc: { totalPlayers: 1 } },
      { new: true }
    );

    return res.status(201).json({
      user: newUser._id,
      session: newUser.session,
      sq,
      token,
      totalPlayers: updatedSession.totalPlayers,
    });
  } catch (error) {
    console.log("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const handleGetUser = async (req, res) => {
  const userId = req.query.user;

  try {
    const [userData, admin, session] = await Promise.all([
      User.findById(userId),
      Admin.findOne(),
      User.findById(userId).then((user) =>
        user?.session
          ? Session.findById(user.session).select("totalPlayers")
          : null
      ),
    ]);

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    if (
      !userData.session ||
      userData.session.toString() !== admin.current_session?.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: `Session mismatch: ${userData.session} vs ${admin.current_session}`,
      });
    }

    let goalReachPercentage;


    res.status(200).json({
      success: true,
      user: userData._id,
      name: userData.name,
      email: userData.email,
      session: userData.session,
      sq: userData.sq,
      totalPlayers: session?.totalPlayers || 0,
      answered: userData.answered_count,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const countUsersInSession = async (sessionId) => {
  return await User.countDocuments({ session: sessionId });
};

export const handleStorage = async (req, res) => {
  const { userId } = req.body;
  console.log("userId ", userId);
  if (userId === undefined) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is still required" });
  }

  try {
    const user = await User.findById(new mongoose.Types.ObjectId(userId));
    console.log("user", user);
    const currscore = {
      Disciplined_Saver: user.Disciplined_Saver,
      Balanced_Spender: user.Balanced_Spender,
      The_Hustler: user.The_Hustler,
      Hopeful_Borrower: user.Hopeful_Borrower,
      Live_for_today_Spender: user.Live_for_today_Spender,
    };
    console.log("currscore", currscore);
    user.prevScore.push(currscore);
    user.responses = [];
    user.Disciplined_Saver = 0;
    user.Balanced_Spender = 0;
    user.The_Hustler = 0;
    user.Hopeful_Borrower = 0;
    user.Live_for_today_Spender = 0;
    user.avgResponseTime = 0;
    user.answered_count = 0;


    if (user.activeSet === "SET_2") {
      user.activeSet = 'SET_1'

      // const shuffledQuestionArray = shuffleQuestions(SET_1, trigger_SET_1);
      // console.log("shuffledQuestionArray", shuffledQuestionArray)
      // const questionIdsArray = shuffledQuestionArray.map((q) => q.id);

      const questionIdsArray = SET1.map((q) => q.id);
      const sq = jwt.sign(
        { sequence: questionIdsArray },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      user.sq = sq;
    }
    else if (user.activeSet === "SET_1") {
      // const shuffledQuestionArray = shuffleQuestions(SET_2, trigger_SET_2);
      // console.log("shuffledQuestionArray", shuffledQuestionArray)
      // const questionIdsArray = shuffledQuestionArray.map((q) => q.id);
      
      const questionIdsArray = SET_2.map((q) => q.id);
      const sq = jwt.sign(
        { sequence: questionIdsArray },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      user.activeSet = "SET_2"
      user.sq = sq;
      console.log("set 2 created");
    }

    await user.save();
    const newuser = await User.findById(
      new mongoose.Types.ObjectId(userId)
    ).exec();
    console.log("newuser", newuser);
    return res.status(200).json({
      success: true,
      message: "User score updated successfully",
      data: newuser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const handleAnalysis = async (req, res) => {
  const userId = req.query.userId;
  console.log("userId", userId);

  try {
    const userDetails = await User.findById(
      new mongoose.Types.ObjectId(userId)
    );

    let questionSet;
    if (userDetails.activeSet === "SET_1")
      questionSet = SET_1
    else if (userDetails.activeSet === "SET_2") {
      questionSet = SET_2
    }

    let {
      Max_Disciplined_Saver,
      Max_Balanced_Spender,
      Max_Hopeful_Borrower,
      Max_Live_for_today_Spender,
      Max_The_Hustler
    } = aggregateValues(questionSet);

    const personalityList = [
      "Disciplined_Saver",
      "Balanced_Spender",
      "The_Hustler",
      "Hopeful_Borrower",
      "Live_for_today_Spender",
    ];

    // console.log("userDetails hai ab", userDetails);
    let maxValue = 0;
    let maxPersonalities;
    personalityList.forEach((personality) => {
      if (userDetails[personality] > maxValue) {
        maxValue = userDetails[personality];
      }
    });

    let personalityPercentages = {};
    if (maxValue > 0) {
      personalityList.forEach((personality) => {
        const score = userDetails[personality];
        const percentage = (score / maxValue) * 100;
        personalityPercentages[personality] = percentage.toFixed(0);
      });
    } else {
      personalityList.forEach((personality) => {
        personalityPercentages[personality] = 0;
      });
    }

    maxPersonalities = personalityList.filter(
      (personality) => userDetails[personality] === maxValue
    );

    if (maxPersonalities[0]) {
      let personalityName = maxPersonalities[0].replaceAll("_", " ");
      console.log(personalityName);

      const personalityDescription = personalities.find(
        (personality) => personality.personality === personalityName
      );

      const offers = await evaluatingOfferPercentage();

      const overallUsersData = await User.aggregate([
        {
          $group: {
            _id: null,
            Disciplined_Saver: { $avg: "$Disciplined_Saver" },
            Balanced_Spender: { $avg: "$Balanced_Spender" },
            The_Hustler: { $avg: "$The_Hustler" },
            Hopeful_Borrower: { $avg: "$Hopeful_Borrower" },
            Live_for_today_Spender: { $avg: "$Live_for_today_Spender" },
            totalUsers: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            Disciplined_Saver: 1,
            Balanced_Spender: 1,
            The_Hustler: 1,
            Hopeful_Borrower: 1,
            Live_for_today_Spender: 1,
            totalUsers: 1
          }
        }
      ]);


      return res.status(200).json({
        success: true,
        message: "Data fetched successfully.",
        analyticsData: {
          name: userDetails.name,
          email: userDetails.email,
          // score: {
          //   Disciplined_Saver: (userDetails.Disciplined_Saver / Max_Disciplined_Saver) * 100,
          //   Balanced_Spender: (userDetails.Balanced_Spender / Max_Balanced_Spender) * 100,
          //   The_Hustler: (userDetails.The_Hustler / Max_The_Hustler) * 100,
          //   Hopeful_Borrower: (userDetails.Hopeful_Borrower / Max_Hopeful_Borrower) * 100,
          //   Live_for_today_Spender: (userDetails.Live_for_today_Spender / Max_Live_for_today_Spender) * 100,
          // },
          riskTaker: {
            Savings_Behaviour: {
              user: Math.round((userDetails.Disciplined_Saver / Max_Disciplined_Saver) * 100),
              avg: Math.round((overallUsersData[0].Disciplined_Saver / Max_Disciplined_Saver) * 100),
            },
            Investment_Risk_Tolerance: {
              user: Math.round(((userDetails.The_Hustler + userDetails.Balanced_Spender) / (Max_The_Hustler + Max_Balanced_Spender)) * 100),
              avg: Math.round(((overallUsersData[0].The_Hustler + overallUsersData[0].Balanced_Spender) / (Max_The_Hustler + Max_Balanced_Spender)) * 100),
            },
            Debt_Management: {
              user: Math.round((userDetails.Hopeful_Borrower / Max_Hopeful_Borrower) * 100),
              avg: Math.round((overallUsersData[0].Hopeful_Borrower / Max_Hopeful_Borrower) * 100)
            },
            Lifestyle_Choices: {
              user: Math.round((userDetails.Live_for_today_Spender / Max_Live_for_today_Spender) * 100),
              avg: Math.round((overallUsersData[0].Live_for_today_Spender / Max_Live_for_today_Spender) * 100)
            }
          },
          scoreArray: [
            Math.round((userDetails.Disciplined_Saver / Max_Disciplined_Saver) * 100),
            Math.round((userDetails.Balanced_Spender / Max_Balanced_Spender) * 100),
            Math.round((userDetails.The_Hustler / Max_The_Hustler) * 100),
            Math.round((userDetails.Hopeful_Borrower / Max_Hopeful_Borrower) * 100),
            Math.round((userDetails.Live_for_today_Spender / Max_Live_for_today_Spender) * 100),
          ],
          offers,
          avgResponseTime: userDetails.avgResponseTime,
          personalityName: personalityName,
          badge: personalityDescription.badge,
          badge_tagline: personalityDescription.badge_tagline,
          insights: personalityDescription.insights,
          personalityScore: personalityPercentages[maxPersonalities[0]],
          subCategory: personalityDescription.subCategory,
          strengths: personalityDescription.strengths,
          challenges: personalityDescription.challenges,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No personlity matched",
      });
    }
  } catch (err) {
    console.log(err);
  }
};