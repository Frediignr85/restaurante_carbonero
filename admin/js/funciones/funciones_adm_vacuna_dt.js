$(document).ready(function() {    
   	buscar();
	$("#buscar").click(function(){
		buscar();
	});
   
});
function buscar()
{
	var ini = $("#desde").val();
    var fin = $("#hasta").val();
    var dataString="ini="+ini+"&fin="+fin;
    $.ajax({
		type : "POST",
		url : "admin_vacuna_dt.php",
		data : dataString,
		success : function(datax) {
			$("#refill").html(datax);
		}
	});
}
$(function ()
{
	$(document).on('hidden.bs.modal', function(e)
	{
		var target = $(e.target);
		target.removeData('bs.modal').find(".modal-content").html('');
	});
	$(document).on('click','#btn_delete', function()
	{
		deleted();
	});
});
function reload1()
{
	location.href = "admin_vacuna.php";
}
function deleted()
{
	var id_plan = $("#id_plan").val();
	$.ajax({
		type:'POST',
		url:'cancelar_plan.php',
		data:"process=delete&id_plan="+id_plan,
		dataType:'json',
		success: function(datax)
		{
			display_notify(datax.typeinfo, datax.msg);
			if(datax.typeinfo=="Success")
			{
				setInterval("reload1();",1000);
			}
		},
	});
}