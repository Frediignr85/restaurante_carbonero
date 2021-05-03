<?php
    include("_conexion.php");
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $asunto = $_POST['asunto'];
    $descripcion = $_POST['descripcion'];
    $tabla_insert = 'contactos';
    $form_data = array(
        'nombre' => $nombre,
        'correo' => $correo,
        'asunto' => $asunto,
        'descripcion' => $descripcion
    );
    $insert = _insert($tabla_insert, $form_data);
    if($insert){
        header('Location: ../index.php');
    }
    else{
        header('Location: ../index.php');
    }
?>