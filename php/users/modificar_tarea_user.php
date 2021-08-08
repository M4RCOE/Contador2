<?php 
    include('conexion.php');

    $id = $_POST['IDTAREA'];
    $tarea = $_POST['TAREA'];
    $fecha = $_POST['FECHA'];
    $comentario = $_POST['COMENTARIO'];
    $idestado = $_POST['IDESTADO'];

    $sql = "CALL modificarTareaUser(".$id.",'".$tarea."','".$fecha."','".$comentario."',".$idestado.")";
    
    $result = $conn->query($sql);

    echo $result;
    
    $conn->close();
?>