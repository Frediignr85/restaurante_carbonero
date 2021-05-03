<?php
include_once "_core.php";

function initial() {
	// Page setup
    $title = 'Agregar Departamento';
	$_PAGE = array ();
    $_PAGE ['title'] = $title;
	$_PAGE ['links'] = null;
	$_PAGE ['links'] .= '<link href="css/bootstrap.min.css" rel="stylesheet">';
	$_PAGE ['links'] .= '<link href="font-awesome/css/font-awesome.css" rel="stylesheet">';
	$_PAGE ['links'] .= '<link href="css/plugins/iCheck/custom.css" rel="stylesheet">';
	$_PAGE ['links'] .= '<link href="css/plugins/chosen/chosen.css" rel="stylesheet">';
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
	//permiso del script
	if ($links!='NOT' || $admin=='1' ){
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
                            <h3></i> <b><?php echo $title;?></b></h3>
                        </div>
                        <div class="ibox-content">
                            <form name="formulario" id="formulario">
                                <div class="row">
                                    <div class="form-group col-lg-6">
                                        <label>COD. Departamento</label>
                                        <input type="text" placeholder="Ingrese el codigo del departamento a agregar" class="form-control" id="cod_unidad" name="cod_unidad">
                                    </div>
                                    <div class="form-group col-lg-6">
                                        <label>NOM. Departamento</label>
                                        <input type="text" placeholder="Ingresa el nombre del departamento a agregar" class="form-control" id="nom_unidad" name="nom_unidad">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col-lg-6">
                                        <label>JEFE</label>
                                        <input type="text" placeholder="Ingrese el nombre del jefe del departamento" class="form-control" id="jefe" name="jefe">
                                    </div>
                                    <div class="form-group col-lg-6">
                                        <label>ENCARGADO</label>
                                        <input type="text" placeholder="Ingrese el nombre del encargado del departamento" class="form-control" id="encargado" name="encargado">
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="form-actions col-lg-12">
                                        <input type="hidden" name="process" id="process" value="insert">
                                        <input type="hidden" name="activo" id="activo" value="1">
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
echo" <script type='text/javascript' src='js/funciones/funciones_depto.js'></script>";
} //permiso del script
else {
		echo "<div></div><br><br><div class='alert alert-warning'>No tiene permiso para este modulo.</div>";
	}
}


function insertar()
{

    $cod_unidad=$_POST["cod_unidad"];
    $nom_unidad=$_POST["nom_unidad"];
    $jefe=$_POST["jefe"];
    $encargado=$_POST["encargado"];
    $sql_result=_query("SELECT id_depto FROM tblDeptos WHERE cod_depto='$cod_unidad' OR nom_depto ='$nom_unidad'");/**/
    $numrows=_num_rows($sql_result);

    $table = 'tblDeptos';
    $form_data = array (
    'cod_depto' => $cod_unidad,
    'nom_depto' =>$nom_unidad,
    'jefe' =>$jefe,
    'encargado' =>$encargado
    );

    if($numrows == 0)
    {
        $insertar = _insert($table,$form_data);
        if($insertar)
        {
           $xdatos['typeinfo']='Success';
           $xdatos['msg']='Departamento ingresado correctamente!';
           $xdatos['process']='insert';
        }
        else
        {
           $xdatos['typeinfo']='Error';
           $xdatos['msg']='El Departamento no se pudo ingresar!';
    	}
    }
    else
    {
        $xdatos['typeinfo']='Error';
        $xdatos['msg']='El codigo del departamento ya existe';
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
        	case 'insert':
        		insertar();
        		break;
        }
    }
}
?>
