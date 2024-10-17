const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema(
  {
    contents: {
      type: String,
      required: true
    }
    // taskId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Task',
    //   required: true
    // }
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
