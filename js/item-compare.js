/**
 * @type {number}
 */
var NUM_ITEMS_TO_COMPARE = 3;

function ItemCompareService() {

	/**
	 * @type {Array<Object>}
	 */
	this.items = [];
}

/**
 * @param {Object} item
 */
ItemCompareService.prototype.addItem = function(item) {
	this.items.push(item);
};

ItemCompareController.$inject = ["itemCompareService"];
/**
 * @param {ItemCompareService} itemCompareService
 */
function ItemCompareController(itemCompareService) {

	/**
	 * @type {ItemCompareService}
	 */
	this.itemCompareService = itemCompareService;

	/**
	 * @type {Array<Object>}
	 */
	this.selectedItems = [];
}

/**
 * @param {number} index
 */
ItemCompareController.prototype.selectItem = function(index) {

	/**
	 * @type {Object}
	 */
	var item = this.itemCompareService.items[index];

	// remove first item
	if (this.selectedItems.length >= NUM_ITEMS_TO_COMPARE) {
		this.selectedItems.shift();
	}

	this.selectedItems.push(item);
};

var module = angular.module("item-compare", []);
module.service("itemCompareService", ItemCompareService);
module.controller("ItemCompareController", ItemCompareController);

module.directive("item", ["itemCompareService",

	/**
	 * @param {ItemCompareService} itemCompareService
	 */
	function (itemCompareService) {
	return {
		restrict: 'A',
		scope: {
			item: '='
		},
		link:
		 /**
		  * @param scope
		  * @param {Element} element
		  * @param attrs
		  */
		 function(scope, element, attrs) {

			/**
			 * @type {Object}
			 */
			var item = scope.item;

			itemCompareService.addItem(item);
		}
	};
}]);

angular.bootstrap(document, ["item-compare"]);