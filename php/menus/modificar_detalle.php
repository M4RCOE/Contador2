<?php 
    include('conexion.php');

    $id = $_POST['IDDETALLE'];
    $nombre = $_POST['NOMBRE'];
    $enlace = $_POST['ENLACE'];
    $icono = $_POST['ICONO'];

    $sql = "CALL modificarDetalleMenu('".$nombre."','".$enlace."','".$icono."',".$id.")";
    
    $result = $conn->query($sql);

    echo $result;
    
    $conn->close();
?>