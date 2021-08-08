<?php 
    include('conexion.php');

    $id = $_POST['id'];

    $sql = "CALL borrarUsuario(".$id.")";
    
    $result = $conn->query($sql);

    $conn->close();
?>