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

});

function startTimer(input){
    console.log(input);
     $.ajax({
            url: '/starttimer/'+input,
            type: 'PUT',
            success: function(res) {
                if(res.code==200){
                    debugger;
                    alert('Timer Started');
                    window.location.href="/timetracker";
                }else{
                    alert('error occured in Starting timer user');
                    window.location.href="/timetracker";  
                }
            },
            error: function(error){
                     alert('error occured in Starting timer user');
                    window.location.href="/timetracker";  
            }
        });
}

function stopTimer(id, startTime, duration){
    console.log(input);
    data.startTime = startTime;
    data.duration = duration;
     $.ajax({
            url: '/stopTimer/'+input,
            type: 'PUT',
            data:data,
            success: function(res) {
                if(res.code==200){
                    debugger;
                    alert('Timer Started');
                    window.location.href="/timetracker";
                }else{
                    alert('error occured in Starting timer user');
                    window.location.href="/timetracker";  
                }
            },
            error: function(error){
                     alert('error occured in Starting timer user');
                    window.location.href="/timetracker";  
            }
        });
}
