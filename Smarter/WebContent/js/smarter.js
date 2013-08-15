var Utils = {
		namespace: function(namespaceString) {
		    var parts = namespaceString.split('.'),
		        parent = window,
		        currentPart = '';

		    for(var i = 0, length = parts.length; i < length; i++) {
		        currentPart = parts[i];
		        parent[currentPart] = parent[currentPart] || {};
		        parent = parent[currentPart];
		    }

		    return parent;
		}
};

var app;

/**
 * Initializes the application
 */
function appInit () {
	// Load layout (we have successfully authenticated)
	app = new com.smarter.ui.AppRouter();
	
	// verify initial route
	
	var hash = location.hash.slice(1);
	var route = 'products';
	//try {
		Backbone.history.start();
	//} catch(e) {console.log(e)}	
	app.navigate(route, {trigger: true});
}

//Router
Utils.namespace("com.smarter.ui");
com.smarter.ui.AppRouter = Backbone.Router.extend({
	routes:{
		"products":"showProducts"
	},
	
	initialize: function() {
		$(window).unload(this.unload);
	},
	
	showProducts: function(preserveInfoMessage) {
		this.productList = new com.smarter.ui.models.products.ProductsCollection();
		this.productListView = new com.smarter.ui.views.products.ProductsListView({model:this.productList});
		this.productList.fetch();

		el = new com.smarter.ui.views.products.ProductsListView().render(); 
		$(".main").empty();
		$(".main").append(el);
	}
});

Utils.namespace("com.smarter.ui.views.products");
com.smarter.ui.views.products.ProductsListView = Backbone.View.extend({
	
	render: function (eventName) {
		this.el = $(".product").html();
		//this.el.style.display = "block";
		return this.el;
	}
});

Utils.namespace("com.smarter.ui.models.products");
com.smarter.ui.models.products.Product = Backbone.Model.extend({
	idAttribute: "id"
	
})

com.smarter.ui.models.products.ProductsCollection = Backbone.Collection.extend({
	model: com.smarter.ui.models.products.Product,
	url: "main/products"
})
