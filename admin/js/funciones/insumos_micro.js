var urlprocess='insumos_micro.php';

function calculate_age(fecha) {

  separar = fecha.split("-");
  birth_month= separar[1];
  birth_day=separar[2]
  birth_year=separar[0]
  today_date = new Date();
  today_year = today_date.getFullYear();
  today_month = today_date.getMonth();
  today_day = today_date.getDate();
  age = today_year - birth_year;

  if (today_month < (birth_month - 1)) {
    age--;
  }
  if (((birth_month - 1) == today_month) && (today_day < birth_day)) {
    age--;
  }
  console.log(age);
  return age;
}

$(document).ready(function() {

  $("#paciente_replace").hide();
	$("#fecha_nacimiento").hide();
	$("#fecha_nacimiento_label").hide();
	$("#paciente").keyup(function() {
 	 $(this).val($(this).val().toUpperCase());
  });
  $("#check_nacimiento").change(function() {

    if($(this).val()=="3"){

      $("#fecha_nacimiento").show();
  		$("#fecha_nacimiento_label").show();
  		$("#naci").hide();
  		$("#naci_label").hide();
    }else{
      $("#fecha_nacimiento").hide();
  		$("#fecha_nacimiento_label").hide();
  		$("#naci").show();
  		$("#naci_label").show();
      if($(this).val()==2 && $("#fecha_nacimiento").val()!=""){
        var fecha_naci=$("#fecha_nacimiento").val();
        var edad_meses=(calculate_age(fecha_naci)*12)
        $("#naci").val(edad_meses);
      }
      if($(this).val()==1 && $("#fecha_nacimiento").val()!=""){
        var fecha_naci=$("#fecha_nacimiento").val();
        $("#naci").val(calculate_age(fecha_naci));
      }
    }
  });
  $('#naci').on('keydown keypress',function(e){
    if(e.key.length === 1){ // Evaluar si es un solo caracter
        if($(this).val().length < 3){ /* Comprobar que son menos de 12 catacteres y que es un número */
            $(this).val($(this).val() + e.key); // Muestra el valor en el input
        }
        return false;
    }
  });
  $('#naci').numeric({negative:false,decimal:false});
	$('#num_doc_fact').numeric({negative:false,decimal:false});
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
				url: 'facturacion_autocomplete1.php',
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
			var tipo = prod[2];
			if(id_prod!=0){
				addProductList(id_prod, tipo, descrip);
				$('input#producto_buscar').val("");
				// $('.sel').focus().select2("open");

			}
			else{
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
      var naci = prod[2];
      var sexo = prod[3];
			var fecha_nacimiento = prod[4];
      var telefono = prod[5];
      //alert("SELECT: "+sexo);
      $('#paciente_replace').val(nombre);
      $('#pacientee').val(id_p);
      $('#paciente_replace').show();
      $('#paciente').hide();
      $('#naci').val(naci);
      $('#sexo').val(sexo);
			$('#fecha_nacimiento').val(fecha_nacimiento);
      $('#telefono').val(telefono);
      $("#sexo").trigger('change');
      $("#check_nacimiento").trigger('change');
      // agregar_producto_lista(id_prod, descrip, isbarcode);
    }
  });
	var urlprocess=$('#urlprocess').val();
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
	// Clean the modal form
	$("#n_ref").keypress(function(e) {
		if(e.which == 13) {
			cargar_ref();

			$("#n_ref").val("");
		}
	});
	$("#banco").change(function() {
		$("#numcuenta *").remove();
		$("#select2-numcuenta-container").text("");
		var ajaxdata = {
			"process": "cuenta",
			"id_banco": $("#banco").val()
		};
		$.ajax({
			url: "venta.php",
			type: "POST",
			data: ajaxdata,
			success: function(opciones) {
				$("#select2-numcuenta-container").text("Seleccione");
				$("#numcuenta").html(opciones);
				$("#numcuenta").val("");
			}
		})
	});

$(".decimal").numeric({negative:false,decimalPlaces:2});

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
//$('#print1').prop('disabled', false);

