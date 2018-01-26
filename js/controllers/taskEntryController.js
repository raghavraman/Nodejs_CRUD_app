$(function() {

	//Function to invoke edit user with data
    $(".open-EditTaskEntry").on("click", function() {
        console.log("sadas");
        var task_id= $(this).data('task_id'),
        	duration = $(this).data('duration'),
            note = $(this).data('note'),
            start_time = $(this).data('start_time'),
        	id = $(this).data('id');
            console.log(id);
        $(".modal-body #task_id").val(task_id);
        $(".modal-body #duration").val(duration);
        $(".modal-body #note").val(note);
        $(".modal-body #start_time").val(start_time);
        $(".modal-body #id").val(id);
    });

    //Function to invoke delete user with id

    $(".open-deleteTaskEntry").on("click", function() {
       	var id = $(this).data('id');
        $(".modal-body #id").val(id);
    });

    $(".submitUpdate").on("click", function() {
        console.log("Updating the Task Entry details");
        var data = {},
        id= $(".modal-body #id").val();
        data.task_id=$(".modal-body #task_id").val();
        data.duration=$(".modal-body #duration").val();
        data.note=$(".modal-body #note").val();
        data.start_time=$(".modal-body #start_time").val();
        $.ajax({
            url: '/updatetaskentry/'+id,
            type: 'PUT',
            data: data,
            success: function(res) {
            	if(res.code==200){
            		$('#editTaskEntry').modal('hide');
                	alert('Task Entry details updated');
                	window.location.href="/taskentries";
            	}else{
            		$('#editTaskEntry').modal('hide');
            		alert('error occured in Updating Task Entry');
            		window.location.href="/taskentries";	
            	}
            },
            error: function(error){
            	$('#editTaskEntry').modal('hide');
                    alert('error occured in Updating Task Entry');
                    window.location.href="/taskentries";    
            }
        });
    });


    $(".deleteTaskEntry").on("click", function() {
        console.log("Deleting the Task Entry details");
        var id= $(".modal-body #id").val();
        $.ajax({
            url: '/deletetaskentry/'+id,
            type: 'DELETE',
            success: function(res) {
            	console.log(res);
            	if(res.code==200){
            		$('#deleteTaskEntry').modal('hide');
                	alert('Task Entry successfully deleted');
                	window.location.href="/taskentries";	
            	}else{
            		$('#deleteTaskEntry').modal('hide');
            		alert('error occured in deleting the Task Entry');
            		window.location.href="/taskentries";	
            	}
            },
            error: function(error){
            	$('#deleteTaskEntry').modal('hide');
                    alert('error occured in deleting the Task Entry');
                    window.location.href="/taskentries";    
            }
        });
    });
});