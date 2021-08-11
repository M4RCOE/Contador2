<?php 
    include('conexion.php');

    $id = $_POST['id'];
    $inicio = $_POST['inicio'];
    $fin = $_POST['fin'];

    $sql = "CALL obtenerContadoresSemanaUser(".$id.",'".$inicio."','".$fin."')";
    
    $result = $conn->query($sql);
    $nrow = 0;
    if ($result->num_rows > 0) {   
        while($row = $result->fetch_assoc()) {
            $todo[$nrow] = $row;
            $nrow = $nrow + 1; 
        }
        echo json_encode($todo);
    } else {
        echo "0";
    }
    
    $conn->close();
?>