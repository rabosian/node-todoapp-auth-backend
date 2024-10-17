const Task = require("../models/task");
const Comment = require("../models/comment");

const CommentController = {};

CommentController.createComment = async (req, res) => {
  try {
    const contents = req.body.contents;
    const taskId = req.params.taskId;
    // create Comment
    const newComment = new Comment({ contents, taskId });
    await newComment.save();

    // add commentId to Task
    const task = await Task.findById(taskId);
    task.comments.push(newComment._id);
    await task.save();
    res.status(200).json({ status: "Success", data: task, newComment });
  } catch (err) {
    console.log("POST error: ", err);
    res.status(400).json({ status: "Failed", error: err });
  }
};

CommentController.getAllComments = async (req, res) => {
  try {
    const { taskId } = req.params;
    const commentList = await Task.findById(taskId).populate('comments').select("-__v");
    if (!commentList) {
      throw new Error("Tasks NOT found")
    }
    res.status(200).json({ status: "Success", data: commentList });
  } catch (err) {
    res.status(400).json({ status: "Failed", error: err.message });
  }
};

CommentController.updateComment = async (req, res) => {
  try {
    const { contents } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { contents: contents },
      { new: true }
    );
    res.status(200).json({ status: "Success", data: updatedComment });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "Failed", error: err });
  }
};

CommentController.deleteComment = async (req, res) => {
  try {
    const removedComment = await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "Success", data: removedComment });
  } catch (err) {
    res.status(400).json({ status: "Failed", error: err });
  }
};

module.exports = CommentController;
