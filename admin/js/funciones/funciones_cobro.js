var urlprocess = '';

$(document).ready(function() {

  
  $("#paciente_replace").hide();

  $('#num_doc_fact').numeric({
    negative: false,
    decimal: false
  });
  var process = $("#process").val();
  if(process=="adm")
  {
    generar();
  }
  else
  {
    $('html,body').animate({
      scrollTop: $(".focuss").offset().top
    }, 1500);
  }
  $(".select").select2({
    placeholder: {
      id: '',
      text: 'Seleccione',
    },
    allowClear: true,
  });
  $("#producto_buscar").typeahead({
    source: function(query, process) {
      $.ajax({
        type: 'POST',
        url: 'http://labangel.apps-oss.com/api/consultar_examenes.php',
        crossDomain: true,
        data: 'query=' + query + '&process=aut',
        dataType: 'JSON',
        async: true,
        success: function(data) {
          process(data);
        }
      });
    },
    updater: function(selection) {
      var prod0 = selection;
      var prod = prod0.split("|");
      var id_prod = prod[0];
      var descrip = prod[1];
      var tipo = prod[2];
      if (id_prod != 0) {
        addProductList(id_prod, tipo, descrip);
        $('input#producto_buscar').val("");
        // $('.sel').focus().select2("open");

      } else {
        $('input#producto_buscar').focus();
        $('input#producto_buscar').val("");
      }
      // agregar_producto_lista(id_prod, descrip, isbarcode);
    }
  });
  $("#paciente").typeahead({
    source: function(query, process) {
      $.ajax({
        type: 'POST',
        url: 'autocomplete_paciente.php',
        data: 'query=' + query,
        dataType: 'JSON',
        async: true,
        success: function(data) {
          process(data);
          //var name_paciente = $("#paciente").val();
          //$("#id_cliente").val(name_paciente);
        }
      });
    },
    updater: function(selection) {
      var prod0 = selection;
      var prod = prod0.split("|");
      var id_p = prod[0];
      var nombre = prod[1];
      //alert("SELECT: "+sexo);
      $('#paciente_replace').val(nombre);
      $('#pacientee').val(id_p);
      $('#paciente_replace').show();
      $('#paciente').hide();
      $("#producto_buscar").focus();
      // agregar_producto_lista(id_prod, descrip, isbarcode);
    }
  });
  var urlprocess = $('#urlprocess').val();

  $("#doctor").select2({
    allowClear: true,
    escapeMarkup: function(markup) {
      return markup;
    },
    placeholder: "Buscar Doctor",
    language: {
      noResults: function() {
        var modalDoctor = "<a class='xa' href='DoctorModal.php' data-toggle='modal' data-target='#doctorModal'>";
        modalDoctor += "Agregar Doctor</a>";
        return modalDoctor;
        $('#doctor').select2('close');
      }
    }
  });
  $("#id_procedencia").select2({
    allowClear: true,
    escapeMarkup: function(markup) {
      return markup;
    },
    placeholder: "Buscar Procedencia",
    language: {
      noResults: function() {
        var modalDoctor = "<a class='xp' href='ProcedenciaModal.php' data-toggle='modal' data-target='#procedenciaModal'>";
        modalDoctor += "Agregar Procedencia</a>";
        return modalDoctor;
        $('#id_procedencia').select2('close');
      }
    }
  });
  $(document).keydown(function(e) {
    if (e.which == 113) { //F2 Guardar
      e.stopPropagation();
      senddata();
    }
    if (e.which == 115) { //F2 Guardar
      e.stopPropagation();
      location.replace('dashboard.php');
    }
    if (e.which == 119) { //F8 Imprimir
      //$('#busca_descrip_activo').prop("checked", false);
      //activar_busqueda()
      //PENDIENTE
    }
    if (e.which == 120) { //F9 Salir
      //PENDIENTE
    }
  });
});

$(document).on("focus", "#paciente_replace", function() {
  $(this).val("");
  $(this).hide();
  $("#paciente").show();
  $("#paciente").focus();
});

//function to round 2 decimal places
function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}
$(function() {
  //binding event click for button in modal form
  $(document).on("click", "#btnDelete", function(event) {
    deleted();
  });
  // Clean the modal form
  $(document).on('hidden.bs.modal', function(e) {
    var target = $(e.target);
    target.removeData('bs.modal').find(".modal-content").html('');
  });

});


// Evento que selecciona la fila y la elimina de la tabla
$(document).on("click", ".Delete", function() {
  var tr = $(this).parents("tr");
  var tipo = tr.hasClass("P");
  var idp = tr.find("#id_prod").val();
  if (tipo) {
    $(".P" + idp).remove();
  }
  tr.remove();
  totales();
});


$(document).on("keyup", "#precio_venta", function() {
  var tr = $(this).parents("tr");
  if ($(this).val() != "") {
    actualiza_subtotal(tr);
  }
});

