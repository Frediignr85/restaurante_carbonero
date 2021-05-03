<?php
    include("_core.php");

    $requestData= $_REQUEST;


    require('ssp.customized.class.php');
    // DB table to use
    $table = 'tblcategorias';
    // Table's primary key
    $primaryKey = 'id_categoria';

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

    $joinQuery = " FROM  tblcategorias";

    $extraWhere = " deleted is NULL ";

    $columns = array(
    array( 'db' => '`tblcategorias`.`id_categoria`', 'dt' => 0, 'field' => 'id_categoria'  ),
    array( 'db' => "tblcategorias.cod_categoria", 'dt' => 1, 'field' => "cod_categoria"),
    array( 'db' => '`tblcategorias`.`nom_categoria`', 'dt' => 2, 'field' => 'nom_categoria'  ),
    array( 'db' => '`tblcategorias`.`id_categoria`', 'dt' => 3, 'formatter' => function ($id_categoria) {
        $id_user=$_SESSION["id_usuario"];
    	$admin=$_SESSION["admin"];
        $tabla="<td class='col col col-lg-1'><div class=\"btn-group\">
        <a href=\"#\" data-toggle=\"dropdown\" class=\"btn btn-primary dropdown-toggle\"><i class=\"fa fa-user icon-white\"></i> Menu<span class=\"caret\"></span></a>
        <ul class=\"dropdown-menu dropdown-primary\">";
        
        $filename='editar_categoria.php';
        $link=permission_usr($id_user,$filename);
        if ($link!='NOT' || $admin=='1' )
            $tabla.= "<li><a href=\"editar_categoria.php?id_categoria=".$id_categoria."\"><i class=\"fa fa-pencil\"></i> Editar</a></li>";
        $filename='borrar_categoria.php';
        $link=permission_usr($id_user,$filename);
        if ($link!='NOT' || $admin=='1' ){
            $tabla.= "<li><a data-toggle='modal' href='borrar_categoria.php?id_categoria=".$id_categoria."' data-target='#deleteModal' data-refresh='true'><i class=\"fa fa-trash\"></i> Eliminar</a></li>";

        }
            
        $tabla.= "	</ul>
                </div>
                </td>
                </tr>";
            return $tabla;
    } , 'field' => 'id_categoria' )

    );
    echo json_encode(
        SSP::simple($_GET, $sql_details, $table, $primaryKey, $columns, $joinQuery, $extraWhere)
    );
    ?>
