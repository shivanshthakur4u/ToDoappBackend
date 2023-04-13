const mongoose = require("mongoose");


const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      priority: {
        type: Number,
        required: true,
        min: 1,
        max: 9
      },
      status: {
        type: String,
        enum: ['Pending', 'Completed', 'Canceled', 'Deleted'],
        default: 'Pending'
      },
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
})

mongoose.model("Task",TaskSchema);