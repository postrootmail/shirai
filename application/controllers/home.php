<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {
    public function index()
    {
    	$this->load->model('Blog_model');
    	$this->load->library('utilityClass');
    	
    	
    	// ブログ記事からID降順で指定件数取得
    	$data['blogEntries'] = $this->Blog_model->getLastEntries(10);
    	
        UtilityClass::view(@$data, $this, "home/index");
    }
    
    public function access()
    {
    	 
    	 
    	 
    	$this->load->library('utilityClass');
    	UtilityClass::view(@$data, $this, "home/access");
    }
    
    public function inquiry()
    {
    
    
    
    	$this->load->library('utilityClass');
    	UtilityClass::view(@$data, $this, "home/inquiry");
    }
}
