<?php 
    include('conexion.php');

    $fechainicio = $_POST['FECHAINICIO'];
    $fecha = $_POST['FECHA'];
    $estado = $_POST['ESTADO'];
    $id = $_POST['IDUSER'];

    $sql = "CALL iniciarContadorUserServicio('".$fechainicio."','".$fecha."',".$estado.",".$id.")";
    
    $result = $conn->query($sql);
    echo $result;
    $conn->close();
?>