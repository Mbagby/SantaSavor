
$(document).ready(function(){
	//For Signup Page buttons to change input value
	$("#parentButton").on("click", function(){
		$("#userType").val("Parent")
	});
	$("#santaButton").on("click", function(){
		$("#userType").val("Santa")
	});
	//for data Table
	$("#searchDataTable").DataTable();
$(function() {
  var map;
  function initialize() {
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 6,
      center: {lat: 37.210651, lng: -120.053217}
    });
    var mapDiv = document.getElementById('map-canvas');
    // google.maps.event.addListener(map, 'click', addMarker);
  }
  function siteHtml(site) {
    var html =   '<p><a href="/sites/' + site._id + '">' + site.address + '</a>' +
      '</p><p>' +
      '<a href="https://www.google.com/maps/@' + site.lat + ',' + site.long + ',12z">' +
      site.lat + ',' + site.long + '</a></p>';

    return html;
  }

  function loadSites() {
    $.getJSON('/sites').done(function(data) {
      data.sites.forEach(function(site) {
      	var position= new google.maps.LatLng(site.lat, site.long);
      	var marker = new google.maps.Marker({
      		position: position,
      		map: map,
      		title: site.address,
      	});
        $('#newsiteform').after(siteHtml(site));
      });
    }).fail(function() {
      alert('Could not load stored sites');
    });
  }

  $('#newsiteform').submit(function(event) {
    event.preventDefault();
    var data = {site: {}};
    data.site.address = $('#address').val();
    data.site.lat = $('#lat').val();
    data.site.long = $('#long').val();
    $.ajax({
      type: 'POST',
      url: '/children',
      data: data,
      dataType: 'json'
    }).done(function(data) {
      $('#newsiteform').after(siteHtml(data));
    }).fail(function(jqXHR, textStatus, errorThrown) {
      alert(errorThrown);
      console.log(errorThrown);
    });
  });

  initialize();
  loadSites();
});

});