/*
$("#producto_buscar").typeahead({
	source: function(query, process) {
		//var textVal=$("#producto_buscar").val();
		$.ajax({
			url: 'autocomplete_producto.php',
			type: 'POST',
			data: 'query=' + query ,
			dataType: 'JSON',
			async: true,
			success: function(data) {
				process(data);

			}
		});
	},
	updater: function(selection){
		var prod0=selection;
		var prod= prod0.split("|");
		var id_prod = prod[0];
		var descrip = prod[1];

		agregar_producto_lista(id_prod, descrip);
		// $('.sel').select2('oper');

	}
}); */
$("#producto_buscar").focus();

});
$(document).on("keyup", "#paciente", function(evt)
{
	if(evt.keyCode == 13)
	{
		if($(this).val()!="" || $("#paciente_replace").val()!="")
		{
			if($('#check_nacimiento').prop('checked')){
				$("#fecha_nacimiento").focus();
			}else{
				$("#naci").focus();
			}

		}
		else
		{
			display_notify("Warning", "Ingrese el nombre del paciente");
		}
	}
});

$(document).on("focus", "#paciente_replace", function()
{
	$(this).val("");
	$("#naci").val("");
	$("#fecha_nacimiento").val("");
  	$("#telefono").val("");
	$("#sexo").val("");
	$("#pacientee").val("");
	$("#sexo").trigger('change');
	$(this).hide();
	$("#paciente").show();
	$("#paciente").focus();
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
	////alert(id);
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
	totales();
});