function actualiza_subtotal(tr) {
  var iva = parseFloat($('#porc_iva').val());
  //var precio_sin_iva = parseFloat(tr.find('#precio_sin_iva').val());
  var tipo_impresion = $('#tipo_impresion').val();
  if (tipo_impresion != 'CCF') {
    var cantidad = tr.find('#cant').val();
    if (isNaN(cantidad) || cantidad == "") {
      cantidad = 0;
    }
    var precio = tr.find("#precio_venta").val();
    if (precio != "") {
      precio = parseFloat(precio);
    } else {
      precio = 0;
    }
    if (isNaN(precio) || precio == "") {
      precio = 0;
    }
    var subtotal = subt(cantidad, precio);
    var subt_mostrar = round(subtotal, 2);
    tr.find("#subtotal_fin").val(subt_mostrar);
    tr.find("#subtotal_mostrar").val(subt_mostrar);

    //console.log("hola"+subt_mostrar+" can"+cantidad+"pre"+precio);
    totales();
  }

}

function totales() {
  //impuestos
  var porcentaje_descuento = parseFloat($("#porcentaje_descuento").val());


  var urlprocess = $('#urlprocess').val();

  var i = 0,
    total = 0;

  totalcantidad = 0;
  var subtotal = 0;
  var subt_cant = 0;
  var total_descto = 0;
  var subt_descto = 0;
  var total_final = 0;
  var StringDatos = '';
  var filas = 0;
  var items2 = 0;
  var total_iva = 0;

  $("#inventable tr").each(function() {
    if (!$(this).hasClass("EP")) {
      subt_cant = $(this).find("#cant").val();
      totalcantidad += parseInt(subt_cant);
      subtotal += parseFloat($(this).find("#subtotal_fin").val());
      filas += 1;
    }
  });
  items2 = $("#idco").val();
  subtotal = round(subtotal, 4);
  //descuento
  var total_descuento = 0;
  if (porcentaje_descuento > 0.0) {
    total_descuento = (porcentaje_descuento / 100) * subtotal
  } else {
    total_descuento = 0;
  }
  var total_descuento_mostrar = round(total_descuento, 2);
  var total_mostrar = (subtotal - total_descuento).toFixed(2);
  totcant_mostrar = round(totalcantidad, 2).toFixed(2);
  $('#totcant').text(totcant_mostrar);

  $('#total_gravado').html(total_mostrar);
  $('#subtotal').html(subtotal.toFixed(2));
  $('#pordescuento').html(porcentaje_descuento);
  $('#valdescuento').html(total_descuento.toFixed(2));

  $('#totcant').html(totcant_mostrar);
  $('#items').val(items2);
  $('#totaltexto').load(urlprocess, {
    'process': 'total_texto',
    'total': total_mostrar
  });
  $('#monto_pago').html(total_mostrar);

  $('#totalfactura').val(total_mostrar);


}

function totalFact() {
  var TableData = new Array();
  var i = 0;
  var total = 0;
  var StringDatos = '';
  $("#inventable>tbody  tr").each(function(index) {
    if (index >= 0) {
      var subtotal = 0;
      $(this).children("td").each(function(index2) {
        switch (index2) {
          case 7:
            var isVisible = false
            isVisible = $(this).filter(":visible").length > 0;
            if (isVisible == true) {
              subtotal = parseFloat($(this).text());
              if (isNaN(subtotal)) {
                subtotal = 0;
              }
            } else {
              subtotal = 0;
            }
            break;
        }
      });
      total += subtotal;
    }
  });
  total = round(total, 2);
  total_dinero = total.toFixed(2);
  $('#total_dinero').html("<strong>" + total_dinero + "</strong>");
  $('#totaltexto').load('cobros.php?' + 'process=total_texto&total=' + total_dinero);
  //console.log('total:' + total_dinero);
}
// actualize table data to server
$(document).on("click", "#submit1", function() {
  senddata();
});
$(document).on("click", "#btnEsc", function(event) {
  reload1();
});

