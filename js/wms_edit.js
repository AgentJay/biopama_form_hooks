jQuery(document).ready(function($) {
	var wmsURL;
	var dropdownAtts;
/* 	$( '<div class="wms-search-wrapper">'+
	'<div class="wms-errors"></div>'+
	'<button type="button" class="btn btn-primary wms-service-search disabled">Search WMS Server</button><br>'+
	'</div>' ).appendTo( "div.form-item-field-wms-base-url-0-value, div[data-drupal-selector=edit-inline-entity-form-field-wms-base-url-wrapper]" ); */
				
	//this will clean the form the first time we load the JS
	wmsServerSearch();
	

	//the behavior below will clean the form each time it's loaded after the initial load.
	Drupal.behaviors.dataEditPrep = {
		attach:function(context, settings){
			if (($("form.node-wms-map-layer-edit-form").length) || ($("form.node-wms-map-layer-form").length) || ($("entity-browser-map-layer-browser-form").length)){
				wmsServerSearch();
			}
		}
	};
	$( "button.wms-service-search" ).click(function() {
		if ($(this).hasClass("disabled")) {
			console.log("it's not available dummy");
		} else {
			checkWmsServices();
		}
	});
	function wmsServerSearch(){
		if (!$(".wms-search-wrapper").length){
			$( '<div class="wms-search-wrapper">'+
			'<div class="wms-errors"></div>'+
			'<button type="button" class="btn btn-primary wms-service-search disabled">Search WMS Server</button><br>'+
			'</div>' ).appendTo( "fieldset.form-item-field-wms-base-url-0-value, div#edit-inline-entity-form-field-wms-base-url-wrapper" );
		}
	
		$("input[data-drupal-selector=edit-field-wms-base-url-0-value], input[data-drupal-selector=edit-inline-entity-form-field-wms-base-url-0-value]").change(function() {
			$("div.wms-errors").empty();
			var URLerrors = 0;
			var wmsURL = $( this ).val().toLowerCase();
			var URLQuestionMark = wmsURL.slice(-1);
			if(wmsURL.indexOf("https://") == -1) {
				$( '<div class="alert alert-danger" role="alert">The URL requires HTTPS</div>' ).appendTo( "div.wms-errors" );
				$(".wms-service-search").addClass("disabled");
				URLerrors = 1;
			} 
			if((wmsURL.indexOf("ows") == -1)&&(wmsURL.indexOf("wms") == -1)) {
				$( '<div class="alert alert-danger" role="alert">The URL does not appear to include a WMS or OWS service</div>' ).appendTo( "div.wms-errors" );
				$(".wms-service-search").addClass("disabled");
				URLerrors = 1;
			}
			if(URLQuestionMark !== "?") {
				$( '<div class="alert alert-danger" role="alert">You forgot to add the question mark to the end of the URL</div>' ).appendTo( "div.wms-errors" );
				$(".wms-service-search").addClass("disabled");
				URLerrors = 1;
			}
			if(URLerrors == 0) {
				$("div.wms-errors").html('<div class="alert alert-success" role="alert">The URL looks good.</div>');
				$(".wms-service-search").removeClass("disabled");
			}
		});
		
		$("input[data-drupal-selector=edit-field-wms-base-url-0-value]").trigger("change");
		$("input[data-drupal-selector=edit-inline-entity-form-field-wms-base-url-0-value]").trigger("change");
	}
	function checkWmsServices(){
		
		if ($( "input[data-drupal-selector=edit-inline-entity-form-field-wms-base-url-0-value]" ).length){
			wmsURL = $( "input[data-drupal-selector=edit-inline-entity-form-field-wms-base-url-0-value]" ).val();
		} else {
			wmsURL = $( "input[data-drupal-selector=edit-field-wms-base-url-0-value]" ).val();
		}
		var wmsGetCapabilitiesRequest = wmsURL + "service=WMS&version=3.0.0&request=GetCapabilities";
		console.log(wmsGetCapabilitiesRequest);
		$.ajax({
			url: wmsGetCapabilitiesRequest,
			dataType: "xml",
			success: xmlParser,
			error: function (jqXHR, tranStatus, errorThrown) {
				$("div.wms-errors").html('<div class="alert alert-danger" role="alert">Status: ' + jqXHR.status + ' ' + jqXHR.statusText + '. ' +
					'Response: ' + jqXHR.responseText + '</div>');
				console.log(jqXHR);
			}
		});
		
	}
	function xmlParser(xml) {
		$("div.wms-errors").empty();
		//start by adding the dropdown to the form if it wasn't already there from a previous run
		if (!$("#wms-layers").length){
			if ($(".form-item-inline-entity-form-field-wms-base-url-0-value").length){
				$( '<div id="wms-layers">WMS Layers: <select id="wms-dropdown" name="WMS Layers"></select></div>' ).appendTo( ".form-item-inline-entity-form-field-wms-base-url-0-value" );
			} else if ($("fieldset.form-item-field-wms-base-url-0-value").length){
				$( '<div id="wms-layers">WMS Layers: <select id="wms-dropdown" name="WMS Layers"></select></div>' ).appendTo( "fieldset.form-item-field-wms-base-url-0-value" );
			}
		}
		var dropdown = $('select#wms-dropdown');
		dropdown.empty()

		var $Layers = $(xml).find("Layer");
		$Layers.each(function(){
			var thisTitle = $(this).find("Title:first").text()
			//console.log(thisTitle);
			dropdown.append($('<option></option>').attr('value', thisTitle).text(thisTitle));
		});
		
		dropdown.change(function() {
			var layerName = $( this ).val();
			if ($("input[data-drupal-selector=edit-inline-entity-form-field-wms-layer-name-0-value]").length){
				$("input[data-drupal-selector=edit-inline-entity-form-field-wms-layer-name-0-value]").val(layerName);
			} else if ($("input[data-drupal-selector=edit-field-wms-layer-name-0-value]").length) {
				$("input[data-drupal-selector=edit-field-wms-layer-name-0-value]").val(layerName);
			}
		});
	}

});

jQuery(function () {
  Drupal.attachBehaviors(document, Drupal.settings);
});



