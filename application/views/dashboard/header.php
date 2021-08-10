<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Menus</title>

    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="<?php echo base_url('plugins/fontawesome-free/css/all.min.css')?>">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css" rel="stylesheet"/>
    <!-- IonIcons -->
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="<?php echo base_url('dist/css/adminlte.min.css') ?>">
    <!-- Boostrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
    <!-- JQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <!-- JQuery UI -->
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <!-- DataTables -->
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.25/css/jquery.dataTables.css">
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.25/js/jquery.dataTables.js"></script>
    <!-- NestedSortable -->
    <script src="<?php echo base_url('js/jquery.mjs.nestedSortable.js') ?>"></script>
    <!--  Importación MomentJS  -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment-with-locales.min.js"></script>
    <!-- Estilos propios -->
    <link rel="stylesheet" href="<?php echo base_url('css/iconos.css') ?>" />
    <link rel="stylesheet" href="<?php echo base_url('css/estilos.css') ?>" />
    <link rel="stylesheet" href="<?php echo base_url('css/prestadores_servicio.css') ?>">
    
    <script src="<?php echo base_url('js/inicializacion_variables.js') ?>"></script> 
    
</head>
    <body class="hold-transition sidebar-mini">
        <input id="baseURL" value="<?php echo base_url('')?>" hidden/>
        <div class="wrapper">
            <nav class="main-header navbar navbar-expand navbar-white navbar-light">
                <!-- Left navbar links -->
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
                    </li>
                    <li class="nav-item d-none d-sm-inline-block">
                        <a href="<?php echo base_url('') ?>" class="nav-link">Inicio</a>
                    </li>
                </ul>
                <!-- Right navbar links -->
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" data-widget="ma_usuarios" href="<?php echo site_url('App/ma_usuarios') ?>" role="button"><i class="fas fa-users"></i></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-widget="sitios" href="<?php echo site_url('App/sitios') ?>" role="button"><i class="fas fa-map-marker-alt"></i></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-widget="categorias" href="<?php echo site_url('App/categorias') ?>" role="button"><i class="fas fa-book"></i></a>
                    </li>
                    <li class="nav-item">
                        <?php 
                            $currentpage = substr_replace('http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'],'',0,strlen(base_url('')));
                        ?>
                        <a class="nav-link" data-widget="usuarios"  href="<?php if($currentpage=='App/usuarios'){ echo site_url('App/dashboard'); }else{ echo site_url('App/usuarios'); } ?>" role="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
                            </svg>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-widget="fullscreen" href="#" role="button"><i class="fas fa-expand-arrows-alt"></i></a>
                    </li>
                </ul>
                <ul class="navbar-nav me-5">
            <?php 
                if($this->session->has_userdata('user')){
                  $user = $this->session->userdata('user');
            ?>
                    <div class="nav-item dropdown mr-4">
                        <a class="nav-link dropdown-toggle text-dark mr-2" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <?php echo $user['USERNAME'] ?>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <?php
                            if($user['IDTIPO']==1){
                        ?>
                            <li><a class="dropdown-item" href="<?php echo site_url('App/dashboard') ?>">Dashboard</a></li>
                        <?php
                            }
                        ?>
                            <li><a class="dropdown-item" href="<?php echo site_url('App/cerrarsesion') ?>">Cerrar Sesión</a></li>
                        </ul>
                    </div>
            <?php                    
                }else{ 
            ?>    
                    <div class="nav-item dropdown mx-5">
                        <a class="nav-link dropdown-toggle text-white mx-2" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Iniciar Sesión
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="<?php echo site_url('App/iniciosesion') ?>">Iniciar Sesión</a></li>
                        </ul>
                    </div>
            <?php    
                }
            ?>
          </li>
        </ul>
  </nav>