function senddata() {
  //Obtener los valores a guardar de cada item facturado
  var procces = $("#process").val();
  var i = 0;
  var StringDatos = "";
  var id = '1';
  var id_empleado = 0;
  var id_procedencia = $("#id_procedencia").val();
  var items = $("#items").val();

  var msg = "";
  error = false;

  var total_percepcion = $('#total_percepcion').text();
  var id_factura = $('#id_factura').val();
  var id_microcirugia = $('#id_microcirugia').val();
  var id_doctor_m = $('#id_doctor_m').val();
  var subtotal_fin = $('#subtotal').text(); /*total gravado mas iva subtotal*/
  var suma_gravada = $('#total_gravado_sin_iva').text(); /*total sumas sin iva*/
  var sumas = $('#total_gravado').text(); /*total sumas sin iva + exentos*/
  var iva = $('#total_iva').text(); /*porcentaje de iva de la factura*/
  var total = $('#totalfactura').val();
  var doctor = $("#doctor").val();
  var variosE = $("#cuanto").val();
  var id = $("#id").val();
  var examenes = "0";
  var id_vendedor = $("#vendedor").val();
  var id_apertura = $('#id_apertura').val();
  //var total_doctor = $('#total_doctor').val();
  var turno = $('#turno').val();
  var caja = $('#caja').val();
  var id_descuento = $('#id_descuento').val();
  var porcentaje_descuento = $('#porcentaje_descuento').val();
  var tipo_impresion = $('#tipo_impresion').val();
  var pacientee = $("#pacientee").val();
  var paciente = $("#paciente").val();

  var fecha_movimiento = $("#fecha").val();
  var id_prod = 0;

  if (fecha_movimiento == '' || fecha_movimiento == undefined) {
      var typeinfo = 'Warning';
      msg = 'Seleccione una Fecha!';
      display_notify(typeinfo, msg);
  }
  var verificaempleado = 'noverificar';
  var verifica = [];
  var tot_ex = 0;
  var array_json = new Array();
  var examenesa = new Array();
  var id_paciente = "";
  total_dr = 0;
  total_hos = 0;
  total_lab = 0;
  $("#inventable tr").each(function(index) {
    var id_detalle = $(this).attr("id_detalle");
    if (id_detalle == undefined) {
      id_detalle = "";
    }
    tipo = "";

    var id_exa = $(this).find("#id_prod").val();
    var id = $(this).attr("id");
    id_paciente = ""; //$('.sel').val();
    var n_precio = parseFloat($(this).find("#precio_venta").val());
    var precio_venta = parseFloat($(this).find("#precio_venta").text());
    var cantidad = $(this).find("#cant").val();
    var unidades = $(this).find("#unidades").val();
    var descripcion = $(this).find("#desc").text();
    var subtotal = $(this).find("#subtotal_fin").val();
    var cortesia = $(this).find('#cortesia').val();
    if ($(this).hasClass('exlab')) {
      tipo = "E";
      $("#examenes").val("1");
      examenes = "1";
      total_lab += precio_venta;
    }
    if ($(this).hasClass('micdet')) {
      tipo = "M";
      total_hos += precio_venta;
    }
    if ($(this).hasClass('micdets')) {
      tipo = "S";
      total_hos += precio_venta;
    }
    if ($(this).hasClass('micdetp')) {
      tipo = "P";
      total_hos += precio_venta;
    }
    if ($(this).hasClass('drcons')) {
      tipo = "D";
      total_dr += precio_venta;
    }
    if (cantidad && precio_venta) {
      var obj = new Object();
      obj.id_detalle = id_detalle;
      obj.id = id;
      obj.descripcion = descripcion;
      obj.precio = precio_venta;
      obj.nprecio = n_precio;
      obj.cantidad = cantidad;
      obj.varios = variosE;
      obj.corte = cortesia;
      obj.unidades = unidades;
      obj.subtotal = subtotal;
      obj.tipo = tipo;
      //convert object to json string
      text = JSON.stringify(obj);
      array_json.push(text);
      i = i + 1;
    } else {
      error = true
    }
    if (examenes == "1") {
      var exaa = new Object();
      exaa.id_detalle = id_detalle;
      exaa.id = id;
      exaa.descripcion = descripcion;
      exaa.precio = precio_venta;
      exaa.nprecio = n_precio;
      exaa.cantidad = cantidad;
      exaa.varios = variosE;
      exaa.corte = cortesia;
      exaa.unidades = unidades;
      exaa.subtotal = subtotal;
      exaa.tipo = tipo;
      tot_ex += subtotal;
      //convert object to json string
      texta = JSON.stringify(exaa);
      examenesa.push(texta);
    }
  });
  json_arr = '[' + array_json + ']';
  examenes_arr = '[' + examenesa + ']';

  if (i == 0) {
    error = true
  }

  var dataString = 'process=insert' + '&cuantos=' + i + '&fecha_movimiento=' + fecha_movimiento;
  dataString += '&total=' + total;
  dataString += '&total_dr=' + total_dr;
  dataString += '&total_hos=' + total_hos;
  dataString += '&total_lab=' + total_lab;
  dataString += '&json_arr=' + json_arr;
  dataString += '&iva=' + iva;
  dataString += '&items=' + items;
  dataString += '&subtotal=' + subtotal_fin;
  dataString += '&sumas=' + sumas;
  dataString += '&suma_gravada=' + suma_gravada;
  dataString += '&tipo_impresion=' + tipo_impresion;
  dataString += '&id_factura=' + id_factura;
  dataString += '&id_microcirugia=' + id_microcirugia;
  dataString += '&id_apertura=' + id_apertura;
  dataString += '&id_doctor_m=' + id_doctor_m;
//  dataString += '&total_doctor=' + total_doctor;
  dataString += '&procedencia=' + id_procedencia;
  dataString += '&turno=' + turno;
  dataString += '&caja=' + caja;
  dataString += '&porcentaje_descuento=' + porcentaje_descuento;
  dataString += '&pacientee=' + pacientee;
  dataString += '&paciente=' + paciente;
  dataString += '&doctor=' + doctor;
  dataString += '&id_descuento=' + id_descuento;

  var sel_vendedor = 1;



  if (pacientee == "" && (paciente == "")) {
    //  console.log(verificar_edad_fecha);
    $("#paciente").focus();
    msg = 'Por favor seleccione un paciente!';
    sel_vendedor = 0;
  }


  /*if (id_paciente == "") {
  	msg = 'No hay un Paciente Seleccionado!';
  	sel_vendedor = 0;
  }*/

  if (i == 0) {
    msg = 'Agrege al menos un item al detalle !';
    sel_vendedor = 0;
  }

  if (sel_vendedor == 1) {
    $("#inventable tr").remove();
    $.ajax({
      type: 'POST',
      url: urlprocess,
      data: dataString,
      dataType: 'json',
      success: function(datax) {
        if (datax.typeinfo == "Success") {
          if (examenes == "1") {
            var dataString1 = 'process=insert';
            dataString1 += '&procedencia=' + id_procedencia;
            dataString1 += '&doctor=' + doctor;
            dataString1 += '&nombre=' + datax.nombre;
            dataString1 += '&apellido=' + datax.apellido;
            dataString1 += '&sexo=' + datax.sexo;
            dataString1 += '&fecha_nacimiento=' + datax.fecha_nacimiento;
            dataString1 += '&telefono=' + datax.telefono;
            dataString1 += '&examenes_arr=' + examenes_arr;
            dataString1 += '&subtotal=' + tot_ex;
            $.ajax({
              type: 'POST',
              url: 'http://labs.apps-oss.com/autocomplete_union.php',
              crossDomain: true,
              data: dataString1,
              dataType: 'JSON',
              success: function(datax2) {

              }
            });

          }
          $(".usage").attr("disabled", true);
          if (tipo_impresion == "CCF" || tipo_impresion == "FAC") {
            if (tipo_impresion == "CCF") {
                $("#nitcli").attr('readOnly', false);
                $("#nrccli").attr('readOnly', false);
                $("#gircli").attr('readOnly', false);
                $("#gircli").val(datax.giro);
                $("#nrccli").val(datax.ncr);
                $("#nitcli").val(datax.nit);

            }
            $("#nomcli").attr('readOnly', false);
            $("#nomcli").val(datax.cliente);
            $("#dircli").attr('readOnly', false);
            $("#dircli").val(datax.direccion);
            $("#numdoc").attr('readOnly', false);
            $("#numdoc").focus();
          } else {
              $('#numdoc').val(datax.ultimo);
              $("#efectivov").focus();
          }
          $("#tot_fdo").val(total);
          $('#id_factura').val(datax.id_factura);
          ultimo = parseInt(datax.ultimo);
          if (ultimo != 0) {
            $('#num_doc_fact').val(ultimo);
          }
          $('#corr_in').val(datax.numdoc);
        } else {
          display_notify(datax.typeinfo, datax.msg);
        }
      }
    });
  } else {
    display_notify('Warning', msg);
  }
}

