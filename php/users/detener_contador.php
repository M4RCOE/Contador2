<?php 
    include('conexion.php');

    $fechafin = $_POST['FECHAFIN'];
    $tiempo = $_POST['TIEMPO'];
    $estado = $_POST['ESTADO'];
    $id = $_POST['IDUSER'];

    $sql = "CALL detenerContadorUserServicio('".$fechafin."','".$tiempo."',".$estado.",".$id.")";
    
    $result = $conn->query($sql);

    echo $result;
    
    $conn->close();
?>