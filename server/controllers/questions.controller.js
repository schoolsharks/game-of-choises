import { Session } from '../models/session.model.js';
import { User } from '../models/user.model.js';
import { goalTarget, questions, SET_1, SET_2, trigger_SET_1 } from '../utils/data/questions.js';
import jwt from 'jsonwebtoken';

import mongoose from 'mongoose';
import { shuffleArray, shuffleQuestions } from '../utils/shuffleArray.js';


const MAX_RETRIES = 10;
const RETRY_DELAY = 200;


// export const handleGetQuestion_2 = async (req, res) => {
//   const { id, sq, response, quesId } = req.body;

//   if (!id || !sq) {
//     return res.status(403).json({ message: 'Bad Request' });
//   }

//   try {
//     const user = await User.findById(id.toString());
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     let sqDecoded;
//     try {
//       sqDecoded = jwt.verify(sq, process.env.JWT_SECRET);
//     } catch (err) {
//       return res.status(400).json({ message: 'Bad Request', error: err });
//     }

//     const sequence = sqDecoded.sequence;
//     console.log("Sequencee", sequence);

//     if (user.answered_count === questions.length) {
//       return res.status(200).json({ message: 'You have answered all the questions' });
//     }

//     let updatedUser = user;

//     if (quesId) {
//       const responseExists = user.responses.some(r => r.quesId === quesId);
//       if (!responseExists) {
//         updatedUser = await updateUserResponses(user._id, quesId, response);
//       }
//     }

//     let nextQuesId;
//     if (updatedUser) {
//       nextQuesId = updatedUser.answered_count < sequence.length ? sequence[updatedUser.answered_count] : null;
//     } else {
//       nextQuesId = user.answered_count < sequence.length ? sequence[user.answered_count] : null;
//     }

//     // let goalReachPercentage;

//     // if (updatedUser.answered_count === questions.length) {
//     //   const result = await User.aggregate([
//     //     { $match: { session: user.session } },
//     //     {
//     //       $group: {
//     //         _id: null,
//     //         totalUsers: { $sum: 1 },
//     //         // wealthyUsers: { $sum: { $cond: [{ $gt: [{ $add: ['$wealth', '$investment'] }, goalTarget] }, 1, 0] } }
//     //       }
//     //     },
//     //     { $project: { percentage: { $multiply: [{ $divide: ['$wealthyUsers', '$totalUsers'] }, 100] } } }
//     //   ]);
//     //   goalReachPercentage = result.length ? result[0].percentage : 0;
//     // }


//     if (nextQuesId) {
//       const nextQuestion = questions.find(q => q.id === nextQuesId);
//       const session = await Session.findById(user.session).select("totalPlayers")
//       res.status(200).json({
//         nextQ: nextQuestion.question,
//         nextOptions: {
//           A: nextQuestion.options['A'].content,
//           B: nextQuestion.options['B'].content
//         },
//         nextQuesId: nextQuestion.id,
//         // year: nextQuestion.year,
//         // goalReachPercentage: goalReachPercentage,
//         // wealth: updatedUser ? updatedUser.wealth : user.wealth,
//         // investment: updatedUser ? updatedUser.investment : user.investment,
//         totalPlayers: session.totalPlayers,
//         answered: updatedUser ? updatedUser.answered_count : user.answered_count,
//       });
//     } else {
//       res.status(200).json({ message: 'You have answered all the questions' });
//     }


//   } catch (error) {
//     console.error('Error fetching question:', error);
//     if (!res.headersSent) {
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   }
// };

// const updateUserResponses_2 = async (userId, quesId, response) => {
//   for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//       const userDoc = await User.findOneAndUpdate(
//         { _id: userId, 'responses.quesId': { $ne: quesId } },
//         { $push: { responses: { quesId, response, timestamp: Date.now() } } },
//         { session, new: true }
//       );

//       if (!userDoc) {
//         await session.abortTransaction();
//         session.endSession();
//         return null;
//       }

//       const question = questions.find(q => q.id == quesId);
//       const option = question.options[response];

//       console.log("option", option, userId, quesId, response)


//       userDoc.Disciplined_Saver += option.Disciplined_Saver;
//       userDoc.Balanced_Spender += option.Balanced_Spender;
//       userDoc.The_Hustler += option.The_Hustler;
//       userDoc.Hopeful_Borrower += option.Hopeful_Borrower;
//       userDoc.Live_for_today_Spender += option.Live_for_today_Spender;

//       // userDoc.wealth += option.wealth;
//       // userDoc.investment += option.investment;
//       userDoc.answered_count += 1;


//       const totalResponseTime = (Date.now() - userDoc.createdAt) / 1000;
//       userDoc.avgResponseTime = totalResponseTime / userDoc.answered_count;

