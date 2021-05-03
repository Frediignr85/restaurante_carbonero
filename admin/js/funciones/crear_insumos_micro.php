<?php
include_once "_core.php";
include('num2letras.php');
include('facturacion_funcion_imprimir.php');
function initial()
{

  //$id_factura=$_REQUEST["id_factura"];
  $title="Insumos Utilizados  por Microcirugía";
  $_PAGE = array();
  $_PAGE ['title'] = $title;
  $_PAGE ['links'] = null;
  $_PAGE ['links'] .= '<link href="css/bootstrap.min.css" rel="stylesheet">';
  $_PAGE ['links'] .= '<link href="font-awesome/css/font-awesome.css" rel="stylesheet">';
  $_PAGE ['links'] .= '<link href="css/plugins/iCheck/custom.css" rel="stylesheet">';
  $_PAGE ['links'] .= '<link href="css/plugins/select2/select2.css" rel="stylesheet">';
  $_PAGE ['links'] .= '<link href="css/plugins/select2/select2-bootstrap.css" rel="stylesheet">';
  $_PAGE ['links'] .= '<link href="css/plugins/toastr/toastr.min.css" rel="stylesheet">';
  $_PAGE ['links'] .= '<link href="css/plugins/sweetalert/sweetalert.css" rel="stylesheet">';
  $_PAGE ['links'] .= '<link href="css/plugins/datapicker/datepicker3.css" rel="stylesheet">';
  $_PAGE ['links'] .= '<link href="css/plugins/datetime/bootstrap-datetimepicker.min.css" rel="stylesheet">';
  $_PAGE ['links'] .= '<link href="css/plugins/datetime/bootstrap-datetimepicker.css" rel="stylesheet">';
  $_PAGE ['links'] .= '<link href="css/animate.css" rel="stylesheet">';
  $_PAGE ['links'] .= '<link href="css/plugins/bootstrap-checkbox/bootstrap-checkbox.css" rel="stylesheet">';
  $_PAGE ['links'] .= '<link href="css/style.css" rel="stylesheet">';
  $_PAGE ['links'] .= '<link rel="stylesheet" type="text/css" href="css/plugins/perfect-scrollbar/perfect-scrollbar.css">';
  $_PAGE ['links'] .= '<link rel="stylesheet" type="text/css" href="css/util.css">';
  $_PAGE ['links'] .= '<link rel="stylesheet" type="text/css" href="css/main.css">';
  include_once "header.php";
  //include_once "main_menu.php";
  date_default_timezone_set('America/El_Salvador');
  $fecha_actual = date('Y-m-d');
  $id_user=$_SESSION["id_usuario"];
  $admin=$_SESSION["admin"];


  $uri = $_SERVER['SCRIPT_NAME'];
  $filename=get_name_script($uri);
  $links=permission_usr($id_user, $filename);
  $id_usuario=$id_user;
  //doctores

  $fecha_actual=date("Y-m-d");
/*
  $sql_micro="SELECT mp.id_microcirugia_pte, mp.id_microcirugia,m.descripcion, mp.id_doctor, mp.id_cita, p.id_paciente,
  mp.fecha_ingreso, mp.hora_inicio, concat(p.nombres,' ',p.apellidos) as paciente, p.fecha_nacimiento,
  concat(d.nombres,' ',d.apellidos) as dr
  FROM microcirugia_paciente AS mp
  JOIN paciente AS p ON (mp.id_paciente=p.id_paciente)
  JOIN  doctor as d ON (d.id_doctor=mp.id_doctor)
  JOIN microcirugia AS m ON (mp.id_microcirugia=m.id_microcirugia)
  WHERE  mp.id_microcirugia_pte='$id_microcirugia_pte'
  ";
  */
  ?>
  <div class="gray-bg">
    <div class="wrapper wrapper-content  animated fadeInRight">
      <div class="row">
        <div class="col-lg-12">
          <div class="ibox ">
            <?php
            //permiso del script
            if ($links!='NOT' || $admin=='1') {
                ?>
                <div class="ibox-content">
                  <div class="row focuss"><br>
                    <div  class="form-group col-md-6">
                      <label> Doctor Refiere</label>
                      <select class="col-md-12 select usage sel1" id="doctor" name="doctor" style="width:100%;">
                        <option value="">Seleccione</option>
                        <?php
                        $sqld = "SELECT id_doctor, concat(nombres,' ',apellidos) as nombre_d FROM doctor";
                        $resul=_query($sqld);
                        while($doctr = _fetch_array($resul))
                        {
                          echo "<option value=".$doctr["id_doctor"];
                          echo">".$doctr["nombre_d"]."</option>";
                        }
                        ?>
                      </select>
                    </div>
                    <div  class="form-group col-md-6">
                      <label> Microcirugía </label>

                      <input type="text" name="microciru" id="microciru" class="form-control autocomplete">
                      <input type="text" id="microciru_replace" name="microciru_replace"  class="form-control usage" hidden readonly autocomplete="off">

                    </div>
                  </div>

                  <div class="row">
                    <div id='form_datos_cliente' class="form-group col-md-6" id="div_paciente" style="margin-top:-15px;">
                      <label>Paciente</label>
                      <input type="text" id="paciente" name="paciente"  class="form-control usage sel" placeholder="Ingrese Paciente" data-provide="typeahead" autocomplete="off" style="border-radius:0px">
                      <input type="text" id="paciente_replace" name="paciente_replace"  class="form-control usage" hidden readonly autocomplete="off">
                      <input type="hidden" name="pacientee" id="pacientee">
                    </div>
                    <div  class="form-group col-md-2" style="margin-top:-15px;">
                      <label> Honorarioaaaaaas Doctor </label>
                      <input type="text" name="honorarios_micr" id="honorarios_micr" class="form-control decimal">

                    </div>
                    <div  class="form-group col-md-2" style="margin-top:-15px;">
                      <label> Valor Paq. </label>
                      <input type="text" name="costo_paquete" id="costo_paquete" class="form-control decimal">

                    </div>
                    <div class="form-group col-md-2" >
                        <br>
                      <label class='checkbox-inline'><input type='checkbox' id='paquete' value='1'>PAQUETE </label>

                    </div>
                    </div>
                    <div class="row focuss">
                      <div class="form-group col-md-4">
                        <label id='buscar_habilitado'>Buscar Insumos (Descripci&oacute;n)</label>
                        <input type="text" id="producto_buscar" name="producto_buscar"  class="form-control usage" placeholder="Ingrese Descripcion de producto" data-provide="typeahead" style="border-radius:0px">
                        <input type="text" id="servicio_buscar" name="servicio_buscar" class="form-control" placeholder="Ingrese  Descripcion de  servicio " data-provide="typeahead" style="border-radius:0px">
                      </div>
                      <div class="form-group col-md-3">
                        <label>Microcirugias Pendientes</label>
                        <input type="text" id="microcirugia_buscar" name="microcirugia_buscar"  class="form-control usage" placeholder="Doctor" data-provide="typeahead" style="border-radius:0px">
                        </div>
                      <div class="title-action col-md-5" id='botones'>
                      <button type="button" id="btnBuscaProd" name="btnBuscaProd" class="btn btn-primary usage"><i class="fa fa-barcode"></i> Productos</button>
                      <button type="button" id="btnBuscaServ" name="btnBuscaServ" class="btn btn-primary usage"><i class="fa fa-eye"></i> Servicios</button>
                      <a class="btn btn-danger " style="margin-left:3%;" href="admin_microcirugia_dia.php" id='salir'><i class="fa fa-mail-reply"></i> F4 Salir</a>
                      <button type="button" id="submit1" name="submit1" class="btn btn-primary usage"><i class="fa fa-check"></i> F2 Guardar</button>
                    </div>
                  </div>
            <div class="row">
              <div class="col-md-12">
                <section>
                  <input type='hidden' name='porc_iva' id='porc_iva' value='<?php echo $iva; ?>'>
                  <input type='hidden' name='monto_retencion1' id='monto_retencion1' value='<?php echo $monto_retencion1 ?>'>
                  <input type='hidden' name='monto_retencion10' id='monto_retencion10' value='<?php echo $monto_retencion10 ?>'>
                  <input type='hidden' name='monto_percepcion' id='monto_percepcion' value='100'>
                  <input type='hidden' name='porc_retencion1' id='porc_retencion1' value=0>
                  <input type='hidden' name='porc_retencion10' id='porc_retencion10' value=0>
                  <input type='hidden' name='porc_percepcion' id='porc_percepcion' value=0>
                  <input type='hidden' name='porcentaje_descuento' id='porcentaje_descuento' value=0>
                  <div class="">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="wrap-table1001">
                          <div class="table100 ver1 m-b-10">
                            <div class="table100-head">
                              <table id="inventable1">
                                <thead>
                                  <tr class="row100 head">
                                    <th class="success cell100 column10">ID</th>
                                    <th class='success  cell100 column30'>DESCRIPCI&Oacute;N</th>
                                    <th class='success  cell100 column10'>STOCK</th>
                                    <th class='success  cell100 column15'>PRESENTACI&Oacute;N</th>
                                    <th class='success  cell100 column10'>PRECIO</th>
                                    <th class='success  cell100 column5'>CANT</th>
                                    <th class='success  cell100 column10'>SUBTOT</th>
                                    <th class='success  cell100 column10'>ACCI&Oacute;N</th>
                                  </tr>
                                </thead>
                              </table>
                            </div>
                            <div class="table100-body js-pscroll">
                              <table>
                                <tbody id="inventable"></tbody>
                              </table>
                            </div>
                            <div class="table101-body">
                              <table>
                                <tbody>
                                  <tr>
                                    <td class='cell100 column15 leftt  text-bluegrey ' >&nbsp;</td>
                                    <td class='cell100 column15 leftt  text-bluegrey ' >N° INSUMOS:</td>
                                    <td class='cell100 column10 text-right text-danger' id='totcant'>0.00</td>
                                    <td class='cell100 column15 leftt  text-bluegrey ' >SUBTOTAL $:</td>
                                    <td class='cell100 column10 text-right text-danger' id='subtotal'>0.00</td>
                                    <td class="cell100 column15  leftt text-bluegrey ">TOTAL $:</td>
                                    <td class='cell100 column10 text-right text-green' id='total_gravado'>0.00</td>
                                    <td class='cell100 column10 leftt  text-bluegrey ' >&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td class='cell100 column50 text-bluegrey'  id='totaltexto'>&nbsp;</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--valores ocultos para referencia -->
                    <input type='hidden' name='id_empleado' id='id_empleado' >
                    <input type='hidden' name='numero_doc' id='numero_doc' >
                    <input type='hidden' name='id_factura' id='id_factura' >
                    <input type='hidden' name='urlprocess' id='urlprocess' value="<?php echo $filename; ?>">
                    <input type='hidden' name='totalfactura' id='totalfactura' value='0'>
                    <input type="hidden" id="fecha" value="<?php echo $fecha_actual; ?>">
                    <input type="hidden" id="id_microcirugia" value="-1">
                    <input type="hidden" id="id_microcirugia_pte" value="-1">
                      <input type="hidden" id="id_paciente" value="-1">
                    <input type="hidden" id='items' value="0">
                    <input type='hidden' name='id_apertura' id='id_apertura' value='<?php echo $id_apertura; ?>'>
                    <input type='hidden' name='turno' id='turno' value='<?php echo $turno; ?>'>
                    <input type='hidden' name='tip_impre' id='tip_impre' value='<?php echo $tipo_fa; ?>'>
                    <input type='hidden' name='caja' id='caja' value='<?php echo $caja; ?>'>
                  </div>
                  <!--div class="table-responsive m-t"-->
                </section>
                </div>
              </div>
              <!--div class='ibox-content'-->
              <!-- Modal -->
              <div class="modal-container">
                <div class="modal fade" id="clienteModal" tabindex="-2" role="dialog" aria-labelledby="myModalCliente" aria-hidden="true">
                  <div class="modal-dialog model-sm">
                    <div class="modal-content"> </div>
                  </div>
                </div>
              </div>
              <div class="modal-container">
                <div class="modal fade" id="doctorModal" tabindex="-2" role="dialog" aria-labelledby="myModalCliente" aria-hidden="true">
                  <div class="modal-dialog model-sm">
                    <div class="modal-content"> </div>
                  </div>
                </div>
              </div>
              <div class="modal-container">
                <div class="modal fade" id="procedenciaModal" tabindex="-2" role="dialog" aria-labelledby="myModalCliente" aria-hidden="true">
                  <div class="modal-dialog model-sm">
                    <div class="modal-content"> </div>
                  </div>
                </div>
              </div>
              <div class="modal-container">
                <div class="modal fade" id="cliente1Modal" tabindex="-2" role="dialog" aria-labelledby="myModalCliente" aria-hidden="true">
                  <div class="modal-dialog model-sm">
                    <div class="modal-content"> </div>
                  </div>
                </div>
              </div>
            </div>
            <!--<div class='ibox float-e-margins' -->
          </div>
            </div>
          <!--div class='col-lg-12'-->
          <!--div class='row'-->
          <!--div class='wrapper wrapper-content  animated fadeInRight'-->

          <?php

        include_once("footer.php");

        echo "<script src='js/funciones/crear_insumos_micro.js'></script>";
        echo "<script src='js/plugins/arrowtable/arrow-table.js'></script>";
        echo "<script src='js/plugins/bootstrap-checkbox/bootstrap-checkbox.js'></script>";
        echo "<script src='js/plugins/datetime/bootstrap-datetimepicker.js'></script>";
        echo '<script src="js/plugins/perfect-scrollbar/perfect-scrollbar.min.js"></script>
        <script src="js/funciones/main.js"></script>';
        echo "<script src='js/funciones/util.js'></script>";
      } //permiso del script
      else {
        echo "<br><br><div class='alert alert-warning'>No tiene permiso para este modulo.</div></div></div></div></div>";
        include_once("footer.php");
      }
    }

