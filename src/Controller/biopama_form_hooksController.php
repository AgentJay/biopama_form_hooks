<?php

/* namespace Drupal\biopama_form_hooks\Controller;

use \Drupal\Core\Form\FormStateInterface;
use \Drupal\Core\Ajax\AjaxResponse;
use \Drupal\Core\Ajax\HtmlCommand;
use \Drupal\node\Entity\Node;

class biopamaFormHooksController {
	function ajaxSubmitForm($form, FormStateInterface $form_state) {
		// Instantiate an AjaxResponse Object to return.
		$ajax_response = new AjaxResponse();
		\Drupal::logger('biopama_form_hooks')->notice("something happened.");
		drupal_set_message('I am here');
		
		// in the DOM: replace the form with the text 'form submitted'
 		$ajax_response->addCommand(new HtmlCommand('#node-policy-form', 'form submitted'));
		return $ajax_response;
	}
};  */