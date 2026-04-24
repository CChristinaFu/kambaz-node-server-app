import QuizzesDao from "./dao.js";

export default function QuizRoutes(app) {
  const dao = QuizzesDao();

  // List quizzes for a course
  app.get("/api/courses/:cid/quizzes", async (req, res) => {
    const quizzes = await dao.findQuizzesForCourse(req.params.cid);
    res.json(quizzes);
  });

  // Get one quiz
  app.get("/api/quizzes/:qid", async (req, res) => {
    const quiz = await dao.findQuizById(req.params.qid);
    res.json(quiz);
  });

  // Create quiz for a course
  app.post("/api/courses/:cid/quizzes", async (req, res) => {
    const quiz = { ...req.body, course: req.params.cid };
    const newQuiz = await dao.createQuiz(quiz);
    res.json(newQuiz);
  });

  // Update quiz
  app.put("/api/quizzes/:qid", async (req, res) => {
    const updated = await dao.updateQuiz(req.params.qid, req.body);
    res.json(updated);
  });

  // Delete quiz
  app.delete("/api/quizzes/:qid", async (req, res) => {
    await dao.deleteQuiz(req.params.qid);
    res.sendStatus(200);
  });

  // Publish / unpublish
  app.put("/api/quizzes/:qid/publish", async (req, res) => {
    const { published } = req.body;
    const updated = await dao.publishQuiz(req.params.qid, published);
    res.json(updated);
  });

  // Add question
  app.post("/api/quizzes/:qid/questions", async (req, res) => {
    const question = await dao.addQuestion(req.params.qid, req.body);
    res.json(question);
  });

  // Update question
  app.put("/api/quizzes/:qid/questions/:questionId", async (req, res) => {
    const question = await dao.updateQuestion(
      req.params.qid,
      req.params.questionId,
      req.body
    );
    res.json(question);
  });

  // Delete question
  app.delete("/api/quizzes/:qid/questions/:questionId", async (req, res) => {
    await dao.deleteQuestion(req.params.qid, req.params.questionId);
    res.sendStatus(200);
  });
}