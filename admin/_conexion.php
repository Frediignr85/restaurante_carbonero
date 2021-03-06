<?php
    /*
    $username = "root";
    $password = "Admin$2016@";
    $hostname = "localhost";
    $dbname="medic";
	$servidor = "localhost";
	$usuario = "medic";
	$clave = "W3b$*";
	*/
	$dbname="el_carbonero";
	$servidor = "localhost";
	$usuario = "root";
	$clave = "";


	$conexion = mysqli_connect("$servidor","$usuario","$clave","$dbname");
	if (mysqli_connect_errno()){
		echo "Error en conexión MySQL: " . mysqli_connect_error();
	}

setlocale(LC_TIME, "es_SV.UTF-8");
date_default_timezone_set("America/El_Salvador");
function _query($sql_string){
	global $conexion;
	//echo $sql_string;
	if ($sql_string!=""){
		$query=mysqli_query($conexion,$sql_string);
		echo _error();
		return $query;
		}
	else{
		echo "Error en la consulta...!";
	}

}
// Begin functions queries

function _fetch_array($sql_string){
	global $conexion;
	$fetched = mysqli_fetch_array($sql_string,MYSQLI_ASSOC);
	return $fetched;
}

function _fetch_row($sql_string){
	global $conexion;
	$fetched = mysqli_fetch_row($sql_string);
	return $fetched;
}
function _fetch_assoc($sql_string){
	global $conexion;
	$fetched = mysqli_fetch_assoc($sql_string);
	return $fetched;
}

function _num_rows($sql_string){
	global $conexion;
	$rows = mysqli_num_rows($sql_string);
	return $rows;
}
function _insert_id(){
	global $conexion;
	$value = mysqli_insert_id($conexion);
	return $value;
}
// End functions queries
//funcion real escape string
function _real_escape($sql_string){
	global $conexion;
	$query=mysqli_real_escape_string($conexion,$sql_string);
	return $query;
}
function _error(){
	global $conexion;
		return mysqli_error($conexion);
}

// funciones insertar
function _insert($table_name, $form_data){
    // retrieve the keys of the array (column titles)
	$form_data2=array();
	$variable='';
	// retrieve the keys of the array (column titles)
	$fields = array_keys ( $form_data );
	// join as string fields and variables to insert
	$fieldss = implode ( ',', $fields );
	//$variables = implode ( "','", $form_data ); U+0027
	foreach($form_data as $variable){
		$var1=preg_match('/\x{27}/u', $variable);
		$var2=preg_match('/\x{22}/u', $variable);
		if($var1==true || $var2==true){
		 $variable = addslashes($variable);
		}
		array_push($form_data2,$variable);
    }
    $variables = implode ( "','",$form_data2 );
    // build the query
    $sql = "INSERT INTO " . $table_name . "(" . $fieldss . ")";
	$sql .= "VALUES('" . $variables . "')";
	// run and return the query result resource
	return _query($sql);
}
function db_close(){
	global $conexion;
	mysqli_close($conexion);
}

