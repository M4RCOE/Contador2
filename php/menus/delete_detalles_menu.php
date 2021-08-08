<?php 
    include('conexion.php');

    $id = $_POST['IDMENU'];

    $sql = "CALL borrarDetallesMenu(".$id.")";   
    
    $result = $conn->query($sql);
    
    echo $result;

    $conn->close();
?>