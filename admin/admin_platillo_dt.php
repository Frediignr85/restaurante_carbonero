<?php
include("_core.php");
$requestData= $_REQUEST;
require('ssp.customized.class.php' );
// DB table to use
$table = 'tblplatillos';
$id_sucursal = $_SESSION["id_sucursal"];
// Table's primary key
$primaryKey = 'id_categoria';
// MySQL server connection information
$sql_details = array(
    'user' => $usuario,
    'pass' => $clave,
    'db'   => $dbname,
    'host' => $servidor
);
$where=" tblplatillos.deleted is NULL";
$joinQuery=" FROM tblplatillos INNER JOIN tblcategorias on tblcategorias.id_categoria = tblplatillos.id_categoria";
$extraWhere= $where;

//and p.id_sucursal='$id_sucursal'*/
$columns = array(
    array( 'db' => 'tblplatillos.id_platillo',   'dt' => 0, 'field' => 'id_platillo'),
    array( 'db' => 'tblplatillos.nombre',   'dt' => 1, 'field' => 'nombre'),
    array( 'db' => 'tblplatillos.descripcion',   'dt' => 2, 'field' => 'descripcion'),
    array( 'db' => 'tblplatillos.precio',   'dt' => 3, 'formatter' => function($precio){
        return "$".number_format($precio, 2);
    }, 'field' => 'precio'),
    array( 'db' => 'tblcategorias.nom_categoria',   'dt' => 4, 'field' => 'nom_categoria'),
    array( 'db' => 'tblplatillos.activo',   'dt' => 5, 'formatter' => function($activo){
        if($activo == 1){
            return "<label class='badge' style='background:#58FF3B; color:#FFF; font-weight:bold;'>Activo</label>";
        }
        if($activo == 0){
            return "<label class='badge' style='background:#FF3B3B; color:#FFF; font-weight:bold;'>Inactivo</label>";
        }
    }, 'field' => 'activo'),

    array( 'db' => 'tblplatillos.id_platillo','dt' => 6, 'formatter' =>function($id_platillo){
        $id_user=$_SESSION["id_usuario"];
        $admin=$_SESSION["admin"];
        $tabla ="<td><div class=\"btn-group\">
		<a href=\"#\" data-toggle=\"dropdown\" class=\"btn btn-primary dropdown-toggle\"><i class=\"fa fa-user icon-white\"></i> Menu<span class=\"caret\"></span></a>
		<ul class=\"dropdown-menu dropdown-primary\">";
		/*echo "<li><a href=\"permiso_usuario.php?id_usuario=".$row['id_usuario']."\"><i class=\"fa fa-lock\"></i> Permisos</a></li>";*/
       $filename='editar_platillo.php';
		$link=permission_usr($id_user,$filename);
		if ($link!='NOT' || $admin=='1' )
		    $tabla.= "<li><a  href='editar_platillo.php?id_platillo=".$id_platillo."'><i class=\"fa fa-pencil\"></i> Editar</a></li>";
        $filename='ver_platillo.php';
        $link=permission_usr($id_user,$filename);
		if ($link!='NOT' || $admin=='1' )
            $tabla.= "<li><a  href='ver_platillo.php?id_platillo=".$id_platillo."' ><i class=\"fa fa-eye\"></i> Ver</a></li>";
		$filename='borrar_platillo.php';
		$link=permission_usr($id_user,$filename);
		if ($link!='NOT' || $admin=='1' )
            $tabla.= "<li><a data-toggle='modal' href='borrar_platillo.php?id_platillo=".$id_platillo."' data-target='#deleteModal' data-refresh='true'><i class=\"fa fa-eraser\"></i> Eliminar</a></li>";
        $tabla.=  "	</ul>
		</div>
		</td>
		</tr>";
        return $tabla;
    },  'field' => 'id_platillo'),
);
echo json_encode(
    SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns, $joinQuery, $extraWhere)
);
?>
