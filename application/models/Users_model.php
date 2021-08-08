<?php
    class Users_model extends CI_Model{
        
        public function login($username, $password)
        {
            $query = $this->db->get_where('app_users', array('username' => $username, 'password' => $password));
            return $query->row_array();
        }
    
        public function obtener_users()
        {
            $query = $this->db->get('app_users');
            return $query->result_array();  
        }
    }
?>