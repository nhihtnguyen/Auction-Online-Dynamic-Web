const db = require('../utils/db');

module.exports = {
  
  add: entity => db.add('product_info',entity),
  
};