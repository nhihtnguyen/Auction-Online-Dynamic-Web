const express = require('express');
const productModel = require('../models/product.model');
const config = require('../config/default.json');
const router = express.Router();
const moment = require('moment');
//
// xem ds sản phẩm thuộc danh mục :id
//dấu : để hiện giá trị
router.get('/:id/products', async (req, res) => {

  for (const c of res.locals.lcCategories) {
    if (c.CatID === +req.params.id) {
      c.isActive = true;
    }
  }

  const catId = req.params.id;
  const limit = config.paginate.limit;

  const page = req.query.page || 1;
  if (page < 1) page = 1;
  const offset = (page - 1) * config.paginate.limit;

  const [total, rows] = await Promise.all([
    productModel.countByCat(catId),
    productModel.pageByCat(catId, offset)
  ]);

  // const total = await productModel.countByCat(catId);
  let nPages = Math.floor(total / limit);
  if (total % limit > 0) nPages++;
  const page_numbers = [];
  for (i = 1; i <= nPages; i++) {
    page_numbers.push({
      value: i,
      isCurrentPage: i === +page
    })
  }

  // const rows = await productModel.pageByCat(catId, offset);
  res.render('vwProducts/allByCat', {
    products: rows,
    empty: rows.length === 0,
    page_numbers,
    prev_value: +page - 1,
    next_value: +page + 1,
  });
});
// vw product detail
  router.get('/products/:id', async (req, res) => {

    const catId = req.params.id;
    const rows= await productModel. single_info_seller(catId);
    rows[0].BuyDate=moment(rows[0].BuyDate).format("DD MMM YYYY");
    rows[0].EndDate=moment(rows[0].EndDate).format("DD MMM YYYY");
    const date = new Date(rows[0].EndDate);
    const timeleft = moment(date-Date.now()).format('HH:mm:ss');;

//     const date2 = new Date(null);
// date2.setSeconds(timeleft); // specify value for SECONDS here
// const timeString = date2.toISOString().substr(11, 8);
   
    // console.log(date);
    // console.log(timeleft);
    // console.log(timeString);
    
    res.render('vwProducts/detail', {
      products: rows[0],
      empty: rows.length === 0,
      layout:false,
      timeleft: timeleft,
    
    });
  

})

module.exports = router;