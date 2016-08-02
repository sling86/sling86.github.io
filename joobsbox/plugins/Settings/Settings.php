<?php
/**
 * Joobsbox Settings plugin
 *
 * LICENSE
 *
 * This source file is subject to the new BSD license that is bundled
 * with this package in the file LICENSE.
 *
 * @category   Joobsbox
 * @package    Joobsbox_Plugins
 * @copyright  Copyright (c) 2009 Joobsbox. (http://www.joobsbox.com)
 * @license	   http://joobsbox.com/joobsbox-php-license
 */
 
/**
 * Setings plugin class
 * @package	Joobsbox_Plugins
 * @copyright  Copyright (c) 2009 Joobsbox. (http://www.joobsbox.com)
 * @license	   http://joobsbox.com/joobsbox-php-license
 */

class Settings extends Joobsbox_Plugin_AdminBase
{
  public $textItems; 
  
	function init() {
		$this->textItems = array(
      "general" => array(
        "jobs_per_categ"  => $this->view->translate("#Jobs per category (homepage)"), 
        "common_title"    => $this->view->translate("Site title"),
        "posting_ttl"     => $this->view->translate("Job time to live (days)")
      ),
      "rss"     => array(
        "all_jobs_count"      => $this->view->translate("Number of jobs in general RSS feed"),
        "category_jobs_count" => $this->view->translate("Number of jobs per category feed")
      )
    );
	}
	
	function indexAction() {
		$form = new Zend_Form;
		$form->setAction($_SERVER['REQUEST_URI'])->setMethod('post')->setAttrib("id", "formPublish");
	
		$jobs_per_categ = $form->createElement('text', 'jobs_per_categ')
			->setLabel('Job title:')
			->addFilter('StripTags')
			->addFilter('StringTrim')
			->addFilter('HtmlEntities')
			->addValidator('notEmpty')
			->setDescription('Ex: "Flash Designer" or "ASP.NET Programmer"')
			->setRequired(true);
			
		$submit = $form->createElement('submit', 'submit')
			->setLabel("Set");
			
		$config = Zend_Registry::get("conf");
			
		foreach($this->textItems as $category => $items) {
		  foreach($items as $key => $label) {
		    $item = $form->createElement('text', $key)
		      ->setLabel($label)
		      ->addValidator('notEmpty')
		      ->setRequired(true)
		      ->setValue($config->$category->$key);
		    $form->addElement($item);
		  }
		  $form->addDisplayGroup(array_keys($items), $category, array(
         'legend' => ucfirst($category)
      ));
		}
		
		
		// Timezone select
		$tzfile = file("config/timezones.ini.php");
		$timezones = array();
		foreach($tzfile as $value) {
		  $value = trim($value);
		  $value = str_replace('"', '', $value);
		  $timezones[$value] = $value;
		}
		$timezone = $form->createElement('select', 'site_timezone')
		  ->setMultiOptions($timezones)
		  ->setLabel($this->view->translate("Timezone"))
		  ->setValue($config->general->timezone);
		$form->getDisplayGroup('general')->addElement($timezone);
			
		$form->addElement($submit);
		
		$this->form = $form;
		$this->view->form = $form->render();
		
		if ($this->getRequest()->isPost()) {
        $this->validateForm();
		    return;
    }
		
		$this->view->form = $this->form->render();
	}
	
	private function validateForm() {
		$form = $this->form;
		
    if($form->isValid($_POST)) {
      chmod("config/config.ini.php", 0755);
      
			$values = $form->getValues();
			$conf = new Zend_Config_Ini("config/config.ini.php", null, array(
			  'skipExtends'        => true,
        'allowModifications' => true)
      );
      
      foreach($this->textItems as $category => $items) {
  		  foreach($items as $key => $label) {
  		    $conf->$category->$key = $values[$key];
  		  }
  		}
  		
  		$conf->general->timezone = $_POST['site_timezone'];
      
      // Write the configuration file
      $writer = new Zend_Config_Writer_Ini(array(
        'config'   => $conf,
        'filename' => 'config/config.ini.php')
      );
      $writer->write();
      header("Location: " . $_SERVER['REQUEST_URI']);
      exit();
		} else {
			$values = $form->getValues();
			$messages = $form->getMessages();
			$form->populate($values);
			$this->view->form = $form;
		}
		
	}
}
