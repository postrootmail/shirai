<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Blog extends CI_Controller {
    public function index()
    {
    	$this->load->model('Blog_model');
    	$this->load->library('utilityClass');
    	$this->load->library('pagination');
    	
    	// ブログ記事から件数取得
    	$blogEntryCount = $this->Blog_model->getCount();

    	// URLの何番目の区切りをページ数とするか
    	$baseUrl = '/blog/index/';
    	$segment = 2;
    	$page    = ($this->uri->segment($segment) && is_numeric($this->uri->segment($segment)))? $this->uri->segment($segment) : 1;
    	$perPage = 10;
    	$config  = UtilityClass::generatePagerConfig($baseUrl, $blogEntryCount, $perPage, $segment, 3);
    	
    	// ページャーのinitialize
    	$this->pagination->initialize($config);
    	
    	$data['blogEntries'] = $this->Blog_model->getByPageAndPerPage($page, $perPage);
    	
        UtilityClass::view(@$data, $this, "blog/index");
    }
}
