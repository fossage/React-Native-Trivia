'use strict';

const model = 'category';
// const Category = require('../models/Category');
const request = require('request');
const apiRoot = 'http://jservice.io/api';
const graphql = require('graphql').graphql();
const querystring = require('querystring');

/**
 * A set of functions called "actions" for `category`
 */

module.exports = {

  /**
   * Get category entries.
   *
   * @return {Object|Array}
   */

  find: function * () {
    try {
      let queryParams = querystring.parse(this.originalUrl.split('?')[1]);
      let query       = JSON.parse(queryParams.where);
      let defer       = Promise.defer();

      if(!query.skip) query.skip = Math.floor(Math.random() * 600);
      if(!query.limit) query.limit = 20;

      Category
      .find(query)
      .populate('clues')
      .exec((err, data) => {
        if(err) defer.reject(err);
        console.log(data)
        defer.resolve(data);
      });

      this.body = yield defer.promise;
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Get a specific category.
   *
   * @return {Object|Array}
   */

  findOne: function * () {
    this.model = model;
    
    try {
      let entry = yield strapi.hooks.blueprints.findOne(this);
      this.body = entry;
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Create a category entry.
   *
   * @return {Object}
   */

  create: function * () {
    this.model = model;
    try {
      let entry = yield strapi.hooks.blueprints.create(this);
      this.body = entry;
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Update a category entry.
   *
   * @return {Object}
   */

  update: function * () {
    this.model = model;
    try {
      let entry = yield strapi.hooks.blueprints.update(this);
      this.body = entry;
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Destroy a category entry.
   *
   * @return {Object}
   */

  destroy: function * () {
    this.model = model;
    try {
      let entry = yield strapi.hooks.blueprints.destroy(this);
      this.body = entry;
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Add an entry to a specific category.
   *
   * @return {Object}
   */

  add: function * () {
    this.model = model;
    try {
      let entry = yield strapi.hooks.blueprints.add(this);
      this.body = entry;
    } catch (err) {
      this.body = err;
    }
  },

  /**
   * Remove a specific entry from a specific category.
   *
   * @return {Object}
   */

  remove: function * () {
    this.model = model;
    try {
      let entry = yield strapi.hooks.blueprints.remove(this);
      this.body = entry;
    } catch (err) {
      this.body = err;
    }
  }
};
