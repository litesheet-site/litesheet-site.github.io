/**
 * @typedef {Coordinates} Coordinates
 * @property {number} lat
 * @property {number} lng
 */

/**
 * @typedef {RepLocation} RepLocation
 * @property {string} name
 * @property {Coordinates} position
 * @property {string} email
 * @property {string} phone
 * @property {string} state
 * @property {string} webAddress
 */

function RepFinder() {

	this.map = null;

	/**
	 * @type Array<RepLocation>
	 */
	this.locations = [];

	this.createMap();
	this.buildLocations();
	this.createMarkers();
	this.initStateDropdownFilter();
}

RepFinder.prototype.createMap = function() {

	var mapElement = document.getElementById('map');

	var centerOfUnitedStates = {
		lat: 39.8283,
		lng: -98.5795
	};

	this.map = new google.maps.Map(mapElement, {
		zoom: 4,
		center: centerOfUnitedStates,
		disableDoubleClickZoom: true,
		disableDefaultUI: true,
		draggable: false
	});
};

RepFinder.prototype.buildLocations = function() {

	var locationElements = document.querySelectorAll("[data-location]");

	for (var i = 0; i < locationElements.length; i++) {

		var locationElement = locationElements[i];
		var attributes = locationElement.attributes;

		var latitude = parseFloat(attributes["data-latitude"].value);
		var longitude = parseFloat(attributes["data-longitude"].value);

		/**
		 * @type RepLocation
		 */
		var location = {
			name: attributes["data-name"].value,
			email: attributes["data-email"].value,
			phone: attributes["data-phone"].value,
			state: attributes["data-state"].value,
			webAddress: attributes["data-webaddress"].value,
			position: {
				lat: latitude,
				lng: longitude
			}
		};

		this.locations.push(location);
	}
};

RepFinder.prototype.createMarkers = function() {

	for (var i = 0; i < this.locations.length; i++) {

		var location = this.locations[i];

		var marker = new google.maps.Marker({
			position: location.position,
			map: this.map,
			title: location.name
		});

		marker.addListener('click', function(clickedPosition) {

			/**
			 * @type RepLocation
			 */
			var clickedLocation = this.findLocation(clickedPosition);

			this.clearDisplayedLocations();
			this.addLocationToTable(clickedLocation);

			$("#state-dropdown").val("");

		}.bind(this));
	}
};

RepFinder.prototype.findLocation = function(clickedPosition) {

	var clickedLatLng = clickedPosition.latLng;

	var latitude = Math.round(clickedLatLng.lat());
	var longitude = Math.round(clickedLatLng.lng());

	for (var i = 0; i < this.locations.length; i++) {

		var location = this.locations[i];

		if (Math.round(location.position.lat) === latitude
		 && Math.round(location.position.lng) === longitude) {
			return location;
		}
	}

	return null;
};

RepFinder.prototype.initStateDropdownFilter = function () {

	$("#state-dropdown").change(function () {

		/**
		 * @type {string}
		 */
		var selectedState = $("#state-dropdown").val();

		this.clearDisplayedLocations();

		for (var i = 0; i < this.locations.length; i++) {

			var location = this.locations[i];

			if (location.state === selectedState) {

				this.addLocationToTable(location);
			}
		}

	}.bind(this));
};

/**
 * @param {RepLocation} location
 */
RepFinder.prototype.addLocationToTable = function (location) {

	var locationRow =
	   '<div class="col-sm-6 col-md-4 col-lg-4">'
	 +    '<table class="table table-condensed">'
	 +       '<tr>'
	 +          '<th>Name</th>'
	 +          '<td>' + location.name + '</td>'
	 +       '</tr>'
	 +       '<tr>'
	 +          '<th>Email</th>'
	 +          '<td>' + location.email + '</td>'
	 +       '</tr>'
	 +          '<th>Phone</th>'
	 +          '<td>' + location.phone + '</td>'
	 +       '</tr>'
	 +       '<tr>'
	 +          '<th>Web Address</th>'
	 +          '<td>' + location.webAddress + '</td>'
	 +       '</tr>'
	 +    '</table>'
	 + '</div>';

	$('#displayed-locations').append(locationRow);
};

RepFinder.prototype.clearDisplayedLocations = function () {
	$("#displayed-locations").empty();
};

function initMap() {
	new RepFinder();
}