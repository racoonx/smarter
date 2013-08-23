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
//var imageSearch;

/**
 * Initializes the application
 */
function appInit () {
	// Load layout (we have successfully authenticated)
	app = new com.smarter.ui.AppRouter();
	
	//google.load("search", "1");
	//imageSearch = new google.search.ImageSearch();
	//imageSearch.setSearchCompleteCallback(this, searchComplete, null);
	
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
		_.bindAll(this, "showProducts", "fetchComplete", "displayProducts");
	},
	
	fetchComplete: function() {
		this.productList.on("add", this.displayProducts);
		this.productList.on("remove", this.displayProducts);
		this.displayProducts();
	},
	
	displayProducts: function() {
		$(".main_container").html('');
		$(".main_container").append(this.productListView.render());
		$(".main_container").trigger("create");
		
		//this.productList.on("modify", this.displayProducts);
	},
	
	showProducts: function(preserveInfoMessage) {
		this.productList = new com.smarter.ui.models.products.ProductsCollection();
		this.productListView = new com.smarter.ui.views.products.ProductsListView({model:this.productList});
		this.productList.fetch({error: function() { console.log(arguments); }, success: this.fetchComplete});
	}
});

Utils.namespace("com.smarter.ui.views.products");
com.smarter.ui.views.products.ProductView = Backbone.View.extend({
	events: {
		"click .deleteBtn": "removeProduct"
	},
	
	initialize: function (options) {
		_.bindAll(this, "render");
		this.list = options.list;
	},
	
	render: function (eventName) {
		var content = "";
		content += 
			"<div data-role=\"controlgroup\" data-type=\"horizontal\">"+
			"<a href=\"#\" style=\"float:left;width:90%\"><label><input type=\"checkbox\" name=\"checkbox-10\">" + this.model.get("name") + "</label></a>"+
			"<a href=\"#\" data-role=\"button\" data-icon=\"delete\" data-iconpos=\"notext\" class=\"deleteBtn\" style=\"margin:0px;padding:0px;\"></a>" +
			"</div>";
		
		$(this.el).html(content);
		return this.el;
		
	},
	
	removeProduct: function() {
		this.model.destroy();
		this.list.remove(this.model);
	}
});

com.smarter.ui.views.products.AddProductView = Backbone.View.extend({
	initialize: function (options) {
		_.bindAll(this, "render", "newProduct");
		this.list = options.list;
	},
	
	events: {
		"change .newProduct": "newProduct",
		"load .newProduct": "setFocus"
	},
	
	setFocus: function() {
		$(".newProduct").focus();
	},
	
	newProduct: function (e) {
		console.log("Adding new product");
		this.model.set("name", $(this.el).find(".newProduct").val());
		this.list.add(this.model);
		this.model.save();
	},
	
	render: function (eventName) {
		var content = "";
		content += "<input type=\"text\" name=\"name\" class=\"newProduct\" value=\"\" placeholder=\"Placeholder\">";
		
		$(this.el).html(content);
		this.model = new com.smarter.ui.models.products.Product();
		return this.el;
		
	}
});

Utils.namespace("com.smarter.ui.views.products");
com.smarter.ui.views.products.ProductsListView = Backbone.View.extend({
	
	events: {
		"click .addBtn": "addProduct"
	},
	
	initialize: function (options) {
		_.bindAll(this, "render");
	},
	
	render: function (eventName) {
		var root = this.el;
		$(this.el).empty();
		_.each(this.model.models, _.bind(function(item) {
			var itemView = new com.smarter.ui.views.products.ProductView({model:item, list:this.model});
			$(root).append(itemView.render());
		}, this));
		
		var c = "<div data-role=\"controlgroup\" data-type=\"horizontal\">"+
			"<a href=\"#\" data-role=\"button\" class=\"addBtn\">Add</a>" +
			"</div>";	  
		$(this.el).append(c);
		this.delegateEvents();
		
		return this.el;
	},
	
	addProduct: function() {
		var view = new com.smarter.ui.views.products.AddProductView({list:this.model});
		var el = view.render();
		$(".addBtn").before($(el));
		$(this.el).trigger("create");
		$(".newProduct").focus();
	},
	
	onProductsChange: function() {
		
	}
});

Utils.namespace("com.smarter.ui.models.products");
com.smarter.ui.models.products.Product = Backbone.Model.extend({
	idAttribute: "id",
	urlRoot: "main/products"
});

com.smarter.ui.models.products.ProductsCollection = Backbone.Collection.extend({
	model: com.smarter.ui.models.products.Product,
	url: "main/products"
});
