'use strict'

const mongoose = require('mongoose')

const styleSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  created: { type: Date, default: Date.now }
});

styleSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Style', styleSchema);
