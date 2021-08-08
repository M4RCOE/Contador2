<?php 
    include('conexion.php');

    $iduser = $_POST['iduser'];
    $idmenu = $_POST['idmenu'];

    $sql = "CALL ponerUsuarioMenu(".$iduser.",".$idmenu.")";
    
    $result = $conn->query($sql);

    $conn->close();
?>