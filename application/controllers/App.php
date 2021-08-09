<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class App extends CI_Controller {

	public function index()
	{
		$this->load->view('layout/header');
		$this->load->view('prestadores_servicio');
		$this->load->view('layout/footer');
	}

	public function login()
    {
        $username = $_POST['username'];
        $password = $_POST['password'];

        $data = $this->users_model->login($username, $password);

        if ($data) {
            $this->session->set_userdata('user', $data);
            $this->session->set_userdata('logged_in', TRUE);
			redirect('home');
        } else {
            header('location:' . base_url() . $this->index());
            $this->session->set_flashdata('error', 'Invalid login. User not found');
        }
    }

	public function iniciosesion()
	{
		if ($this->session->userdata('user')) {
			redirect('home');
		}else{
			$this->load->view('login');
		}
	}

	public function cerrarsesion()
    {
		if($this->session->userdata('user')){
        	$this->session->unset_userdata('user');
        	$this->session->unset_userdata('logged_in');
		}
        redirect('home');
    }

	public function dashboard()
	{
		if($this->session->userdata('user')){
			$this->load->view('dashboard/header');
			$this->load->view('dashboard/aside');
			$this->load->view('menus');
			$this->load->view('dashboard/footer');
		}else{
			redirect('home');
		}		
	}

	public function usuarios()
	{
		if($this->session->userdata('user')){
			$this->load->view('dashboard/header');
			$this->load->view('dashboard/aside');
			$this->load->view('users');
			$this->load->view('dashboard/footer');
		}else{
			redirect('home');
		}		
	}

	public function categorias()
	{
		if($this->session->userdata('user')){
			$this->load->view('dashboard/header');
			$this->load->view('dashboard/aside');
			$this->load->view('categorias');
			$this->load->view('dashboard/footer');
		}else{
			redirect('home');
		}		
	}

	public function sitios()
	{
		if($this->session->userdata('user')){
			$this->load->view('dashboard/header');
			$this->load->view('dashboard/aside');
			$this->load->view('sitios');
			$this->load->view('dashboard/footer');
		}else{
			redirect('home');
		}		
	}



	
}