//       userDoc.version += 1;

//       await userDoc.save({ session });
//       await session.commitTransaction();
//       session.endSession();

//       return userDoc;

//     } catch (error) {
//       if (session.inTransaction()) {
//         await session.abortTransaction();
//       }
//       session.endSession();

//       if (attempt === MAX_RETRIES) {
//         throw error;
//       }

//       console.error('Retrying due to write conflict, attempt:', attempt);
//       await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt));
//     }
//   }
// };



//  ************ below function have functionlity to handle multiple set
export const handleGetQuestion = async (req, res) => {
  const { id, sq, response, quesId } = req.body;

  if (!id || !sq) {
    return res.status(403).json({ message: 'Bad Request' });
  }

  try {
    const user = await User.findById(id.toString());
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let sqDecoded;
    try {
      sqDecoded = jwt.verify(sq, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ message: 'Bad Request', error: err });
    }

    const sequence = sqDecoded.sequence;

    // console.log("sequence", sequence);
    const questionSequece = sequence.map((q)=>q.id);
    // console.log("sequence", sequence)

    // console.log(user);
    let questionSet;
    if (user.activeSet === null) {
      user.activeSet = "SET_1"
      await user.save();
      questionSet = SET_1;
    }
    else if (user.activeSet === "SET_1") {
      questionSet = SET_1;
    }
    else if (user.activeSet === "SET_2") {
      questionSet = SET_2;
    }

    // console.log("questionSet", questionSet);

    // console.log("user.answerdCpunt", user.answered_count, sequence.length)
    if (user.answered_count === sequence.length) {
      return res.status(200).json({ message: 'You have answered all the questions' });
    }

    let updatedUser = user;

    if (quesId) {
      const responseExists = user.responses.some(r => r.quesId === quesId);
      if (!responseExists) {
        updatedUser = await updateUserResponses(user._id, quesId, response, questionSet);
      }
    }

    let nextQuesId;
    if (updatedUser) {
      nextQuesId = updatedUser.answered_count < sequence.length ? questionSet.find((q)=> q.id === sequence[updatedUser.answered_count])  : null;
    } else {
      nextQuesId = user.answered_count < sequence.length ? questionSet.find((q)=> q.id === sequence[user.answered_count]) : null;
    }

    // console.log("nextQuesId", nextQuesId)

    if (nextQuesId) {
      // console.log("questionSet", nextQuesId);
      const nextQuestion = nextQuesId;
      // console.log("nextQuestion", nextQuestion);
      const session = await Session.findById(user.session).select("totalPlayers")
      res.status(200).json({
        nextQ: nextQuestion.question,
        nextOptions: {
          A: nextQuestion.options['A'].content,
          B: nextQuestion.options['B'].content
        },
        nextQuesId: nextQuestion.id,
        totalPlayers: session.totalPlayers,
        answered: updatedUser ? updatedUser.answered_count : user.answered_count,
      });
    } else {
      res.status(200).json({ message: 'You have answered all the questions nextQuesId' });
    }


  } catch (error) {
    console.error('Error fetching question:', error);
    if (!res.headersSent) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const updateUserResponses = async (userId, quesId, response, questionSet) => {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const userDoc = await User.findOneAndUpdate(
        { _id: userId, 'responses.quesId': { $ne: quesId } },
        { $push: { responses: { quesId, response, timestamp: Date.now() } } },
        { session, new: true }
      );

      if (!userDoc) {
        await session.abortTransaction();
        session.endSession();
        return null;
      }

      const question = questionSet.find(q => q.id == quesId);
      const option = question.options[response];

      // console.log("option", option, userId, quesId, response)


      userDoc.Disciplined_Saver += option.Disciplined_Saver;
      userDoc.Balanced_Spender += option.Balanced_Spender;
      userDoc.The_Hustler += option.The_Hustler;
      userDoc.Hopeful_Borrower += option.Hopeful_Borrower;
      userDoc.Live_for_today_Spender += option.Live_for_today_Spender;
      userDoc.answered_count += 1;


      const totalResponseTime = (Date.now() - userDoc.createdAt) / 1000;
      userDoc.avgResponseTime = totalResponseTime / userDoc.answered_count;

      userDoc.version += 1;

      await userDoc.save({ session });
      await session.commitTransaction();
      session.endSession();

      return userDoc;

    } catch (error) {
      if (session.inTransaction()) {
        await session.abortTransaction();
      }
      session.endSession();

      if (attempt === MAX_RETRIES) {
        throw error;
      }

      console.error('Retrying due to write conflict, attempt:', attempt);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt));
    }
  }
};