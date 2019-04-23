jQuery(document).ready(function($) {
	$("fieldset.data-settings-wrapper").hide();
	var wmsURL;
	var workspace;
	var layerName;
	var selectedAtts;
	var dropdownWMS;
	var dropdownWMSAtts;
	var dropdown;
	var dropdownAtts;
	var strippedWMS;
	//this will clean the form the first time we load the JS
	dataEdit();
	//the behavior below will clean the form each time it's loaded after the initial load.
	Drupal.behaviors.dataEditPrep = {
		attach:function(context, settings){
			if (($("form.node-data-edit-form").length) || ($("form.node-data-form").length) || ($("div.form-item-inline-entity-form-field-indi-get-data-from").length)){
				dataEdit();
			}
		}
	};
	
	function dataEdit(){

		//Run this when the data type is selected (REST or Geonode Layer)
		$("select[data-drupal-selector=edit-field-indi-get-data-from], select[data-drupal-selector=edit-inline-entity-form-field-indi-get-data-from]").change(function() {
			//if it's REST data skip out to the REST function to see what fields need to be displayed
			if ($( this ).val() == "REST"){
				$("fieldset.data-settings-wrapper").hide();
				$("fieldset#rest-settings-wrapper").show();
			}
			if ($( this ).val() == "External Map Data"){
				$("fieldset.data-settings-wrapper").hide();
				$("fieldset#wms-settings-wrapper").show();
				if (!$("div.wms-search-wrapper").length){
					/*
					We need to construct the complete Form for filling the WMS layer settings
					This includes: search button, layer select, and attribute select. 
					*/
					$( '<div class="wms-search-wrapper">' +
					'<button type="button" class="btn btn-primary wms-service-search disabled">Search WMS Server</button><br>'+
					'<div id="wms-layers-wrapper">' +
					'<div id="wms-layers">WMS Layers: <select id="wms-dropdown" class="chosen-select" name="WMS Layers"></select></div>' +
					'</div>' +
					'<div id="wms-layer-atts-wrapper">' +
					'<div id="wms-layer-atts">Layer Attributes: <select id="wms-atts" multiple class="chosen-select" data-placeholder="Choose layer Attributes" name="Layer Attributes"></select></div>' +
					'</div>' +
					'</div>' ).appendTo( "fieldset.form-item-field-wms-base-url-0-value, div#edit-inline-entity-form-field-wms-base-url-wrapper" );
					dropdownWMS = $('select#wms-dropdown');
					dropdownWMSAtts = $('select#wms-atts');
					dropdownWMS.hide();
					dropdownWMSAtts.hide();
					//we also attach an error container to the main form container
					$( '<div id="wms-errors" class="alert wms-error" role="alert"></div>').appendTo( "form.node-data-form" );
					$( '<div id="wms-errors" class="alert wms-error" role="alert"></div>').appendTo( "form.node-data-edit-form" );
					$( '<div id="wms-errors" class="alert wms-error" role="alert"></div>').appendTo( "form.entity-browser-form" );
				}
				$( "button.wms-service-search" ).click(function() {
					if ($(this).hasClass("disabled")) {
						console.log("it's not available dummy");
					} else {
						checkWmsServices(); 
					}
				});
				$("input[data-drupal-selector=edit-field-wms-base-url-0-value], input[data-drupal-selector=edit-inline-entity-form-field-wms-base-url-0-value]").change(function() {
					$("div#wms-errors").empty().removeClass("alert-danger").removeClass("alert-success");
					var URLerrors = 0;
					wmsURL = $( this ).val().toLowerCase();
					var URLQuestionMark = wmsURL.slice(-1);
					if(wmsURL.indexOf("https://") == -1) {
						$( '<div>The URL requires HTTPS</div>' ).appendTo( "div#wms-errors" );
						URLerrors = 1;
					} 
					if((wmsURL.indexOf("ows") == -1)&&(wmsURL.indexOf("wms") == -1)) {
						$( '<div>The URL does not appear to include a WMS or OWS service</div>' ).appendTo( "div#wms-errors" );
						URLerrors = 1;
					}
					if(URLQuestionMark !== "?") {
						$( '<div>You forgot to add the question mark to the end of the URL</div>' ).appendTo( "div#wms-errors" );
						URLerrors = 1;
					}
					if(URLerrors == 0) {
						$("div#wms-errors").addClass("alert-success");
						$( '<div>The URL looks good.</div>' ).appendTo( "div#wms-errors" );
						$("button.wms-service-search").removeClass("disabled");
					} else {
						$( "div#wms-errors" ).addClass("alert-danger");
						$("button.wms-service-search").addClass("disabled");
					}
				});
				$("input[data-drupal-selector=edit-field-wms-base-url-0-value]").trigger("change");
				$("input[data-drupal-selector=edit-inline-entity-form-field-wms-base-url-0-value]").trigger("change");
			}
			if ($( this ).val() == "BIOPAMA Geonode"){
				$("fieldset.data-settings-wrapper").hide();
				//there is no geonode settings wrapper right now.
				//$("fieldset#geonode-settings-wrapper").show();
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
		$("select[data-drupal-selector=edit-field-indi-get-data-from]").trigger("change");
		$("select[data-drupal-selector=edit-inline-entity-form-field-indi-get-data-from]").trigger("change");
	}

	function checkWmsServices(){
		if ($( "input[data-drupal-selector=edit-inline-entity-form-field-wms-base-url-0-value]" ).length){
			wmsURL = $( "input[data-drupal-selector=edit-inline-entity-form-field-wms-base-url-0-value]" ).val();
		} else {
			wmsURL = $( "input[data-drupal-selector=edit-field-wms-base-url-0-value]" ).val();
		}
		var wmsGetCapabilitiesRequest = wmsURL + "service=WMS&version=3.0.0&request=GetCapabilities";

		//console.log(wmsGetCapabilitiesRequest);
		$.ajax({
			url: wmsGetCapabilitiesRequest,
			dataType: "xml",
			success: externalxmlParser,
			error: function (jqXHR, tranStatus, errorThrown) {
				$( "div#wms-errors" ).empty().removeClass("alert-success").addClass("alert-danger");
				$("div#wms-errors").html('<div>There was an error checking the GetCapabilities: ' + jqXHR.status + ' ' + jqXHR.statusText + '. ' +
					'Response: ' + jqXHR.responseText + '</div>');
			}
		});
	}
	function externalxmlParser(xml) {
		//our WMS works. Set the workspace and procceed to next steps (layer selection)
		workspace = wmsURL.match(/(geoserver\/)(.*\n?)(?=\/)/g); //this is for cross browser compatibility. First take geoserver/workspace
		//workspace = workspace.match(/(\/)(.*\n?)/g); //then cut out geoserver
		workspace = workspace[0].split('/');
		workspace = workspace[1]; 
		//we hide the error containers in 2 places, at the change of the previous element, and at the change of the current element as you never know if a user is doubling back on the form.
		//WMSerrorHideShow("wms-errors");
		$( "div#wms-errors" ).empty().removeClass("alert-danger").addClass("alert-success").html('<div>Get Capabilities works, please pick a layer.</div>');

		dropdownWMS.chosen({width: "100%"}).empty().show(); //set the Layer list to chosen, empty it out and show it.

		var $Layers = $(xml).find("Layer");
		$Layers.each(function(){
			var thisTitle = $(this).find("Title:first").text()
			dropdownWMS.append($('<option></option>').attr('value', thisTitle).text(thisTitle)).trigger("chosen:updated");
		});

		dropdownWMS.chosen().change(function(e, params){
			layerName = $( this ).val();

			//the first thing to test is if the selected layer supports WFS. We do this by trying a WFS request.
			//to do the request we construct the WFS URL
			strippedWMS = wmsURL.match(/^.*geoserver\//g);
			var finishedWMSURLtest = encodeURI(strippedWMS + workspace + "/ows?service=wfs&version=1.1.0&request=getfeature&MAXFEATURES=1&typename=" + workspace+ ":" + layerName + "&PROPERTYNAME=,"+"&outputFormat=application/json");
			//we MUST check if this layer can even support WFS before trying to get the attributes.
			$.ajax({
				url: finishedWMSURLtest,
				crossDomain: true,
				success: checkWFSURLCompatibility,
				error: function (jqXHR, tranStatus, errorThrown) {
					$("div#wms-errors").empty().removeClass("alert-success").addClass("alert-danger").html('<div>There is something wrong.<br>Status: ' + jqXHR.status + ' ' + jqXHR.statusText + '. ' +
					'Response: ' + jqXHR.responseText + '</div>');
				}
			});
		});
	}
	function checkWFSURLCompatibility(xml) {
		if ($.isXMLDoc( xml )){ //check FAILED. Not WFS compatible
			$("div#wms-errors").empty().removeClass("alert-success").addClass("alert-danger").html('<div>This layer does not appear to support WFS.</div>');
		} else { //we have a working WFS, so we load the layer attribute selection
			$( "#wms-dropdown option:selected" ).each(function() {
				var wmsLayerAttributesURL = wmsURL + 'version=1.3.0&request=describeFeatureType&outputFormat=application/json&service=WFS&typeNames=' + layerName;
				$.ajax({
					url: wmsLayerAttributesURL,
					crossDomain: true,
					success: externaljsonParser,
					error: function (jqXHR, tranStatus, errorThrown) {
						$( "div#wms-errors" ).empty().removeClass("alert-success").addClass("alert-danger");
						$("div#wms-errors").addClass("alert-danger").html('<div>Status: ' + jqXHR.status + ' ' + jqXHR.statusText + '. ' +
						'Response: ' + jqXHR.responseText + '</div>');
					}
				});
			});			
		}
	}
	function externaljsonParser(d) {
		$( "div#wms-errors" ).empty().removeClass("alert-danger").addClass("alert-success").html('<div>The layer WFS works, select some attributes from the layer.</div>');
		
		dropdownWMSAtts.empty().chosen({no_results_text: "No features found using: ", width: "100%", max_selected_options: 10}).show(); 
		if (!$("div.att-chart-info").length){
			$("#wms-settings-wrapper").append('<div>'+
				'<div class="alert alert-info att-chart-info" role="alert">You must select which features you want to use in the CHART. '+
				'Any features you choose will appear in theis text area to be copied for use when creating the chart in the next step.</div>'+
				'<textarea style="width: 100%; height: 100px;" id="wms-feature-copy"></textarea><br>'+
				'<a href="#" id="WMScopyButton" class="btn btn-secondary btn-sm" role="button">Copy</a>'+
			'</div>');
		}
		//var input = document.getElementById('wms-feature-copy');
		$(d.featureTypes[0].properties).each(function(i, data) {
			//$('#wms-feature-copy').append(d.featureTypes[0].properties[i].name + ' | ' + d.featureTypes[0].properties[i].type + '\\\n');
			dropdownWMSAtts.append($('<option></option>').text(d.featureTypes[0].properties[i].name + ' | ' + d.featureTypes[0].properties[i].type)).trigger("chosen:updated");
		}); 
		dropdownWMSAtts.trigger("chosen:updated");

		$('#WMScopyButton').click(function() {
			copyToClipboardMsg(document.getElementById("wms-feature-copy"), "wms-msg");
		});
		
		dropdownWMSAtts.chosen().change(function(e, params){
			//WMSerrorHideShow("wms-layer-atts");
			selectedAtts = '';
			var myValues = $('#wms-atts').chosen().val();
			$.each(myValues,function(i, selected) {
				var cleanAttr = selected.split(' | ');
				selectedAtts += cleanAttr[0] + ",";
			});
			$('#wms-feature-copy').empty().append(selectedAtts);
			var finishedWMSURL = encodeURI(strippedWMS + workspace + "/ows?service=wfs&version=1.1.0&request=getfeature&MAXFEATURES=9999&typename=" + workspace+ ":" + layerName + "&PROPERTYNAME="+selectedAtts+"&outputFormat=application/json");
			if ($("input[data-drupal-selector=edit-inline-entity-form-field-data-rest-url-0-value]").length){
				$("input[data-drupal-selector=edit-inline-entity-form-field-data-rest-url-0-value]").val(finishedWMSURL);
				$("input[data-drupal-selector=edit-inline-entity-form-field-rest-field-context-0-value]").val("features");
			} else if ($("input[data-drupal-selector=edit-field-data-rest-url-0-value]").length) {
				$("input[data-drupal-selector=edit-field-data-rest-url-0-value]").val(finishedWMSURL);
				$("input[data-drupal-selector=edit-field-rest-field-context-0-value]").val("features");
			}
			
		});
	}


	function copyToClipboardMsg(elem, msgElement) {
	    var succeed = copyToClipboard(elem);
		var msg;
		if (!succeed) {
			$( "div#wms-errors" ).empty().removeClass("alert-success").addClass("alert-danger").html('Copy not supported or blocked.  Press Ctrl+c to copy.');
		} else {
			$( "div#wms-errors" ).empty().removeClass("alert-danger").addClass("alert-success").html('Text copied to the clipboard.');
		}
	}
	function copyToClipboard(copyTarget) {
		// select the content
		copyTarget.select();
		// copy the selection
		var succeed;
		try {
			  succeed = document.execCommand("copy");
		} catch(e) {
			succeed = false;
		}
		return succeed;
	}
});

jQuery(function () {
  Drupal.attachBehaviors(document, Drupal.settings);
});