$(document).on("keyup", "#efectivo", function() {
  total_efectivo();
});

$(document).on("click", "#btnAnular", function(event) {
  anular();
});
$(document).on("click", "#seacr", function(event) {
  generar();
});
$(document).on("click", "#btnBorrar", function(event) {
  Borrar();
});
$(document).on('hidden.bs.modal', function(e) {
  var target = $(e.target);
  target.removeData('bs.modal').find(".modal-content").html('');
});

$(document).on("keyup", "#efectivov", function(evt) {
  if (evt.keyCode != 13) {
    total_efectivov();
  } else {
    if (parseFloat($("#cambiov").val()) >= 0) {
      display_notify("Success", "Factura realizada con exito!");
      imprimev();
      //setInterval("reload1();", 500);
    } else {
      display_notify("Warning", "Ingrese un valor mayor o igual al total facturado");
    }
  }
});

$(document).on("keyup", "#numdoc", function(evt) {
  if (evt.keyCode == 13) {
    if ($(this).val() != "") {
      $("#nomcli").focus();
    } else {
      display_notify('Warning', 'Ingrese el numero del documento a imprimir');
    }
  }
});
$(document).on("keyup", "#nomcli", function(evt) {
  if (evt.keyCode == 13) {
    if ($(this).val() != "") {
      $("#dircli").focus();
    } else {
      display_notify('Warning', 'Ingrese el nombre del cliente');
    }
  }
});
$(document).on("keyup", "#dircli", function(evt) {
  if (evt.keyCode == 13) {
    if ($(this).val() != "") {
      if ($("#tipo_impresion").val() == 'CCF') {
        $("#nitcli").focus();
      } else {
        $("#efectivov").focus();
      }
    } else {
      display_notify('Warning', 'Ingrese la direccion del cliente');
    }
  }
});
$(document).on("keyup", "#nitcli", function(evt) {
  if (evt.keyCode == 13) {
    if ($(this).val() != "") {
      $("#nrccli").focus();
    } else {
      display_notify('Warning', 'Ingrese el numero de NIT del cliente');
    }
  }
});
$(document).on("keyup", "#nrccli", function(evt) {
  if (evt.keyCode == 13) {
    if ($(this).val() != "") {
      $("#gircli").focus();
    } else {
      display_notify('Warning', 'Ingrese el numero de registro del cliente');
    }
  }
});
$(document).on("keyup", "#gircli", function(evt) {
  if (evt.keyCode == 13) {
    if ($(this).val() != "") {
      $("#efectivov").focus();
    } else {
      display_notify('Warning', 'Ingrese el giro del cliente');
    }
  }
});

