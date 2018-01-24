$(document).ready(function() {

	// filtering based on search box
	$("#product-search-box").on('change keyup paste', function (){

		// hide everything to start
		$("#product-search-results").hide();
		$("#product-search-no-matches").hide();
		$("#product-search-no-search").hide();

		var searchValue = $("#product-search-box").val().toLowerCase();
		if (searchValue.length === 0) {
			$("#product-search-no-search").show();
			return;
		}

		var matches = 0;

		$(".product-search-item").each(function(index, element){

			var productNumber = $(element).data("product-number").toLowerCase();
			var eligibleForSearch = searchValue.length > 0 && productNumber.length > 0;

			var matchesSearch = eligibleForSearch && productNumber.indexOf(searchValue) >= 0;

			// show/hide based on matching search
			if (matchesSearch) {
				$(element).show();
				matches++;
			}
			else {
				$(element).hide();
			}
		});

		if (matches > 0) {
			$("#product-search-results").show();
		}
		else {
			$("#product-search-no-matches").show();
		}
	});

	// initialize popover
	$('#product-number-search-container').popover({});
});