function _fetch_result($res, $row=0, $field=0) {
  if($res->num_rows==0) return 'unknown';
    $res->data_seek($row);
    $datarow = $res->fetch_array();
    return $datarow[$field];
}
// the where clause is left optional incase the user wants to delete every row!
date_default_timezone_set('America/Tegucigalpa');
function _delete($table_name, $where_clause)
{
    // check for optional where clause
    $whereSQL = '';
    if(!empty($where_clause))
    {
        // check to see if the 'where' keyword exists
        if(substr(strtoupper(trim($where_clause)), 0, 5) != 'WHERE')
        {
            // not found, add keyword
            $whereSQL = " WHERE ".$where_clause;
        } else
        {
            $whereSQL = " ".trim($where_clause);
        }
    }
	// build the query
	$hora = date('Y/m/d H:i');
	$sql = "UPDATE $table_name SET deleted = '$hora' ".$whereSQL;

	return _query($sql);
}
function _delete_total($table_name, $where_clause)
{
    // check for optional where clause
    $whereSQL = '';
    if(!empty($where_clause))
    {
        // check to see if the 'where' keyword exists
        if(substr(strtoupper(trim($where_clause)), 0, 5) != 'WHERE')
        {
            // not found, add keyword
            $whereSQL = " WHERE ".$where_clause;
        } else
        {
            $whereSQL = " ".trim($where_clause);
        }
    }
	// build the query
	$hora = date('Y/m/d H:i');
	$sql = "DELETE FROM $table_name $whereSQL";

	return _query($sql);
}
//Guarda la fecha y hora de la ultima edicion
function _updated_at($table_name, $where_clause){
	$whereSQL = '';
    if(!empty($where_clause))
    {
        // check to see if the 'where' keyword exists
        if(substr(strtoupper(trim($where_clause)), 0, 5) != 'WHERE')
        {
            // not found, add keyword
            $whereSQL = " WHERE ".$where_clause;
        } else
        {
            $whereSQL = " ".trim($where_clause);
        }
    }
	$hora = date('Y/m/d H:i');
	$sql = "UPDATE $table_name SET updated_at = '$hora' ".$whereSQL;
	return _query($sql);
}
function _recuperar($table_name, $where_clause){
	$whereSQL = '';
    if(!empty($where_clause))
    {
        // check to see if the 'where' keyword exists
        if(substr(strtoupper(trim($where_clause)), 0, 5) != 'WHERE')
        {
            // not found, add keyword
            $whereSQL = " WHERE ".$where_clause;
        } else
        {
            $whereSQL = " ".trim($where_clause);
        }
    }
	$hora = date('Y/m/d H:i');
	$sql = "UPDATE $table_name SET deleted = NULL ".$whereSQL;

	return _query($sql);
}
//Guarda la fecha y hora de la ultima edicion
// again where clause is left optional
function _update($table_name, $form_data, $where_clause='')
{
    // check for optional where clause
    $whereSQL = '';
    $form_data2=array();
	$variable='';
    if(!empty($where_clause))
    {
        // check to see if the 'where' keyword exists
        if(substr(strtoupper(trim($where_clause)), 0, 5) != 'WHERE')
        {
            // not found, add key word
            $whereSQL = " WHERE ".$where_clause;
        } else
        {
            $whereSQL = " ".trim($where_clause);
        }
    }
    // start the actual SQL statement
    $sql = "UPDATE ".$table_name." SET ";
    // loop and build the column /
    $sets = array();
    //begin modified
	foreach($form_data as $index=>$variable){
		$var1=preg_match('/\x{27}/u', $variable);
		$var2=preg_match('/\x{22}/u', $variable);
		if($var1==true || $var2==true){
		 $variable = addslashes($variable);
		}
		$form_data2[$index] = $variable;
    }
    foreach ( $form_data2 as $column => $value ) {
		$sets [] = $column . " = '" . $value . "'";
	}
    $sql .= implode(', ', $sets);
    // append the where statement
	$sql .= $whereSQL;
	// run and return the query result
    return _query($sql);
}

function max_id($field,$table)
{
	$max_id=_query("SELECT MAX($field) FROM $table");
    $row = _fetch_array($max_id);
    $max_record = $row[0];
    return $max_record;
}

function ED($fecha){
    $dia = substr($fecha,8,2);
    $mes = substr($fecha,5,2);
    $a = substr($fecha,0,4);
    $fecha = "$dia-$mes-$a";
    return $fecha;
}
function MD($fecha){
    $dia = substr($fecha,0,2);
    $mes = substr($fecha,3,2);
    $a = substr($fecha,6,4);
    $fecha = "$a-$mes-$dia";
    return $fecha;
}
function get_name_script($url){
//metodo para obtener el nombre del file:
$nombre_archivo = $url;
//verificamos si en la ruta nos han indicado el directorio en el que se encuentra
if ( strpos($url, '/') !== FALSE )
    //de ser asi, lo eliminamos, y solamente nos quedamos con el nombre y su extension
	$nombre_archivo_tmp = explode('/', $url);
	$nombre_archivo= array_pop($nombre_archivo_tmp );
	return  $nombre_archivo;
}
function permission_usr($id_user,$filename){
			$sql1="SELECT tblmenu.id_menu, tblmenu.nombre as nombremenu, tblmenu.prioridad,
			tblmodulo.id_modulo,  tblmodulo.nombre as nombremodulo, tblmodulo.descripcion, tblmodulo.filename,
			tblusuario_modulo.id_usuario,tblUsuario.id_tipo_usuario_USU as admin
			FROM tblmenu, tblmodulo, tblusuario_modulo, tblUsuario
			WHERE tblUsuario.id_usuario='$id_user'
			AND tblmenu.id_menu=tblmodulo.id_menu_MOD
			AND tblUsuario.id_usuario=tblusuario_modulo.id_usuario
			AND tblusuario_modulo.id_modulo=tblmodulo.id_modulo
			AND tblmodulo.filename='$filename'
			AND tblusuario_modulo.deleted is NULL
			";
	$result1=_query($sql1);
	$count1=_num_rows($result1);
	if($count1 >0){
		$row1=_fetch_array($result1);
		$admin=$row1['admin'];
		$nombremodulo=$row1['nombremodulo'];
		$filename=$row1['filename'];
		$name_link=$filename;
	}
	else $name_link='NOT';
		return $name_link;

}
//functions for transactions
function _begin(){

    global $conexion;
	mysqli_query($conexion, "START TRANSACTION");

	/* disable autocommit, with command from mysqli */
	/* mysqli_autocommit($link, FALSE); */
}


