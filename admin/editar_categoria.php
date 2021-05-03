<?php
include_once "_core.php";

function initial() {
	// Page setup
    $title = 'Editar Categoria';
	$_PAGE = array ();
	$_PAGE ['title'] = $title;
	$_PAGE ['links'] = null;
	$_PAGE ['links'] .= '<link href="css/bootstrap.min.css" rel="stylesheet">';
	$_PAGE ['links'] .= '<link href="font-awesome/css/font-awesome.css" rel="stylesheet">';
	$_PAGE ['links'] .= '<link href="css/plugins/iCheck/custom.css" rel="stylesheet">';
	$_PAGE ['links'] .= '<link href="css/plugins/chosen/chosen.css" rel="stylesheet">';
    $_PAGE ['links'] .= '<link href="css/plugins/select2/select2.css" rel="stylesheet">';
	$_PAGE ['links'] .= '<link href="css/plugins/toastr/toastr.min.css" rel="stylesheet">';
	$_PAGE ['links'] .= '<link href="css/plugins/jQueryUI/jquery-ui-1.10.4.custom.min.css" rel="stylesheet">';
	$_PAGE ['links'] .= '<link href="css/plugins/jqGrid/ui.jqgrid.css" rel="stylesheet">';
	$_PAGE ['links'] .= '<link href="css/plugins/dataTables/dataTables.bootstrap.css" rel="stylesheet">';
	$_PAGE ['links'] .= '<link href="css/plugins/dataTables/dataTables.responsive.css" rel="stylesheet">';
	$_PAGE ['links'] .= '<link href="css/plugins/dataTables/dataTables.tableTools.min.css" rel="stylesheet">';
	$_PAGE ['links'] .= '<link href="css/animate.css" rel="stylesheet">';
    $_PAGE ['links'] .= '<link href="css/style.css" rel="stylesheet">';

	include_once "header.php";
	include_once "main_menu.php";
    //permiso del script
	$id_user=$_SESSION["id_usuario"];
	$admin=$_SESSION["admin"];
	$uri = $_SERVER['SCRIPT_NAME'];
    $filename=get_name_script($uri);
    $links=permission_usr($id_user,$filename);
    $id_origen = $_REQUEST["id_categoria"];
    $query_origen = _query("SELECT * FROM tblcategorias WHERE id_categoria='$id_origen'");
    $datos_origen = _fetch_array($query_origen);
    $cod_origen = $datos_origen["cod_categoria"];
    $nom_origen = $datos_origen["nom_categoria"];
    //permiso del script
	if ($links!='NOT' || $admin=='1' )
    {
?>

            <div class="row wrapper border-bottom white-bg page-heading">

                <div class="col-lg-2">

                </div>
            </div>
        <div class="wrapper wrapper-content  animated fadeInRight">
            <div class="row">
                <div class="col-lg-12">
                    <div class="ibox ">
                        <div class="ibox-title">
                            <h3><b><?php echo $title;?></b></h3>
                        </div>
                        <div class="ibox-content">
                            <form name="formulario" id="formulario">
                                <div class="row">
                                  <div class="form-group col-lg-12">
                                      <label>COD. CATEGORIA</label>
                                      <input type="text" placeholder="Ingresa el codigo de la categoria a modificar" class="form-control" id="cod_origen" name="cod_origen" value="<?php echo $cod_origen; ?>">
                                  </div>
                                  <div class="form-group col-lg-12">
                                      <label>NOM. CATEGORIA</label>
                                      <input type="text" placeholder="Ingresa el nombre de la categoria a modificar" class="form-control" id="nom_origen" name="nom_origen" value="<?php echo $nom_origen; ?>">
                                  </div>
                                </div>
                                <div class="row">
                                    <div class="form-actions col-lg-12">
                                        <input type="hidden" name="process" id="process" value="edited">
                                        <input type="hidden" class="form-control" id="id_origen" name="id_origen" value="<?php echo $id_origen; ?>">
                                        <input type="hidden" name="id_usuario" id="id_usuario" value="<?php echo $id_usuario; ?>">
                                        <input type="submit" id="submit1" name="submit1" value="Guardar" class="btn btn-primary m-t-n-xs pull-right"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>

<?php
include_once ("footer.php");
echo" <script type='text/javascript' src='js/funciones/funciones_categoria.js'></script>";
} //permiso del script
else {
		echo "<div></div><br><br><div class='alert alert-warning'>No tiene permiso para este modulo.</div>";
	}
}


function editar()
{

    $id_origen = $_POST["id_origen"];
    $cod_origen=$_POST["cod_origen"];
    $nom_origen=$_POST["nom_origen"];

    $sql_result=_query("SELECT id_categoria FROM tblcategorias WHERE  id_categoria='$id_origen'");
    $numrows=_num_rows($sql_result);

    $table = 'tblcategorias';
    $form_data = array (
    'cod_categoria' => $cod_origen,
    'nom_categoria' => $nom_origen,
    );
    $where_clause = "id_categoria ='".$id_origen."'";
    if($numrows != 0)
    {
        $insertar = _update($table,$form_data, $where_clause);
        if($insertar)
        {
           $xdatos['typeinfo']='Success';
           $xdatos['msg']='Categoria editada correctamente!';
           $xdatos['process']='insert';
        }
        else
        {
           $xdatos['typeinfo']='Error';
           $xdatos['msg']='La categoria no pudo ser editada!';
    	}
    }
    else
    {
        $xdatos['typeinfo']='Error';
        $xdatos['msg']='La categoria no se encuentra disponible, intente con una categoria diferente!';
    }
	echo json_encode($xdatos);
}

if(!isset($_POST['process']))
{
	initial();
}
else
{
    if(isset($_POST['process']))
    {
        switch ($_POST['process'])
        {
        	case 'edited':
        		editar();
        		break;
        }
    }
}
?>
