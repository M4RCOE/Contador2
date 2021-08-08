<?php 
    include('conexion.php');

    $id =  $_POST['IDMENU'];
    $datos = array(
        'array' => $_POST['arrayM']
    );

    foreach($datos['array'] as $key => $use){
        $sql = "CALL insertarDetallesMenu('".$use[0]."','".$use[1]."','".$use[2]."','".$use[3]."',".$id.")";  
        
        echo $use[0]."','".$use[1]."','".$use[2]."','".$use[3]."',".$id;

        if (($result = mysqli_query($conn, $sql)) === false) {
            die(mysqli_error($conn));
        }
    }
    $conn->close(); 
?>