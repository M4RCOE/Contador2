<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
	<title>Login</title>
    <link rel="stylesheet" href="<?php echo base_url('css/login.css') ?>">
</head>
<body class="text-center">

	<form class="form-signin" action="<?php echo site_url('App/login');?>" method="POST">
    	<img class="mb-4" src="https://image.flaticon.com/icons/png/512/149/149071.png" alt="" width="72" height="72">
    	<h1 class="h3 mb-3 font-weight-normal">Inicio de sesión</h1>
    	<label for="username" class="sr-only">Usuario</label>
    	<input type="text" id="username" name="username" class="form-control" placeholder="Usuario" required="" autofocus="">
    	<label for="password" class="sr-only">Contraseña</label>
    	<input type="password" id="password" name="password" class="form-control" placeholder="Contraseña" required="">
    	<button class="btn btn-lg btn-dark btn-block mt-3" type="submit">Iniciar sesión</button>
    	<p class="mt-5 mb-3 text-muted">
	  		Hecho por José Ricardo Baeza Candor<br>
            2021 © 
		</p>
	</form>
</body>
</html>