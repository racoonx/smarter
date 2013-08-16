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
var imageSearch;

/**
 * Initializes the application
 */
function appInit () {
	// Load layout (we have successfully authenticated)
	app = new com.smarter.ui.AppRouter();
	
	google.load("search", "1");
	imageSearch = new google.search.ImageSearch();
	imageSearch.setSearchCompleteCallback(this, searchComplete, null);
	
	// verify initial route
	
	var hash = location.hash.slice(1);
	var route = 'products';
	//try {
		Backbone.history.start();
	//} catch(e) {console.log(e)}	
	app.navigate(route, {trigger: true});
}

function searchComplete() {
	
}

//Router
Utils.namespace("com.smarter.ui");
com.smarter.ui.AppRouter = Backbone.Router.extend({
	routes:{
		"products":"showProducts"
	},
	
	initialize: function() {
		$(window).unload(this.unload);
		_.bindAll(this, "showProducts", "displayProducts");
	},
	
	displayProducts: function() {
		console.log(arguments);
		var s = this.productListView.render();
		$(".main_container").html(s);
		$(".main_container").trigger("create");
	},
	
	showProducts: function(preserveInfoMessage) {
		this.productList = new com.smarter.ui.models.products.ProductsCollection();
		this.productListView = new com.smarter.ui.views.products.ProductsListView({model:this.productList});
		this.productList.fetch({error: function() { console.log(arguments); }, success: this.displayProducts});
	}
});

Utils.namespace("com.smarter.ui.views.products");
com.smarter.ui.views.products.ProductsListView = Backbone.View.extend({
	
	initialize: function (options) {
		_.bindAll(this, "render");
	},
	
	render: function (eventName) {
		var content = "";
		_.each(this.model.models, function(item) {
			content += "<label>" +
	    	"<input type=\"checkbox\" name=\"checkbox-10\"><img src=\"\"/>" + item.get("name") + "</label>";
		});
		var el = $(content);
		el.find("img").attr("src", "https://developers.google.com/_static/images/developers-logo.svg");
		el.find("img").attr("width", 32);
		el.find("img").attr("height", 32); 
		return el;
		
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
