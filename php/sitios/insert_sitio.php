<?php 
    include('conexion2.php');

    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $cliente = $_POST['cliente'];
    $domicilio = $_POST['domicilio'];
    $ubicacion = $_POST['ubicacion'];
    $contacto = $_POST['contacto'];
    $telefono = $_POST['telefono'];
    $fecha = $_POST['fecha'];

    $sql = "CALL insertarSitio('".$nombre."','".$descripcion."',".$cliente.",'".$domicilio."','".$ubicacion."','".$contacto."','".$telefono."','".$fecha."')";   
    
    $result = $conn->query($sql);
    
    echo $result;

    $conn->close();
?>