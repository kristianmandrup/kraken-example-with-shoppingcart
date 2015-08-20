'use strict';
var Product = require('../../models/product');
var getBundle = require('../../lib/getBundle');

module.exports = function (router) {

	/**
	 * Display the shopping cart
	 */
	router.get('/', getBundle, function (req, res) {

		//Retrieve the shopping cart from memory
		var cart = req.session.cart;
		var locals = res.locals;
		var i18n = res.app.kraken.get('i18n');
		var locality = locals && locals.context && locals.context.locality || i18n.fallback;
		var cartLength;
		if (!cart) {
			res.bundle.get({'bundle': 'messages', 'model': {}, 'locality': locality}, function bundleReturn(err, messages) {
				res.render('result', {result: messages.empty, continueMessage: messages.keepShopping});
			});

			return;
		}

		var displayCart = {items: [], total: 0};
		var total = 0;

		//Ready the products for display
		for (var item in cart) {
			var cartItem = cart[item];
			displayCart.items.push(cartItem);

			total += (cartItem.qty * cartItem.price);
		}

		req.session.total = displayCart.total = total.toFixed(2);
		cartLength = Object.keys(cart).length;

		var model =
		{
			cart: displayCart
		};

		res.bundle.get({'bundle': 'messages', 'model': {'cartItemLength': cartLength}, 'locality': locality}, function bundleReturn(err, messages) {
			model.itemsInCart = messages.items;
			res.render('cart', model);
		});

	});

	function populateCart(cart, orderObj) {
		//Add or increase the product quantity in the shopping cart.
		var product = orderObj.product
		var id = product.id;

		if (cart[id]) {
			cart[id].qty += orderObj.qty;
		}
		else {
			var LineItem = require('../../models/line-item');
			var newLineItem = new LineItem({qty: orderObj.qty});
			newLineItem.setProduct(product.obj);
			cart[id] = newLineItem;
		}
		return cart;
	}

	/**
	 * Add an item to the shopping cart
	 */
	router.post('/', function (req, res) {

		//Load (or initialize) the cart
		req.session.cart = req.session.cart || {};
		var cart = req.session.cart;

		//Read the incoming product data
		var id = req.param('product_id');
		var qty = req.param('qty') || 1;

		//Locate the product to be added
		Product.findById(id, function (err, product) {
			if (err) {
				res.redirect('/cart');
				return;
			}
			var orderObj = {
				qty: qty,
				product: {
					id: id,
					obj : product
				}
			}
			populateCart(cart, orderObj);

			res.redirect('/cart');

		});
	});
};
