import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function QuizzesDao() {
  const findQuizzesForCourse = (courseId) => model.find({ course: courseId });

  const findQuizById = (quizId) => model.findById(quizId);

  const createQuiz = (quiz) => {
    const newQuiz = { ...quiz, _id: uuidv4() };
    return model.create(newQuiz);
  };

  const updateQuiz = (quizId, updates) =>
    model.findByIdAndUpdate(quizId, { $set: updates }, { new: true });

  const deleteQuiz = (quizId) => model.findByIdAndDelete(quizId);

  const publishQuiz = (quizId, published) =>
    model.findByIdAndUpdate(quizId, { $set: { published } }, { new: true });

  // Question operations
  const addQuestion = async (quizId, question) => {
    const newQuestion = { ...question, _id: uuidv4() };
    await model.findByIdAndUpdate(quizId, {
      $push: { questions: newQuestion },
    });
    return newQuestion;
  };

  const updateQuestion = async (quizId, questionId, updates) => {
    const quiz = await model.findById(quizId);
    const question = quiz.questions.id(questionId);
    if (!question) return null;
    Object.assign(question, updates);
    await quiz.save();
    return question;
  };

  const deleteQuestion = (quizId, questionId) =>
    model.findByIdAndUpdate(quizId, {
      $pull: { questions: { _id: questionId } },
    });

  return {
    findQuizzesForCourse,
    findQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    publishQuiz,
    addQuestion,
    updateQuestion,
    deleteQuestion,
  };
}