<?php 
    include('conexion.php');

    $id = $_POST['id'];

    $sql = "CALL quitarUsuarioMenu(".$id.")";
    
    $result = $conn->query($sql);

    $conn->close();
?>