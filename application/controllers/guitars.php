<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Guitars extends CI_Controller {
    public function index()
    {
    	
    	
    	
    	$this->load->library('utilityClass');
        UtilityClass::view(@$data, $this, "guitars/index");
    }
}
