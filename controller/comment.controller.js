const Task = require("../models/task");
const Comment = require("../models/comment");

const CommentController = {};

CommentController.addCommentToTask = async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    await newComment.save();

    // add commentId to Task
    const task = await Task.findById(req.params.taskId);
    task.comments.push(newComment._id);
    await task.save();
    res.status(201).json({ status: "Success", data: task });
  } catch (err) {
    res.status(400).json({ status: "Failed", error: err.message });
  }
};

CommentController.getAllComments = async (req, res) => {
  try {
    const commentList = await Task.findById(req.params.taskId).populate("comments")
    console.log(commentList.comments)
    res.status(200).json({ status: "Success", data: commentList });
  } catch (err) {
    res.status(400).json({ status: "Failed", error: err });
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
    const { taskId, commentId } = req.params
    const removedComment = await Comment.findByIdAndDelete(commentId);
    const task = await Task.findById(taskId)
    task.comments.pull(commentId)
    res.status(200).json({ status: "Success", data: task });
  } catch (err) {
    res.status(400).json({ status: "Failed", error: err });
  }
};

module.exports = CommentController;
