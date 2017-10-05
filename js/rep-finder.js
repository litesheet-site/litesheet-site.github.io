function RepFinder() {

	this.map = null;
	this.locations = [];

	this.createMap();
	this.buildLocations();
	this.createMarkers();
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

		var location = {
			name: attributes["data-name"].value,
			email: attributes["data-email"].value,
			phone: attributes["data-phone"].value,
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

			var clickedLocation = this.findLocation(clickedPosition);
			this.setSelectedLocation(clickedLocation);

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

RepFinder.prototype.setSelectedLocation = function(location) {

	document.getElementById("selectedName").textContent = location.name;
	document.getElementById("selectedEmail").textContent = location.email;
	document.getElementById("selectedPhone").textContent = location.phone;
	document.getElementById("selectedWebAddress").textContent = location.webAddress;

	document.getElementById("selectedLocation").style.display = "table";
};

function initMap() {
	new RepFinder();
}