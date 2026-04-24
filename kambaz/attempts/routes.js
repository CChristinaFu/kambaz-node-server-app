import AttemptsDao from "./dao.js";

export default function AttemptRoutes(app) {
  const dao = AttemptsDao();

  // Latest attempt for current user on a quiz
  app.get("/api/quizzes/:qid/attempts/latest", async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const attempt = await dao.findLatestAttempt(req.params.qid, currentUser._id);
    res.json(attempt);
  });

  // All attempts for current user on a quiz
  app.get("/api/quizzes/:qid/attempts", async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const attempts = await dao.findAttemptsForQuizAndUser(
      req.params.qid,
      currentUser._id
    );
    res.json(attempts);
  });

  // Submit a new attempt
  app.post("/api/quizzes/:qid/attempts", async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const attempt = await dao.createAttempt({
      ...req.body,
      quiz: req.params.qid,
      user: currentUser._id,
    });
    res.json(attempt);
  });
}