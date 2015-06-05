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
}
?>