$(function() {

	//Function to invoke edit user with data
     $(".open-EditTaskEntry").on("click", function() {
        console.log("sadas");
        var task_id= $(this).data('task_id'),
            duration = $(this).data('duration'),
            note = $(this).data('note'),
            start_time = $(this).data('start_time'),
            id = $(this).data('id');
        $(".modal-body #task_id").val(task_id);
        $(".modal-body #duration").val(duration);
        $(".modal-body #note").val(note);
        $(".modal-body #start_time").val(start_time);
        $(".modal-body #id").val(id);
    });

    //Function to invoke delete user with id

    $(".open-deleteUser").on("click", function() {
       	var id = $(this).data('id');
        $(".modal-body #id").val(id);
    });

     $(".submitUpdate").on("click", function() {
        console.log("Updating the Task Entry details");
        var data = {},
        id= $(".modal-body #id").val();
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
                    window.location.href="/timetracker"; 
                }else{
                    $('#editTaskEntry').modal('hide');
                    alert('error occured in Updating Task Entry');
                    window.location.href="/timetracker";     
                }
            },
            error: function(error){
                $('#editTaskEntry').modal('hide');
                    alert('error occured in Updating Task Entry');
                    window.location.href="/timetracker"; 
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
                    alert('Timer Started');
                    window.location.href="/timetracker";
                }else{
                    alert('error occured in Starting timer ');
                    window.location.href="/timetracker";  
                }
            },
            error: function(error){
                     alert('error occured in Starting timer ');
                    window.location.href="/timetracker";  
            }
        });
}

function stopTimer(input){
    console.log(input);
    var data={}
    var startTimeStr = $(input).attr('data-time');
    var oldDur = $(input).attr('data-duration');
    var id = $(input).attr('data-id');
    console.log(startTimeStr);
    var old_time = moment(startTimeStr, 'HH:mm:ss');
    var duration = moment().diff(old_time,'seconds');
    data.duration =parseInt(duration)+parseInt(oldDur);
    
     $.ajax({
            url: '/stopTimer/'+id,
            type: 'PUT',
            data:data,
            success: function(res) {
                if(res.code==200){
                    alert('Timer Stopped');
                    window.location.href="/timetracker";
                }else{
                    alert('error occured in STOPPING timer ');
                    window.location.href="/timetracker";  
                }
            },
            error: function(error){
                     alert('error occured in STOPPING timer ');
                    window.location.href="/timetracker";  
            }
        });
}
function report(id) {
  // if (period=="") return; // please select - possibly you want something else here
  console.log(id);
window.location.href="/timetracker?project_id="+id;
            

}
