<?php
include_once "_core.php";
function initial()
{
    $title = 'Editar Empleado';
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
    $_PAGE ['links'] .= '<link href="css/plugins/datapicker/datepicker3.css" rel="stylesheet">';
	$_PAGE ['links'] .= '<link href="css/animate.css" rel="stylesheet">';
    $_PAGE ['links'] .= '<link href="css/style.css" rel="stylesheet">';
    include("header.php");
    include_once "main_menu.php";

    $id_platillo = $_REQUEST['id_platillo'];
    $sql = "SELECT * FROM tblplatillos WHERE tblplatillos.id_platillo = '$id_platillo'";

    $consulta = _query($sql);
    $rowx = _fetch_array($consulta);
    //permiso del script
    $id_user=$_SESSION["id_usuario"];
    $admin=$_SESSION["admin"];
    $uri = $_SERVER['SCRIPT_NAME'];
    $filename=get_name_script($uri);
    $links=permission_usr($id_user,$filename);
    $logo = $rowx['imagen'];
    ?>
        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-2">
            </div>
        </div>
        <div class="wrapper wrapper-content  animated fadeInRight">
            <div class="row">
                <div class="col-lg-12">
                    <div class="ibox">
                    <?php
                    //permiso del script
                    if ($links!='NOT' || $admin=='1' ){
                    ?>
                        <div class="ibox-title">
                            <h5><?php echo "Editar Habitacion"; ?></h5>
                        </div>
                        <div class="ibox-content">
                            <form name="formulario_habitacion" id="formulario_habitacion">
                                <div class="row">
                                <div class="col-lg-6">
                                        <div class="form-group has-info single-line">
                                            <label>Nombre del platillo<span style="color:red;">*</span></label>
                                            <input type="text" placeholder="Nombre del platillo" class="form-control" id="nombre" name="nombre" value = "<?php echo $rowx['nombre'];  ?>">
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group has-info single-line">
                                            <label>Descripcion del platillo<span style="color:red;">*</span></label>
                                            <input type="text" placeholder="Descripcion del platillo" class="form-control" id="descripcion" name="descripcion" value = "<?php echo $rowx['descripcion'];  ?>">
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group has-info single-line">
                                            <label>Precio<span style="color:red;">*</span></label>
                                            <input type="text" placeholder="Precio" class="form-control decimal" id="precio" name="precio" value = "<?php echo $rowx['precio'];  ?>">
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group has-info single-line">
                                            <label>Categoria del platillo <span style="color:red;">*</span></label>
                                            <br>
                                            <select class="select col-lg-6" name="categoria_platillo" id="categoria_platillo" style="width:100%;">
                                            <option value="">Seleccione</option>
											<?php
												$sql = _query("SELECT * FROM tblcategorias WHERE deleted is NULL ORDER BY nom_categoria ASC");
                                                while ($row = _fetch_array($sql))
                                                {
                                                    $selected = "";
                                                    if($rowx['id_categoria'] ==$row["id_categoria"]){
                                                        $selected = ' selected ';
                                                    }
                                                    $id_estado_cuarto = $row["id_categoria"];
                                                    $estado = $row["nom_categoria"];
                                                    echo "<option value='".$id_estado_cuarto."' $selected >".$estado."</option>";
                                                }
                                            ?>
											</select>
                                        </div>
                                    </div>    
                                    <div class="col-lg-6">
										<div class="form-group has-info single-line">
											<label>Imagen</label>
											<input type="file" name="logo" id="logo" class="file" data-preview-file-type="image">
										</div>
									</div>
                                    <div class="col-lg-12">
										<div class="form-group has-info" align="center">
											<?php
											if($logo=="")
											{
												$logo = "img/usuario_defecto.jpg";
											}
											echo "<img style='width:50%; heigth:50%;' src='".$logo."'>";
											?>
										</div>
									</div>

                                    <br>
                                    <div class='col-lg-6'>

                                    </div>
                                    <br>
                                    <div class='col-lg-6 d-flex justify-content-between align-items-center'>
                                    <br>
                                        <input type="submit" id="agregar_habitacion" style="float: right;" name="agregar_habitacion" value="Guardar" class="btn btn-primary m-t-n-xs" />
                                    </div>
                                </div>

                                <input type="hidden" name="process" id="process" value="edited"><br>
                                <input type="hidden" name="id_habitacion" id='id_habitacion' value="<?php echo $id_platillo; ?>">
                                <input type="hidden" name="img_logo" id="img_logo" value="<?php echo $logo; ?>">
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
        include_once ("footer.php");
        echo "<script src='js/funciones/funciones_platillos.js'></script>";
    } //permiso del script
    else
    {
        $mensaje = "No tiene permiso para acceder a este modulo";
        echo "<br><br>$mensaje<div><div></div></div</div></div>";
        include "footer.php";
    }
}

