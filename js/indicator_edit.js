jQuery(document).ready(function($) {
	var dropdown;
	var dropdownAtts;
	//this will clean the form the first time we load the JS
	indicatorEdit();
	//the behavior below will clean the form each time it's loaded after the initial load.
	Drupal.behaviors.indicatorEditPrep = {
		attach:function(context, settings){
			if ($("div#drupal-off-canvas form.node-indicator-edit-form").length){
				indicatorEdit();
			}
			if ($("div#drupal-off-canvas form.node-indicator-form").length){
				indicatorEdit();
			}
		}
	};
	
	function indicatorEdit(){
		console.log("test")
		//hide all the fields that are not checked. they will be shown later if needed
		checkFieldVisibility();
		//permanently disable the geonode layer field as this will only be for tracking
		$('.form-item-indi-geonode-layer-value').addClass("disable");

		$('.form-item-field-indi-state-value input').click(function() {
			checkFieldVisibility();
		});
		$('.form-item-field-indi-pressure-value input').click(function() { 
			checkFieldVisibility();
		});
		$('.form-item-field-indi-response-value input').click(function() {
			checkFieldVisibility();
		});
		
		$("fieldset.form-item-field-indi-get-data-from select").change(function() {
			checkFieldVisibility();
			if ($( this ).val() == "BIOPAMA Geonode"){
				getGeonodeStuff();
			} else {
				//destroy geonode stuff if it exsists
				if ($("div#geonode-layer-wrapper").length) $("div#geonode-layer-wrapper").remove();
				
			}
		})
	}
	
	function checkFieldVisibility(){
		if (!$('.field--name-field-indi-state input').prop('checked')){
			$(".field--name-field-indicator-thematic").hide();
		} else {
			$(".field--name-field-indicator-thematic").show();
		}
		if (!$('.field--name-field-indi-pressure input').prop('checked')){
			$(".field--name-field-indi-classification").hide();
		} else {
			$(".field--name-field-indi-classification").show();
		}
		if (!$('.field--name-field-indi-response input').prop('checked')){
			$(".field--name-field-reference-policy").hide();
		} else {
			$(".field--name-field-reference-policy").show();
		}
		
		if ($("fieldset.form-item-field-indi-get-data-from select").val() == "BIOPAMA Geonode"){
			$('fieldset#geonode-settings-wrapper').show();
			$('fieldset#rest-settings-wrapper').hide();
		} else if ($("fieldset.form-item-field-indi-get-data-from select").val() == "REST"){
			$('fieldset#rest-settings-wrapper').show();
			$('fieldset#geonode-settings-wrapper').hide();
		} else {
			$('fieldset#geonode-settings-wrapper').hide();
			$('fieldset#rest-settings-wrapper').hide();
		}
/* 		if (!$('.field--name-field-indi-scope-global input').prop('checked')){
			$("#global-geonode-wrapper").hide(); 
		} else {
			$("#global-geonode-wrapper").show(); 
		}
		if (!$('.field--name-field-indi-scope-regional input').prop('checked')){
			$("#regional-geonode-wrapper").hide(); 
		}
		if (!$('.field--name-field-indi-scope-country input').prop('checked')){
			$("#country-geonode-wrapper").hide(); 
		}
		if (!$('.field--name-field-indi-scope-pa input').prop('checked')){
			$("#local-geonode-wrapper").hide(); 
		} */

	}
	
	function getGeonodeStuff(){
		$( '<div id="geonode-layer-wrapper"><div id="geonode-layers">GeoNode Layers: <select id="geonode-dropdown" name="Geonode Layers"></select></div>'+
		'<div id="geonode-attributes">Layer attributes<select id="geonode-layer-atts" name="Layer Attributes"></select></div></div>' ).insertAfter( "fieldset.form-item-field-indi-get-data-from" );
		dropdown = $('#geonode-dropdown');
		dropdownAtts = $('#geonode-layer-atts');
		$('#geonode-attributes').hide();
		dropdown.append('<option selected="true" disabled>Choose a Layer</option>');
		$.ajax({
			url: 'http://biopama.org:32788/geoserver/csw?service=CSW&version=2.0.2&request=GetRecords&typeNames=csw:Record&resultType=results&elementSetName=full&maxRecords=150',
			dataType: 'text',
			success: xmlParser,
			error: function (jqXHR, tranStatus, errorThrown) {
				console.log(
					'Status: ' + jqXHR.status + ' ' + jqXHR.statusText + '. ' +
					'Response: ' + jqXHR.responseText
				);
			}
		});
		
		dropdown.change(function() {
			var layerName = $( this ).val();
			$( "#geonode-dropdown option:selected" ).each(function() {
				$.ajax({
					url: 'http://biopama.org:32788/geoserver/ows?version=1.3.0&request=describeFeatureType&outputFormat=application/json&service=WFS&typeNames='+layerName,
					crossDomain: true,
					success: jsonParser,
					error: function (jqXHR, tranStatus, errorThrown) {
						dropdownAtts.empty().show().append('<option selected="true" disabled>This one is a raster, try selecting another layer.</option>');
						console.log(
							'Status: ' + jqXHR.status + ' ' + jqXHR.statusText + '. ' +
							'Response: ' + jqXHR.responseText
						); 
					}
				});
			});
		});
		
		function xmlParser(xml) {
			var xmlResult = $.parseXML( xml );
			$xml = $(xmlResult);
			var thisTitle;
			var thisID;
			$xml.find('csw\\:Record').each(function () {
				thisTitle = $(this).find("dc\\:title").text()
				thisID = $(this).find("dc\\:identifier").text()
				dropdown.append($('<option></option>').attr('value', thisID).text(thisTitle));
			});
		}
		function jsonParser(d) {
			$('#geonode-attributes').show()
			dropdownAtts.empty().append('<option selected="true" disabled>Select an Attribute</option>');
			$(d.featureTypes[0].properties).each(function(i, data) {
				dropdownAtts.append($('<option></option>').text(d.featureTypes[0].properties[i].name + ' | ' + d.featureTypes[0].properties[i].type));
			}); 

		}
	};
});



