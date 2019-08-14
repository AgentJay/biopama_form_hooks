jQuery(document).ready(function($) {
	Drupal.behaviors.policyEditPrep = {
		attach:function(context, settings){
 			policyEdit();
		}
	};
	policyEdit();
	function policyEdit(){
		$("select[data-drupal-selector=edit-field-scope]").change(function() {
			console.log("boom")
			hidePolicyScopes();
			var policyScope = $(this).find("option:selected").text()
			console.log($( this ))
			switch (policyScope) {
				case 'Regional':
					$("div[data-drupal-selector=edit-field-ac-region-wrapper]").show();
					break;
				case 'National':
					$("div[data-drupal-selector=edit-field-countries-wrapper]").show();
					break;
				case 'Local':
					$("div[data-drupal-selector=edit-field-policy-pa-wrapper]").show();
					break;
				case 'Global':
				default:
					hidePolicyScopes();
			}
		});
		$("select[data-drupal-selector=edit-field-scope]").trigger("change");
	}
	function hidePolicyScopes(){
		$("div[data-drupal-selector=edit-field-ac-region-wrapper]").hide();
		$("div[data-drupal-selector=edit-field-countries-wrapper]").hide();
		$("div[data-drupal-selector=edit-field-policy-pa-wrapper]").hide();
	}
});



