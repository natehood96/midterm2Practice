/*global $*/
$(document).ready(function() {
  $("#postComment").click(function() {
    var myobj = { Name: $("#name").val(), Comment: $("#comment").val() };
    var jobj = JSON.stringify(myobj);
    $("#json").text(jobj);
    var url = "comment";
    $.ajax({
      url: url,
      type: "POST",
      data: jobj,
      contentType: "application/json; charset=utf-8",
      success: function(data, textStatus) {
        $("#done").html(textStatus);
      }
    })
  });
     $("#getComments").click(function() {
       var url = 'comment';
       url += '?name=' + $("#name").val();
       console.log(url);
    $.getJSON(url, function(data) {
      console.log(data);
      var everything = "<ul>";
      for(var i in data) {
        var com = data[i];
        everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
      }
      everything += "</ul>";
      $("#comments").html(everything);
    });
  });
  

  
  
  
  $('#deleteComments').on('click', function() {
      // var userId = $(this).attr('data-id');
      var url = "comment";
      $.getJSON(url, function(data) {
        $.ajax({
           type: "DELETE",
           url: url,
           success: function(result, textStatus) {
           $("#done").html(textStatus);
           }
        })
    });
   });
   
   
   

   
   
   
    // $("#deleteComments").click(function() {
  //   $.getJSON('comment', function(data) {
  //     console.log("myData: " +data);
  //     var everything = "<ul>";
  //     for(var i in data) {
  //       com = data[i];
  //       console.log(com.Name);
  //       delete(data[i]);
  //       console.log(com.Name);
  //       everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
  //     }
  //     everything += "</ul>";
  //     $("#comments").html(everything);
  //   });
  // });
   
});