function editar()
{
    /*$id_habitacion = $_POST['id_habitacion'];
    $numero_piso = $_POST['numero_piso'];
    $numero_habitacion = $_POST['numero_habitacion'];
    $descripcion =  $_POST['descripcion'];
    $precio_por_hora =  $_POST['precio_por_hora'];
    $id_sucursal = $_SESSION["id_sucursal"];
    $sql = "SELECT id_cuarto FROM cuartos where cuartos.id_cuarto != '$id_habitacion' AND cuartos.numero_cuarto = '$numero_habitacion' AND cuartos.id_piso_cuarto = '$numero_piso' ";
    $query = _query($sql);
    $numero = _num_rows($query);
    if($numero > 0){
        $xdatos['typeinfo'] ="Error";
        $xdatos['msg'] = 'Ya se encuentra un registro con esos datos, no se puede modificar!';
    }
    else{
        $tabla = 'cuartos';
        $form_data = array(
            'numero_cuarto' => $numero_habitacion,
            'descripcion' => $descripcion,
            'precio_dia' => $precio_por_hora
        );
        $where = " id_cuarto = '$id_habitacion'";
        $update = _update($tabla,$form_data, $where);
        if($update) {
            $xdatos['typeinfo'] = 'Success';
            $xdatos['msg'] = 'Registro actualizado con exito!';
        }
        else{
            $xdatos['typeinfo'] = 'Error';
            $xdatos['msg'] ='Registro no se pudo actualizar!';
        }
    }

    echo json_encode($xdatos);*/

    require_once 'class.upload.php';
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $precio =  $_POST['precio'];
    $categoria_platillo =  $_POST['categoria_platillo'];
    $id_sucursal=$_SESSION["id_sucursal"];
    $id_platillo = $_POST['id_habitacion'];

    $sql = "SELECT tblplatillos.id_platillo FROM tblplatillos WHERE tblplatillos.nombre = '$nombre' AND tblplatillos.descripcion = '$descripcion' AND tblplatillos.deleted is NULL and tblplatillos.id_platillo='$id_platillo'";
    $sql_exis = _query($sql);
    $num_exis = _num_rows($sql_exis);
    if($num_exis > 0)
    {
        $xdatos['typeinfo']='Error';
        $xdatos['msg']='Ya existe ese platillo!';
    }
    else
    {
        if ($_FILES["logo"]["name"]!="")
        {
            $foo = new \Verot\Upload\Upload($_FILES['logo'],'es_ES');
            if ($foo->uploaded)
            {
                $pref = uniqid()."_";
                $foo->file_force_extension = false;
                $foo->no_script = false;
                $foo->file_name_body_pre = $pref;
            // save uploaded image with no changes
            $foo->Process('img/');
            if ($foo->processed)
            {
                    $query = _query("SELECT imagen FROM tblplatillos WHERE descripcion='$descripcion'");
                    $numero = _num_rows($query);
                    $urlb="";
                    if($numero > 0){
                        $result = _fetch_array($query);
                        $urlb=$result["imagen"];
                    }

                    if($urlb!="" && file_exists($urlb))
                    {
                        unlink($urlb);
                    }
                    $cuerpo=quitar_tildes($foo->file_src_name_body);
                    $cuerpo=trim($cuerpo);
                    $logo = 'img/'.$pref.$cuerpo.".".$foo->file_src_name_ext;
                }else{
                    echo "Error al subir la imagen";
                    }
            }
        }else {
                $logo = '';

        }
        $table = 'tblplatillos';
            $form_data = array(
                'nombre' => $nombre,
                'descripcion' => $descripcion,
                'precio' => $precio,
                'id_categoria' => $categoria_platillo,
                'imagen' => $logo,
            );
            $where = " id_platillo = '$id_platillo'";
            $insertar = _update($table,$form_data, $where );
            if($insertar)
            {
                $xdatos['typeinfo']='Success';
                $xdatos['msg']='Platillo editado con exito!';
                $xdatos['process']='insert';
            }
            else
            {
                $xdatos['typeinfo']='Error';
                $xdatos['msg']='Platillo no pudo ser editado!'._error();
            }
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
