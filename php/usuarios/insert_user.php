<?php 
    include('conexion.php');
    $diractual = getcwd();
    $pathControlador = substr_replace($diractual,"",strlen($diractual)-strlen('php/usuarios'),strlen('php/usuarios'));

    $uploadedFile = '';
    if(!empty($_FILES["file"]["type"])){
        $temporary = explode(".", $_FILES["file"]["name"]);
        $file_extension = end($temporary);
        $fileName = time().'_'.rand(100000,999999).'_'.time().'.'.$file_extension;
        $valid_extensions = array("jpeg", "jpg", "png");
        if((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg")) && in_array($file_extension, $valid_extensions)){
            $sourcePath = $_FILES['file']['tmp_name'];
            $targetPath = $pathControlador."img/".$fileName;
            if(move_uploaded_file($sourcePath,$targetPath)){
                $uploadedFile = $fileName;
            }
        }
    }
    if(!empty($_FILES["file"]["type"])){
        $subida = "img/".$fileName;
    }else{
        $subida = "img/sin_foto.png";
    }
    
    
    $username = $_POST['username'];
    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $nip = $_POST['nip'];
    $tipo = $_POST['tipo'];

    $sql = "CALL insertarUser('".$nombre."','".$apellidos."','".$username."','".$email."','".$password."',".$nip.",'".$subida."',".$tipo.")"; 
        
    if (($result = mysqli_query($conn, $sql)) === false) {
        die(mysqli_error($conn));
    } 

    $conn->close(); 
?>