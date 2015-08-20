with.shoppingcart
=================

Kraken with Shopping Cart and PayPal integration

Now includes `Line Items` with a # of `Products`. A set of Line Items make up an `Order` when payment is initiated. An order references a Payer (user data) and can have status `initiated` and `paid`.

Future: Get inspiration from [Phrixus](https://github.com/apigee-127/phrixus) a more complete solution!!

See Mongoose Schema: https://thecodebarbarian.wordpress.com/2013/06/06/61/

Use `ObjectID` and `ref` to avoid lists of sub documents approach used now!

```js
var UserSchema = new Mongoose.Schema({
  username : { type : String },
  image : { type : Mongoose.Schema.ObjectId, ref : 'images' }
});
```

But will be MUCH easier to implement via Keystone. See [Keystone example](https://github.com/Automattic/mongoose/issues/1888)

```js
Post.add({
    author: { type: Types.Relationship, ref: 'User' },
    categories: { type: Types.Relationship, ref: 'PostCategory', many: true }
});
```

Another option is [mongo-relation](https://www.npmjs.com/package/mongo-relation)

Prerequisites
-------------

-	This example requires that [MongoDB](http://www.mongodb.org/downloads) is installed and running on it's default port.
-	You will -- of course -- need [Node](http://nodejs.org) (Version >= 0.10.22 preferred)

Installation
------------

Clone, install and run.

```shell
git clone git@github.com:krakenjs/kraken-example-with-shoppingcart.git
cd kraken-example-with-shoppingcart
npm install
npm start
```

Extras
------

Expanding the basic sample with Line Items and Orders. Line Items enables rebates (special offers etc) and the Order grants an order id, the ability to store the entire order with related line items and one place to calculate the total etc. Tracking purposes, print Invoices etc.

For PDF creation, you can start with a small [pdf crowd account](http://pdfcrowd.com/pricing/) of 1000 tokens. A free solution would be [freehtmltopdf](http://freehtmltopdf.com/api.html) which even includes a ready made button with progress bar.

Other PDF Invoice options:

-	https://github.com/pdfkit/pdfkit
-	https://github.com/marcbachmann/node-html-pdf

```js
var pdf = require('html-pdf');
pdf.create(html).toFile([filepath, ]function(err, res){
  console.log(res.filename);
});

pdf.create(html).toStream(function(err, stream){
  stream.pipe(fs.createWriteStream('./foo.pdf'));
});

pdf.create(html).toBuffer(function(err, buffer){
  console.log('This is a buffer:', Buffer.isBuffer(buffer));
});
```

Explore the app
---------------

Visit [`http://localhost:8000`](http://localhost:8000)

Illustrates
-----------

-	Use of mongodb for storing product information
-	Integration with the PayPal SDK
-	Localized content (en-US or es-ES)
-	Usage of bundalo for localized messages with model data

### lib/spec.js

`lib/spec.js` holds the `onconfig` event handler. You can see in the main `index.js` file, `lib/spec`'s onconfig handler is passed in with the line:

```javascript
app.use(kraken(options))
```

### mongodb

Pre-requisite: An instance of [MongoDB](http://www.mongodb.org/downloads) installed and running on its default port.

config changes (config.json):

```javascript
"databaseConfig": {
	"host": "localhost",
	"database": "shocart"
},
```

`lib/database.js`: configure and connect to mongodb instance`lib/spec.js`: call database.js config method in the kraken-js onconfig event

### PayPal SDK

config changes (config.json):

```javascript
"paypalConfig": {
	"host": "api.sandbox.paypal.com",
	"port": "",
	"client_id": "EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM",
	"client_secret": "EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM"
},
```

Payment initiated in the `/pay` route which is defined in controllers/pay/index.js

### Localized content

config changes (config.json):

```javascript
"i18n": {
	"contentPath": "path:./locales",
	"fallback": "en-US"
},
```

config changes (config.json) under middleware:

```javascript
"locale": {
	"priority": 95,
	"enabled": true,
	"module": {
		"name": "path:./lib/locale"
	}
}
```

locale is chosen via the `/setLanguage/:locale` route, which is initiated by hyperlinked flag images in the UI

locale is set into the response via the locale middleware defined in `lib/locale.js`

### Localized model data with bundalo

config changes (config.json):

```javascript
"bundle engine": "dust",
```

bundle is configured as middleware directly in routes where it is required, as in `controllers/cart/index.js` and `controllers/pay/index.js`

bundle middleware defined in `lib/getBundle.js`. Note that the 'bundle' object is attached to the response object for use in the downstream response handlers

Server included localized content can be seen after payment, and also on the cart page.
