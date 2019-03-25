jQuery(document).ready(function($) {
	var dropdown;
	var dropdownAtts;
	//this will clean the form the first time we load the JS
	indicatorEdit();
	//the behavior below will clean the form each time it's loaded after the initial load.
	Drupal.behaviors.dataEditPrep = {
		attach:function(context, settings){
			if ($("div#drupal-off-canvas form.node-data-edit-form").length){
				indicatorEdit();
			}
			if ($("div#drupal-off-canvas form.node-data-form").length){
				indicatorEdit();
			}
		}
	};
	function indicatorEdit(){
		console.log("test")
		
		//hide all the fields that are not checked. they will be shown later if needed
		if (!$('.field--name-field-indi-state input').prop('checked')){
			$(".field--name-field-indicator-thematic").hide();
		}
		if (!$('.field--name-field-indi-pressure input').prop('checked')){
			$(".field--name-field-indi-classification").hide();
		}
		if (!$('.field--name-field-indi-response input').prop('checked')){
			$(".field--name-field-reference-policy").hide();
		}
		if (!$('.field--name-field-indi-scope-global input').prop('checked')){
			$(".field--name-field-indi-map-layers-global").hide(); 
			$("#global-rest-wrapper").hide(); 
		}
		if (!$('.field--name-field-indi-scope-regional input').prop('checked')){
			$(".field--name-field-indi-map-layers-regional").hide();
			$("#regional-rest-wrapper").hide(); 
		}
		if (!$('.field--name-field-indi-scope-country input').prop('checked')){
			$(".field--name-field-indi-map-layers-national").hide();
			$("#country-rest-wrapper").hide(); 
		}
		if (!$('.field--name-field-indi-scope-pa input').prop('checked')){
			$(".field--name-field-indi-map-layers-local").hide(); 
			$("#local-rest-wrapper").hide(); 
		}
		$('.form-item-field-indi-state-value input').click(function() {
			$(".field--name-field-indicator-thematic").toggle();
		});
		$('.form-item-field-indi-pressure-value input').click(function() { 
			$(".field--name-field-indi-classification").toggle();
		});
		$('.form-item-field-indi-response-value input').click(function() {
			$(".field--name-field-reference-policy").toggle();
		});
		
		//Run this when the data type is selected (REST or Geonode Layer)
		$("fieldset.form-item-field-indi-data-type select").change(function() {
			console.log($( this ).val())
			//if it's REST data skip out to the REST function to see what fields need to be displayed
			if ($( this ).val() == "REST"){
				showRestFields();
			}
			//if Geonode, there's a lot to do
			if ($( this ).val() == "Geonode Layer"){
				$( '<div id="geonode-layers">GeoNode Layers: <select id="geonode-dropdown" name="Geonode Layers"></select></div>'+
				'<div id="geonode-attributes">Layer attributes<select id="geonode-layer-atts" name="Layer Attributes"></select></div>' ).insertAfter( "fieldset.form-item-field-indi-data-type" );
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
				
			}
		});
		
		$('.field--name-field-indi-scope-global input, .field--name-field-indi-scope-regional input, .field--name-field-indi-scope-country input, .field--name-field-indi-scope-pa input').change(function() {
			showRestFields();
		});
		function showRestFields(){
			if($('.field--name-field-indi-scope-global input').prop('checked')){
				$(".field--name-field-indi-map-layers-global").show(); 
				if($("fieldset.form-item-field-indi-data-type select").val() == "REST"){
					$("#global-rest-wrapper").show();
				}
			} else {
				$(".field--name-field-indi-map-layers-global").hide();
				$("#global-rest-wrapper").hide();
			}
			if($('.field--name-field-indi-scope-regional input').prop('checked')){
				$(".field--name-field-indi-map-layers-regional").show(); 
				if($("fieldset.form-item-field-indi-data-type select").val() == "REST"){
					$("#regional-rest-wrapper").show();
				}
			} else {
				$(".field--name-field-indi-map-layers-regional").hide();
				$("#regional-rest-wrapper").hide();
			}
			if($('.field--name-field-indi-scope-country input').prop('checked')){
				$(".field--name-field-indi-map-layers-national").show(); 
				if($("fieldset.form-item-field-indi-data-type select").val() == "REST"){
					$("#country-rest-wrapper").show(); 
				}
			} else {
				$(".field--name-field-indi-map-layers-national").hide();
				$("#country-rest-wrapper").hide(); 
			}
			if($('.field--name-field-indi-scope-pa input').prop('checked')){
				$(".field--name-field-indi-map-layers-local").show(); 
				if($("fieldset.form-item-field-indi-data-type select").val() == "REST"){
					$("#local-rest-wrapper").show(); 
				}
			} else {
				$(".field--name-field-indi-map-layers-local").hide();
				$("#local-rest-wrapper").hide(); 
			}
		}
	}
});



