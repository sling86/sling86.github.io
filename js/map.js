// The latitude and longitude of your business / place
var position = [51.05167582784824, -0.7497944056656252];
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var latLng = new google.maps.LatLng(position[0], position[1]);
var geocoder;

function showGoogleMaps() {


    var latLngOffset = new google.maps.LatLng(position[0], position[1] + 0.005);
    geocoder = new google.maps.Geocoder();
    directionsDisplay = new google.maps.DirectionsRenderer();

    var mapOptions = {
        zoom: 16, // initialize zoom level - the max value is 21
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        },
        center: latLngOffset,
        styles: [{
            "featureType": "road",
            "elementType": "labels",
            "stylers": [{
                "visibility": "simplified"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "administrative.land_parcel",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "landscape.man_made",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "road.local",
            "elementType": "labels",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
                "hue": "#a1cdfc"
            }, {
                "saturation": 30
            }, {
                "lightness": 49
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{
                "hue": "#f49935"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "hue": "#fad959"
            }]
        }]
    };

    map = new google.maps.Map(document.getElementById('googlemaps'),
        mapOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions-panel'));

    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading cinzel">Contract <span class="yel">Candles</span> Ltd</h1>' +
        '<p>Lower Lodge, Vann Road,</p>' +
        '<p>Fernhurst,</p>' +
        '<p>Haslemere,</p>' +
        '<p>Surrey,</p>' +
        '<p>GU27 3NH</p>' +
        '<p><a href="callto:+441428 645433">01428 645433</a></p>' +
        '</div>';

    //    var contentString = '<div id="content">' +
    //        '<div id="siteNotice">' +
    //        '</div>' +
    //        '<p class="oxygen smaller-font">Contract Candles Ltd' +
    //        '<br>Lower Lodge, Vann Road, Fernhurst,' +
    //        '<br>Haslemere, Surrey, GU27 3NH' +
    //        '<br>01428 645433' +
    //        '</p>' +
    //        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    // Show the default red marker at the location
    marker = new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        title: 'Contract Candles Ltd'
    });
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });

    //codeAddress("BN16 3PJ");
    //    calcRoute()
}

function codeAddress(start) {
    var address = start;
    geocoder.geocode({
        'address': address
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {

            //            map.setCenter(results[0].geometry.location);
            //            var marker = new google.maps.Marker({
            //                map: map,
            //                position: results[0].geometry.location
            //            });

            calcRoute(results[0].geometry.location, latLng);


        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function calcRoute(start, end) {
    //    var start = "BN16 3PJ";
    //    var end = latLng;
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}

google.maps.event.addDomListener(window, 'load', showGoogleMaps);