$(document).on("keyup", "#cant, #precio_venta", function() {
  var tr = $(this).parents("tr");
  actualiza_subtotal(tr);
});
/*
$(document).on("keydown", "#cant, #precio_venta", function() {
  var tr = $(this).parents("tr");
  actualiza_subtotal(tr);
});
*/
function actualiza_subtotal(tr){
  var existencias = tr.find('td:eq(2)').text();
  var cantidad = tr.find('#cant').val();
  if (isNaN(cantidad) || cantidad == "") {
    cantidad = 0;
  }
  if (parseInt(cantidad) > parseInt(existencias)) {
    tr.find("#cant").val(existencias);
  }
  if (parseInt(existencias) > 0 && parseInt(cantidad) == 0) {
    tr.find("#cant").val("");
  }
  var precio = tr.find('#precio_venta').val();
  if (isNaN(precio) || precio == "") {
    precio = 0;
  }
  var subtotal = subt(cantidad, precio);
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


function senddata() {
	//Obtener los valores a guardar de cada item facturado
	var i = 0;
	var StringDatos = "";
	var id_empleado = 0;
	var id_paciente = $("#id_paciente").val();
	var id_doctor = $("#id_doctor").val();
  var id_microcirugia_pte = $("#id_microcirugia_pte").val();
	var items = $("#items").val();
   var msg = "";
	var error=false;
	var total= $('#total_gravado').text();/*total sumas */

	var array_json = new Array();
	$("#inventable tr").each(function(index)
	{
		var id = $(this).find("td:eq(0)").text();
		var precio_venta = $(this).find("#precio_venta").val();
		var cantidad = $(this).find("#cant").val();
		var subtotal = $(this).find("#subtotal_fin").val();
    var id_presentacion = $(this).find("#id_presentacion :selected").val();

		if (cantidad && precio_venta) {
			var obj = new Object();
			obj.id = id;
      obj.id_presentacion = id_presentacion;
			obj.precio = precio_venta;
			obj.cantidad = cantidad;
			obj.subtotal = subtotal;
			//convert object to json string
			text = JSON.stringify(obj);
			array_json.push(text);
			i = i + 1;
		}
		else{
			error=true
		}
	});
	json_arr = '[' + array_json + ']';
	if (i==0) {
		error=true
	}
	var dataString = 'process=insert';
  dataString += '&id_paciente=' + id_paciente;
  dataString += '&id_doctor=' + id_doctor;
  dataString += '&id_microcirugia_pte=' + id_microcirugia_pte;
	dataString += '&total=' + total;
  dataString += '&items=' + items;
	dataString +=  '&cuantos=' + i ;
  dataString +=  '&json_arr=' + json_arr;
  /*
	dataString += '&id_apertura=' + id_apertura;
	dataString += '&turno=' + turno;
	dataString += '&caja=' + caja;
  */
  var sel = 1;
	if (i == 0) {
		msg = 'Seleccione al menos un producto !';
		sel = 0;
	}

	if (sel == 1) {
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

$(document).on("keyup","#efectivo",function(){
	total_efectivo();
});
$(document).on("change","#con_pago",function(){
	//$(".usage").attr("disabled", true);
	if ($(this).val()=="CHE") {


		$("#vernumche").attr("hidden",false);
		$("#veremisor").attr("hidden",false);
		$("#verefectivo").attr("hidden",false);
		$("#verntarj").attr("hidden",true);
		$("#vervouch").attr("hidden",true);
		$("#verbanco").attr("hidden",true);
		$("#vernumcue").attr("hidden",true);
		$("#vertrans").attr("hidden",true);

	}else if ($(this).val()=="TRA") {

		$("#veremisor").attr("hidden",true);
		$("#vernumche").attr("hidden",true);
		$("#verefectivo").attr("hidden",false);
		$("#verntarj").attr("hidden",true);
		$("#verbanco").attr("hidden",false);
		$("#vervouch").attr("hidden",true);
		$("#vertrans").attr("hidden",false);
		$("#vernumcue").attr("hidden",false);


	}else if ($(this).val()=="EFE") {

		$("#veremisor").attr("hidden",true);
		$("#vernumche").attr("hidden",true);
		$("#verefectivo").attr("hidden",false);
		$("#verntarj").attr("hidden",true);
		$("#verbanco").attr("hidden",true);
		$("#vervouch").attr("hidden",true);
		$("#vertrans").attr("hidden",true);
		$("#vernumcue").attr("hidden",true);
	}else if ($(this).val()=="TAR") {
		$("#veremisor").attr("hidden",false);
		$("#vernumche").attr("hidden",true);
		$("#verefectivo").attr("hidden",false);
		$("#verntarj").attr("hidden",false);
		$("#verbanco").attr("hidden",true);
		$("#vervouch").attr("hidden",false);
		$("#vertrans").attr("hidden",true);
		$("#vernumcue").attr("hidden",true);
	}

});
$(document).on("change","#tipo_pago",function(){
	if($(this).val()=="CON")
	{
		$("#mostrarcon").attr("hidden",false);
		$("#mostrarrem").attr("hidden",true);
	}else if ($(this).val()=="REM") {
		$("#mostrarrem").attr("hidden",false);
		$("#mostrarcon").attr("hidden",true);
	}
	else {
		$("#mostrarcon").attr("hidden",true);
		$("#mostrarrem").attr("hidden",true);
	}
});

$(document).on("keyup","#efectivov",function(evt){
	if(evt.keyCode !=13)
	{
		total_efectivov();
	}
	else
	{
		if(parseFloat($("#cambiov").val()) >=0)
		{
			display_notify("Success", "Factura realizada con exito!");
			imprimev();
			//setInterval("reload1();", 500);
		}
		else {
			display_notify("Warning", "Ingrese un valor mayor o igual al total facturado");
		}
	}
});

$(document).on("keyup","#numdoc",function(evt){
	if(evt.keyCode == 13)
	{
		if($(this).val()!="")
		{
			$("#nomcli").focus();
		}
		else {
			display_notify('Warning','Ingrese el numero del documento a imprimir');
		}
	}
});
$(document).on("keyup","#nomcli",function(evt){
	if(evt.keyCode == 13)
	{
		if($(this).val()!="")
		{
			if($("#tipo_impresion").val() == 'CCF')
			{
				$("#nitcli").focus();
			}
			else {
				if($("#con_pago").val()=='CHE'){
					$("#numche").focus();
				}else if ($("#con_pago").val()=='TRA') {
					$(".banco").select2('open');
				}else if ($("#con_pago").val()=='TAR') {
					$("#numtarj").focus();
				}

				else {
					$("#efectivov").focus();
				}

			}
		}
		else {
			display_notify('Warning','Ingrese el nombre del cliente');
		}
	}
});
$(document).on("keyup","#numche",function(evt){
	if(evt.keyCode == 13)
	{
		if($(this).val()!="")
		{
			$("#emisor").focus();
		}
		else {
			display_notify('Warning','Ingrese el numero de cheque!');
		}
	}
});
$(document).on("keyup","#numtarj",function(evt){
	if(evt.keyCode == 13)
	{
		if($(this).val()!="")
		{
			$("#emisor").focus();
		}
		else {
			display_notify('Warning','Ingrese el numero de tarjeta!');
		}
	}
});

$(document).on("keyup","#emisor",function(evt){
	if(evt.keyCode == 13)
	{
		if($(this).val()!="")
		{
			if ($("#con_pago").val()=='TAR') {
				$("#voucher").focus();
			}

			else {
				$("#efectivov").focus();
			}
		}
		else {
			display_notify('Warning','Ingrese el nombre de banco!');
		}
	}
});
$(document).on('select2:close', '.banco', function(evt)
{
	$('.cuentaba').select2('open');
});
$(document).on('select2:close', '.cuentaba', function(evt)
{
	$("#numtrans").focus();

});
$(document).on("keyup","#numtrans",function(evt){
	if(evt.keyCode == 13)
	{
		if($(this).val()!="")
		{
			$("#efectivov").focus();
		}
		else {
			display_notify('Warning','Ingrese el numero de Transferencia!');
		}
	}
});

$(document).on("keyup","#voucher",function(evt){
	if(evt.keyCode == 13)
	{
		if($(this).val()!="")
		{
			$("#efectivov").focus();
		}
		else {
			display_notify('Warning','Ingrese el numero de Voucher!');
		}
	}
});
$(document).on("keyup","#nitcli",function(evt){
	if(evt.keyCode == 13)
	{
		if($(this).val()!="")
		{
			$("#nrccli").focus();
		}
		else {
			display_notify('Warning','Ingrese el numero de NIT del cliente');
		}
	}
});
$(document).on("keyup","#nrccli",function(evt){
	if(evt.keyCode == 13)
	{
		if($(this).val()!="")
		{
			if($("#con_pago").val()=='CHE'){
				$("#numche").focus();
			}else if ($("#con_pago").val()=='TRA') {
				$(".banco").select2('open');
			}else if ($("#con_pago").val()=='TAR') {
				$("#numtarj").focus();
			}	else {
				$("#efectivov").focus();
			}
		}
		else {
			display_notify('Warning','Ingrese el numero de registro del cliente');
		}
	}
});

function total_efectivo(){
	var efectivo=parseFloat($('#efectivo').val());
	var totalfinal=parseFloat($('#totalfactura').val());
	var facturado= totalfinal.toFixed(2);
	$('#facturado').val(facturado);
	if (isNaN(parseFloat(efectivo))){
		efectivo=0;
	}
	if (isNaN(parseFloat(totalfinal))){
		totalfinal=0;
	}
	var cambio=efectivo-totalfinal;
	var cambio=round(cambio, 2);
	var	cambio_mostrar=cambio.toFixed(2);
	$('#cambio').val(cambio_mostrar);
}
function total_efectivov(){
	var efectivo=parseFloat($('#efectivov').val());
	var totalfinal=parseFloat($('#tot_fdo').val());
	var facturado= totalfinal.toFixed(2);
	$('#facturadov').val(facturado);
	if (isNaN(parseFloat(efectivo))){
		efectivo=0;
	}
	if (isNaN(parseFloat(totalfinal))){
		totalfinal=0;
	}
	var cambio=efectivo-totalfinal;
	var cambio=round(cambio, 2);
	var	cambio_mostrar=cambio.toFixed(2);
	$('#cambiov').val(cambio_mostrar);
}
function imprime1(){
	var numero_doc = $(".modal-body #fact_num").html();
	var print = 'imprimir_fact';
	var tipo_impresion = $("#tipo_impresion").val();

	var id_factura=$("#id_factura").val();
	if (tipo_impresion=="TIK"){
		var num_doc_fact = '';
		numero_factura_consumidor='';
	}
	else{
		var numero_factura_consumidor = $(".modal-body #num_doc_fact").val();
		var num_doc_fact = $(".modal-body #num_doc_fact").val();
	}
	var dataString = 'process=' + print + '&numero_doc=' + numero_doc + '&tipo_impresion=' + tipo_impresion + '&num_doc_fact=' + id_factura+'&numero_factura_consumidor='+numero_factura_consumidor;

	if (tipo_impresion=="CCF"){
		nit=$('.modal-body #nit').val();
		nrc=$('.modal-body #nrc').val();
		nombreape=$('.modal-body #nombreape').val();
		dataString +='&nit=' + nit+ '&nrc=' + nrc+'&nombreape=' + nombreape;
	}
	$.ajax({
		type: 'POST',
		url: urlprocess,
		data: dataString,
		dataType: 'json',
		success: function(datos) {
			var sist_ope = datos.sist_ope;
			var dir_print=datos.dir_print;
			var shared_printer_win=datos.shared_printer_win;
			var shared_printer_pos=datos.shared_printer_pos;
			var headers=datos.headers;
			var footers=datos.footers;
			var efectivo_fin = parseFloat($('#efectivo').val());
			var cambio_fin = parseFloat($('#cambio').val());

			//esta opcion es para generar recibo en  printer local y validar si es win o linux
			if (tipo_impresion == 'COF') {
				if (sist_ope == 'win') {
					$.post("http://"+dir_print+"printfactwin1.php", {
						datosventa: datos.facturar,
						efectivo: efectivo_fin,
						cambio: cambio_fin,
						shared_printer_win:shared_printer_win
					})
				} else {
					$.post("http://"+dir_print+"printfact1.php", {
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
					$.post("http://"+dir_print+"printenvwin1.php", {
						datosventa: datos.facturar,
						efectivo: efectivo_fin,
						cambio: cambio_fin,
						shared_printer_win:shared_printer_win
					})
				} else {
					$.post("http://"+dir_print+"printenv1.php", {
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
			if (tipo_impresion == 'TIK') {
				if (sist_ope == 'win') {
					$.post("http://"+dir_print+"printposwin1.php", {
						datosventa: datos.facturar,
						efectivo: efectivo_fin,
						cambio: cambio_fin,
						shared_printer_pos:shared_printer_pos,
						headers:headers,
						footers:footers,
					})
				} else {
					$.post("http://"+dir_print+"printpos1.php", {
						datosventa: datos.facturar,
						efectivo: efectivo_fin,
						cambio: cambio_fin,
						headers:headers,
						footers:footers,
					}, function(data, status) {

						if (status != 'success') {
							//alert("No Se envio la impresión " + data);
						}

					});
				}
			}
			if (tipo_impresion == 'CCF') {
				if (sist_ope == 'win') {
					$.post("http://"+dir_print+"printcfwin1.php", {
						datosventa: datos.facturar,
						efectivo: efectivo_fin,
						cambio: cambio_fin,
						shared_printer_win:shared_printer_win
					})
				} else {
					$.post("http://"+dir_print+"printcf1.php", {
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
			//  setInterval("reload1();", 500);
		}
	});
}

function imprime2(){
	//Utilizar la libreria esc pos php
	//Calcular los valores a guardar de cad item del inventario
	var i=0;
	var precio_venta,precio_venta, cantidad,id_prod,id_empleado;
	var elem1 = '';
	var descripcion='';
	var tipoprodserv = '';  tipoprod = '';
	var  StringDatos="";
	var id=$("select#tipo_entrada option:selected").val(); //get the value

	var id_cliente=$("select#id_cliente option:selected").val(); //get the value
	if (id=='0'){
		$('#tipo_entrada').focus();
	}
	var numero_doc=$("#numero_doc").val();
	var numero_doc2=$("#numero_doc2").val();
	var total_ventas=$('#total_dinero').text();
	var fecha_movimiento=$("#fecha").val();
	var fecha_movimiento2=$("#fecha2").val();

	if (numero_doc==undefined || numero_doc==''){
		numero_doc=0;
	}
	var verificaempleado;
	var verifica=[];
	$("#inventable>tbody tr ").each(function (index) {
		if (index>=0){
			//verificaempleado=false;
			var campo0,campo1, campo2, campo3, campo4, campo5, campo6;
			$(this).children("td").each(function (index2) {
				switch (index2){
					case 0:
					campo0 = $(this).text();
					if (campo0==undefined){
						campo0='';
					}
					break;
					case 1:
					campo1 = $(this).text();
					elem1 = campo1.split('(');
					descripcion=elem1[0];
					var tipoprodserv1 = elem1[1];
					var ln= tipoprodserv1.length-1;
					tipoprodserv = tipoprodserv1 .substring(0,ln);

					break;
					case 2:
					campo2 = $(this).text();
					break;
					case 4:
					campo3= $(this).find("#precio_venta").val();
					if (isNaN(campo3)==false){
						precio_venta=parseFloat(campo3);
					}
					break;
					case 5:
					campo4= $(this).find("#cant").val();
					if (isNaN(campo4)==false){
						cantidad=parseFloat(campo4);
					}
					break;
					case 6:
					campo5 = $(this).text();

				}


			});

			if(campo0!=""|| campo0==undefined || isNaN(campo0)==false ){
				//StringDatos+=campo0+"|"+tipoprodserv+"|"+precio_venta+"|"+cantidad+"|"+id_empleado+"|"+verificaempleado+"#";
				StringDatos+=campo0+"|"+descripcion+"|"+tipoprodserv+"|"+precio_venta+"|"+cantidad+"|"+id_empleado+"#";
				verifica.push(verificaempleado);
				i=i+1;
			}
		}

	});
	verifica.forEach(function (item, index, array) {
		if (item=='verificar'){
			verificaempleado='verificar';
		}
	});
	var id=$("select#tipo_entrada option:selected").val(); //get the value
	if (id=='1'){
		var dataString='process=print2'+'&stringdatos='+StringDatos+'&cuantos='+i+'&id='+id+'&numero_doc='+numero_doc+'&fecha_movimiento='+fecha_movimiento+'&id_cliente='+id_cliente;
		dataString+='&total_ventas='+total_ventas+'&verificaempleado='+verificaempleado;
	}
	if (id=='2'){
		var dataString='process=print2'+'&stringdatos='+StringDatos+'&cuantos='+i+'&id='+id+'&numero_doc='+numero_doc2+'&fecha_movimiento='+fecha_movimiento2+'&id_cliente='+id_cliente;
		dataString+='&total_ventas='+total_ventas+'&verificaempleado='+verificaempleado;
	}
	if (verificaempleado=='noverificar'){
		$.ajax({
			type:'POST',
			url:'editar_factura.php',
			data: dataString,
			dataType: 'json',
			success: function(datos){
				sist_ope=datos.sist_ope;
				//esta opcion es para generar recibo en  printer local y validar si es win o linux
				if (sist_ope=='win'){
					$.post("http://localhost:8080/variedades/printpos2.php",{datosventa:datos.facturar})
				}
				else {
					$.post("http://localhost/variedades/printpos2.php",{datosventa:datos.facturar})
				}
			}
		});
	}
	else{
		var typeinfo='Warning';
		var msg='Falta seleccionar Empleado que brinda algun servicio en Factura !';
		display_notify(typeinfo,msg);
	}

}
function imprimev(){
	var numero_doc = $("#numdoc").val();
	var print = 'imprimir_fact';
	var tipo_impresion = $("#tipo_impresion").val();
	var con_pago1 = $("#con_pago").val();
	var monto = $("#tot_fdo").val();
	var id_apertura =$('#id_apertura').val();
	var turno =$('#turno').val();
	var caja =$('#caja').val();
	var id_factura=$("#id_factura").val();
	if (tipo_impresion=="TIK" || tipo_impresion=="COB"){
		numero_factura_consumidor='';
	}
	else{
		var numero_factura_consumidor = $("#numdoc").val();
	}
	var dataString = 'process=' + print +'&con_pago1='+con_pago1+'&monto='+monto+'&turno=' + turno+ '&id_apertura=' + id_apertura+ '&numero_doc=' + numero_doc + '&tipo_impresion=' + tipo_impresion+'&id_cobro=' + id_factura+'&numero_factura_consumidor='+numero_factura_consumidor;

	if (tipo_impresion=="CCF" ||tipo_impresion=="COF"){
		nit=$('#nitcli').val();
		nrc=$('#nrccli').val();
		nombreape=$('#nomcli').val();
		dataString +='&nit=' + nit+ '&nrc=' + nrc+'&nombreape=' + nombreape;
	}
	if (con_pago1=="CHE"){
		numche=$('#numche').val();
		emisor=$('#emisor').val();
		dataString +='&numche=' + numche+ '&emisor=' + emisor;
	}
	if (con_pago1=="TRA"){
		banco=$('#banco').val();
		numcuenta=$('#numcuenta').val();
		numtrans=$('#numtrans').val();
		dataString +='&banco=' + banco+ '&numcuenta=' + numcuenta+ '&numtrans=' + numtrans;
	}
	if (con_pago1=="TAR"){
		numtarj=$('#numtarj').val();
		emisor=$('#emisor').val();
		voucher=$('#voucher').val();
		dataString +='&numtarj=' + numtarj+ '&emisor=' + emisor+ '&voucher=' + voucher;
	}
	$.ajax({
		type: 'POST',
		url: urlprocess,
		data: dataString,
		dataType: 'json',
		success: function(datos) {
			var sist_ope = datos.sist_ope;
			var dir_print=datos.dir_print;
			var shared_printer_win=datos.shared_printer_win;
			var shared_printer_pos=datos.shared_printer_pos;
			var headers=datos.headers;
			var footers=datos.footers;
			var efectivo_fin = parseFloat($('#efectivo').val());
			var cambio_fin = parseFloat($('#cambio').val());

			//esta opcion es para generar recibo en  printer local y validar si es win o linux
			if (tipo_impresion == 'COF') {
				if (sist_ope == 'win') {
					$.post("http://"+dir_print+"printfactwin1.php", {
						datosventa: datos.facturar,
						efectivo: efectivo_fin,
						cambio: cambio_fin,
						shared_printer_win:shared_printer_win
					})
				} else {
					$.post("http://"+dir_print+"printfact1_lab.php", {
						datosventa: datos.facturar,
						efectivo: efectivo_fin,
						cambio: cambio_fin
					}, function(data, status) {

						if (status != 'success')
						{
							//alert("No Se envio la impresión " + data);
						}
					});
				}
			}
			if (tipo_impresion == 'ENV') {
				if (sist_ope == 'win') {
					$.post("http://"+dir_print+"printenvwin1.php", {
						datosventa: datos.facturar,
						efectivo: efectivo_fin,
						cambio: cambio_fin,
						shared_printer_win:shared_printer_win
					})
				} else {
					$.post("http://"+dir_print+"printenv1.php", {
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
			if (tipo_impresion == 'TIK' ||tipo_impresion=='COB') {
				if (sist_ope == 'win') {
					$.post("http://"+dir_print+"printposwin1.php", {
						datosventa: datos.facturar,
						efectivo: efectivo_fin,
						cambio: cambio_fin,
						shared_printer_pos:shared_printer_pos,
						headers:headers,
						footers:footers,
					})
				} else {
					$.post("http://"+dir_print+"printpos1.php", {
						datosventa: datos.facturar,
						efectivo: efectivo_fin,
						cambio: cambio_fin,
						headers:headers,
						footers:footers,
					}, function(data, status) {
						if (status != 'success') {
							//alert("No Se envio la impresión " + data);
						}
					});
				}
			}
			if (tipo_impresion == 'CCF') {
				if (sist_ope == 'win') {
					$.post("http://"+dir_print+"printcfwin1.php", {
						datosventa: datos.facturar,
						efectivo: efectivo_fin,
						cambio: cambio_fin,
						shared_printer_win:shared_printer_win
					})
				} else {
					$.post("http://"+dir_print+"printcf1_lab.php", {
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
			setInterval("reload1();", 800);
		}
	});
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


function addProductList(id_prod, tipo, descr) {
	$('#inventable').find('tr#filainicial').remove();
	id_prod = $.trim(id_prod);
	id_factura= parseInt($('#id_factura').val());

	if(isNaN(id_factura))
	{
		id_factura=0;
	}
	//	var fila=1;
	urlprocess = $('#urlprocess').val();
	var dataString = 'process=consultar_stock'+'&id_producto=' + id_prod+ '&tipo=' + tipo;
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
								if (campo0 != undefined || campo0 != '') {
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
        var subtotal = subt(data.preciop, 1);
      subt_mostrar = subtotal.toFixed(2);
      var cantidades = "<td class='cell100 column5 text-success'><input type='text'  class='form-control decimal' id='cant' name='cant' value='1 'style='width:60px;' /></td>";

				tr_add += "<tr class='row100 head "+tipo+"' id='" + id_prod + "'>";
				tr_add += "<td class='cell100 column10 text-success id_pps'>" +id_prod + "<input type='hidden'  class='txt_box decimal2  cantx' id='unidadp' name='unidadp' value='"+data.unidadp+"'></td>";
				tr_add += "<td class='cell100 column30 text-success descp' id='desc'>" +descr + "<input type='hidden'  class='form-control ' readOnly id='id_prod' name='id_prod' value='" + id_prod + "'></td>";
        tr_add += "<td class='cell100 column10 text-success' id='cant_stock'>" + data.existencias + "</td>"
        tr_add += "<td class='cell100 column15 text-success preccs'>" + data.select + "</td>";
				tr_add += "<td class='cell100 column10 text-success' id='precio_ventas'><input type='text'  class='form-control decimal' id='precio_venta' name='precio_venta' value='"+data.preciop+"' readOnly></td>";
			  tr_add += cantidades;
        tr_add += "<td class='ccell100 column10'>" + "<input type='hidden'  id='subt_iva' name='subt_iva' value='0.0'>" + "<input type='text'  class='decimal form-control' id='subtotal_fin' name='subtotal_fin'  value='" + subt_mostrar + "'readOnly></td>";
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
	});

}
/*$(document).on('keyup', '.cant', function(evt){
var tr = $(this).parents("tr");
if(evt.keyCode == 13)
{
tr.find('.sel').select2("open");
}
});*/
/*$(document).on('select2:close', '.sel', function()
{
var tr = $(this).parents("tr");
if(evt.keyCode == 13)
{
tr.find('.sel1').select2("open");
}
});*/
/*$(document).on('keydown','.fecha', function (evt)
{
if (evt.keyCode == 8 || evt.keyCode == 9 || evt.keyCode == 13 || evt.keyCode == 37 || evt.keyCode == 39)
{

}
else
{
if((evt.keyCode>47 && evt.keyCode<60 ) || (evt.keyCode>95 && evt.keyCode<106 ))
{
inputval = $(this).val();
var string = inputval.replace(/[^0-8]/g, "");
var bloc1 = string.substring(0,2);
var bloc2 = string.substring(2,4);
var bloc3 = string.substring(4,7);
if(bloc2>12){
bloc2=12;
}
if(bloc1>31){
bloc1=31;
}
var string =bloc1 + "-" + bloc2+ "-" + bloc3;
$(this).val(string);
}
else
{
evt.preventDefault();
}

}
});*/

$(document).on('select2:close', '.sel2', function(evt)
{
	$("#producto_buscar").focus();

});
/*
$(document).on('select2:close', '.sel1', function()
{
var tr =$(this).parents("tr");
//tr.find(".fecha").focus();

tr.find(".sel2").select2('open');
});
$(document).on('change', '.fecha', function(e)
{
var tr = $(this).parents("tr");
$(this).datepicker('hide');
tr.find(".hora").focus();
});
$(document).on('change', '.hora', function(e)
{
var tr = $(this).parents("tr");
if(e.keyCode == 13)
{
tr.find(".sel2").select2('open');
}
});*/

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
		//  var id2 = $(this).find("#desc2").val();
		if(id == id1 && tipo)
		{
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
