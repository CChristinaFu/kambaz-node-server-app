import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function AttemptsDao() {
  const findAttemptsForQuizAndUser = (quizId, userId) =>
    model.find({ quiz: quizId, user: userId }).sort({ attemptNumber: -1 });

  const findLatestAttempt = async (quizId, userId) => {
    const attempts = await model
      .find({ quiz: quizId, user: userId })
      .sort({ attemptNumber: -1 })
      .limit(1);
    return attempts[0] || null;
  };

  const countAttempts = (quizId, userId) =>
    model.countDocuments({ quiz: quizId, user: userId });

  const createAttempt = async (attempt) => {
    const count = await model.countDocuments({
      quiz: attempt.quiz,
      user: attempt.user,
    });
    const newAttempt = {
      ...attempt,
      _id: uuidv4(),
      attemptNumber: count + 1,
    };
    return model.create(newAttempt);
  };

  return {
    findAttemptsForQuizAndUser,
    findLatestAttempt,
    countAttempts,
    createAttempt,
  };
}