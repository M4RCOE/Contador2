<?php 
    include('conexion2.php');

    $nombre = $_POST['nombre'];
    $slug = $_POST['slug'];
    $descripcion = $_POST['descripcion'];
    $fecha = $_POST['fecha'];

    $sql = "CALL insertarCategoria('".$nombre."','".$slug."','".$descripcion."','".$fecha."')";   
    
    $result = $conn->query($sql);
    
    echo $result;

    $conn->close();
?>