<?php
    include("_core.php");

    $requestData= $_REQUEST;


    require('ssp.customized.class.php');
    // DB table to use
    $table = 'tblDeptos';
    // Table's primary key
    $primaryKey = 'id_depto';

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

    $joinQuery = " FROM  tblDeptos";

    $extraWhere = " deleted is NULL ";

    $columns = array(
    array( 'db' => '`tblDeptos`.`id_depto`', 'dt' => 0, 'field' => 'id_depto'  ),
    array( 'db' => "tblDeptos.cod_depto", 'dt' => 1, 'field' => "cod_depto"),
    array( 'db' => '`tblDeptos`.`nom_depto`', 'dt' => 2, 'field' => 'nom_depto'  ),
    array( 'db' => '`tblDeptos`.`jefe`', 'dt' => 3, 'field' => 'jefe'  ),
    array( 'db' => '`tblDeptos`.`encargado`', 'dt' => 4, 'field' => 'encargado'  ),
    array( 'db' => '`tblDeptos`.`id_depto`', 'dt' => 5, 'formatter' => function ($id_depto) {
      $id_user=$_SESSION["id_usuario"];
    	$admin=$_SESSION["admin"];
        $tabla="<td class='col col col-lg-1'><div class=\"btn-group\">
        <a href=\"#\" data-toggle=\"dropdown\" class=\"btn btn-primary dropdown-toggle\"><i class=\"fa fa-user icon-white\"></i> Menu<span class=\"caret\"></span></a>
        <ul class=\"dropdown-menu dropdown-primary\">";
        $filename='editar_depto.php';
        $link=permission_usr($id_user,$filename);
        if ($link!='NOT' || $admin=='1' )
            $tabla.= "<li><a href=\"editar_depto.php?id_depto=".$id_depto."\"><i class=\"fa fa-pencil\"></i> Editar</a></li>";
        $filename='borrar_depto.php';
        $link=permission_usr($id_user,$filename);
        if ($link!='NOT' || $admin=='1' )
            $tabla.= "<li><a data-toggle='modal' href='borrar_depto.php?id_depto=".$id_depto."' data-target='#deleteModal' data-refresh='true'><i class=\"fa fa-trash\"></i> Eliminar</a></li>";
        $tabla.= "	</ul>
            </div>
            </td>
            </tr>";
        return $tabla;
    } , 'field' => 'id_depto' )
    );
    echo json_encode(
        SSP::simple($_GET, $sql_details, $table, $primaryKey, $columns, $joinQuery, $extraWhere)
    );
    ?>
