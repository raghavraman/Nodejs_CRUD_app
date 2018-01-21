$(function() {

	//Function to invoke edit user with data
    $(".open-EditUser").on("click", function() {
        console.log("sadas");
        var username = $(this).data('username'),
        	email = $(this).data('email'),
        	id = $(this).data('id');
        $(".modal-body #username").val(username);
        $(".modal-body #email").val(email);
        $(".modal-body #id").val(id);
    });

    //Function to invoke delete user with id

    $(".open-deleteUser").on("click", function() {
       	var id = $(this).data('id');
        $(".modal-body #id").val(id);
    });

    $(".submitUpdate").on("click", function() {
        console.log("Updating the user details");
        var data = {},
        id= $(".modal-body #id").val();
        data.username = $(".modal-body #username").val();
        data.email = $(".modal-body #email").val();

        $.ajax({
            url: '/updateuser/'+id,
            type: 'PUT',
            data: data,
            success: function(res) {
            	if(res.code==200){
            		$('#editUser').modal('hide');
                	alert('User details updated');
                	window.location.href="/users";
            	}else{
            		$('#editUser').modal('hide');
            		alert('error occured in Updating user');
            		window.location.href="/users";	
            	}
            },
            error: function(error){
            	$('#editUser').modal('hide');
            	alert('error occured in Updating user');
            	window.location.href="/users";
            }
        });
    });


    $(".deleteUser").on("click", function() {
        console.log("Deleting the user details");
        var id= $(".modal-body #id").val();
        $.ajax({
            url: '/deleteuser/'+id,
            type: 'DELETE',
            success: function(res) {
            	console.log(res);
            	if(res.code==200){
            		$('#deleteuser').modal('hide');
                	alert('User successfully deleted');
                	window.location.href="/users";	
            	}else{
            		$('#deleteuser').modal('hide');
            		alert('error occured in deleting the user');
            		window.location.href="/users";	
            	}
            },
            error: function(error){
            	$('#deleteuser').modal('hide');
            	alert('error occured in deleting the user');
            	window.location.href="/users";
            }
        });
    });
});