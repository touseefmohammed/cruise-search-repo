var app = angular.module('MyApp', [])
        app.controller('MyController', function ($scope,$http) {
$scope.markers = null;
$scope.selectedIternary = {};

$http.get('https://qabook.hollandamerica.com/api/cruiseSearch/v1/api/search/itineraries?country=US&limit=10&skip=0')
  .then(function (response) {
debugger;
    $scope.markers = response.data.data[0].attributes.itineraries;
	
	$scope.selectedIternary = $scope.markers[0].voyages[0].stateRooms[0];
    var status = response.status;
    var statusText = response.statusText;
    var headers = response.headers;
    var config = response.config;
	//$scope.initdata();
    
});
 
 var init = function() {
		//$scope.initdata();
	};
	
	$scope.selectIternary = function(view) {
		$scope.selectedIternary = view;
		console.log(view)
	};
 $scope.initdata = function(){
            //Setting the Map options.
            $scope.MapOptions = {
                center: {lat: -34.397, lng: 150.644},
                zoom: 8,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
 
            //Initializing the InfoWindow, Map and LatLngBounds objects.
            $scope.InfoWindow = new google.maps.InfoWindow();
            $scope.Latlngbounds = new google.maps.LatLngBounds();
            $scope.Map = new google.maps.Map(document.getElementById("dvMap"), $scope.MapOptions);
 
            //Looping through the Array and adding markers.
            for (var i = 0; i < $scope.markers.length; i++) {
                var data = $scope.markers[i];
                var myLatlng = new google.maps.LatLng(-34.397, 150.644);
 
                //Initializing the Marker object.
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: $scope.Map,
                    title: data.title
                });
 
                //Adding InfoWindow to the Marker.
                (function (marker, data) {
                    google.maps.event.addListener(marker, "click", function (e) {
                        $scope.InfoWindow.setContent("<div style = 'width:200px;min-height:40px'>" + data.description + "</div>");
                        $scope.InfoWindow.open($scope.Map, marker);
                    });
                })(marker, data);
 
                //Plotting the Marker on the Map.
                $scope.Latlngbounds.extend(marker.position);
            }
 
            //Adjusting the Map for best display.
            $scope.Map.setCenter($scope.Latlngbounds.getCenter());
            $scope.Map.fitBounds($scope.Latlngbounds);
			console.log($scope.markers[0].attributes)
 }
	
        });