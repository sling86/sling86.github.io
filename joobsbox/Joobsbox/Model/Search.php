<?php
/**
 * Search Model definition
 * 
 * Zend_Search_Lucene implementation for search
 *
 * @author Valentin Bora <contact@valentinbora.com>
 * @version 1.0
 * @category Joobsbox
 * @package Joobsbox_Model
 * @copyright  Copyright (c) 2009 Joobsbox. (http://www.joobsbox.com)
 * @license	   http://www.joobsbox.com/joobsbox-php-license
 */

 /**
 * @category Joobsbox
 * @package Joobsbox_Model
 * @copyright  Copyright (c) 2009 Joobsbox. (http://www.joobsbox.com)
 * @license	   http://www.joobsbox.com/joobsbox-php-license
 */

class Joobsbox_Model_Search {
	public $_index;
	public $_enabled = true;
	
	public function __construct() {
		if(file_exists("Joobsbox/SearchIndexes/main")) {
			$this->_index = Zend_Search_Lucene::open("Joobsbox/SearchIndexes/main");
		} else {
		  if(is_writable('Joobsbox/SearchIndexes')) {
			  $this->_index = Zend_Search_Lucene::create("Joobsbox/SearchIndexes/main");
			} else {
			  $this->_enabled = false;
			}
		}
		if($this->_enabled) {
		  Zend_Search_Lucene_Analysis_Analyzer::setDefault(new Zend_Search_Lucene_Analysis_Analyzer_Common_Utf8_CaseInsensitive ()); 
		  Zend_Search_Lucene_Search_QueryParser::setDefaultEncoding('utf-8'); 
		}
	}
	
	public function search($string) {
	  if(!$this->_enabled) return array();
		$query = Zend_Search_Lucene_Search_QueryParser::parse($string);
		return $this->_index->find($query);
	}
	
	public function searchTag($tag, $value) {
	  if(!$this->_enabled) return array();
	  Zend_Search_Lucene::setDefaultSearchField($tag);
	  $query = Zend_Search_Lucene_Search_QueryParser::parse($value);
		return $this->_index->find($query);
	}
	
	public function deleteJob($jobId) {
	  if(!$this->_enabled) return false();
		$term = new Zend_Search_Lucene_Index_Term($jobId, 'ID');
		$hits  = $this->_index->termDocs($term);
		if(count($hits)) {
			foreach($hits as $hit) {
				$this->_index->delete($hit->id);
			}
		}
	}
	
	public function addJob($jobData) {
	  if(!$this->_enabled) return false();
		// Delete old job with the same id from index
		$term = new Zend_Search_Lucene_Index_Term($jobData['ID'], 'ID');
		$hits  = $this->_index->termDocs($term);
		if(count($hits)) {
			foreach($hits as $hit) {
				$this->_index->delete($hit->id);
			}
		}
		
		// Add the job now
		$job = new Zend_Search_Lucene_Document();
		$job->addField(Zend_Search_Lucene_Field::Keyword('DocumentType', 'job', 'utf-8'));
		$job->addField(Zend_Search_Lucene_Field::Keyword('ID', $jobData['ID'], 'utf-8'));
		$job->addField(Zend_Search_Lucene_Field::Text('Title', $jobData['Title'], 'utf-8'));
		$job->addField(Zend_Search_Lucene_Field::Text('Description', $jobData['Description'], 'utf-8'));
		$job->addField(Zend_Search_Lucene_Field::Text('Company', $jobData['Company'], 'utf-8'));
		$job->addField(Zend_Search_Lucene_Field::Keyword('CategoryID', $jobData['CategoryID'], 'utf-8'));
		$job->addField(Zend_Search_Lucene_Field::Text('Location', $jobData['Location'], 'utf-8'));
		
		$this->_index->addDocument($job);
		$this->_index->commit();
	}
	
	public function resetIndex() {
	  if(!$this->_enabled) return false();
		for ($count = 0; $count < $this->_index->count(); $count++) {
        $this->_index->delete($count);
    }
		$this->commit();
	}
	
	public function commit() {
	  if(!$this->_enabled) return false();
		$this->_index->commit();
		$this->_index->optimize();
	}
}
