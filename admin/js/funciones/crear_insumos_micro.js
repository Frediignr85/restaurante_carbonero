var urlprocess='crear_insumos_micro.php';

$(document).ready(function() {
  $("#paciente_replace").hide();
  $("#microciru_replace").hide();
  $("#hora_inicio_replace").hide();
  $("#hora_fin_replace").hide();
  $("#servicio_buscar").hide();
  var id_microcirugia = $("#id_microcirugia_pte").val();
	$("#paciente").keyup(function() {
 	 $(this).val($(this).val().toUpperCase());
  });
	$('html,body').animate({
		scrollTop: $(".focuss").offset().top
	}, 1500);
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
                url: 'facturacion_autocomplete2.php',
                data: 'query=' + query,
                dataType: 'JSON',
                async: false,
                success: function(data) {
                    process(data);
                }
            });
        },
        updater: function(selection) {
            var prod0 = selection;
            var prod = prod0.split("|");
            var id_prod = prod[0];
            var descrip = prod[2];
            var tipo = prod[3];
            var cantidad_general=0;
            $("#inventable tr").each(function() {
                if($(this).find("#tipopr").val() == "P")
                {
                    var id = $(this).find("td:eq(0)").text();
                    if(id == id_prod){
                        var cantidad = $(this).find("#cant").val();
                        var unidad = $(this).find("#unidadp").val();
                        var total = parseInt(cantidad) * parseInt(unidad);
                        cantidad_general = cantidad_general + total;
                    }
                }
			});
            $.ajax({
                type: 'POST',
                url: 'crear_insumos_micro.php',
                data: {
                    process: 'consultar_existencias',
                    id_microcirugia: id_microcirugia,
                    id_producto: id_prod
                },
                dataType: 'JSON',
                async: false,
                success: function(tot) {
                    var cant_to = parseInt(tot.total);
                    var uni_to = parseInt(tot.unidad);
                    if((parseInt(cantidad_general)+parseInt(uni_to)) > cant_to){
                        swal({
                            title: "Producto sin existencias",
                            text: "El producto ha agotado sus existencias, revisar asignaciones de este.",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: '',
                            confirmButtonText: 'Ok.',
                            closeOnConfirm: true,
                            closeOnCancel: true
                        }, 
                        function(isConfirm) {
                            if (isConfirm){
                            
                            } else {
                            }
                        });
                    }
                    else{
                        if(id_prod!=0){
                            addProductList(id_prod, tipo, descrip,"1","1","","","");
                            $('input#producto_buscar').val("");
                            actualizar_cant_stock_tabla(id_prod);
                            actualizar_cant_stock_tabla(id_prod);
                            actualizar_ultima_fila();
                            validar_cambio_presentacion(id_prod);
                            contador_filas=0;
                            // $('.sel').focus().select2("open");
                        }
                        else{
                            $('input#producto_buscar').focus();
                            $('input#producto_buscar').val("");
                        }
                    }
                }
            });            
             // agregar_producto_lista(id_prod, descrip, isbarcode);
        }
    });
    $("#servicio_buscar").typeahead({
        source: function(query, process) {
            $.ajax({
                type: 'POST',
                url: 'servicio_autocomplete.php',
                data: 'query=' + query,
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
            var precio= prod[2];
            var tipo= "S";
            cant=1;
            if(id_prod!=0){
            addServicioList(id_prod,descrip,precio,"");
            $('input#servicio_buscar').val("");
    
            }
            else{
            $('input#servicio_buscar').focus();
            $('input#servicio_buscar').val("");
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
        }
      });
    },
    updater: function(selection) {
      var prod0 = selection;
      var prod = prod0.split("|");
      var id_p = prod[0];
      var nombre = prod[1];
      var naci = prod[2];
      var sexo = prod[3];
			var fecha_nacimiento = prod[4];
      var telefono = prod[5];
      $('#paciente_replace').val(nombre);
      $('#pacientee').val(id_p);
      $('#id_paciente').val(id_p);
      $('#paciente_replace').show();
      $('#paciente').hide();
    }
  });
  $("#microciru").typeahead({
    //Definimos la ruta y los parametros de la busqueda para el autocomplete
    source: function(query, process)
    {
    $.ajax(
    {
            url: 'autocomplete_microcirugia.php',
            type: 'GET',
            data: 'query=' + query ,
            dataType: 'JSON',
            async: true,
            //Una vez devueltos los resultados de la busqueda, se pasan los valores al campo del formulario
            //para ser mostrados
        	success: function(data)
            {
                process(data);
        	}
    	});
    },
      //Se captura el evento del campo de busqueda y se llama a la funcion agregar_factura()
      updater: function(selection)
      {
        var data0=selection;
      var id = data0.split("|");
      var nombre = id[1];
        id = parseInt(id[0]);
        $('#microciru_replace').val(nombre);
        $('#microciru_replace').show();
        $('#microciru').hide();
        $('#id_microcirugia').val(id);

      }
  });
	$('#formulario').validate({
		rules: {
			descripcion: {
				required: true,
			},
			precio1: {
				required: true,
				number: true,
			},
		},
		submitHandler: function (form) {
			senddata();
		}
	});
  //cargar insumos previos en microcirugia
  var id_mic_pte=$("#id_microcirugia_pte").val();
  if(id_mic_pte!="-1"){
    cargar_datos_micro(id_mic_pte)
  }
