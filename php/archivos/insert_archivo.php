<?php 
    include('conexion.php');
    $diractual = getcwd();
    $pathControlador = substr_replace($diractual,"",strlen($diractual)-strlen('php/archivos'),strlen('php/archivos'));
    
    $uploadedFile = '';
    if(!empty($_FILES["file"]["type"])){
        $temporary = explode(".", $_FILES["file"]["name"]);
        $file_extension = end($temporary);
        $fileName = time().'_'.rand(100000,999999).'_'.time().'.'.$file_extension;
        $valid_extensions = array("jpeg", "jpg", "png");
        if((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg")) && in_array($file_extension, $valid_extensions)){
            $sourcePath = $_FILES['file']['tmp_name'];
            $targetPath = $pathControlador."archivos/".$fileName;
            if(move_uploaded_file($sourcePath,$targetPath)){
                $uploadedFile = $fileName;
            }
        }
    }
    if(!empty($_FILES["file"]["type"])){
        $subida = substr_replace($targetPath,"",0,$pathControlador);
        $extension = ".".$file_extension;
        $nombre = substr($fileName,0,(strlen($fileName)-strlen($extension)));
        $path = substr_replace($targetPath,"",strlen($targetPath)-strlen($nombre.$extension),strlen($nombre.$extension));
        $fecha = $_POST['fecha'];

        $sql = "CALL insertarArchivo('".$nombre."','".$extension."','".$path."','".$fecha."')";

        if (($result = mysqli_query($conn, $sql)) === false) {
            echo $result;
            die(mysqli_error($conn));
        }else{
            echo $result;
        }
    } 

    $conn->close();

?>