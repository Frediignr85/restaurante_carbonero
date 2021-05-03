<?php
    include("_core.php");

    $requestData= $_REQUEST;


    require('ssp.customized.class.php');
    // DB table to use
    $table = 'contactos';
    // Table's primary key
    $primaryKey = 'id_contacto';

    // MySQL server connection information
    $sql_details = array(
      'user' => $usuario,
      'pass' => $clave,
      'db'   => $dbname,
      'host' => $servidor
    );

    //permiso del script
    $id_user=$_SESSION["id_usuario"];
    $admin=$_SESSION["admin"];
    $id_sucursal=$_SESSION["id_sucursal"];
    $uri = $_SERVER['SCRIPT_NAME'];
    $filename=get_name_script($uri);
    $links=permission_usr($id_user, $filename);

    $joinQuery = " FROM  contactos";

    $extraWhere = " deleted is NULL ";

    $columns = array(
    array( 'db' => '`contactos`.`id_contacto`', 'dt' => 0, 'field' => 'id_contacto'  ),
    array( 'db' => '`contactos`.`nombre`', 'dt' => 1, 'field' => 'nombre'  ),
    array( 'db' => '`contactos`.`correo`', 'dt' => 2, 'field' => 'correo'  ),
    array( 'db' => '`contactos`.`asunto`', 'dt' => 3, 'field' => 'asunto'  ),
    array( 'db' => '`contactos`.`descripcion`', 'dt' => 4, 'field' => 'descripcion'  ),

    );
    echo json_encode(
        SSP::simple($_GET, $sql_details, $table, $primaryKey, $columns, $joinQuery, $extraWhere)
    );
    ?>