function total_efectivov() {
  var efectivo = parseFloat($('#efectivov').val());
  var totalfinal = parseFloat($('#tot_fdo').val());
  var facturado = totalfinal.toFixed(2);
  $('#facturadov').val(facturado);
  if (isNaN(parseFloat(efectivo))) {
    efectivo = 0;
  }
  if (isNaN(parseFloat(totalfinal))) {
    totalfinal = 0;
  }
  var cambio = efectivo - totalfinal;
  var cambio = round(cambio, 2);
  var cambio_mostrar = cambio.toFixed(2);
  $('#cambiov').val(cambio_mostrar);
}

function imprimev() {
  var examenes = $("#examenes").val();
  var numero_doc = $("#numdoc").val();
  var print = 'imprimir_fact';
  var tipo_impresion = $("#tipo_impresion").val();
  var monto = $("#tot_fdo").val();
  var id_apertura = $('#id_apertura').val();
  var turno = $('#turno').val();
  var caja = $('#caja').val();
  var id_factura = $("#id_factura").val();
  if (tipo_impresion == "TIK" || tipo_impresion == "COB") {
    numero_factura_consumidor = '';
  } else {
    var numero_factura_consumidor = $("#numdoc").val();
  }
  var dataString = 'process=' + print + '&monto=' + monto + '&turno=' + turno + '&id_apertura=' + id_apertura + '&numero_doc=' + numero_doc + '&tipo_impresion=' + tipo_impresion + '&id_factura=' + id_factura + '&numero_factura_consumidor=' + numero_factura_consumidor;

  if (tipo_impresion == "CCF" || tipo_impresion == "FAC") {
    nit = $('#nitcli').val();
    nrc = $('#nrccli').val();
    nombreape = $('#nomcli').val();
    dataString += '&nit=' + nit + '&nrc=' + nrc + '&nombreape=' + nombreape;
  }

  $.ajax({
    type: 'POST',
    url: urlprocess,
    data: dataString,
    dataType: 'json',
    success: function(datos) {
      var sist_ope = datos.sist_ope;
      var dir_print = datos.dir_print;
      var shared_printer_win = datos.shared_printer_win;
      var shared_printer_pos = datos.shared_printer_pos;
      var headers = datos.headers;
      var footers = datos.footers;
      var efectivo_fin = parseFloat($('#efectivov').val());
      var cambio_fin = parseFloat($('#cambiov').val());

      //esta opcion es para generar recibo en  printer local y validar si es win o linux
      if (tipo_impresion == 'FAC') {
        if (sist_ope == 'win') {
          $.post("http://" + dir_print + "printfactwin1.php", {
            datosventa: datos.facturar,
            efectivo: efectivo_fin,
            cambio: cambio_fin,
            shared_printer_win: shared_printer_win
          })
        } else {
          $.post("http://" + dir_print + "printfact1_lab.php", {
            datosventa: datos.facturar,
            efectivo: efectivo_fin,
            cambio: cambio_fin
          }, function(data, status) {

            if (status != 'success') {
              //alert("No Se envio la impresión " + data);
            }
          });
        }
      }
      if (tipo_impresion == 'ENV') {
        if (sist_ope == 'win') {
          $.post("http://" + dir_print + "printenvwin1.php", {
            datosventa: datos.facturar,
            efectivo: efectivo_fin,
            cambio: cambio_fin,
            shared_printer_win: shared_printer_win
          })
        } else {
          $.post("http://" + dir_print + "printenv1.php", {
            datosventa: datos.facturar,
            efectivo: efectivo_fin,
            cambio: cambio_fin
          }, function(data, status) {

            if (status != 'success') {
              //alert("No Se envio la impresión " + data);
            }

          });
        }
      }
      if (tipo_impresion == 'TIK' || tipo_impresion == 'COB') {
        if (sist_ope == 'win') {
          $.post("http://" + dir_print + "printposwin1.php", {
            datosventa: datos.facturar,
            efectivo: efectivo_fin,
            cambio: cambio_fin,
            shared_printer_pos: shared_printer_pos,
            headers: headers,
            footers: footers,
          })
        } else {
          $.post("http://" + dir_print + "printpos1.php", {
            datosventa: datos.facturar,
            efectivo: efectivo_fin,
            cambio: cambio_fin,
            headers: headers,
            footers: footers,
          }, function(data, status) {
            if (examenes == "1") {
              $.post("http://" + dir_print + "printpos1.php", {
                datosventa: datos.boleta,
                efectivo: efectivo_fin,
                cambio: cambio_fin,
                headers: headers,
                footers: footers,
              }, function(data, status) {

              });
            }
          });
        }
      }
      if (tipo_impresion == 'CCF') {
        if (sist_ope == 'win') {
          $.post("http://" + dir_print + "printcfwin1.php", {
            datosventa: datos.facturar,
            efectivo: efectivo_fin,
            cambio: cambio_fin,
            shared_printer_win: shared_printer_win
          })
        } else {
          $.post("http://" + dir_print + "printcf1_lab.php", {
            datosventa: datos.facturar,
            efectivo: efectivo_fin,
            cambio: cambio_fin
          }, function(data, status) {

            if (status != 'success') {
              //alert("No Se envio la impresión " + data);
            }

          });
        }
      }
      setInterval("reload1();", 900);

    }
  });
}


