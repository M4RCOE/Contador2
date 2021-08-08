<?php 
    include('conexion.php');

    $tarea = $_POST['TAREA'];
    $fecha = $_POST['FECHA'];
    $estado = $_POST['IDESTADO'];
    $id = $_POST['IDUSER'];

    $sql = "CALL insertTareaUser('".$tarea."','".$fecha."',".$estado.",".$id.")";   
    
    $result = $conn->query($sql);
    
    echo $result;

    $conn->close();
?>