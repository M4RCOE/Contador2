<?php 
    include('conexion.php');

    $nombre = $_POST['NOMBRE'];
    $fecha = $_POST['FECHA'];

    $sql = "CALL insertarMenu('".$nombre."','".$fecha."')";   
    
    $result = $conn->query($sql);
    
    echo $result;

    $conn->close();
?>