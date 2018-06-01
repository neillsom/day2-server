'use strict'

const express = require('express');
const mongoose = require('mongoose');
// const passport = require('passport');

const Style = require('../models/style');

const router = express.Router();

// Protect endpoints with jwtStrategy
// router.use('/', passport.authenticate('jwt', {session: false, failWithError: true}));

const styles = [
  { name: 'Long Outward Curls With One Side Tucked Behind Ear' },
  { name: 'Highlighted Messy Updo With Long Side-Swept Bang' },
  { name: 'Straight Layered Blonde Hair With Side-Swept Bang' }
];

// Get all
router.get('/', (req, res, next) => {
  // const { searchTerm } = req.query;
  //
  // const userId = req.user.id;
  //
  // let filter = { userId };
  //
  // if (searchTerm) {
  //   const re = new RegExp(searchTerm, 'i');
  //   filter.title = { $regex: re };
  // }

  // Style.find(filter)
  //   .populate('')
  //   .sort('created')
  //   .then(results => {
  //     res.json(results);
  //   })
  //   .catch(err => {
  //     next(err)
  //   });

  // Style.find()
  //   .then(results => {
  //     res.json(results);
  //   })
  //   .catch(err => {
  //     next(err)
  //   });

    res.json(styles)

});

// Get single item
router.get('/:id', (req, res, next) => {
  const {id} = req.params;
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Style.findOne({_id: id, userId })
    .populate('')
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next()
      }
    })
    .catch(err => {
      next(err);
    });
});

// Post single item
router.post('/', (req, res, next) => {
  const { title, content } = req.body;

  // input validation
  if (!title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  Style.create({title, content})
    .then(result => {
      res
        .location(`${req.originalUrl}/${result.id}`)
        .status(201)
        .json(result);
    })
    .catch(err => {
      next(err)
    });
});

// Put / Update single item
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  /***** Never trust users - validate input *****/
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  if (!title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }


  Note.findByIdAndUpdate(id, { title, content }, { new: true })
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});


// delete item
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  Note.findByIdAndRemove(id)
    .then(() => {
      res.status(204).end();
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
