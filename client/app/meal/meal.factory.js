(function() {
	'use strict';

	angular.module('app')
		.factory('mealFactory', mealFactory);

	mealFactory.$inject = [];

	function mealFactory() {
		var services = {
			getGreetingTime: getGreetingTime,
			drawMap: drawMap
		};

		return services;

		function getGreetingTime(m) {
			var g;
			if (!m || !m.isValid()) {
				return;
			}
			var splitMorning = 6;
			var splitAfternoon = 12;
			var splitEvening = 18;
			var currentHour = parseFloat(m.format("HH"));
			if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
				g = "Lunch";
			} else if (currentHour >= splitEvening) {
				g = "Dinner";
			} else if (currentHour > splitMorning) {
				g = "Breakfast";
			} else {
				g = "Midnight Snack";
			}
			return g;
		}

		function drawMap(Map, lat, lng) {
			var mapCanvas = document.getElementById('map');
			var myLatLng = {
			  lat: lat,
			  lng: lng
			};
			var mapOptions = {
			  center: new google.maps.LatLng(lat, lng),
			  zoom: 13,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			var map = new google.maps.Map(mapCanvas, mapOptions);
			var marker = new google.maps.Marker({
			  position: myLatLng,
			  title: "hello world!"
			});
			marker.setMap(map);
		}
	}

})();
