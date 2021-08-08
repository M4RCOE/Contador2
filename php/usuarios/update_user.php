<?php 
    include('conexion.php');

    $uploadedFile = '';
    if(!empty($_FILES["file"]["type"])){
        $temporary = explode(".", $_FILES["file"]["name"]);
        $file_extension = end($temporary);
        $fileName = time().'_'.rand(100000,999999).'_'.time().'.'.$file_extension;
        $valid_extensions = array("jpeg", "jpg", "png");
        if((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg")) && in_array($file_extension, $valid_extensions)){
            $sourcePath = $_FILES['file']['tmp_name'];
            $targetPath = $_SERVER['DOCUMENT_ROOT']."/Contador2/img/".$fileName;
            if(move_uploaded_file($sourcePath,$targetPath)){
                $uploadedFile = $fileName;
            }
        }
    }

    $id = $_POST['id'];
    $username = $_POST['username'];
    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $nip = $_POST['nip'];

    if(!empty($_FILES["file"]["type"])){
        $subida = substr_replace($targetPath,"",0,strlen($_SERVER['DOCUMENT_ROOT']."/Contador2/"));
        $sql = "CALL actualizarUser('".$username."','".$nombre."','".$apellidos."','".$email."','".$password."',".$nip.",'".$subida."',".$id.")"; 
    }else{
        $sql = "CALL actualizarUserSinFoto('".$username."','".$nombre."','".$apellidos."','".$email."','".$password."',".$nip.",".$id.")"; 
    }
        
    if (($result = mysqli_query($conn, $sql)) === false) {
        die(mysqli_error($conn));
    }

    $conn->close();
?>