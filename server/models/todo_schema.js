const { Schema, model } = require('mongoose')

const todoSchema = new Schema(
  {
    todotext: {
      type: String,
      required: [true, 'text field is required']
    },
    complete: {
      type: Boolean,
      required: [true, 'complete field is required']
    }
  },
  { timestamps: true }
)

module.exports = model('todo', todoSchema)
