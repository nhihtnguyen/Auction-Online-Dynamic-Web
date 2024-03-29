module.exports = function(app) {
    //bê ngoài app.js vô đây cho gọn 
    app.use('/categories', require('../routes/category.route'));
    app.use('/admin/categories', require('../routes/admin/category.route'));
    app.use('/account', require('../routes/account.route'));
    app.use('/admin/users', require('../routes/admin/user.route'));
    app.use('/search', require('../routes/main.route'));
    app.use('/user', require('../routes/user/inform.route'));
    app.use('/user/information', require('../routes/user/user.route'));
    app.use('/demo', require('../routes/demo.route'));
    app.use('/sell', require('../routes/seller/seller.route'));
    app.use('/', require('../routes/home.route'));
    app.use('/products', require('../routes/product.route'));

};