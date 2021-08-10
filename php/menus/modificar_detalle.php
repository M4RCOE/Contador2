<?php 
    include('conexion.php');

    $id = $_POST['IDDETALLE'];
    $nombre = $_POST['NOMBRE'];
    $enlace = $_POST['ENLACE'];
    $icono = $_POST['ICONO'];
    $nivel = $_POST['NIVEL'];

    $sql = "CALL modificarDetalleMenu('".$nombre."','".$enlace."','".$icono."',".$nivel.",".$id.")";
    
    $result = $conn->query($sql);

    echo $result;
    
    $conn->close();
?>