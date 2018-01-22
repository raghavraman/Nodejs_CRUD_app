$(function() {

	//Function to invoke edit user with data
    $(".open-EditCustomer").on("click", function() {
        console.log("sadas");
        var company= $(this).data('company'),
        	state = $(this).data('state'),
            address = $(this).data('address'),
            city = $(this).data('city'),
            zip = $(this).data('zip'),
        	id = $(this).data('id');
        $(".modal-body #company").val(company);
        $(".modal-body #state").val(state);
        $(".modal-body #address").val(address);
        $(".modal-body #city").val(city);
        $(".modal-body #zip").val(zip);
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
        data.company=$(".modal-body #company").val();
        data.state=$(".modal-body #state").val();
        data.address=$(".modal-body #address").val();
        data.city=$(".modal-body #city").val();
        data.zip=$(".modal-body #zip").val();
        $.ajax({
            url: '/updatecustomer/'+id,
            type: 'PUT',
            data: data,
            success: function(res) {
            	if(res.code==200){
            		$('#editCustomer').modal('hide');
                	alert('Customer details updated');
                	window.location.href="/customers";
            	}else{
            		$('#editCustomer').modal('hide');
            		alert('error occured in Updating Customer');
            		window.location.href="/customers";	
            	}
            },
            error: function(error){
            	$('#editCustomer').modal('hide');
            	alert('error occured in customer user');
            	window.location.href="/customers";
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
                	window.location.href="/customers";	
            	}else{
            		$('#deleteCustomer').modal('hide');
            		alert('error occured in deleting the Customer');
            		window.location.href="/customers";	
            	}
            },
            error: function(error){
            	$('#deleteCustomer').modal('hide');
            	alert('error occured in deleting the customer');
            	window.location.href="/customers";
            }
        });
    });
});