//  traer_insumos(id_mic_pte);
  $(".decimal").numeric({negative:false,decimalPlaces:2});

  $("#doctor").select2({
	allowClear: true,
	escapeMarkup: function(markup) {
		return markup;id_microcirugia
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

$("#id_cliente").select2({
	allowClear: true,
	escapeMarkup: function(markup) {
		return markup;
	},
	placeholder: "Buscar Cliente",
	language: {
		noResults: function() {
			var modalcliente = "<a class='xc' href='ClienteModal1.php' data-toggle='modal' data-target='#cliente1Modal'>";
			modalcliente += "Agregar Cliente</a>";
			return modalcliente;
			$('#id_cliente').select2('close');
		}
	}
});

$(document).keydown(function(e){
	if(e.which == 113){ //F2 Guardar
		e.stopPropagation();
		senddata();
	}
	if(e.which == 115){ //F2 Guardar
		e.stopPropagation();
		location.replace('dashboard.php');
	}
	if(e.which == 119) {//F8 Imprimir
		//$('#busca_descrip_activo').prop("checked", false);
		//activar_busqueda()
		//PENDIENTE
	}
	if(e.which == 120) { //F9 Salir
		//PENDIENTE
	}

	if ((e.metaKey || e.ctrlKey) && ( String.fromCharCode(e.which).toLowerCase() === 'e') ) {

		$('#doctor').select2('close');
		$('#tipo_impresion').select2('close');
		$('#id_cliente').select2('close')
		$('input#producto_buscar').focus();;
	}
	if ((e.metaKey || e.ctrlKey) && ( String.fromCharCode(e.which).toLowerCase() === 'c') ) {


		$('#id_cliente').select2('open');
		$('#tipo_impresion').select2('close');
		$('#doctor').select2('close');
	}
	if ((e.metaKey || e.ctrlKey) && ( String.fromCharCode(e.which).toLowerCase() === 'x') ) {

		$('#doctor').select2('open');
		$('#tipo_impresion').select2('close');
		$('#id_cliente').select2('close');

	}
	if ((e.metaKey || e.ctrlKey) && ( String.fromCharCode(e.which).toLowerCase() === 'a') ) {


		$('#tipo_impresion').select2('open');
		$('#doctor').select2('close');
		$('#id_cliente').select2('close');
	}

  });
  $('#form_fact_consumidor').hide();
  $('#form_fact_ccfiscal').hide();

  //Boton de imprimir deshabilitado hasta que se guarde la factura
  $('#print1').prop('disabled', true);
  $('#submit1').prop('disabled', false);
  $("#producto_buscar").focus();

}); //document ready

function cargar_datos_micro(id_microcirugia_pte){
  var dataString = 'process=cargar_datos_micro';
  dataString += '&id_microcirugia_pte=' + id_microcirugia_pte;
  $.ajax({
          url: urlprocess,
          type: 'GET',
          data: dataString,
          dataType: 'JSON',
          async: true,
          //Una vez devueltos los resultados de la busqueda, se pasan los valores al campo del formulario
          //para ser mostrados
          success: function(data){
            $("#microciru").hide()
            $("#paciente").hide()
            $("#microciru_replace").show()
            $("#microciru_replace").val(data.nombremicro)
            $("#paciente_replace").show()
            $("#paciente_replace").val(data.nombrepte)
            $("#id_paciente").val(data.id_paciente);
            $("#id_microcirugia").val(data.id_microcirugia)
            $('#doctor').val(data.id_doctor).trigger('change');
            $("#id_microcirugia_pte").val(data.id_microcirugia_pte);
            $("#hora_inicio").val(data.hora_inicio);
            $("#hora_fin").val(data.hora_fin);
            $("#indicaciones_mc").val(data.indicaciones);
            if( data.paquete==1 ) {
                $('#paquete').prop('checked',true);
                $("#valor_paquete").prop('disabled',false);
              $("#valor_paquete").val(data.valor_paquete)
                $("#honorarios_micr").prop('disabled',true);
            }
            else {
                $('#paquete').prop('checked',false);
              $("#honorarios_micr").prop('disabled',false);
              $("#honorarios_micr").val(data.honorarios_doctor);
              $("#valor_paquete").prop('disabled',true);
            }
          }
      });
      setTimeout(function() {
        traer_insumos(id_microcirugia_pte);
      }, 500);

}
function actualizar_ultima_fila(){
    var contador_normal=0;
    $("#inventable tr").each(function() {
        if(contador_normal == contador_filas){
            $(this).find('#cant_stock1').val(parseInt($(this).find('#cant_stock1').val())-1);
        }
        contador_normal++;
    });
}

function validar_cambio_presentacion(id_producto){
    var id_microcirugia = $("#id_microcirugia_pte").val(); 
    var cantidad_general= 0;
    $("#inventable tr").each(function() {
        if($(this).find("#tipopr").val() == "P")
        {
            var id = $(this).find("td:eq(0)").text();
            if(id == id_producto){
                var cantidad = $(this).find("#cant").val();
                var unidad = $(this).find("#unidadp").val();
                var total = parseInt(cantidad) * parseInt(unidad);
                cantidad_general = cantidad_general + total;
            }
        }
    });
    $("#inventable tr").each(function() {
        if($(this).find("#tipopr").val() == "P")
        {
            var id = $(this).find("td:eq(0)").text();
            if(id == id_producto){
                var cantidad1 = $(this).find("#cant_stock1").val();
                var unidad1 = $(this).find("#unidadp").val();
                var cantidad_especifica = parseInt(cantidad1) * parseInt(unidad1);
                var id_presentacion = $(this).find("#id_presentacion :selected").val();
                var select;
                $.ajax({
                    type: 'POST',
                    url: 'crear_insumos_micro.php',
                    data: {
                        process: 'consultar_selects',
                        id_microcirugia: id_microcirugia,
                        id_producto: id_producto,
                        cantidad_general: cantidad_general,
                        cantidad_especifica: cantidad_especifica,
                        id_presentacion: id_presentacion
                    },
                    dataType: 'JSON',
                    async: false,
                    success: function(tot){
                        select =  tot.select;
                    }
                });
                $(this).find("td:eq(5)").html(select);
            }
        }
    });
    

}
//funcion recoger insumos de una microcirugia y mostrarlos en DOM
function traer_insumos(){
    var id_microcirugia_pte = $("#id_microcirugia_pte").val(); 
       //encabezado y detalle orden
    var n=0;
    $.ajax({
      type: 'POST',
      url:urlprocess,
      data: {
        process: 'traer_insumos',
        id_microcirugia_pte: id_microcirugia_pte
      },
      dataType: 'json',
      success: function(datos) { 
        $.each(datos, function(key, value){
            n=n+1;
            var arr = Object.keys(value).map(function(k) { return value[k]});
            var id_prod= arr[0];
            var tipo= arr[1];
            var descr= arr[2];
            var cant= arr[3];
            var precio= arr[4];
            var hora = arr[5];
            var presentacion = arr[6];
            var unidad = arr[7];
            var id_insumo = arr[8];
            if (tipo=='P'){
                addProductList(id_prod, tipo, descr,cant,"0", presentacion, unidad,id_insumo);
            }
            if (tipo=='S'){
                addServicioList(id_prod,descr,precio,hora,id_insumo);
            }
        });
      }
    });
  }

$(document).on("keyup", "#paciente", function(evt)
{
	if(evt.keyCode == 13)
	{
		if($(this).val()!="" || $("#paciente_replace").val()!="")
		{

		}
		else
		{
			display_notify("Warning", "Ingrese el nombre del paciente");
		}
	}
});
$(document).on("click", "#btnBuscaProd", function(){
    $("#servicio_buscar").hide()
    $("#producto_buscar").val("");
    $("#producto_buscar").show()
    $("#producto_buscar").focus();
});
$(document).on("click", "#btnBuscaServ", function(){
    $("#producto_buscar").hide()
    $("#servico_buscar").val("");
    $("#servicio_buscar").show()
    $("#servicio_buscar").focus();
});
$(document).on("focus", "#paciente_replace", function()
{
	$(this).val("");
	$(this).hide();
	$("#paciente").show();
	$("#paciente").focus();
});
$(document).on("focus", "#microciru_replace", function()
{
	$(this).val("");
	$(this).hide();
	$("#microciru").show();
	$("#microciru").focus();
});
$(document).on("keyup", "#naci", function(evt)
{
	if(evt.keyCode == 13)
	{
		if($(this).val()!="")
		{
			$("#sexo").select2("open");
		}
		else
		{
			display_notify("Warning", "Ingrese la edad del paciente");
		}
	}
});
$(document).on("keyup", "#fecha_nacimiento", function(evt)
{
	if(evt.keyCode == 13)
	{
		if($(this).val()!="")
		{
			$("#sexo").select2("open");
		}
		else
		{
			display_notify("Warning", "Ingrese la edad del paciente");
		}
	}
});
$(document).on("change", "#doctor", function(event) {
	 // limpiar();
  //falta limpiar datos de paciente, microcirugia y costos !!!

});
function limpiar(){
  $("#inventable").find("tr").remove();
  $("#id_microcirugia_pte").val('-1');
  $("#microciru").show()
  $("#microciru").val("")
  $("#paciente").show()
  $("#microciru_replace").hide()
  $("#honorarios_micr").val(0)
  $("#paciente_replace").hide()
  $("#paciente").val("")
  $("#id_paciente").val("-1");
  $("#id_microcirugia").val("-1");
  $('#microcirugia_buscar').val("");
  $('#paquete').prop('checked',false);
}
$(document).on("click", ".xa", function(event) {
	$("#doctor").select2('close');

});
$(document).on("click", ".xb", function(event) {
	$("#paciente").select2('close');
});
$(document).on("click", ".xp", function(event) {
	$("#id_procedencia").select2('close');
});
$(document).on("click", ".xc", function(event) {
	$("#id_cliente").select2('close');
});
$(document).on('hidden.bs.modal', function(e) {
	var target = $(e.target);
	target.removeData('bs.modal').find(".modal-content").html('');
});

//function to round 2 decimal places
function round(value, decimals) {
	return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
$(function (){
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

// Evento para seleccionar una opcion y mostrar datos en un div
$(document).on("change","#tipo_entrada", function (){
	$( ".datepick2" ).datepicker();
	$('#id_proveedor').select2();

	var id=$("select#tipo_entrada option:selected").val(); //get the value
	if(id!='0'){
		$('#buscador').show();
	}
	else
	$('#buscador').hide();

	if (id=='1')
	$('#form_fact_consumidor').show();
	else
	$('#form_fact_consumidor').hide();


	if (id=='2')
	$('#form_fact_ccfiscal').show();
	else
	$('#form_fact_ccfiscal').hide();

});

// Seleccionar el tipo de factura
$(document).on("change","#tipo_entrada", function(){
	var id=$("select#tipo_entrada option:selected").val(); //get the value
	$('#mostrar_numero_doc').load('editar_factura.php?'+'process=mostrar_numfact'+'&id='+id);
});

// Agregar productos a la lista del inventario
function cargar_empleados(){
	$('#inventable>tbody>tr').find("#select_empleado").each(function(){
		$(this).load('editar_factura.php?'+'process=cargar_empleados');
		totales();
	});
}

// Evento que selecciona la fila y la elimina de la tabla
$(document).on("click", ".Delete", function() {
    var tr = $(this).parents("tr");
    var tipo = tr.hasClass("P");
    var idp = tr.find("#id_prod").val();
    if(tipo)
    {
        $(".P"+idp).remove();
    }
    tr.remove();
    actualizar_cant_stock_tabla(idp);
    actualizar_cant_stock_tabla(idp);
    validar_cambio_presentacion(idp);
    totales();
});
  

$(document).on("keyup", "#cant, #precio_venta", function() {
  var tr = $(this).parents("tr");
  actualiza_subtotal(tr);
});


$(document).on('change', '.sel', function(event) {
    var id_presentacion = $(this).val();
    var id_microcirugia = $("#id_microcirugia_pte").val();
    var a = $(this);
    var cantidad = 0;    
    var id_prod = a.closest('tr').find('td:eq(0)').text();
    var cantidad_general = 0;
    $.ajax({
        url:urlprocess,
        type: 'POST',
        dataType: 'json',
        data: 'process=get_presentancion' + "&id_presentacion=" + id_presentacion+ "&id_microcirugia=" + id_microcirugia,
        success: function(data){        
            a.closest('tr').find('#precio_venta').val(data.precio);
            a.closest('tr').find('#unidadp').val(data.unidad);
            a.closest('tr').find('#cant_stock1').val(data.total);
            a.closest('tr').find("#cant").val("1");
            var tr = a.closest('tr');
            actualiza_subtotal(tr);
        }
    });
    /*
    setTimeout(function() {
      totales();
    }, 1000);
  */
});
var contador_filas =0;
function actualizar_cant_stock_tabla(id_producto){
    var id_microcirugia = $("#id_microcirugia_pte").val(); 
    var cantidad_general= 0;
    $("#inventable tr").each(function() {
        if($(this).find("#tipopr").val() == "P")
        {
            var id = $(this).find("td:eq(0)").text();
            if(id == id_producto){
                var cantidad = $(this).find("#cant").val();
                var unidad = $(this).find("#unidadp").val();
                var total = parseInt(cantidad) * parseInt(unidad);
                cantidad_general = cantidad_general + total;
            }
        }
        contador_filas++;
    });
    $.ajax({
        type: 'POST',
        url: 'crear_insumos_micro.php',
        data: {
            process: 'consultar_existencias',
            id_microcirugia: id_microcirugia,
            id_producto: id_producto
        },
        dataType: 'JSON',
        async: false,
        success: function(tot){
            var cant_to = parseInt(tot.total);
            var total_asignar = cant_to - cantidad_general;
            $("#inventable tr").each(function() {
                if($(this).find("#tipopr").val() == "P")
                {
                    var id = $(this).find("td:eq(0)").text();
                    if(id == id_producto){
                        var cantidad = $(this).find("#cant").val();
                        var unidad = $(this).find("#unidadp").val();
                        var can_asignar = Math.floor(parseInt(total_asignar)/parseInt(unidad)) + parseInt(cantidad) ;
                        $(this).find('#cant_stock1').val(can_asignar);
                    }
                }
            });
        }
    });
}
function actualiza_subtotal(tr){
    var existencias = tr.find('#cant_stock1').val();
    var existenciasSC = tr.find('td:eq(3)').text();
    var id = tr.find("td:eq(0)").text();
    var cantidad = tr.find("#cant").val();
    var unidad = tr.find("#unidadp").val();
    var tipop= tr.find("#tipopr").val();
    if(tipop=='S'){
        var id_presentacion =0;
    }
    else {
        var id_presentacion = $(this).find("#id_presentacion :selected").val();
    }
    cantidad = cantidad*unidad;
    existencias = existencias*unidad;
    if (isNaN(cantidad) || cantidad == "") {
        cantidad = 0;
    }
    if (parseInt(cantidad) > (parseInt(existencias))) {    
        cantidad = existencias;
        tr.find("#cant").val(cantidad/unidad);
    }
    if (parseInt(existencias) > 0 && parseInt(cantidad) == 0) {
        tr.find("#cant").val("1");
        cantidad = 0;
    }
    var precio = tr.find('#precio_venta').val();
    if (isNaN(precio) || precio == "") {
        precio = 0;
    }
    cantidad = cantidad/unidad;
    var subtotal = subt(cantidad, precio);
    if(tipop == 'P'){
        actualizar_cant_stock_tabla(id);
        validar_cambio_presentacion(id);
    }
    var subt_mostrar = subtotal.toFixed(2);
    
    tr.find("#subtotal_fin").val(subt_mostrar);
    totales();
}

function totales() {
	//impuestos
	var porcentaje_descuento = parseFloat($("#porcentaje_descuento").val());


	var urlprocess = $('#urlprocess').val();

	var i = 0, total = 0;

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
			if(!$(this).hasClass("EP"))
			{
				subt_cant = $(this).find("#cant").val();
				totalcantidad += parseInt(subt_cant);
				subtotal += parseFloat($(this).find("#subtotal_fin").val());
				filas += 1;
			}
		});
		items2=$("#idco").val();
		subtotal = round(subtotal, 4);
		//descuento
		var total_descuento = 0;
		if (porcentaje_descuento > 0.0)
		{
			total_descuento = (porcentaje_descuento / 100) * subtotal
		}
		else
		{
			total_descuento = 0;
		}
		var total_descuento_mostrar = round(total_descuento,2);
		var total_mostrar = (subtotal -total_descuento).toFixed(2);
		totcant_mostrar = round(totalcantidad,2).toFixed(2);
		$('#totcant').text(totcant_mostrar);

		$('#total_gravado').html(total_mostrar);
		$('#subtotal').html(subtotal.toFixed(2));
		$('#pordescuento').html(porcentaje_descuento);
		$('#valdescuento').html(total_descuento.toFixed(2));

		$('#totcant').html(totcant_mostrar);
		$('#items').val(items2);

    if(subtotal>0){
		    $('#totaltexto').load(urlprocess, {
			       'process': 'total_texto',
			       'total': total_mostrar
		  });
    }
		$('#monto_pago').html(total_mostrar);
		$('#totalfactura').val(total_mostrar);
}

function totalFact(){
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
 //	$('#totaltexto').load('venta.php?' + 'process=total_texto&total=' + total_dinero);
	//console.log('total:' + total_dinero);
}
// actualize table data to server
$(document).on("click","#submit1",function(){
	senddata();
});
$(document).on("click", "#btnEsc", function (event) {
	reload1();
});

$(document).on("click", ".print1", function () {
	var totalfinal=parseFloat($('#totalfactura').val());
	var facturado= totalfinal.tosenddFixed(2);
	$(".modal-body #facturado").val(facturado);
});
$(document).on("click", "#btnPrintFact", function (event) {
	imprime1();
});

$(document).on("click","#print2",function(){
	imprime2();
});


$(document).on("change","#paquete",function(){
        if(this.checked) {
          //  $(this).prop("checked", returnVal);
          $("#honorarios_micr").val("")
          $("#honorarios_micr").prop("disabled",true);
          //$("#valor_paquete").val("")
          $("#valor_paquete").prop("disabled", false);
        }else{
          //$("#honorarios_micr").val(0)
          $("#honorarios_micr").prop("disabled",false);
          $("#valor_paquete").val("")
          $("#valor_paquete").prop("disabled", true);

        }

    });
function senddata() {
	//Obtener los valores a guardar de cada item facturado
	var i = 0;
	var StringDatos = "";
	var id_empleado = 0;
    var id_paciente = $("#id_paciente").val();
    var indicaciones = $("#indicaciones_mc").val();
	var id_doctor = $("#doctor option:selected").val();
    var id_microcirugia= $("#id_microcirugia").val();
    var id_microcirugia_pte=$("#id_microcirugia_pte").val();
    var hora_inicio = $("#hora_inicio").val();
    var hora_fin = $("#hora_fin").val();

	var items = $("#items").val();
    var msg = "";
	var error=false;
	var total= $('#total_gravado').text();/*total sumas */
  var paquete=0;
  var valor_paquete=0;
  var  honorarios_micr=$("#honorarios_micr").val();
  if( $('#paquete').prop('checked') ) {
      paquete=1;
      valor_paquete= $("#valor_paquete").val();
  }


	var array_json = new Array();
	$("#inventable tr").each(function(index)
	{
		var id = $(this).find("td:eq(0)").text();
		var precio_venta = $(this).find("#precio_venta").val();
		var cantidad = $(this).find("#cant").val();
		var subtotal = $(this).find("#subtotal_fin").val();
        var id_insumo= $(this).find("#id_insumo").val();
    var tipop= $(this).find("#tipopr").val();
    if(tipop=='S'){
        var id_presentacion =0;
    }
    else {
        var id_presentacion = $(this).find("#id_presentacion :selected").val();
    }
		if (cantidad && precio_venta) {
			var obj = new Object();
			obj.id = id;
            obj.id_presentacion = id_presentacion;
			obj.precio = precio_venta;
			obj.cantidad = cantidad;
			obj.subtotal = subtotal;
            obj.tipop = tipop;
            obj.id_insumo = id_insumo;
			//convert object to json string
			text = JSON.stringify(obj);
			array_json.push(text);
			i = i + 1;
		}
		else{
			error=true;
		}
	});
	json_arr = '[' + array_json + ']';
	if (i==0) {
		error=true
	}
    var dataString = 'process=insert';
    dataString += '&hora_inicio=' + hora_inicio;
    dataString += '&hora_fin=' + hora_fin;
    dataString += '&id_paciente=' + id_paciente;
    dataString += '&id_doctor=' + id_doctor;
    dataString += '&id_microcirugia=' + id_microcirugia;
    dataString += '&id_microcirugia_pte=' + id_microcirugia_pte;
	dataString += '&total=' + total;
    dataString += '&items=' + items;
	dataString += '&cuantos=' + i ;
    dataString += '&json_arr=' + json_arr;
    dataString += "&honorarios_micr="+honorarios_micr;
    dataString += "&paquete="+paquete;
    dataString += "&valor_paquete="+valor_paquete;
    dataString += "&indicaciones="+indicaciones;

  var sel = 1; sel1 = 1; sel2 = 1;
	if (i == 0) {
		msg = 'Seleccione al menos un producto !';
		sel = 0;
	}
  if (honorarios_micr== 0 && paquete==0) {
    msg = 'Honorarios doctor !';
    sel1 = 0;
  }
  if (valor_paquete== 0 && paquete==1) {
    msg = 'costo del paquete !';
    sel1 = 0;
  }
  if (id_microcirugia=='-1') {
    msg = 'Seleccionar Microcirugia !';
    sel2 = 0;
  }
	if (sel == 1&&sel1==1&&sel2==1) {
		$("#inventable tr").remove();
		$.ajax({
			type: 'POST',
			url: urlprocess,
			data: dataString,
			dataType: 'json',
			success: function(datax) {
			if (datax.typeinfo == "Success")
			{
        	    display_notify(datax.typeinfo, datax.msg);
                reload1();
			}
			}
		});
	} else {
		display_notify('Warning', msg);
	}
}


function reload1(){
	location.href = 'admin_microcirugia_dia.php';
}



$(document).on('change', '#tipo_impresion', function(event) {
	$('#inventable tr').each(function(index) {
		var tr = $(this);
		actualiza_subtotal(tr);
	});
});


function addProductList(id_prod, tipo, descr,cantx, f, presentacion, unidadesx,id_insumo){
    id_prod = $.trim(id_prod);
    id_insumo = $.trim(id_insumo);
    id_factura= parseInt($('#id_factura').val());
    if(isNaN(id_factura))
    {
        id_factura=0;
    }    
    var fecha = "00-00-0000";
    var hora = "00:00 AM"
    //	var fila=1;
    urlprocess = $('#urlprocess').val();
	var dataString = 'process=consultar_stock'+'&id_producto=' + id_prod+ '&tipo=' + tipo+ '&id_presentacion=' + presentacion;
    $.ajax({
        type: "POST",
        url: urlprocess,
        data: dataString,
        dataType: 'json',
        success: function(data)
        {
            var id_previo = new Array();
            if(tipo == "P")
            {
                var precio_p = data.precio_p;
                var cortesia_p = data.cortesia_p;
                tr_add = '';
                var fila=1;
                var filas = 1;
                $("#inventable  tr").each(function(index) {
                    if (index >= 0) {
                        var campo0 = "";
                        $(this).children("td").each(function(index2) {
                            switch (index2) {
                                case 0:
                                    campo0 = $(this).text();
                                    if(campo0 != undefined || campo0 != '') {
                                        id_previo.push(campo0);
                                    }
                                    break;
                            }
                        });
                        if(campo0 !="")
                        {
                            filas = filas + 1;
                        }
                    } //if index>0
                });
                
                var cantx1=0;
                if(f == 1){
                    cantx1=0;
                    cantx1 = ( parseInt(cantx1)+parseInt(data.existencias));
                }
                else{
                    cantx1 = cantx;
                    cantx1 = ( parseInt(cantx1)+parseInt(data.existencias));
                }
                var cantidadx = (parseInt(cantx)/parseInt(unidadesx));
                var cantd = 0;
                if(isNaN(cantidadx)){
                    cantidadx = 0;
                    cantd = 1;
                }
                var subtotal = subt(data.preciop, cantidadx);
                subt_mostrar = subtotal.toFixed(2);
                var totalX  = 0;
                var cantidades = "<td class='cell100 column5 text-success'><input type='text'  class='form-control decimal' id='cant' name='cant'  value='"+(parseInt(cantidadx)+parseInt(cantd))+"' style='width:60px;' /></td>";
                var tipop= "<input type='hidden'  class='tipop' id='tipopr' name='tipopr' value='P'>";
                var id_insumo1= "<input type='hidden'  class='id_insumo' id='id_insumo' name='id_insumo' value='"+id_insumo+"'>";
                tr_add += "<tr class='row100 head "+tipo+"' id='" + id_prod + "'>";
                tr_add += "<td class='cell100 column10 text-success id_pps'>" +id_prod + "<input type='hidden'  class='txt_box decimal2  cantx' id='unidadp' name='unidadp' value='"+data.unidadp+"'></td>";
                tr_add += "<td class='cell100 column30 text-success descp' id='desc'>" +descr + "<input type='hidden'  class='form-control ' readOnly id='id_prod' name='id_prod' value='" + id_prod + "'></td>";
                tr_add += "<td class='cell100 column10 text-success' id='cant_stock'><input type='text'  class='form-control decimal' id='cant_stock1' name='cant_stock1' value='"+(parseInt(data.existencias)+parseInt(cantidadx)-parseInt(totalX))+"' readOnly></td>";
                tr_add += "<td class='cell100 column10 text-success' id='cant_stockHidden' style='display:none;'>" + (parseInt(cantx)-parseInt(totalX)) + "</td>";
                tr_add += "<td class='cell100 column10 text-success' id='fecha_hora_Hidden' style='display:none;'>" + (fecha +" "+hora) + "</td>";
                tr_add += "<td class='cell100 column15 text-success '>"+data.select+"</td>";
                tr_add += "<td class='cell100 column10 text-success' id='precio_ventas'>"+id_insumo1+"<input type='text'  class='form-control decimal' id='precio_venta' name='precio_venta' value='"+data.preciop+"' readOnly></td>";
                tr_add += cantidades;
                tr_add += "<td class='ccell100 column10'>" + tipop+ "<input type='text'  class='decimal form-control' id='subtotal_fin' name='subtotal_fin'  value='" + subt_mostrar + "'readOnly></td>";
                tr_add += '<td class="cell100 column8 text-center"><input id="delprod" type="button" class="btn btn-danger fa Delete"  value="&#xf1f8;"></td>';
                tr_add += '</tr>';
                $("#inventable").append(tr_add);
            }
            scrolltable();
            totales();
        }
    });
}
function convertirFecha(fecha){
    var arr = fecha.split(" ");
    var f_e = arr[0];
    var h_o = arr[1];
    var arr1 = f_e.split("-");
    var arr2 = h_o.split(":");
    var fecha_f = arr1[2]+"-"+arr1[1]+"-"+arr1[0];
    var hora_f="";
    if(arr2[0] == "00"){
        hora_f = "12:"+arr2[1]+" AM";
    }
    else if( arr2[0] < 12 && arr2[0] >0){
        hora_f = arr2[0]+":"+arr2[1]+" AM";
    }
    else if(arr2[0] == 12){
        hora_f = arr2[0]+":"+arr2[1]+" PM";
    }
    else if(arr2[0] > 12){
        arr2[0] = arr2[0]-12;
        hora_f = arr2[0]+":"+arr2[1]+" PM";
    }
    var hora_devolver = fecha_f+" "+hora_f;
    return hora_devolver;
}
function addServicioList(id_prod, descr, precio, hora1, id_insumo) {
    //	$('#inventable').find('tr#filainicial').remove();
    id_prod = $.trim(id_prod);
    var tipo = "S"
    if(tipo == "S"){
        tr_add = '';
        var fila=1;
        var filas = 1;
        var subtotal = subt(precio, 1);
        subt_mostrar = subtotal.toFixed(2);
        cantx1=1;
        var cantidades = "<td class='cell100 column5 text-success'><input type='text'  class='form-control decimal' id='cant' name='cant'  value='"+cantx1+"' style='width:60px;' readonly /></td>";
        var id_insumo1= "<input type='hidden'  class='id_insumo' id='id_insumo' name='id_insumo' value='"+id_insumo+"'>";
        var tipop= "<input type='hidden'  class='tipop' id='tipopr' name='tipopr' value='S'>";
                    tr_add += "<tr class='row100 head "+tipo+"' id='" + id_prod + "'>";
                    tr_add += "<td class='cell100 column10 text-success id_pps'>" +id_prod + "<input type='hidden'  class='txt_box decimal2  cantx' id='unidadp' name='unidadp' value='"+'1'+"'></td>";
                    tr_add += "<td class='cell100 column30 text-success descp' id='desc'>" +(descr) + "<input type='hidden'  class='form-control ' readOnly id='id_prod' name='id_prod' value='" + id_prod + "'></td>";
                    tr_add += "<td class='cell100 column10 text-success' id='cant_stock'>" +1 + "</td>"
                    tr_add += "<td class='cell100 column10 text-success' id='cant_stockHidden' style='display:none;'>" + 1 + "</td>";
                    tr_add += "<td class='cell100 column10 text-success' id='fecha_hora_Hidden' style='display:none;'>" + (fecha +" "+hora) + "</td>";
                    tr_add += "<td class='cell100 column15 text-success preccs'>&nbsp;</td>";
                    tr_add += "<td class='cell100 column10 text-success' id='precio_ventas'>"+id_insumo1+"<input type='text'  class='form-control decimal' id='precio_venta' name='precio_venta' value='"+precio+"' readOnly></td>";
                    tr_add += cantidades;
                    tr_add += "<td class='ccell100 column10'>" +tipop + "<input type='text'  class='decimal form-control' id='subtotal_fin' name='subtotal_fin'  value='" + subt_mostrar + "'readOnly></td>";
                    tr_add += '<td class="cell100 column8 text-center"><input id="delprod" type="button" class="btn btn-danger fa Delete"  value="&#xf1f8;"></td>';
                    tr_add += '</tr>';
        if(!id_existente(id_prod, tipo))
        {
            $("#inventable").append(tr_add); 
        }
    }
    scrolltable();
    totales();     
}

$(document).on('select2:close', '.sel2', function(evt)
{
	$("#producto_buscar").focus();

});

$(document).on("click", "#btnAddDoctor", function(event) {
	$(document).ready(function(){
		$('#formulario').validate({
			rules: {
				nombre:
				{
					required: true,
				},
				apellido:
				{
					required: true,
				},
				especialidad:
				{
					required: true,
				},
			},
			messages:
			{
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
			submitHandler: function (form) {
				agregardoctor();

			}
		});

	});
	$(".may").keyup(function() {
		$(this).val($(this).val().toUpperCase());
	});

});
$(document).on("click", "#btnAddProcedencia", function(event) {
	$(document).ready(function(){
		$('#formulario').validate({
			rules: {
				nombre:
				{
					required: true,
				},
			},
			messages:
			{
				nombre: "Por favor ingrese el nombre del Procedencia",
			},
			highlight: function(element) {
				$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
			},
			success: function(element) {
				$(element).closest('.form-group').removeClass('has-error').addClass('has-success');
			},
			submitHandler: function (form) {
				agregar_procedencia();

			}
		});

	});
	$(".may").keyup(function() {
		$(this).val($(this).val().toUpperCase());
	});

});

$(document).on("click", "#btnAddClient", function(event) {
	$(document).ready(function(){
		$('#formulario').validate({
			rules: {
				nombre:
				{
					required: true,
				},
				apellido:
				{
					required: true,
				},
				sexo:
				{
					required: true,
				},
				fecha_nacimiento:
				{
					required: true,
				},

			},
			messages:
			{
				nombre: "Por favor ingrese el nombre del usuario",
				apellido: "Por favor ingrese el apellido",
				sexo: "Por favor ingrese el sexo",
				fecha_nacimiento: "Por favor ingrese la fecha de nacimiento",
			},
			highlight: function(element) {
				$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
			},
			success: function(element) {
				$(element).closest('.form-group').removeClass('has-error').addClass('has-success');
			},
			submitHandler: function (form) {
				agregarcliente();

			}
		});
		$(".may").keyup(function() {
			$(this).val($(this).val().toUpperCase());
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
function agregarcliente() {
	urlprocess = $('#urlprocess').val();
	var nombress = $(".modal-body #nombre").val();
	var apellidos = $(".modal-body #apellido").val();
	var sexo = $(".modal-body #sexo").val();
	var naci = $(".modal-body #naci").val();
	var dataString = 'process=agregar_cliente' + '&nombre=' + nombress + '&apellido=' + apellidos;
	dataString += '&sexo=' + sexo +'&naci=' + naci;
	$.ajax({
		type: "POST",
		url: urlprocess,
		data: dataString,
		dataType: 'json',
		success: function(datax) {
			var process = datax.process;
			var id_client = datax.id_client;
			//var nombreape = nombress + " " + apellidoss;
			$("#paciente").append("<option value='" + id_client + "' selected>" + nombress + " " + apellidos + "</option>");
			$("#paciente").trigger('change');
			$('.sel1').select2('open');


			//Cerrar Modal
			$('#clienteModal').modal('hide');
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
	var dataString = 'process=agregar_procedencia'+ '&nombre=' + nombress + '&descripcion=' + apellidos;
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
function agregarcliente1() {
	urlprocess = $('#urlprocess').val();
	var nombress = $(".modal-body #nombre").val();
	var apellidos = $(".modal-body #apellido").val();
	var sexo = $(".modal-body #sexo").val();
	var dataString = 'process=agregar_cliente1' + '&nombre=' + nombress + '&apellido=' + apellidos;
	dataString += '&sexo=' + sexo ;
	$.ajax({
		type: "POST",
		url: urlprocess,
		data: dataString,
		dataType: 'json',
		success: function(datax) {
			var process = datax.process;
			var id_client = datax.id_client2;
			//var nombreape = nombress + " " + apellidoss;
			$("#id_cliente").append("<option value='" + id_client + "' selected>" + nombress + "</option>");
			$("#id_cliente").trigger('change');


			//Cerrar Modal
			$('#cliente1Modal').modal('hide');
			//Agregar NRC y NIT al form de Credito Fiscal
			display_notify(datax.typeinfo, datax.msg);
			$(document).on('hidden.bs.modal', function(e) {
				var target = $(e.target);
				target.removeData('bs.modal').find(".modal-content").html('');
			});
		}
	});
}
function id_existente(id, tipoa)
{
	var dato =false;
	$("#inventable tr").each(function()
	{
		var tipo = $(this).hasClass(tipoa);
		var id1 = $(this).attr("id");
		if(id == id1 && tipo)
		{
			dato = true;
		}
	});
	return dato;

}
$("#descto").keyup(function(event) {
	if (event.keyCode == 13) {
		if ($(this).val() != "") {
			aplicar_descuento($(this).val());
		}
	}
});
$(document).on('change','.cort',function(){
	if ($(this).is(':checked') ) {
		$(this).parents("tr").find("#idco").each(function() {
			var tr = $(this).parents("tr");
			precio=0;
			tr.find("#precio_venta").val(precio);
			tr.find("#cortesia").val(1);
			tr.find("#precio_sin_iva").val(precio);
			actualiza_subtotal(tr);
		});
	} else {
		$(this).parents("tr").find("#idco").each(function() {
			var tr = $(this).parents("tr");
			precio=parseFloat(tr.find("#precio_venta").text());
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
		url: 'venta.php',
		data: 'process=pin&hash=' + hash,
		dataType: 'JSON',
		success: function(datax) {
			$("#descto").val("");
			if (datax.typeinfo == "Ok") {
				$("#porcentaje_descuento").val(datax.porcentaje);
				$("#id_descuento").val(datax.id_descuento);
				totales();
			} else if(datax.typeinfo == "Ap") {
				display_notify("Warning", "El codigo ya fue aplicado");
			} else {
				display_notify("Error", "Codigo no valido");
			}
		}
	});
}
$('#telefono').on('keydown', function (event)
    {
	    if (event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 13 || event.keyCode == 37 || event.keyCode == 39)
	    {

	    }
	    else
	    {
	        if((event.keyCode>47 && event.keyCode<60 ) || (event.keyCode>95 && event.keyCode<106 ))
	        {
	        	inputval = $(this).val();
	        	var string = inputval.replace(/[^0-9]/g, "");
		        var bloc1 = string.substring(0,4);
		        var bloc2 = string.substring(4,7);
		        var string =bloc1 + "-" + bloc2;
		        $(this).val(string);
	        }
	        else
	        {
	        	event.preventDefault();
	        }

	    }
	});
