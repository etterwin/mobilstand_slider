var markers;
var map;
var activePointID;
var bNotUpdateMapOnClick;
function ZoomControl(controlDiv, map) {

    // Creating divs & styles for custom zoom control
    controlDiv.style.padding = '5px';

    // Set CSS for the control wrapper
    var controlWrapper = document.createElement('div');
    controlWrapper.style.backgroundColor = 'white';
    controlWrapper.style.borderStyle = 'solid';
    controlWrapper.style.borderColor = '#fefefe';
    controlWrapper.style.borderWidth = '1px';
    controlWrapper.style.cursor = 'pointer';
    controlWrapper.style.textAlign = 'center';
    controlWrapper.style.width = '50px';
    controlWrapper.style.height = '100px';
    controlDiv.appendChild(controlWrapper);

    // Set CSS for the zoomIn
    var zoomInButton = document.createElement('div');
    zoomInButton.style.width = '50px';
    zoomInButton.style.height = '50px';
    /* Change this to be the .png image you want to use */
    zoomInButton.style.backgroundImage = 'url("/local/templates/mobistend/img/1.png")';
    controlWrapper.appendChild(zoomInButton);

    // Set CSS for the zoomOut
    var zoomOutButton = document.createElement('div');
    zoomOutButton.style.width = '50px';
    zoomOutButton.style.height = '50px';
    /* Change this to be the .png image you want to use */
    zoomOutButton.style.backgroundImage = 'url("/local/templates/mobistend/img/2.png")';
    controlWrapper.appendChild(zoomOutButton);

    // Setup the click event listener - zoomIn
    google.maps.event.addDomListener(zoomInButton, 'click', function() {
        map.setZoom(map.getZoom() + 1);
    });

    // Setup the click event listener - zoomOut
    google.maps.event.addDomListener(zoomOutButton, 'click', function() {
        map.setZoom(map.getZoom() - 1);
    });

}




