<?php
    include("_core.php");

    $requestData= $_REQUEST;


    require('ssp.customized.class.php');
    // DB table to use
    $table = 'tblCargos';
    // Table's primary key
    $primaryKey = 'id_cargo';

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

    $joinQuery = " FROM  tblCargos";

    $extraWhere = " deleted is NULL ";

    $columns = array(
    array( 'db' => '`tblCargos`.`id_cargo`', 'dt' => 0, 'field' => 'id_cargo'  ),
    array( 'db' => "tblCargos.cod_cargo", 'dt' => 1, 'field' => "cod_cargo"),
    array( 'db' => '`tblCargos`.`nom_cargo`', 'dt' => 2, 'field' => 'nom_cargo'  ),
    array( 'db' => '`tblCargos`.`id_cargo`', 'dt' => 3, 'formatter' => function ($id_cargo) {
        $id_user=$_SESSION["id_usuario"];
    	$admin=$_SESSION["admin"];
        $tabla="<td class='col col col-lg-1'><div class=\"btn-group\">
        <a href=\"#\" data-toggle=\"dropdown\" class=\"btn btn-primary dropdown-toggle\"><i class=\"fa fa-user icon-white\"></i> Menu<span class=\"caret\"></span></a>
        <ul class=\"dropdown-menu dropdown-primary\">";
        $sql_x = "SELECT eliminable FROM tblCargos where id_cargo = '$id_cargo'";
        $query = _query($sql_x);
        $row_x = _fetch_array($query);
        $eliminable = $row_x['eliminable'];
        $filename='editar_cargo.php';
        $link=permission_usr($id_user,$filename);
        if ($link!='NOT' || $admin=='1' )
            $tabla.= "<li><a href=\"editar_cargo.php?id_cargo=".$id_cargo."\"><i class=\"fa fa-pencil\"></i> Editar</a></li>";
        $filename='borrar_cargo.php';
        $link=permission_usr($id_user,$filename);
        if ($link!='NOT' || $admin=='1' ){
            if($eliminable == "0"){
                $tabla.= "<li><a data-toggle='modal' href='borrar_cargo.php?id_cargo=".$id_cargo."' data-target='#deleteModal' data-refresh='true'><i class=\"fa fa-trash\"></i> Eliminar</a></li>";
            }
        }
            
        $tabla.= "	</ul>
                </div>
                </td>
                </tr>";
            return $tabla;
    } , 'field' => 'id_cargo' )

    );
    echo json_encode(
        SSP::simple($_GET, $sql_details, $table, $primaryKey, $columns, $joinQuery, $extraWhere)
    );
    ?>
