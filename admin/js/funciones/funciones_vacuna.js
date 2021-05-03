$(document).ready(function(){
	$(".select").select2();
	show_data();
	show_data1();
	$("#reloadd").click(function()
	{
		if($("#fecha").val() != "")
		{
			show_data();
			show_data1();
		}
		else
		{
			display_notify("Warning", "POr favor seleccione una fecha");
		}
	});
	setInterval("show_data();", 300000);
	setInterval("show_data1();", 300000);
});

$(function ()
{
	// Clean the modal form
	$(document).on('hidden.bs.modal', function(e)
	{
		var target = $(e.target);
		target.removeData('bs.modal').find(".modal-content").html('');
	});
	$(document).on('click','#btnAplicar', function()
	{
		aplicar();
	});
	
});	
function autosave(val)
{
	var name=$('#name').val(); 
	if (name==''|| name.length == 0){
		var	typeinfo="Info";
		var msg="The field name is required";
		display_notify(typeinfo,msg);
		$('#name').focus();
	}
	else
	{
		
	}	
}	
function reload1()
{
	location.href = 'consulta.php';	
}

function show_data()
{
	var fecha = $("#fecha").val();
	$.ajax({
		type:'POST',
		url:'vacuna.php',
		data:"process=buscar&fecha="+fecha,
		dataType:'json',
		success: function(datax)
		{
			if(datax.typeinfo=="Success")
			{
				if(datax.num>0)
				{
					$("#inyecc").show();
				}
				else
				{
					$("#inyecc").hide();
				}
				if(datax.num1>0)
				{
					$("#vacum").show();
				}
				else
				{
					$("#vacum").hide();
				}
				$("#table").html(datax.table);
				$("#table2").html(datax.table1);
			}
			else
			{
			}
		},
	});
}
function show_data1()
{
	var fecha = $("#fecha").val();
	$.ajax({
		type:'POST',
		url:'vacuna.php',
		data:"process=buscar1&fecha="+fecha,
		dataType:'json',
		success: function(datax)
		{
			if(datax.typeinfo=="Success")
			{
				if(datax.num>0)
				{
					$("#plan").show();
				}
				else
				{
					$("#plan").hide();
				}
				$("#table1").html(datax.table);
			}
			else
			{
			}
		},
	});
}
function aplicar(id_v=0)
{	if (id_v == 0) 
	{
		var id_vacuna = $("#id_vacuna").val();
	}
	else
	{
		id_vacuna=id_v;
	}
	
	$.ajax({
		type:'POST',
		url:"aplicar_vacuna.php",
		data: 'process=deleted&id_vacuna='+id_vacuna,			
		dataType: 'json',
		success: function(datax)
		{	
			if(id_v==0)
			{
				display_notify(datax.typeinfo,datax.msg);
			}
			if(datax.typeinfo == "Success")
			{
				show_data();	
				$("#viewModal .cerrar").click();	
			}				
		}
	});   
}
