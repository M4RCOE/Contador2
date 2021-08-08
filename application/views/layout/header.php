<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!--  Importación de Bootstrap  -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT" crossorigin="anonymous"></script>
    <!--  Importación de JQuery  -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <!--  Importación de ChartJS  -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <!-- Importación JQuery UI  -->
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
    <!-- Importación Miltiple Date Picker -->
    <script src="https://cdn.rawgit.com/dubrox/Multiple-Dates-Picker-for-jQuery-UI/master/jquery-ui.multidatespicker.js"></script>
    <link href="https://cdn.rawgit.com/dubrox/Multiple-Dates-Picker-for-jQuery-UI/master/jquery-ui.multidatespicker.css"/>
    <!--  Importación MomentJS  -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment-with-locales.min.js"></script>
    <!--  Impotación de Inicialización de Variables  -->
    <script src="<?php echo base_url('js/inicializacion_variables.js') ?>"></script>
    <!--  Impotación de Estilos Propios  -->
    <link rel="stylesheet" href="<?php echo base_url('css/nip.css') ?>">
    <link rel="stylesheet" href="<?php echo base_url('css/prestadores_servicio.css') ?>">
    <link rel="stylesheet" href="<?php echo base_url('css/tareas.css') ?>">
    <link rel="stylesheet" href="<?php echo base_url('css/calendarios.css') ?>">
    
</head>
<body>
    <input id="baseURL" type="text" value="<?php echo base_url('') ?>" hidden/>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="height:60px">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Prestadores de Servicio</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Inicio</a>
                    </li>
                </ul>
            <?php
                if($this->session->has_userdata('user')){
                    $user = $this->session->userdata('user');
            ?>
                <div class="nav-item dropdown mx-5">
                    <a class="nav-link dropdown-toggle text-white mx-2" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
                        <li><a class="dropdown-item" href="#">Editar Usuario</a></li>
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

            </div>
        </div>
    </nav>

    
