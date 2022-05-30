const Goal = require("./../modals/Goal");
exports.create = async (req, res) => {
  if (!req.body.task) {
    return res.status(400).send({
      message: "Task content can not be empty",
    });
  }
  const todo = new Goal({
    task: req.body.task,
    status: req.body.status,
    user: req.user.id,
  });
  try {
    const data = await todo.save();

    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};
exports.findAll = async (req, res) => {
  try {
    const result = await Goal.find({ user: req.user.id });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};
exports.findOne = async (req, res) => {
  try {
    const result = await Goal.findById(req.params.goalId);
    if (!result) {
      return res.status(404).send({
        message: "Note not found with id " + req.params.goalId,
      });
    }
    res.send(result);
    // res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Task can not be empty",
    });
  }

  // Find note and update it with the request body
  Goal.findByIdAndUpdate(
    req.params.goalId,
    {
      task: req.body.task || "Untitled Note",
      status: req.body.status,
    },
    { new: true }
  )
    .then((todo) => {
      if (!todo) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.goalId,
        });
      }
      res.send(todo);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Task not found with id " + req.params.goalId,
        });
      }
      return res.status(500).send({
        message: "Error updating note with id " + req.params.goalId,
      });
    });
};

exports.delete = (req, res) => {
  Goal.findByIdAndRemove(req.params.goalId)
    .then((task) => {
      if (!task) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.goalId,
        });
      }

      res.status(200).json({ id: req.params.goalId });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.goalId,
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.goalId,
      });
    });
};