function reload1() {
  location.href = 'cobros.php';
}

function addProductList(id_prod, tipo, descr) {
  $('#inventable').find('tr#filainicial').remove();
  id_prod = $.trim(id_prod);
  id_factura = parseInt($('#id_factura').val());

  if (isNaN(id_factura)) {
    id_factura = 0;
  }
  //	var fila=1;
  urlprocess = $('#urlprocess').val();
  var dataString = 'process=consultar_stock' + '&id_producto=' + id_prod + '&tipo=' + tipo;
  $.ajax({
    type: "POST",
    url: "http://labs.apps-oss.com/autocomplete_union.php",
    crossDomain: true,
    data: dataString,
    dataType: 'json',
    success: function(data) {
      var id_previo = new Array();
      if (tipo == "P") {
        var precio_p = data.precio_p;
        var cortesia_p = data.cortesia_p;
        tr_add = '';
        var fila = 1;
        var filas = 1;
        $("#inventable  tr").each(function(index) {
          if (index >= 0) {
            var campo0 = "";
            $(this).children("td").each(function(index2) {
              switch (index2) {
                case 0:
                  campo0 = $(this).text();
                  if (campo0 != undefined || campo0 != '') {
                    id_previo.push(campo0);
                  }
                  break;
              }
            });
            if (campo0 != "") {
              filas = filas + 1;
            }
          } //if index>0
        });
        tr_add += "<tr class='row100 head " + tipo + "' id='" + id_prod + "'>";
        tr_add += "<td class='cell100 column20 text-success id_pps'>" + filas + "<input type='hidden'  class='txt_box decimal2  cant' id='cant' name='cant' value='1' style='width:50px;'readOnly></td>";
        tr_add += "<td class='cell100 column50 text-success descp' id='desc'>" + descr + "<input type='hidden'  class='form-control ' readOnly id='id_prod' name='id_prod' value='" + id_prod + "'></td>";
        tr_add += "<td class='cell100 column13 text-success' id='precio_venta'><input type='hidden'  class='form-control decimal' id='precio_venta' name='precio_venta' value='" + precio_p + "'>" + precio_p + "</td>";
        tr_add += "<td class='cell100 column9 text-success'>" + "<input type='hidden'  id='cortesia' name='cortesia' value='0'>" + "<input type='hidden'  id='idco' name='idco' value='" + filas + "'>" + cortesia_p + "</td>";
        tr_add += "<td class='ccell100 column7'><input type='hidden'  id='subtotal_fin' name='subtotal_fin' value='" + precio_p + "'>" + "<input type='hidden'  class='decimal txt_box' id='subtotal_mostrar' name='subtotal_mostrar'  value='" + precio_p + "'style='width:55px;'readOnly></td>";
        tr_add += '<td class="cell100 column8 text-center"><input id="delprod" type="button" class="btn btn-danger fa Delete"  value="&#xf1f8;"></td>';
        tr_add += '</tr>';
        if (!id_existente(id_prod, tipo)) {
          $("#inventable").append(tr_add);

        }
      }
      var descripcionps = data.descripcionp;
      var cortesias = data.cortesia;
      var select2s = data.select2;
      var cuantos = data.cuantos;
      var id_prods = data.id_prods;
      var descrip = descripcionps.split("|");
      var cortes = cortesias.split("|");
      var selec = select2s.split("|");
      var idp = id_prods.split("|");
      for (jk = 0; jk < cuantos; jk++) {
        tr_add = '';
        var fila = 1;
        var filas = 1;
        var descripcionp = descrip[jk];
        var cortesia = cortes[jk];
        var select2 = selec[jk];
        var id_prodd = idp[jk];
        if (tipo == "E") {
          $("#inventable  tr").each(function(index) {
            if (index >= 0) {
              var campo0 = "";
              $(this).children("td").each(function(index2) {
                switch (index2) {
                  case 0:
                    campo0 = $(this).text();
                    if (campo0 != undefined || campo0 != '') {
                      id_previo.push(campo0);
                    }
                    break;
                }
              });
              if (campo0 != "") {
                filas = filas + 1;
              }
            } //if index>0
          });
        }
        var pert = "";
        if (tipo == "P") {
          pert = "EP P" + id_prod;
          filas = "";
        }
        tr_add += "<tr class='row100 head exlab E " + pert + "' id='" + id_prodd + "'>";
        tr_add += "<td class='cell100 column20 text-success id_pps'>1<input type='hidden'  class='txt_box' id='cuanto' name='cuanto' value='" + cuantos + "'><input type='hidden'  class='txt_box decimal2 ' cant' id='cant' name='cant' value='1' style='width:50px;'readOnly></td>";
        tr_add += "<td class='cell100 column50 text-success descp' id='desc'>" + descripcionp + "<input type='hidden'  class='form-control ' readOnly id='id_prod' name='id_prod' value='" + id_prodd + "'></td>";
        tr_add += "<td class='cell100 column13 text-success' id='precio_venta'><input type='hidden'  class='form-control decimal' id='precio_venta' name='precio_venta' value='" + select2 + "'>" + select2 + "</td>";
        tr_add += "<td class='cell100 column9 text-success'>" + "<input type='hidden'  id='cortesia' name='cortesia' vatr_addlue='0'>" + "<input type='hidden'  id='idco' name='idco' value='" + filas + "'>" + cortesia + "</td>";
        tr_add += "<td class='ccell100 column7'><input type='hidden'  id='subtotal_fin' name='subtotal_fin' value='" + selec + "'>" + "<input type='hidden'  class='decimal txt_box' id='subtotal_mostrar' name='subtotal_mostrar'  value='" + selec + "'style='width:55px;'readOnly></td>";
        if (tipo == "E") {
          tr_add += '<td class="cell100 column8 text-center"><input id="delprod" type="button" class="btn btn-danger fa Delete"  value="&#xf1f8;"></td>';
        } else {
          tr_add += '<td class="cell100 column8"></td>';
        }
        tr_add += '</tr>';
        if (!id_existente(id_prodd, 'E')) {
          $("#inventable").prepend(tr_add);
        }
        if (tipo == "E") {
          filas++;
        }
      }
      scrolltable();
      totales();

    }
  });

}

