'use strict'

const todo = require('../models/todo_schema')

const createData = (req, res) => {
  console.log("Body",req.body)
  todo
    .create(req.body)
    .then(data => {
      console.log('New todo Created!', data)
      res.status(201).json(data)
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        console.error('Error Validating!', err)
        res.status(422).json(err)
      } else {
        console.error(err)
        res.status(500).json(err)
      }
    })
}

const readData = (req, res) => {
  todo
    .find()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
}

const updateData = (req, res) => {
  todo
    .findByIdAndUpdate(req.params.id, req.body, {
      useFindAndModify: false,
      new: true
    })
    .then(data => {
      console.log('Todo updated!')
      res.status(201).json(data)
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        console.error('Error Validating!', err)
        res.status(422).json(err)
      } else {
        console.error(err)
        res.status(500).json(err)
      }
    })
}

const deleteData = (req, res) => {
  todo
    .findById(req.params.id)
    .then(data => {
      if (!data) {
        throw new Error('Todo not available')
      }
      return data.remove()
    })
    .then(data => {
      console.log('Todo removed!')
      res.status(200).json(data)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
}

module.exports = {
  createData,
  readData,
  updateData,
  deleteData
}
