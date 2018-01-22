$(function() {

	//Function to invoke edit user with data
    $(".open-EditProject").on("click", function() {
        console.log("sadas");
        var project_name= $(this).data('project_name'),
        	customer_id = $(this).data('customer_id'),
        	id = $(this).data('id');
        $(".modal-body #project_name").val(project_name);
        $(".modal-body #customer_id").val(customer_id);
        $(".modal-body #id").val(id);
    });

    //Function to invoke delete user with id

    $(".open-deleteProject").on("click", function() {
       	var id = $(this).data('id');
        $(".modal-body #id").val(id);
    });

    $(".submitUpdate").on("click", function() {
        console.log("Updating the user details");
        var data = {},
        id= $(".modal-body #id").val();
        data.project_name=$(".modal-body #project_name").val();
        data.customer_id=$(".modal-body #customer_id").val();
        $.ajax({
            url: '/updateproject/'+id,
            type: 'PUT',
            data: data,
            success: function(res) {
            	if(res.code==200){
            		$('#editProject').modal('hide');
                	alert('Project details updated');
                	window.location.href="/projects";
            	}else{
            		$('#editProject').modal('hide');
            		alert('error occured in Updating Project');
            		window.location.href="/projects";	
            	}
            },
            error: function(error){
            	$('#editProject').modal('hide');
            	alert('error occured in Project user');
            	window.location.href="/projects";
            }
        });
    });


    $(".deleteProject").on("click", function() {
        console.log("Deleting the user details");
        var id= $(".modal-body #id").val();
        $.ajax({
            url: '/deleteproject/'+id,
            type: 'DELETE',
            success: function(res) {
            	console.log(res);
            	if(res.code==200){
            		$('#deleteProject').modal('hide');
                	alert('Project successfully deleted');
                	window.location.href="/projects";	
            	}else{
            		$('#deleteProject').modal('hide');
            		alert('error occured in deleting the Projects');
            		window.location.href="/projects";	
            	}
            },
            error: function(error){
            	$('#deleteProject').modal('hide');
                    alert('error occured in deleting the Projects');
                    window.location.href="/projects";   
            }
        });
    });
});