$(function() {

	//Function to invoke edit user with data
    $(".open-EditCustomer").on("click", function() {
        console.log("sadas");
        var username = $(this).data('username'),
        	email = $(this).data('email'),
        	id = $(this).data('id');
        $(".modal-body #username").val(username);
        $(".modal-body #email").val(email);
        $(".modal-body #id").val(id);
    });

    //Function to invoke delete user with id

    $(".open-deleteCustomer").on("click", function() {
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
            url: '/updatecustomer/'+id,
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


    $(".deleteCustomer").on("click", function() {
        console.log("Deleting the user details");
        var id= $(".modal-body #id").val();
        $.ajax({
            url: '/deletecustomer/'+id,
            type: 'DELETE',
            success: function(res) {
            	console.log(res);
            	if(res.code==200){
            		$('#deleteCustomer').modal('hide');
                	alert('Customer successfully deleted');
                	window.location.href="/users";	
            	}else{
            		$('#deleteuser').modal('hide');
            		alert('error occured in deleting the user');
            		window.location.href="/users";	
            	}
            },
            error: function(error){
            	$('#deleteCustomer').modal('hide');
            	alert('error occured in deleting the user');
            	window.location.href="/users";
            }
        });
    });
});