function consultar_stock(){
    $id_producto = $_REQUEST['id_producto'];
    $id_presentacion="";
    if (isset($_REQUEST['id_presentacion'])){
      $id_presentacion=$_REQUEST['id_presentacion'];
    }
    $cortesia = "";
    $id_usuario=$_SESSION["id_usuario"];
    $iva=13/100;
    $precio=0;
    $sql1 = "SELECT p.id_producto, p.barcode, p.descripcion, p.estado, p.perecedero, p.exento, p.id_categoria,p.imagen,
    p.id_sucursal,s.id_stock,s.stock, s.id_sucursal, s.precio_unitario, s.costo_unitario
    FROM producto AS p, stock AS s WHERE p.id_producto = s.id_producto AND p.id_producto ='$id_producto' ";
    $stock1=_query($sql1);
    $row1=_fetch_array($stock1);
    $nrow1=_num_rows($stock1);
    if ($nrow1>0) {
      $perecedero=$row1['perecedero'];
      $barcode = $row1["barcode"];
      $descripcion = $row1["descripcion"];
      $estado = $row1["estado"];
      $perecedero = $row1["perecedero"];
      $exento = $row1["exento"];
      $id_stock = $row1["id_stock"];
      $stock = $row1["stock"];
      $precio_unitario = $row1["precio_unitario"];
      $costo_unitario = $row1["costo_unitario"];
      $imagen = $row1["imagen"];
      //precio de venta
      $fecha_hoy=date("Y-m-d");
      $fecha_hoy2=date("d-m-Y");
      //consultar si es perecedero
      $sql_existencia = "SELECT su.id_producto, su.cantidad, su.id_ubicacion, u.id_ubicacion, u.bodega
      FROM stock_ubicacion as su, ubicacion as u
      WHERE su.id_producto = '$id_producto' AND su.id_ubicacion = u.id_ubicacion AND u.bodega != 1 ORDER BY su.id_su ASC";
      $resul_existencia = _query($sql_existencia);
      $cuenta_existencia = _num_rows($resul_existencia);
      $existencia_real = 0;
      if ($cuenta_existencia > 0) {
        while ($row_ex = _fetch_array($resul_existencia)) {
          $cantidad_ex = $row_ex["cantidad"];
          $existencia_real += $cantidad_ex;
        }
      }
      $fecha_caducidad="0000-00-00";
      $stock_fecha=0;

    }
    //si no hay stock devuelve cero a todos los valores !!!
    if ($nrow1==0) {
      $existencias=0;
      $precio_venta=0;
      $costos_pu=array(0,0,0,0);
      $precios_vta=array(0,0,0,0);
      $cp=0;
      $iva=0;
      $unidades=" ";
      $imagen='';
      $combo=0;
      $fecha_caducidad='0000-00-00';
      $stock_fecha=0;
      $oferta=0;
    }

    /*inicio modificacion presentacion*/
    $i=0;
    $unidadp=0;
    $preciop=0;
    $descripcionp=0;

    $sql_p=_query("SELECT presentacion.nombre, presentacion_producto.descripcion,presentacion_producto.id_presentacion,
      presentacion_producto.unidad,presentacion_producto.precio
      FROM presentacion_producto
      JOIN presentacion ON presentacion.id_presentacion=presentacion_producto.presentacion
      WHERE presentacion_producto.id_producto='$id_producto' AND presentacion_producto.activo=1");
      $select="<select class='sel id_pres form-control' id='id_presentacion'>";
      while ($row=_fetch_array($sql_p)) {
        if ($i==0) {
          $unidadp=$row['unidad'];
          $preciop=$row['precio'];
          $descripcionp=$row['descripcion'];
        }
        if ($row['id_presentacion']==$id_presentacion){
          $unidadp=$row['unidad'];
          $preciop=$row['precio'];
          $descripcionp=$row['descripcion'];
          $select.="<option value='$row[id_presentacion]' selected>$row[nombre] </option>";
        }
        else{
          $select.="<option value='$row[id_presentacion]'>$row[nombre]</option>";
        }
        $i=$i+1;
      }
      $select.="</select>";
      $xdatos['existencias'] = $existencia_real;
      $xdatos['fecha_caducidad'] = $fecha_caducidad;
      $xdatos['stock_fecha'] =$stock_fecha;
      $xdatos['perecedero']=$perecedero;
      $xdatos['fecha_hoy']= $fecha_hoy;
      $xdatos['descripcion']= $descripcion;
      $xdatos['select']= $select;
      $xdatos['preciop']= $preciop;
      $xdatos['unidadp']= $unidadp;
      $xdatos['descripcionp']= $descripcionp;
      $xdatos['imagen']= $imagen;

      echo json_encode($xdatos); //Return the JSON Array
  }
    function total_texto()
    {
      $total=$_REQUEST['total'];
      list($entero, $decimal)=explode('.', $total);
      if($entero>0){
      $enteros_txt=num2letras($entero);
      }
    //  $decimales_txt=num2letras($decimal);

      if ($entero>1) {
        $dolar=" dolares";
      } else {
        $dolar=" dolar";
      }
      $cadena_salida= "Son: <strong>".$enteros_txt.$dolar." con ".$decimal."/100 ctvs.</strong>";
      echo $cadena_salida;
    }

    function numero_tiquete($ult_doc, $tipo)
    {
      $ult_doc=trim($ult_doc);
      $len_ult_valor=strlen($ult_doc);
      $long_num_fact=10;
      $long_increment=$long_num_fact-$len_ult_valor;
      $valor_txt="";
      if ($len_ult_valor<$long_num_fact) {
        for ($j=0;$j<$long_increment;$j++) {
          $valor_txt.="0";
        }
      } else {
        $valor_txt="";
      }
      $valor_txt=$valor_txt.$ult_doc;
      return $valor_txt;
    }

    function insertar(){
      date_default_timezone_set('America/El_Salvador');
      $id_paciente=$_POST['id_paciente'];
      $id_doctor = $_POST["id_doctor"];
      $id_microcirugia = $_POST["id_microcirugia"];
      $id_microcirugia_pte = $_POST["id_microcirugia_pte"];
      $honorarios_micr = $_POST["honorarios_micr"];
      $paquete = $_POST["paquete"];
      $total = $_POST["total"];
      $items = $_POST["items"];
      $cuantos = $_POST['cuantos'];
      $array_json=$_POST['json_arr'];

      $fecha=date("Y-m-d");
      $hora=date("H:i:s");
      $id_empleado=$_SESSION["id_usuario"];
      $fecha_actual = date('Y-m-d');
      $tipoprodserv = "Microcirugia";

      $insertar_fact=false;
      $insertar_fact_dett=true;
      $insertar_numdoc =false;
      if($id_microcirugia_pte=="-1"){
        _begin();
        if ($cuantos>0){
        $tabl = "microcirugia_paciente";

        //actualizar microcirugia
        if($paquete==1){
          $costo_paciente=$honorarios_micr;
          $honorarios_doctor=$honorarios_micr-$total;
          $total_hosp=$total;
          $total_final=$honorarios_micr;
        }
        if($paquete==0){
         $honorarios_doctor=$honorarios_micr;
         $total_hosp=$total;
         $total_final=$total+$honorarios_doctor;
          $costo_paciente= $total_final;
        }

        $fd0  = array(
                'costo_paciente' => $costo_paciente,
                'hora_fin' =>   $hora,
                'honorarios_doctor' => $honorarios_doctor,
                'total_insumos' => $total,
                'realizado' => 1,
        );
        //$wc0="WHERE id_microcirugia_pte='$id_microcirugia_pte'";
        $update = _insert($tabl, $fd0);
        $id_microcirugia_pte= _insert_id();
        //facturar
        $tabl1 = "factura";
        //agregar a factura
          $fd1= array(
          'fecha'=>$fecha,
          'hora_inicio'=>$hora,
          'id_cliente'=>$id_paciente,
          'subtotal'=>$total_final,
          'alias_tiposerv'=>'HOS',
          'id_doctor'=>$id_doctor,
          'total_hosp' => $total_hosp,
          'total_doctor' => $total_doctor,
          'total' =>   $total_final,
          );
        $ins1 = _insert($tabl1, $fd1);
        $id_factura= _insert_id();
        $array = json_decode($array_json, true);
        foreach ($array as $fila)
        {
          //Actualizar detalle microcirugia y luego detalle factura
          $id_producto=$fila['id'];
          $id_presentacion=$fila['id_presentacion'];
          $subtotal=$fila['subtotal'];
          $cantidad=$fila['cantidad'];
          $precio_venta=$fila['precio'];
          $tipop=$fila['tipop'];
          if($tipop=="P"){
          $sql_pres="SELECT   unidad FROM presentacion_producto
          WHERE id_presentacion='$id_presentacion' AND id_producto='$id_producto'";
          $res_pres=_query($sql_pres);
          $unidad=_fetch_result($res_pres);
          $cantidad_real=$cantidad*$unidad;
          }
          else{
              $unidad=1;
              $cantidad_real=$cantidad*$unidad;
          }
          $tabl2="microcirugia_paciente_det";
          $fd2= array(
            'id_microcirugia_pte' => $id_microcirugia_pte,
            'id_producto' => $id_producto,
            'cantidad' => $cantidad_real,
            'precio' => $precio_venta,
            'tipo' => $tipop,
          );
          $ins2 = _insert($tabl2,$fd2 );

          $tabl3= 'factura_detalle';
          $fd3 = array(
            'id_factura' => $id_factura,
            'id_producto' => $id_producto,
            'cantidad' => $cantidad_real,
            'precio' => $precio_venta,
            'subtotal' => $subtotal,
            'tipo_prod_serv' =>$tipop,
          );
          $ins3 = _insert($tabl3,$fd3 );
          //stock
          if($tipop=="P"){
          $tabl4= 'stock';
          $sql4="UPDATE stock
	        SET stock=stock-$cantidad_real,
          update_date='$fecha'
	        WHERE id_producto='$id_producto'";

	        $ins4=_query($sql4);
          $sql_su="SELECT cantidad,id_ubicacion FROM stock_ubicacion
                  WHERE id_producto='$id_producto' ";
          $res5=_query($sql_su);
          $n5=_num_rows($res5);
          $diferencia=0;
          for($j=0;$j<$n5;$j++){
              $cant_actualizar=0;
              $row5=_fetch_array($res5);
              $cantidad_su=$row5['cantidad'];
              $id_ubicacion=$row5['id_ubicacion'];
              $diferencia=$cantidad_su-$cantidad_real;
              if($diferencia>=0){
                $cant_actualizar=$cantidad_su-$cantidad_real;
                $sql5="UPDATE stock_ubicacion
                SET cantidad=cantidad-$cantidad_real
                WHERE id_producto='$id_producto'
                AND   id_ubicacion='$id_ubicacion'";
                $ins5=_query($sql5);
                break;
              }
              if($diferencia<0){
                $cantidad_real=$cantidad_real-$cantidad_su;
                $sql5="UPDATE stock_ubicacion
                SET cantidad=0
                WHERE id_producto='$id_producto'
                AND   id_ubicacion='$id_ubicacion'";
                $ins5=_query($sql5);
              }
          }//stock_ubicacion
        }  //
        } //foreach ($array as $fila){
          if ($ins1&&$ins2&&$ins3&&$ins4&&$ins5){
            _commit(); // transaction is committed
            $xdatos['typeinfo']='Success';
            $xdatos['msg']='Registro   Guardado con Exito !';
          }
          else{
            _rollback(); // transaction rolls back
            $xdatos['typeinfo']='Error';
            $xdatos['msg']='Registro no pudo ser ingresado! ins1:'.$ins1."-ins2:".$ins2."-ins3:".$ins3."-ins4:".$ins4."-ins5:".$ins5;
          }
        }
        echo json_encode($xdatos);
      }
      else{
        editar($id_paciente,$id_doctor,$id_microcirugia, $id_microcirugia_pte,$honorarios_micr,$paquete,$total,$items,$cuantos,$array_json);
      }
    }
  function editar($id_paciente,$id_doctor,$id_microcirugia, $id_microcirugia_pte,$honorarios_micr,$paquete,$total,$items,$cuantos,$array_json){
     /*pasos editar
     1-guardar el contenido antiguo de la microcirugia en una tabla temp.
     2-c/u de los valores que vienen del DOM validar si estaban en la microcirugia
     3)eliminar de microcir_det-pte los valores que no existan en el dom y ese valor sumarlo al stock
     4) si un producto existe en ambos, validar la cantidad si es mayor o gual q la antigua y hacer update tambien al stock
     */
     /*
    $tmp_tbl="CREATE TEMPORARY TABLE IF NOT EXISTS tmp_micro
    SELECT * FROM microcirugia_paciente_det
    WHERE id_microcirugia_pte='$id_microcirugia_pte'";
  	$result0=_query($tmp_tbl);
    */
    $array = json_decode($array_json, true);
    $tmp_tbl='CREATE TEMPORARY TABLE IF NOT EXISTS tmp_micro  LIKE microcirugia_paciente_det';
  	$result0=_query($tmp_tbl);

    $fecha=date("Y-m-d");
    $hora=date("H:i:s");
    $id_empleado=$_SESSION["id_usuario"];
    $tipoprodserv = "Microcirugia";
    $datos_antiguos=array();

    $sql_pa="SELECT * FROM microcirugia_paciente_det
    WHERE id_microcirugia_pte='$id_microcirugia_pte'";
    $result_pa=_query($sql_pa);
    $nrows_pa=_num_rows($result_pa);
    for($n=0;$n<$nrows_pa;$n++){
    			$rows_pa=_fetch_array($result_pa);
    			$id_microcirugia_pte_det=$rows_pa['id_microcirugia_pte_det'];
    			$id_prod=$rows_pa['id_producto'];
    			$tipo1=$rows_pa['tipo'];
    			$cantidad1=$rows_pa['cantidad'];
          $precio1=$rows_pa['precio'];
    			$datos_antiguos[]=$id_microcirugia_pte_det."|".$id_prod."|".$tipo1."|".$cantidad1."|"."1";
    }
    _begin();
    if ($cuantos>0){

    //actualizar microcirugia
    if($paquete==1){
      $costo_paciente=$honorarios_micr;
      $honorarios_doctor=$honorarios_micr-$total;
      $total_hosp=$total;
      $total_final=$honorarios_micr;
    }
    if($paquete==0){
     $honorarios_doctor=$honorarios_micr;
     $total_hosp=$total;
     $total_final=$total+$honorarios_doctor;
      $costo_paciente= $total_final;
    }

   $tabl0 = "microcirugia_paciente";
    $fd0  = array(
            'costo_paciente' => $costo_paciente,
            'hora_fin' =>   $hora,
            'honorarios_doctor' => $honorarios_doctor,
            'total_insumos' => $total,
            'realizado' => 1,
    );
    $wc0="WHERE id_microcirugia_pte='$id_microcirugia_pte'";
    $update = _update($tabl0, $fd0,  $wc0);

    //facturar
    $tabl1 = "factura";
    //agregar a factura
      $fd1= array(
      'fecha'=>$fecha,
      'hora_inicio'=>$hora,
      'id_cliente'=>$id_paciente,
      'subtotal'=>$total_final,
      'alias_tiposerv'=>'HOS',
      'id_doctor'=>$id_doctor,
      'total_hosp' => $total_hosp,
      'total_doctor' => $honorarios_doctor,
      'total' =>   $total_final,
      );
      $wc1="WHERE id_transacc='$id_microcirugia_pte'
      AND alias_tiposerv='HOS'";


    $ins1 = _update($tabl1, $fd1,$wc1);

    foreach ($array as $fila){
      //Actualizar detalle microcirugia y luego detalle factura
      $id_producto=$fila['id'];
      $id_presentacion=$fila['id_presentacion'];
      $subtotal=$fila['subtotal'];
      $cantidad=$fila['cantidad'];
      $precio_venta=$fila['precio'];
      $tipop=$fila['tipop'];
      if($tipop=="P"){
        $sql_pres="SELECT   unidad FROM presentacion_producto
        WHERE id_presentacion='$id_presentacion' AND id_producto='$id_producto'";
        $res_pres=_query($sql_pres);
        $unidad=_fetch_result($res_pres);
        $cantidad_real=$cantidad*$unidad;
      }
      else{
          $unidad=1;
          $cantidad_real=$cantidad*$unidad;
      }
      //buscar los elementos del DOM, y comparar si estan guardados
      $sql1="SELECT * FROM microcirugia_paciente_det
      WHERE id_microcirugia_pte='$id_microcirugia_pte'
      AND   id_producto='$id_producto'
      AND tipo='$tipop'
      ";
      $result1=_query($sql1);
      $nrows1=_num_rows($result1);
      if($nrows1>0){
       $row1=_fetch_array($result1);
       $id_microcirugia_pte_det=$row1['id_microcirugia_pte_det'];
       $cantidad_pedido_previo=$row1['cantidad'];

      }else {
        $cantidad_pedido_previo=0;
      }

    //
    $tabl2="microcirugia_paciente_det";
    $fd2= array(
      'id_microcirugia_pte' => $id_microcirugia_pte,
      'id_producto' => $id_producto,
      'cantidad' => $cantidad_real,
      'precio' => $precio_venta,
      'tipo' => $tipop,
    );

    //
    if($nrows1==0){
      $ins2 = _insert($tabl2,$fd2 );
      $id_microcirugia_pte_det=_insert_id();
    }
    if($nrows1>0){
      $wc2=" WHERE id_producto='$id_producto'
             AND id_microcirugia_pte='$id_microcirugia_pte' and tipo='$tipop'";
      $ins2 = _update( $tabl2 , $fd2,$wc2 );
    }
    //tabla temporal
    $tbltmp = 'tmp_micro';
    $fdtmp= array(
      'id_microcirugia_pte' => $id_microcirugia_pte,
      'id_microcirugia_pte_det' => $id_microcirugia_pte_det,
      'id_producto' => $id_producto,
      'cantidad' => $cantidad_real,
      'precio' => $precio_venta,
      'tipo' => $tipop,
    );
    $ins3 = _insert( $tbltmp , $fdtmp );
    if($tipop=='P'){
      //actualizar el stock en base a este pedido
  			$table_st= 'stock';
  			$sqls="SELECT stock FROM stock WHERE id_producto='$id_producto'";
  			$results=_query($sqls);
  			$rows=_fetch_array($results);
  			$nrow_cants=_num_rows($results);
  			if ($nrow_cants>0){
  				$cantidad_stock=$rows['stock'];
  				if($cantidad_stock<0)
  			 	   $cantidad_stock=0;
  			     $actualiza_stock=$cantidad_real-$cantidad_pedido_previo;
  			     $stock_final=$cantidad_stock-$actualiza_stock;
  			     $where_clause_st="WHERE id_producto='$id_producto'";
  				   $fd_st = array(
  				         'stock' => $stock_final,
  				    );
  				   $insertar_st= _update($table_st,$fd_st, $where_clause_st );
  				//Actualizar en stock si  hay registro del producto
         }
         //stock ubicacion
        // $ins4=_query($sql4);
         $sql_su="SELECT cantidad,id_ubicacion FROM stock_ubicacion
                 WHERE id_producto='$id_producto'";
         $res5=_query($sql_su);
         $n5=_num_rows($res5);
         $diferencia=0;
         $cantidad_nueva=$cantidad_pedido_previo-$cantidad_real;
         $cantidad_act=abs($cantidad_nueva);
         for($j=0;$j<$n5;$j++){
             $cant_actualizar=0;
             $row5=_fetch_array($res5);
             $cantidad_su=$row5['cantidad'];
             $id_ubicacion=$row5['id_ubicacion'];
             //cuando se ha modificado la nueva cantidad y hay que sumar al stock por ubic.
             if($cantidad_nueva>=0){
               $sql5="UPDATE stock_ubicacion
               SET cantidad=cantidad+$cantidad_nueva
               WHERE id_producto='$id_producto'
               AND   id_ubicacion='$id_ubicacion'";
               $ins5=_query($sql5);
               break;
             }
            //cuando se ha modificado la nueva cantidad y hay que restar al stock por ubic.
             if($cantidad_nueva<0){
                 $diferencia=$cantidad_su-$cantidad_act;
                 if($diferencia>0){
                  // $cant_actualizar=$cantidad_su-$cantidad_real;
                   $sql5="UPDATE stock_ubicacion
                   SET cantidad=cantidad-$cantidad_act
                   WHERE id_producto='$id_producto'
                   AND   id_ubicacion='$id_ubicacion'";
                   $ins5=_query($sql5);
                   break;
                 }
                 if($diferencia<=0){
                   $cantidad_act=$cantidad_act-$cantidad_su;
                   $sql5="UPDATE stock_ubicacion
                   SET cantidad=0
                   WHERE id_producto='$id_producto'
                   AND   id_ubicacion='$id_ubicacion'";
                   $ins5=_query($sql5);
                 }

             }
             /*EJ: $cantidad_real=4 ;$cantidad_pedido_previo=2
             $cantidad_nueva=$cantidad_pedido_previo-$cantidad_real;
             $cantidad_nueva=-2 que deben restarse del inventario !!!
             Ahora hay que ver si el stock de la ubicacion es mayor que cantidad nueva!!!
             if($cantidad_nueva<0){
              $diferencia=$cantidad_su-abs($cantidad_nueva);

              }

             $cantidad_real=2 ;$cantidad_pedido_previo=4
            $cantidad_nueva=$cantidad_pedido_previo-$cantidad_real;
            $cantidad_nueva=2 que deben sumarse al inventario
             */
             if($cantidad_nueva<0){
              $diferencia=$cantidad_su-abs($cantidad_nueva);

              }
             $cantidad_nueva=$cantidad_real-$cantidad_pedido_previo;

             $diferencia=$cantidad_su-$cantidad_real;

             $actualiza_stock=$cantidad_real-$cantidad_pedido_previo;
    			   $stock_final=$cantidad_stock-$actualiza_stock;

             if($diferencia>=0){
               $cant_actualizar=$cantidad_su+$diferencia;

               $sql5="UPDATE stock_ubicacion
               SET cantidad=cantidad-$cantidad_nueva
               WHERE id_producto='$id_producto'
               AND   id_ubicacion='$id_ubicacion'";
               $ins5=_query($sql5);
               break;
             }
             if($diferencia<0){
               $cantidad_real=$cantidad_nueva-$cantidad_su;
               $sql5="UPDATE stock_ubicacion
               SET cantidad=0
               WHERE id_producto='$id_producto'
               AND   id_ubicacion='$id_ubicacion'";
               $ins5=_query($sql5);
             }
         }//stock_ubicacion
         //stock ubicacion


        }
        //devolver el stock de los eliminados de la lista y actualizarlos a la bd
  			//saco el numero de elementos
  		  $longitud = count($datos_antiguos);
  			//Recorro todos los elementos
  			$existe=0;
  			for($u=0; $u<$longitud; $u++){
        //saco el valor de cada elemento
  	  $id_prodx=$datos_antiguos[$u];
  	  list($id_mpdet0,$id_p,$tipo11,$cant1,$borrado0)=explode("|",$id_prodx);
  		$sql_tmp="SELECT * FROM tmp_micro as tm
  		 WHERE tm.id_microcirugia_pte='$id_microcirugia_pte'
  		 and tm.id_microcirugia_pte_det='$id_mpdet0'
  		 AND tm.id_producto='$id_p'
  		 AND tm.tipo='$tipo11'
  		 ";

  		$result_tmp=_query($sql_tmp);
  		$row_tmp=_fetch_array($result_tmp);
  		$nrow_tmp=_num_rows($result_tmp);

  		if ($nrow_tmp>0){
  			for($q=0;$q<$nrow_tmp;$q++){
  				$datos_antiguos[$u]=$id_mpdet0."|".$id_p."|".$tipo11."|".$cant1."|"."0";
  				$existe+=1;
  			}
  		}
      }
    } // end    foreach ($array as $fila){
      $table2='microcirugia_paciente_det';
      for($v=0; $v<$longitud; $v++){

          $id_prod2=$datos_antiguos[$v];
          list($id_mp2,$id_pr,$tipo11,$cant2,$borrado)=explode("|",$id_prod2);
          $stock_final2=0;
          if ($tipo11=='P'){
          if ($borrado=='1'){

          $sql6="SELECT stock FROM stock WHERE id_producto='$id_pr'";
          $result6=_query($sql6);
          $row6=_fetch_array($result6);
          $nrow_cant6=_num_rows($result6);
          $cantidad_stock2=$row6['stock'];
          $stock_final2=$cantidad_stock2+$cant2;

          $where_clause_st2="WHERE id_producto='$id_pr'";
          $fd_st2 = array(
            'stock' => $stock_final2,
          );

          $insertar_st2= _update($table_st,$fd_st2, $where_clause_st2 );

          $wc3=" WHERE id_microcirugia_pte='$id_microcirugia_pte'
          AND id_producto='$id_pr' and tipo='$tipo11'
          and id_microcirugia_pte_det='$id_mp2'
          ";
          $delete1 = _delete( $tabl2 ,$wc3);
         }
       }
      }
      $drop1=" DROP TABLE tmp_micro";
			$resultx=_query($drop1);
    }
      if($ins1&&$ins2){
        _commit(); // transaction is committed
        $xdatos['typeinfo']='Success';
      }
      else{
        _rollback(); // transaction rolls back
        $xdatos['typeinfo']='Error';
        $xdatos['msg']='Registro de Pedido no pudo ser Actualizado !';
        $xdatos['process']='noinsert';
      //  $xdatos['insertados']="cual falla upd1 :".$updates4." upd2:".$updates2." upd3:".$insertar3 ;
      }

  echo json_encode($xdatos);
  }
      function imprimir_fact()
      {
        $fecha_actual=date("Y-m-d");
        $con_pago= $_POST['con_pago1'];
        $id_cobro= $_POST['id_cobro'];
        $id_empleado=$_SESSION["id_usuario"];
        $numero_doc = $_POST['numero_doc'];
        $tipo_impresion= $_POST['tipo_impresion'];
        $id_factura= $_POST['id_cobro'];
        $id_apertura_pagada= $_POST['id_apertura'];
        $id_sucursal=$_SESSION['id_sucursal'];
        $numero_factura_consumidor = $_POST['id_cobro'];
        $monto = $_POST['monto'];
        $direccion="San Miguel";

        if (isset($_POST['nombreape'])) {
          $nombreape= $_POST['nombreape'];
        }
        if (isset($_POST['direccion'])) {
          $direccion= $_POST['direccion'];
        }
        if (isset($_POST['nit'])) {
          $nit= $_POST['nit'];
        }
        if (isset($_POST['nrc'])) {
          $nrc= $_POST['nrc'];
        }

        if ($tipo_impresion=='COF') {
          $tipo_entrada_salida="FACTURA CONSUMIDOR";

        }
        if ($tipo_impresion=='TIK') {
          $tipo_entrada_salida="TICKET";
        }
        if ($tipo_impresion=='COB') {
          $tipo_entrada_salida="CONTROL COBRO";
        }
        if ($tipo_impresion=='CCF') {
          $tipo_entrada_salida="CREDITO FISCAL";
          $nit= $_POST['nit'];
          $nrc= $_POST['nrc'];
          $nombreape= $_POST['nombreape'];
        }
        if($con_pago=='CHE'){

          $numero=$_POST['numche'];
          $banco=$_POST['emisor'];
        }elseif($con_pago=='TRA'){

          $banco1=$_POST['banco'];
          $numcuenta=$_POST['numcuenta'];
          $numtrans=$_POST['numtrans'];
        }elseif($con_pago=='TAR'){

          $banco=$_POST['emisor'];
          $numero=$_POST['numtarj'];
          $voucher=$_POST['voucher'];
        }else {
          $banco="";
          $numero="";
          $voucher="";
        }

        if ($con_pago=="TRA") {

          $sql_res=_fetch_array(_query("SELECT id_empleado FROM cobro WHERE cobro.id_cobro = $id_cobro "));
          $responsable="";
          if ($sql_res['id_empleado']==-1) {
            # code...
            $sql_res_name=_fetch_array(_query("SELECT empleado.nombre FROM empleado WHERE id_empleado=$sql_res[id_empleado]"));
            $responsable=$sql_res_name['nombre'];
          }
          else {
            $sql_res_name=_fetch_array(_query("SELECT empleado.nombre FROM empleado WHERE id_empleado=$sql_res[id_empleado]"));
            $responsable=$sql_res_name['nombre'];
          }

          $tipo="Ingreso";
          $sql = _query("SELECT (SUM(mov_cta_banco.entrada)-SUM(mov_cta_banco.salida)) AS saldo FROM mov_cta_banco WHERE id_sucursal='$id_sucursal' AND id_cuenta='$id_cuenta'");
          $row = _fetch_array($sql);
          $saldo = $row["saldo"];
          $saldo=round($saldo,2);

          $nalc = 0;
          if($tipo == "Ingreso")
          {
            $entrada = $monto;
            $salida = 0;
            $nsal = $saldo + $monto;
          }

          $tabla_mov = 'mov_cta_banco';
          $form_data_mov = array (
            'id_cuenta'=>$numcuenta,
            'tipo' => $tipo,
            'alias_tipodoc' => "Transferencia",
            'numero_doc' => $numtrans,
            'entrada' => $entrada,
            'salida' => $salida,
            'saldo' => $nsal,
            'fecha' => $fecha_movimiento,
            'responsable' => $responsable,
            'concepto' => "INGRESO POR VENTA",
            'id_sucursal' => $id_sucursal,
            'procesado' => 0,
            'id_factura' => $id_cobro,
          );
          $insertar = _insert($tabla_mov,$form_data_mov);
        }
        //Valido el sistema operativo y lo devuelvo para saber a que puerto redireccionar
        $info = $_SERVER['HTTP_USER_AGENT'];
        if (strpos($info, 'Windows') == true) {
          $so_cliente='win';
        } else {
          $so_cliente='lin';
        }

        $sql_fact="SELECT * FROM cobro WHERE id_cobro='$id_cobro'";
        $result_fact=_query($sql_fact);
        $nrows_fact=_num_rows($result_fact);
        if ($nrows_fact>0) {
          $table_fact= 'cobro';

          if ($tipo_impresion=='TIK') {
            $form_data_fact = array(
              'finalizada' => '1',
              'pagada' => '1',
              'id_apertura_pagado' => $id_apertura_pagada,
              'turno_pagado' => $id_apertura_pagada,
              'banco'=>$banco,
              'num_doc_pago' => $numero,
              'voucher' => $voucher,

            );

            $where_clause="id_cobro='$id_factura'";
            $actualizar = _update($table_fact, $form_data_fact, $where_clause);

          }else {
            $form_data_fact = array(
              'finalizada' => '1',
              'pagada' => '1',
              'id_apertura_pagado' => $id_apertura_pagada,
              'turno_pagado' => $id_apertura_pagada,
              'banco'=>$banco,
              'num_doc_pago' => $numero,
              'voucher' => $voucher,
              'num_fact_impresa'=>$numero_doc,
              'fecha_pago'=>$fecha_actual,
            );

            $where_clause="id_cobro='$id_factura'";
            $actualizar = _update($table_fact, $form_data_fact, $where_clause);
          }

        }
        //cambiar numero documento impreso para mostrar en reporte kardex
        /*$where_clause1="WHERE
        tipo_entrada_salida='$tipo_entrada_salida'
        AND numero_doc='$numero_doc'
        AND fecha_movimiento='$fecha_movimiento'
        ";

        $table1= 'movimiento_producto';
        $form_data1 = array(
        'numero_doc'=>$id_factura,
      );

      $insertar1 = _update($table1, $form_data1, $where_clause1);*/

      if ($tipo_impresion=='COF') {
        $info_facturas=print_fact($id_factura, $tipo_impresion, $nit, $nrc, $nombreape, $direccion);

      }
      if ($tipo_impresion=='ENV') {
        $info_facturas=print_envio($id_factura, $tipo_impresion);
      }

      if ($tipo_impresion=='CCF') {
        $info_facturas=print_ccf($id_factura, $tipo_impresion, $nit, $nrc, $nombreape,"");
      }
      //directorio de script impresion cliente
      $headers="";
      $footers="";
      if ($tipo_impresion=='TIK' ||$tipo_impresion=='COB') {
        $info_facturas=print_ticket($id_factura, $tipo_impresion);

        $sql_pos="SELECT *  FROM config_pos  WHERE id_sucursal='$id_sucursal' AND alias_tipodoc='TIK'";

        $result_pos=_query($sql_pos);
        $row1=_fetch_array($result_pos);

        $headers=$row1['header1']."|".$row1['header2']."|".$row1['header3']."|".$row1['header4']."|".$row1['header5']."|";
        $headers.=$row1['header6']."|".$row1['header7']."|".$row1['header8']."|".$row1['header9']."|".$row1['header10'];
        $footers=$row1['footer1']."|".$row1['footer2']."|".$row1['footer3']."|".$row1['footer4']."|".$row1['footer5']."|";
        $footers.=$row1['footer6']."|".$row1['footer7']."|".$row1['footer8']."|".$row1['footer8']."|".$row1['footer10']."|";
      }

      $sql_dir_print="SELECT *  FROM config_dir WHERE id_sucursal='$id_sucursal'";
      $result_dir_print=_query($sql_dir_print);
      $row_dir_print=_fetch_array($result_dir_print);
      $dir_print=$row_dir_print['dir_print_script'];
      $shared_printer_win=$row_dir_print['shared_printer_matrix'];
      $shared_printer_pos=$row_dir_print['shared_printer_pos'];
      $nreg_encode['shared_printer_win'] =$shared_printer_win;
      $nreg_encode['shared_printer_pos'] =$shared_printer_pos;
      $nreg_encode['dir_print'] =$dir_print;
      $nreg_encode['facturar'] =$info_facturas;
      $nreg_encode['sist_ope'] =$so_cliente;
      $nreg_encode['headers'] =$headers;
      $nreg_encode['footers'] =$footers;

      echo json_encode($nreg_encode);
    }

function agregar_cliente(){
  $id_sucursal=$_SESSION["id_sucursal"];
  $query_user = _query("SELECT n_expediente FROM expediente WHERE id_sucursal='$id_sucursal' ORDER BY n_expediente DESC LIMIT 1");
  $datos_user = _fetch_array($query_user);
  $numero = $datos_user["n_expediente"];
  $query_user1 = _query("SELECT id_paciente FROM paciente WHERE id_sucursal='$id_sucursal'ORDER BY id_paciente DESC LIMIT 1");
  $datos_user1 = _fetch_array($query_user1);
  $numero2 = $datos_user1["id_paciente"];

  $numero1 = (int)$numero;

  if($numero1 == ""){
    $numero1 = 201800000;
  }else{
    $numero1+=1;
  }
  $numero3 = (int)$numero2 +1;

  $nombre=$_POST["nombre"];
  $apellido=$_POST["apellido"];
  $sexo = $_POST["sexo"];
  $fecha_nacimiento = MD($_POST["naci"]);
  $id_sucursal=$_SESSION["id_sucursal"];
  $expediente = $numero1;
  $paciente = $numero3;
  $fechaU = date("Y-m-d");
  $fechaC = date("Y-m-d");

  $sql_result=_query("SELECT id_paciente FROM paciente WHERE nombre='$nombre' and apellido='$apellido'and id_sucursal='$id_sucursal'");
  $numrows=_num_rows($sql_result);

  $table = 'paciente';
  $form_data = array (
    'nombre' => $nombre,
    'apellido' => $apellido,
    'sexo' => $sexo,
    'fecha_nacimiento' => $fecha_nacimiento,
    'estado' => 1,
    'id_sucursal'=>$id_sucursal
  );



  if($numrows == 0)
  {
    $insertar = _insert($table,$form_data);
    $id_cliente=_insert_id();
    $table1 = 'expediente';
    $form_data1 = array (
      'n_expediente' => $expediente,
      'id_paciente' => $id_cliente,
      'fecha_creada' => $fechaC,
      'ultima_visita' => $fechaU,
      'id_sucursal'=>$id_sucursal
    );
    if($insertar)
    {
      $insertar1 = _insert($table1,$form_data1);
      if($insertar1){
        $xdatos['typeinfo']='Success';
        $xdatos['msg']='Paciente ingresado correctamente!';
        $xdatos['id_client']=  $id_cliente;
        $xdatos['process']='insert';
      }
    }
    else
    {
      $xdatos['typeinfo']='Error';
      $xdatos['msg']='Paciente no pudo ser ingresado!';
    }

  }
  else
  {
    $xdatos['typeinfo']='Error';
    $xdatos['msg']='Este paciente ya fue ingresado!';
  }
  echo json_encode($xdatos);

}

function agregar_doctor(){

  $nombre=$_POST["nombre"];
  $apellido=$_POST["apellido"];
  $especialidad=$_POST["especialidad"];
  $estado=1;
  $id_sucursal=$_SESSION["id_sucursal"];
  $sql_result=_query("SELECT id_doctor FROM doctor WHERE nombre='$nombre'and id_sucursal='$id_sucursal'");
  $numrows=_num_rows($sql_result);

  $table = 'doctor';
  $form_data = array (
    'nombre' => $nombre,
    'apellido' => $apellido,
    'especialidad' => $especialidad,
    'estado' => $estado,
    'id_sucursal'=>$id_sucursal
  );

  if($numrows == 0)
  {
    $insertar = _insert($table,$form_data);
    $id_doct=_insert_id();
    if($insertar)
    {
      $xdatos['typeinfo']='Success';
      $xdatos['msg']='Doctor ingresado correctamente!';
      $xdatos['id_doct']=  $id_doct;
      $xdatos['process']='insert';
    }
    else
    {
      $xdatos['typeinfo']='Error';
      $xdatos['msg']='Doctor no pudo ser ingresado!';
    }
  }
  else
  {
    $xdatos['typeinfo']='Error';
    $xdatos['msg']='Este doctor ya fue ingresado!';
  }
  echo json_encode($xdatos);
}
function agregarcliente1(){
  $nombre=$_POST["nombre"];
  $apellido=$_POST["apellido"];
  $sexo = $_POST["sexo"];
  $id_sucursal=$_SESSION["id_sucursal"];

  $sql_result=_query("SELECT id_cliente FROM cliente WHERE nombre='$nombre' and id_sucursal='$id_sucursal'");
  $numrows=_num_rows($sql_result);

  $table = 'cliente';
  $form_data = array (
    'nombre' => $nombre,
    'direccion' => $apellido,
    'sexo' => $sexo,
    'id_sucursal'=>$id_sucursal
  );

  if($numrows == 0)
  {
    $insertar = _insert($table,$form_data);
    echo _error();
    $id_cliente2=_insert_id();
    if($insertar)
    {
      $xdatos['typeinfo']='Success';
      $xdatos['msg']='cliente ingresado correctamente!';
      $xdatos['id_client2']=  $id_cliente2;
      $xdatos['process']='insert';

    }
    else
    {
      $xdatos['typeinfo']='Error';
      $xdatos['msg']='Cliente no pudo ser ingresado!';
    }

  }
  else
  {
    $xdatos['typeinfo']='Error';
    $xdatos['msg']='Este cliente ya fue ingresado!';
  }
  echo json_encode($xdatos);

}
function agregar_procedencia(){

  $nombre=$_POST["nombre"];
  $apellido=$_POST["descripcion"];
  $especialidad=$_POST["telefono"];
  $estado=1;
  $fecha_actual=date('y-m-d');
  $id_sucursal=$_SESSION["id_sucursal"];
  $sql_result=_query("SELECT id_procedencia FROM procedencia WHERE nombre='$nombre'and id_sucursal='$id_sucursal'");
  $numrows=_num_rows($sql_result);

  $table = 'procedencia';
  $form_data = array (
    'nombre' => $nombre,
    'direccion' => $apellido,
    'telefono' => $especialidad,
    'estado' => $estado,
    'fecha'=>$fecha_actual,
    'id_sucursal'=>$id_sucursal
  );

  if($numrows == 0)
  {
    $insertar = _insert($table,$form_data);
    $id_doct=_insert_id();
    if($insertar)
    {
      $xdatos['typeinfo']='Success';
      $xdatos['msg']='Procedencia ingresado correctamente!';
      $xdatos['id_doct']=  $id_doct;
      $xdatos['process']='insert';
    }
    else
    {
      $xdatos['typeinfo']='Error';
      $xdatos['msg']='Procedencia no pudo ser ingresado!';
    }
  }
  else
  {
    $xdatos['typeinfo']='Error';
    $xdatos['msg']='Este procedencia ya fue ingresado!';
  }
  echo json_encode($xdatos);
}
function cuenta()
{
  $id_banco = $_POST["id_banco"];
  $option = "";
  $sql_mun = _query("SELECT id_cuenta,concat(numero_cuenta,' ',nombre_cuenta) as cuenta  FROM cuenta_banco WHERE id_banco='$id_banco'");
  while($mun_dt=_fetch_array($sql_mun))
  {
    $option .= "<option value='".$mun_dt["id_cuenta"]."'>".$mun_dt["cuenta"]."</option>";
  }
  echo $option;
}
function tipoimpre()
{
  $id_cliente = $_POST["id_cliente"];
  $tip_impre = $_POST["tip_impre"];
  $id_sucursal=$_SESSION["id_sucursal"];
  if($tip_impre==1){
    $option = "";
    if($id_cliente==1){
      $sqlcli="SELECT * FROM tipo_impresion WHERE descripcion!='CREDITO FISCAL' and id_sucursal='$id_sucursal' ";
    }else {
      $sqlcli="SELECT * FROM tipo_impresion WHERE id_sucursal='$id_sucursal' ";
    }
    $sql_mun = _query($sqlcli);
    while($mun_dt=_fetch_array($sql_mun))
    {
      $option .= "<option value='".$mun_dt["abreviatura"]."'>".$mun_dt["descripcion"]."</option>";
    }
    echo $option;
  }
}
function tipopago()
{
  $id_cliente = $_POST["id_cliente"];
  $id_sucursal=$_SESSION["id_sucursal"];
  $option = "";
  $sqld = "SELECT remision FROM cliente where id_cliente='$id_cliente' and id_sucursal='$id_sucursal'";
  $resul=_query($sqld);
  $remisiones="";
  while($depto = _fetch_array($resul))
  {
    $remisiones=$depto["remision"];
  }

  if($remisiones==0){
    $sqlcli="SELECT * FROM tipo_pago WHERE descripcion!='REMISIONES' and id_sucursal='$id_sucursal' ";
  }else {
    $sqlcli="SELECT * FROM tipo_pago WHERE id_sucursal='$id_sucursal' ";
  }
  $sql_mun = _query($sqlcli);
  while($mun_dt=_fetch_array($sql_mun))
  {
    $option .= "<option value='".$mun_dt["abreviatura"]."'>".$mun_dt["descripcion"]."</option>";
  }
  echo $option;
}
function pin()
{
  $hash = $_POST["hash"];
  $sql = _query("SELECT id_descuento, porcentaje, aplicado FROM descuento WHERE hash='$hash'");
  if(_num_rows($sql)>0)
  {
    $datos = _fetch_array($sql);
    $xdatos["porcentaje"] = $datos["porcentaje"];
    $xdatos["aplicado"] = $datos["aplicado"];
    if(!$datos["aplicado"])
    {
      $xdatos["typeinfo"] = "Ok";
      $xdatos["id_descuento"] = $datos["id_descuento"];
    }
    else
    {
      $xdatos["typeinfo"] = "Ap";
    }
  }
  else
  {
    $xdatos["typeinfo"] = "No";
  }
  echo json_encode($xdatos);
}
function traer_insumos(){
  $id_microcirugia_pte=$_POST['id_microcirugia_pte'];
  $sql_ins="SELECT mp.id_producto,mp.tipo,p.descripcion,mp.cantidad,mp.precio
  FROM microcirugia_paciente_det AS mp, producto AS p
  WHERE mp.id_microcirugia_pte='$id_microcirugia_pte'
  AND p.id_producto=mp.id_producto
  AND mp.tipo='P'
  ";
  $res_ins=_query($sql_ins);
  $n=_num_rows($res_ins);
  $array_prod = array();
  for($i=0;$i<$n;$i++){
    $row=_fetch_array($res_ins);
    $array_prod[] = array(
    'id_producto' => $row['id_producto'],
    'tipo' => $row['tipo'],
    'desc' =>   $row['descripcion'],
    'cantidad' =>  $row['cantidad'],
      'precio' => $row['precio'],
    );
  }
  $sql_serv="SELECT mp.id_producto,mp.tipo,s.descripcion,mp.cantidad,mp.precio
  FROM microcirugia_paciente_det AS mp, servicio AS s
  WHERE mp.id_microcirugia_pte='$id_microcirugia_pte'
  AND s.id_servicio=mp.id_producto
  AND mp.tipo='S'";
  $res_serv=_query($sql_serv);
  $nr=_num_rows($res_ins);
  for($j=0;$j<$nr;$j++){
    $row1=_fetch_array($res_serv);
    $array_prod[] = array(
    'id_producto' => $row1['id_producto'],
    'tipo' => $row1['tipo'],
    'desc' =>   $row1['descripcion'],
    'cantidad' =>  $row1['cantidad'],
    'precio' => $row1['precio'],
    );
  }
  	echo json_encode($array_prod);
}
function cargar_datos_micro()
{
  $id_microcirugia_pte = $_REQUEST["id_microcirugia_pte"];
  $s="SELECT d.id_doctor,mc.id_microcirugia,mp.id_microcirugia_pte,p.id_paciente,
CONCAT(d.nombres,' ',d.apellidos) as nombredoc ,
mc.descripcion AS nombremicro,CONCAT(p.nombres,' ',p.apellidos) as nombrepte,
mp.honorarios_doctor,mp.costo_paciente,mp.paquete
FROM microcirugia_paciente AS mp, doctor AS d,
microcirugia AS mc, paciente AS p
WHERE d.id_doctor=mp.id_doctor
AND mp.id_paciente=p.id_paciente
AND mp.id_microcirugia=mc.id_microcirugia
AND mp.id_microcirugia_pte='$id_microcirugia_pte'";
  $sql = _query($s);
  if(_num_rows($sql)>0)
  {
    $xdatos["typeinfo"] = "Si";
    $datos = _fetch_array($sql);
    $xdatos["id_doctor"] = $datos["id_doctor"];
    $xdatos["nombredoc"] = $datos["nombredoc"];
    $xdatos["id_paciente"] = $datos["id_paciente"];
    $xdatos["nombrepte"] = $datos["nombrepte"];
    $xdatos["id_microcirugia_pte"] = $datos["id_microcirugia_pte"];
    $xdatos["id_microcirugia"] = $datos["id_microcirugia"];
    $xdatos["nombremicro"] = $datos["nombremicro"];
    $xdatos["honorarios_doctor"] = $datos["honorarios_doctor"];
    $xdatos["costo_paciente"] = $datos["costo_paciente"];
    $xdatos["paquete"] = $datos["paquete"];

  }
  else
  {
    $xdatos["typeinfo"] = "No";
  }
  echo json_encode($xdatos);
}
function getpresentacion(){
          $id_presentacion =$_REQUEST['id_presentacion'];
          $sql=_fetch_array(_query("SELECT * FROM presentacion_producto WHERE id_presentacion=$id_presentacion"));
          $precio=$sql['precio'];
          $unidad=$sql['unidad'];
          $descripcion=$sql['descripcion'];
          $des = "<input type='text' id='dsd2' class='form-control' value='".$descripcion."' readonly>";
          $xdatos['precio']=$precio;
          $xdatos['unidad']=$unidad;
          $xdatos['descripcion']=$descripcion;
          echo json_encode($xdatos);
}

//functions to load
if (!isset($_REQUEST['process'])) {
  initial();
}
//else {
if (isset($_REQUEST['process'])) {
  switch ($_REQUEST['process']) {
    case 'formEdit':
      initial();
      break;
      case 'insert':
      insertar();
      break;
      case 'insertar_venta':
      insertar_venta();
      break;
      case 'consultar_stock':
      consultar_stock();
      break;
      case 'cargar_empleados':
      cargar_empleados();
      break;
      case 'cuenta':
      cuenta();
      break;
      case 'pin':
      pin();
      break;
      case 'tipoimpre':
      tipoimpre();
      break;
      case 'tipopago':
      tipopago();
      break;
      case 'total_texto':
      total_texto();
      break;
      case 'imprimir_fact':
      imprimir_fact();
      break;
      case 'print2':
      print2(); //Generacion de los datos de factura que se retornan para otro script que imprime!!!
      break;
      case 'mostrar_numfact':
      mostrar_numfact();
      break;
      case 'reimprimir':
      reimprimir();
      break;
      case 'agregar_cliente':
      agregar_cliente();
      break;
      case 'agregar_cliente1':
      agregarcliente1();
      case 'agregar_doctor':
      agregar_doctor();
      break;
      case 'agregar_procedencia':
      agregar_procedencia();
      break;
      case 'traer_insumos':
      traer_insumos();
      break;
      case 'cargar_datos_micro':
      cargar_datos_micro();
      break;
      case 'getpresentacion':
      getpresentacion();
      break;
    }

  }
  ?>