function divtextlin( $text, $width = '80', $lines = '10', $break = '\n', $cut = 0 ) {
      $wrappedarr = array();
      $wrappedtext = wordwrap( $text, $width, $break , true );
       $wrappedtext = trim( $wrappedtext );
      $arr = explode( $break, $wrappedtext );
     return $arr;
}

function _commit(){
	global $conexion;
    mysqli_query($conexion,"COMMIT");
    /* commit insert , with command from mysqli */
	/* mysqli_commit($link); */
}

function _rollback(){
	global $conexion;
    mysqli_query($conexion,"ROLLBACK");
    /* Rollback */
	/* mysqli_rollback($link); */

}
//comparar 2 fechas
function compararFechas($separador,$primera, $segunda){
  $valoresPrimera = explode ($separador, $primera);
  $valoresSegunda = explode ($separador, $segunda);
  $diaPrimera    = $valoresPrimera[0];
  $mesPrimera  = $valoresPrimera[1];
  $anyoPrimera   = $valoresPrimera[2];
  $diaSegunda   = $valoresSegunda[0];
  $mesSegunda = $valoresSegunda[1];
  $anyoSegunda  = $valoresSegunda[2];

  $diasPrimeraJuliano = gregoriantojd((int)$mesPrimera, (int)$diaPrimera, (int)$anyoPrimera);
  $diasSegundaJuliano = gregoriantojd((int)$mesSegunda, (int)$diaSegunda, (int)$anyoSegunda);

  if(!checkdate((int)$mesPrimera, (int)$diaPrimera, (int)$anyoPrimera)){
    // "La fecha ".$primera." no es valida";
    return 0;
  }elseif(!checkdate((int)$mesSegunda, (int)$diaSegunda, (int)$anyoSegunda)){
    // "La fecha ".$segunda." no es valida";
    return 0;
  }else{
    return  $diasPrimeraJuliano - $diasSegundaJuliano;
  }

}
//sumar dias a una fecha dada
function sumar_dias($fecha,$dias){
	//formato date('Y-m-j');
	$nuevafecha = strtotime ('+'.$dias.' day' , strtotime ( $fecha ) ) ;
	$nuevafecha = date ( 'Y-m-d' , $nuevafecha );
	return 	$nuevafecha;
}

