$(function() {

	//Function to invoke edit Task with data
    $(".open-EditTask").on("click", function() {
        var project_id= $(this).data('project_id'),
        	user_id = $(this).data('user_id'),
            task_name = $(this).data('task_name'),
        	id = $(this).data('id');
        $(".modal-body #project_id").val(project_id);
        $(".modal-body #user_id").val(user_id);
        $(".modal-body #task_name").val(task_name);
        $(".modal-body #id").val(id);
    });

    //Function to invoke delete Task with id

    $(".open-deleteTask").on("click", function() {
       	var id = $(this).data('id');
        $(".modal-body #id").val(id);
    });

    $(".submitUpdate").on("click", function() {
        console.log("Updating the Task details");
        var data = {},
        id= $(".modal-body #id").val();
        data.project_id=$(".modal-body #project_id").val();
        data.user_id=$(".modal-body #user_id").val();
        data.task_name=$(".modal-body #task_name").val();
        $.ajax({
            url: '/updatetask/'+id,
            type: 'PUT',
            data: data,
            success: function(res) {
            	if(res.code==200){
            		$('#editTask').modal('hide');
                	alert('Task details updated');
                	window.location.href="/tasks";
            	}else{
            		$('#editTask').modal('hide');
            		alert('error occured in Updating Task');
            		window.location.href="/tasks";
            	}
            },
            error: function(error){
            	$('#editTask').modal('hide');
                    alert('error occured in Updating Task');
                    window.location.href="/tasks";
            }
        });
    });


    $(".deleteTask").on("click", function() {
        console.log("Deleting the Task details");
        var id= $(".modal-body #id").val();
        $.ajax({
            url: '/deletetask/'+id,
            type: 'DELETE',
            success: function(res) {
            	console.log(res);
            	if(res.code==200){
            		$('#deleteTask').modal('hide');
                	alert('Task successfully deleted');
                	window.location.href="/tasks";	
            	}else{
            		$('#deleteTask').modal('hide');
            		alert('error occured in deleting the Tasks');
            		window.location.href="/tasks";    
            	}
            },
            error: function(error){
            	$('#deleteTask').modal('hide');
                    alert('error occured in deleting the Tasks');
                    window.location.href="/tasks";    
            }
        });
    });
});