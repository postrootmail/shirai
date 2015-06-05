<?php 
class Blog_model extends CI_Model {

    var $title   = '';
    var $content = '';
    var $date    = '';

    function __construct()
    {
        parent::__construct();
    }
    
    function getLastEntries($limit)
    {
    	$sql = <<<EOF
SELECT * FROM blog
WHERE is_active = 1
ORDER BY id DESC
LIMIT {$limit}
EOF;
        $query  = $this->db->query($sql);
    	$result = $query->result();
        return $result;
    }
    
    function getCount()
    {
    	$sql = <<<EOF
SELECT count(id) as count FROM blog
WHERE is_active = 1
EOF;
    	$query  = $this->db->query($sql);
    	$result = $query->result();
    	return $result[0]->count;
    }
    
    function getByPageAndPerPage($page, $perPage)
    {
    	$offset = ($page - 1) * $perPage;
    	
    	$sql = <<<EOF
SELECT * FROM blog
WHERE is_active = 1
ORDER BY id DESC
LIMIT {$perPage} OFFSET {$offset}
EOF;
    	$query  = $this->db->query($sql);
    	$result = $query->result();
    	return $result;
    }

    function insert()
    {
        $this->title   = $_POST['title']; // 下の Note を参照してください
        $this->content = $_POST['content'];
        $this->date    = time();

        $this->db->insert('entries', $this);
    }

    function update()
    {
        $this->title   = $_POST['title'];
        $this->content = $_POST['content'];
        $this->date    = time();

        $this->db->update('entries', $this, array('id' => $_POST['id']));
    }

}
?>