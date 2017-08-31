/**
 * @typedef {Product} Product
 * @property {string} title
 */

function SelectedProductsService() {

	/**
	 * @type {Array<Product>}
	 */
	this.products = [];
}

/**
 * @param product
 */
SelectedProductsService.prototype.addProduct = function(product) {
	this.products.push(product);
};

ProductComparisonController.$inject = ["selectedProductsService"];
/**
 * @param {SelectedProductsService} selectedProductsService
 */
function ProductComparisonController(selectedProductsService) {

	/**
	 * @type {SelectedProductsService}
	 */
	this.selectedProductsService = selectedProductsService;

	/**
	 * @type {Product}
	 */
	this.firstProduct = null;

	/**
	 * @type {Product}
	 */
	this.secondProduct = null;
}

/**
 * @param {number} index
 */
ProductComparisonController.prototype.selectProduct = function(index) {

	/**
	 * @type {Product}
	 */
	var product = this.selectedProductsService.products[index];

	if (this.firstProduct === null) {
		this.firstProduct = product;
	}
	else if (this.secondProduct === null) {
		this.secondProduct = product;
	}
	else {
		this.firstProduct = this.secondProduct;
		this.secondProduct = product;
	}
};

var module = angular.module("product-comparison", []);
module.service("selectedProductsService", SelectedProductsService);
module.controller("ProductComparisonController", ProductComparisonController);

module.directive("product", ["selectedProductsService",

	/**
	 * @param {SelectedProductsService} selectedProductsService
	 */
	function (selectedProductsService) {
	return {
		restrict: 'A',
		scope: {
			product: '='
		},
		link:
		 /**
		  * @param scope
		  * @param {Element} element
		  * @param attrs
		  */
		 function(scope, element, attrs) {

			/**
			 * @type {Product}
			 */
			var product = scope.product;

			selectedProductsService.addProduct(product);
		}
	};
}]);

angular.bootstrap(document, ["product-comparison"]);