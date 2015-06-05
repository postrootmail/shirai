<?php
class UtilityClass {
	public static function view($data = array(), $class, $viewFile = 'index')
	{
		$class->load->view('layout/header.php');
		$class->load->view("{$viewFile}.php", $data);
		$class->load->view('layout/footer.php');
	}
	
	public static function adminView($data = array(), $class, $viewFile = 'index')
	{
		$class->load->view('layout/adminHeader.php');
		$class->load->view("{$viewFile}.php", $data);
		$class->load->view('layout/adminFooter.php');
	}
	
	public static function generatePagerConfig($baseUrl, $total, $perPage = 10, $segment = 3, $numLinks = 3){
		$config['base_url']             = $baseUrl;
		$config['total_rows']           = $total;
		$config['per_page']             = $perPage; 
		$config['num_links']            = $numLinks;
		$config['segment']              = $segment;
		$config['query_string_segment'] = 'page';
		$config['use_page_numbers']     = true;
		$config['next_link']            = '次へ&rsaquo;';
		$config['last_link']            = '最後へ&rsaquo;';
		$config['prev_link']            = '&lsaquo;前へ';
		$config['first_link']           = '&lsaquo;最初へ';
		
		return $config;
	}
}
?>