function initMap() {
    if (typeof google !== 'undefined' && typeof markerPosition !== 'undefined') {
        google.maps.event.addDomListener(window, 'load', function () {

            if( window.innerWidth < 767 ){
                markerPosition = '57.773389, 67.159279';

            }





            var position = markerPosition.split(',');


            var mapContainer = document.getElementById('map');
            if (!mapContainer) {
                return;
            }

            position = new google.maps.LatLng(position[0], position[1]);


            var mapOptions = {
                center: position,
                zoom: window.innerWidth < 767 ? 2 : 4,
                minZoom: window.innerWidth < 767 ? 2 : 3,
                scrollwheel: true,
                navigationControl: true,
                mapTypeControl: true,
                scaleControl: window.innerWidth < 767 ? true : true,
                zoomControl: window.innerWidth < 767 ? true : true,
                disableDefaultUI: window.innerWidth < 767 ? true : false,
                draggable: window.innerWidth < 767 ? true : true,
                //disableDefaultUI: true,
                streetViewControl: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };


            map = new google.maps.Map(mapContainer, mapOptions);


            for (i = 0; i < markers.length; i++) {
                var image = new google.maps.MarkerImage("/local/templates/mobistend/img/map_marker.png", new google.maps.Size(20, 28), new google.maps.Point(0, 0), new google.maps.Point(10, 28));
                var myLatLng = new google.maps.LatLng(markers[i][1], markers[i][2]);
                _marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    icon: image,
                    id: i
                });
                _marker.addListener('click', function(){
                    var data = markers[this.id];
                    activePointID = data[13];
                    bNotUpdateMapOnClick = true;
                    $('.md_choose_city ul li[rel="'+data[12]+'"]').click();
                })

            }


            //if( window.innerWidth < 767 ){
            //	// Create the DIV to hold the control and call the ZoomControl() constructor
            //	// passing in this DIV.
            //	var zoomControlDiv = document.createElement('div');
            //	var zoomControl = new ZoomControl(zoomControlDiv, map);
            //
            //	zoomControlDiv.index = 1;
            //	map.controls[google.maps.ControlPosition.LEFT_CENTER].push(zoomControlDiv);
            //
            //}




            $('.md_choose_city').addClass('active');


        });
    }
}
$(function(){
    $('#auto').change(function(){

        var bounds = new google.maps.LatLngBounds();
        var points_count = 0;
        var dealers = '';
        var myLatLng;

        var activeOption = $(this).find('option:selected');
        if(activeOption.hasClass('md_choose_city_country')) {
            var country_id = activeOption.attr('data-country');

            for(i in markers) {
                if(markers[i][11] == country_id) {
                    addPoint(markers[i]);
                    points_count++;
                }
            }
        }
        else {
            var city_id = activeOption.attr('data-id');

            for(i in markers) {
                if(markers[i][0] == city_id) {
                    addPoint(markers[i]);
                    points_count++;
                }
            }




        }

        $('.map_info_block .h2_i, .dealer_info').hide();
        $('.dealers_list').html(dealers).show();

        $('.dealers_list_item-panel:eq(0)').click();

        if($('.dealers_list_item').length == 1) {
            $('.dealers_list_item').addClass('active');
            setTimeout(function(){
                $('.dealers_list_item-panel:eq(0)').click();
            }, 300)

        }

        if(bNotUpdateMapOnClick) {
            bNotUpdateMapOnClick = false;
            if (activePointID) {
                $('.dealers_list_item[data-id="' + activePointID + '"]').addClass('active');
                activePointID = false;

                $('.dealers_list').animate({scrollTop: $('.dealers_list').scrollTop() + $('.dealers_list_item.active').position().top}, 500);
            }
        }
        else {
            if (points_count > 0) {
                if (points_count > 1) {
                    map.fitBounds(bounds);
                }
                else {
                    //map.setCenter(myLatLng);
                    map.setZoom(16);
                }
            }
        }




        function addPoint(marker) {
            myLatLng = new google.maps.LatLng(marker[1], marker[2]);
            bounds.extend(myLatLng);

            dealers += '<div class="dealers_list_item" data-id="'+marker[13]+'" data-lat="'+marker[1]+'" data-lon="'+marker[2]+'">' +
                '<div class="dealers_list_item-panel">' +
                '<div class="dealers_list_item-panel-box">' +
                '<div class="dealers_list_item_title"><span>'+ marker[3] +'</span></div>' +
                '<div class="dealers_list_item_stars"'+ (marker[14] ? '' : 'style="display: none;"')+'>' +
                '<div class="dealers_list_item_stars-list">' +
                '<span class="dealers_list_item_star'+ (parseInt(marker[14]) >= 1 ? ' dealers_list_item_star-filled' : '')+'"></span>' +
                '<span class="dealers_list_item_star'+ (parseInt(marker[14]) >= 2 ? ' dealers_list_item_star-filled' : '')+'"></span>' +
                '<span class="dealers_list_item_star'+ (parseInt(marker[14]) >= 3 ? ' dealers_list_item_star-filled' : '')+'"></span>' +
                '<span class="dealers_list_item_star'+ (parseInt(marker[14]) >= 4 ? ' dealers_list_item_star-filled' : '')+'"></span>' +
                '<span class="dealers_list_item_star'+ (parseInt(marker[14]) >= 5 ? ' dealers_list_item_star-filled' : '')+'"></span>' +
                '</div>' +

                '</div>' +

                '<div class="dealers_list_item_stars-tooltip" '+ (marker[15] !='undefined' ? '' : 'style="display: none;"')+'>' +
                '<span>'+ marker[15]+'</span>' +
                //            '<span class="dealers_list_item_stars-tooltip-close"></span>' +
                '</div>' +

                '</div>' +
                '</div>' +
                '<div class="dealers_list_item-content">' +
                '<div class="dealers_list_item-content-box">';
            if(marker[10]) {
                dealers += '<div class="dealers_list_item_logo"><img src="'+marker[10]+'" alt=""></div>';
            }
            if(marker[4]) {
                dealers += '<span class="dealers_list_item_address">' + marker[4] + '</span>';
            }
            if(marker[5]) {
                dealers += '<span class="dealers_list_item_email">' + marker[5] + '</span>';
            }
            if(marker[6]) {
                dealers += '<span class="dealers_list_item_phone">' + marker[6] + '</span>';
            }
            if(marker[7]) {
                dealers += '<span class="dealers_list_item_link"><a href="//'+marker[7]+'" rel="nofollow" target="_blank" class="">' + marker[7] + '</a></span>';
            }
            if(marker[8]) {
                dealers += '<span class="dealers_list_item_text">' + marker[8] + '</span>';
            }
            if(marker[9]) {
                dealers += '<span class="dealers_list_item_subtext">' + marker[9] + '</span>';
            }
            dealers += '</div>' +
                '</div>' +
                '</div>';
        }




        var acc = document.getElementsByClassName("dealers_list_item-panel");
        var i;
        for (i = 0; i < acc.length; i++) {
            acc[i].onclick = function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight){
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            }
        }

        //	$('body').on('click', '.dealers_list_item_stars-tooltip-close', function(){
        //        var styless = {
        //            opacity: "0",
        //            visibility: "hidden",
        //            top: "20px"
        //        };
        //        $('.dealers_list_item_stars-tooltip').css(styless);
        //    });
        //	$(".dealers_list_item_stars").mouseenter(function() {
        //  		var styles = {
        //            opacity: "1",
        //            visibility: "visible",
        //            top: "25px"
        //        };
        //        $(this).find('.dealers_list_item_stars-tooltip').css(styles);
        //	});
        //	$(".dealers_list_item_stars").mouseleave(function() {
        //  		var styless = {
        //            opacity: "0",
        //            visibility: "hidden",
        //            top: "20px"
        //        };
        //        $('.dealers_list_item_stars-tooltip').css(styless);
        //	});


        $('body').on('click', '.dealers_list_item', function(){
            var myLatLng = new google.maps.LatLng($(this).attr('data-lat'), $(this).attr('data-lon'));
            map.setCenter(myLatLng);
            map.setZoom(16);

            // $('.dealers_list_item').removeClass('active');
            // $('.dealers_list_item-panel').removeClass('active');
            // $('.dealers_list_item-content').removeAttr('style');

            // $(this).toggleClass('active');
            // $(this).find('.dealers_list_item-panel').toggleClass('active');
            // $(this).find('.dealers_list_item-content').attr('style', 'max-height: unset;');

            $(this).addClass('active').siblings().removeClass('active');
        });


    });
});