$(document).on("click", "#btnAddDoctor", function(event) {
  $(document).ready(function() {
    $('#formulario').validate({
      rules: {
        nombre: {
          required: true,
        },
        apellido: {
          required: true,
        },
        especialidad: {
          required: true,
        },
      },
      messages: {
        nombre: "Por favor ingrese el nombre del doctor",
        apellido: "Por favor ingrese el apellido del doctor",
        especialidad: "Por favor ingrese la especialidad del doctor"
      },
      highlight: function(element) {
        $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
      },
      success: function(element) {
        $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
      },
      submitHandler: function(form) {
        agregardoctor();

      }
    });

  });
});
$(document).on("click", "#btnAddProcedencia", function(event) {
  $(document).ready(function() {
    $('#formulario').validate({
      rules: {
        nombre: {
          required: true,
        },
      },
      messages: {
        nombre: "Por favor ingrese el nombre del Procedencia",
      },
      highlight: function(element) {
        $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
      },
      success: function(element) {
        $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
      },
      submitHandler: function(form) {
        agregar_procedencia();

      }
    });

  });
});

function agregardoctor() {
  urlprocess = $('#urlprocess').val();
  var nombress = $(".modal-body #nombre").val();
  var apellidos = $(".modal-body #apellido").val();
  var especialidad = $(".modal-body #especialidad").val();
  var dataString = 'process=agregar_doctor' + '&nombre=' + nombress + '&apellido=' + apellidos;
  dataString += '&especialidad=' + especialidad;
  $.ajax({
    type: "POST",
    url: urlprocess,
    data: dataString,
    dataType: 'json',
    success: function(datax) {
      var process = datax.process;
      var id_doctor = datax.id_doct;
      //var nombreape = nombress + " " + apellidoss;
      $("#doctor").append("<option value='" + id_doctor + "' selected>" + nombress + " " + apellidos + "</option>");
      $("#doctor").trigger('change');
      $('.sel2').select2('open');


      //Cerrar Modal
      $('#doctorModal').modal('hide');
      //Agregar NRC y NIT al form de Credito Fiscal
      display_notify(datax.typeinfo, datax.msg);
      $(document).on('hidden.bs.modal', function(e) {
        var target = $(e.target);
        target.removeData('bs.modal').find(".modal-content").html('');
      });
    }
  });
}

function agregar_procedencia() {
  urlprocess = $('#urlprocess').val();
  var nombress = $(".modal-body #nombre").val();
  var apellidos = $(".modal-body #descripcion").val();
  var especialidad = $(".modal-body #telefono").val();
  var dataString = 'process=agregar_procedencia' + '&nombre=' + nombress + '&descripcion=' + apellidos;
  dataString += '&telefono=' + especialidad;
  $.ajax({
    type: "POST",
    url: urlprocess,
    data: dataString,
    dataType: 'json',
    success: function(datax) {
      var process = datax.process;
      var id_doctor = datax.id_doct;
      //var nombreape = nombress + " " + apellidoss;
      $("#id_procedencia").append("<option value='" + id_doctor + "' selected>" + nombress + "</option>");
      $("#id_procedencia").trigger('change');

      //Cerrar Modal
      $('#procedenciaModal').modal('hide');
      //Agregar NRC y NIT al form de Credito Fiscal
      display_notify(datax.typeinfo, datax.msg);
      $(document).on('hidden.bs.modal', function(e) {
        var target = $(e.target);
        target.removeData('bs.modal').find(".modal-content").html('');
      });
    }
  });
}

