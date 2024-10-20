const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema(
  {
    contents: {
      type: String,
      required: true
    },
    // taskId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Task',
    //   required: true
    // }
  },
  { timestamps: true }
);

commentSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  return obj;
};

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
