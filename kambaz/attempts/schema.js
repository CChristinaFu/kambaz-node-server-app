import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: String,
  // MULTIPLE_CHOICE: index of selected choice
  selectedChoice: Number,
  // TRUE_FALSE: selected boolean
  selectedBoolean: Boolean,
  // FILL_IN_BLANK: typed answer
  typedAnswer: String,
  correct: Boolean,
});

const attemptSchema = new mongoose.Schema(
  {
    _id: String,
    quiz: { type: String, required: true },
    user: { type: String, required: true },
    attemptNumber: { type: Number, default: 1 },
    answers: [answerSchema],
    score: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 },
    completedAt: { type: Date, default: Date.now },
  },
  { collection: "attempts" }
);

export default attemptSchema;