function id_existente(id, tipoa) {
  var dato = false;
  $("#inventable tr").each(function() {
    var tipo = $(this).hasClass(tipoa);
    var id1 = $(this).attr("id");
    //  var id2 = $(this).find("#desc2").val();
    if (id == id1 && tipo) {
      dato = true;
      //var a = parseInt($(this).find(".cantidad").val());
      //a=a+1;
      //$(this).find(".cantidad").val(a);
    }
    //console.log(id);
    console.log(id1);
    //console.log(tipo);
    //console.log(tipoa);
  });
  return dato;

}
/*$(document).on('select2:close', '.sel2', function(event) {
var a = $(this).closest('tr');
precio=parseFloat($(this).val());
a.find('#precio_venta').val(precio);
a.find("#precio_sin_iva").val(precio);
actualiza_subtotal(a);
});*/
$("#descto").keyup(function(event) {
  if (event.keyCode == 13) {
    if ($(this).val() != "") {
      aplicar_descuento($(this).val());
    }
  }
});
$(document).on('change', '.cort', function() {
  if ($(this).is(':checked')) {
    $(this).parents("tr").find("#idco").each(function() {
      var tr = $(this).parents("tr");
      precio = 0;
      tr.find("#precio_venta").val(precio);
      tr.find("#cortesia").val(1);
      tr.find("#precio_sin_iva").val(precio);
      actualiza_subtotal(tr);
    });
  } else {
    $(this).parents("tr").find("#idco").each(function() {
      var tr = $(this).parents("tr");
      precio = parseFloat(tr.find("#precio_venta").text());
      tr.find("#precio_venta").val(precio);
      tr.find("#cortesia").val(0);
      tr.find("#precio_sin_iva").val(precio);
      actualiza_subtotal(tr);
    });
  }
});

function aplicar_descuento(hash) {
  $("#id_descuento").val("");
  $("#porcentaje_descuento").val("0");
  $.ajax({
    type: 'POST',
    url: 'cobros.php',
    data: 'process=pin&hash=' + hash,
    dataType: 'JSON',
    success: function(datax) {
      $("#descto").val("");
      if (datax.typeinfo == "Ok") {
        $("#porcentaje_descuento").val(datax.porcentaje);
        $("#id_descuento").val(datax.id_descuento);
        totales();
      } else if (datax.typeinfo == "Ap") {
        display_notify("Warning", "El codigo ya fue aplicado");
      } else {
        display_notify("Error", "Codigo no valido");
      }
    }
  });
}

function anular() {
  var id_factura = $('#id_factura').val();
  var dataString = 'process=anular' + '&id_factura=' + id_factura;
  $.ajax({
    type: 'POST',
    url: 'anular_cobro.php',
    data: dataString,
    dataType: 'json',
    success: function(datos) {

      display_notify(datos.typeinfo, datos.msg)
      if (datos.typeinfo == "Success") {
        //setInterval("reload1();", 1500);
        $("#Cerrar").click();
        setTimeout(function(){ generar(); }, 500);
      }

    }
  });

}

function Borrar() {
  var id_factura = $('#id_factura').val();
  var dataString = 'process=Eliminar' + '&id_factura=' + id_factura;
  $.ajax({
    type: 'POST',
    url: 'borrar_cobro.php',
    data: dataString,
    dataType: 'json',
    success: function(datos) {
      display_notify(datos.typeinfo, datos.msg)
      if (datos.typeinfo == "Success") {
        //setInterval("reload1();", 1500);
        $("#Cerrar").click();
        setTimeout(function(){ generar(); }, 500);
      }

    }
  });

}
function generar() {
  fini = $("#fini").val();
  fin = $("#fin").val();
  dataTable = $('#editable2').DataTable().destroy()
  dataTable = $('#editable2').DataTable({
    "pageLength": 50,
    "order": [
      [1, 'desc'],
      [0, 'desc']
    ],
    "processing": true,
    "serverSide": true,
    "ajax": {
      url: "admin_cobro_dt.php?fini="+fini+"&fin="+fin, // json datasource
      //url :"admin_factura_rangos_dt.php", // json datasource
      //type: "post",  // method  , by default get
      error: function() { // error handling
        $(".editable2-error").html("");
        $("#editable2").append('<tbody class="editable2_grid-error"><tr><th colspan="3">No se encontró información segun busqueda </th></tr></tbody>');
        $("#editable2_processing").css("display", "none");
        $(".editable2-error").remove();
      }
    },
    "columnDefs": [{
      "targets": 1, //index of column starting from 0
      "render": function(data, type, full, meta) {
        if (data != null)
          return '<p class="text-success"><strong>' + data + '</strong></p>';
        else
          return '';
      }
    }],
    "language": {
      "url": "js/Spanish.json"
    }
  });
  dataTable.ajax.reload()
  //}
}
$('#doctor').change(function() {
    $("#id_doctor_m").val($(this).val());
});