//restar dias a una fecha dada
function restar_dias($fecha,$dias){
	//formato date('Y-m-j');
	$nuevafecha = strtotime ('-'.$dias.' day' , strtotime ( $fecha ) ) ;
	$nuevafecha = date ( 'Y-m-d' , $nuevafecha );
	return 	$nuevafecha;
}
function zfill($string, $n)
{
	return str_pad($string,$n,"0",STR_PAD_LEFT);
}
function buscar($id)
{
	$sql = "SELECT CONCAT(nombres,' ',apellidos) as nombre FROM tblPaciente WHERE id_paciente='$id'";
	$query = _query($sql);
	$result = _fetch_array($query);
	$nombre = $result["nombre"];
	return $nombre;
}
function buscar_user($id)
{
	$sql = "SELECT nombre FROM tblUsuario WHERE id_usuario='$id'";
	$query = _query($sql);
	$result = _fetch_array($query);
	$nombre = $result["nombre"];
	return $nombre;
}
function hora($hora)
{
	$hora_pre = date_create($hora);
	$hora_pos = date_format($hora_pre, 'g:i A');
	return $hora_pos;
}
function nombre_dia($fecha)
{
	return ucfirst(strftime("%A %d %B de %Y",strtotime($fecha)));
}
function num_datos($tabla, $where = "")
{

	$sql = _query("SELECT * FROM $tabla $where");
    $num = _num_rows($sql);
    return number_format($num,0,"",",");
}
function restar_meses($fecha, $nmeses)
{
    $nuevafecha = strtotime ( '-'.$nmeses.' month' , strtotime ( $fecha ) ) ;
    $nuevafecha = date ( 'Y-m-d' , $nuevafecha );
    return $nuevafecha;
}
function sumar_meses($fecha, $nmeses)
{
    $nuevafecha = strtotime ( '+'.$nmeses.' month' , strtotime ( $fecha ) ) ;
    $nuevafecha = date ( 'Y-m-d' , $nuevafecha );
    return $nuevafecha;
}
function meses($n)
{
	$mes = array("ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE");
	return $mes[$n-1];
}
function Mayu($cadena)
{
	$mayusculas = strtr(strtoupper($cadena),"àèìòùáéíóúçñäëïöü","ÀÈÌÒÙÁÉÍÓÚÇÑÄËÏÖÜ");
	return $mayusculas;
}
function quitar_tildes($cadena)
{
    $no_permitidas= array ("á","é","í","ó","ú","Á","É","Í","Ó","Ú","ñ","À","Ã","Ì","Ò","Ù","Ã™","Ã ","Ã¨","Ã¬","Ã²","Ã¹","ç","Ç","Ã¢","ê","Ã®","Ã´","Ã»","Ã‚","ÃŠ","ÃŽ","Ã”","Ã›","ü","Ã¶","Ã–","Ã¯","Ã¤","«","Ò","Ã","Ã„","Ã‹"," ");
    $permitidas= array ("a","e","i","o","u","A","E","I","O","U","n","N","A","E","I","O","U","a","e","i","o","u","c","C","a","e","i","o","u","A","E","I","O","U","u","o","O","i","a","e","U","I","A","E","_");
    $texto = str_replace($no_permitidas, $permitidas ,$cadena);
    return $texto;
}
function get_script_name($id_doctor, $id_especialidad, $tipo)
{
	$sql = _query("SELECT tblFormatos.url FROM tblFormatos WHERE tblFormatos.id_doctor='$id_doctor' AND tblFormatos.id_especialidad = '$id_especialidad' AND tipo ='$tipo'");
	$datos = _fetch_array($sql);
	$script_name ="";
	if(isset($datos["url"])){
		$script_name = $datos["url"];
	}
	return $script_name;
}
function edad($fecha)
{
	$dia=date("d");
	$mes=date("m");
	$anio=date("Y");

	list($anio_n, $mes_n, $dia_n)= explode("-", $fecha);

	if (($mes_n == $mes) && ($dia_n > $dia))
	{
		$anio=($anio-1);
	}

	if ($mes_n > $mes)
	{
		$anio=($anio-1);
	}

	$edad=($anio-$anio_n);
	return $edad;
}
function crear_select2($nombre,$array,$id_valor,$style){
  $txt='';
  //style='width:200px' <select id="select2-single-input-sm" class="form-control input-sm select2-single">
	$txt.= "<select class='select2 form-control input-sm select2-single' name='$nombre' id='$nombre' style='$style'>";

  foreach($array as $clave=>$valor)
	{
    if($id_valor==$clave){
		$txt .= "<option value='$clave' selected>". $valor . "</option>";
    }
    else {
      $txt .= "<option value='$clave'>". $valor . "</option>";
    }
	}
	$txt .= "</select>";
	return $txt;
}
function edad2($fechanac){
	$fecha_nacimiento = new DateTime($fechanac);
	$hoy = new DateTime();
	$calc_edad = $hoy->diff($fecha_nacimiento);
	$anios=$calc_edad->y;
	$meses=$calc_edad->m;
	$dias=$calc_edad->d;
	$txt_edad="";
	if($anios>0){
		$txt_edad.=$anios." años ";
	}
	if($meses>0){
		$txt_edad.=$meses." meses ";
	}
	if($dias>0){
		$txt_edad.=$dias." dias ";

	}
	return $txt_edad;
}
function ceros_izquierda($cantidad,$cadena){
    $cadena_set = str_pad($cadena, $cantidad, "0",STR_PAD_LEFT);
    return $cadena_set;
}

function _hora_media_encode($hora){
	$hora_s = explode(" ", $hora);
	$hora_n = explode(":", $hora_s[0]);
	if($hora_s[1]=="AM"){
		if($hora_n[0] == 12){
			$hora_n[0] == "00";
		}
	}
	if($hora_s[1] == "PM"){
		if($hora_n[0] > 12){
			$hora_n[0]+=12;
		}
	}
	$hora_final = $hora_n[0].":".$hora_n[1].":00";
	return $hora_final;
}
function _hora_media_decode($hora){
	$hora_n = explode(":", $hora);
	$sentido="";
	if($hora_n[0] == "00"){
		$hora_n[0] = 12;
	}
	if($hora_n[0] > 12){
		$hora_n[0]-=12;
		$sentido ="PM";
	}
	if($hora_n[0] < 12){
		$sentido = "AM";
	}
	$hora_final = $hora_n[0].":".$hora_n[1]." $sentido";
	return $hora_final;
}
?>
