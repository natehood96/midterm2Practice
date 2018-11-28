angular.module('voting', [])
.controller('MainCtrl', [
  '$scope', '$http',
  function($scope,$http){
    $scope.candidates = [];
    $scope.ballot = [];
    $scope.getAll = function(){
      return $http.get('/voting').success(function(data){
        angular.copy(data, $scope.candidates);
      });
    };
    $scope.getAll();
    $scope.create = function(candidate) {
      return $http.post('/voting', candidate).success(function(data){
        $scope.candidates.push(data);
      });
    };
    $scope.devote = function() {
      console.log("in Devote");
      angular.forEach($scope.candidates, function(value,key){
        if(value.selected){
          $scope.upvote(value);
          $scope.ballot.push(value);
        }
      });
    }
    
    $scope.upvote = function(candidate) {
      return $http.put('/voting/'+ candidate._id + '/upvote')
      .success(function(data){
        console.log("upvote worked");
        candidate.upvotes += 1;
      });
    };
    
    $scope.addCandidate = function(){
      var newObj = {Name:$scope.formContent, Votes: 0};
      $scope.create(newObj);
      $scope.formContent = '';
    }
    
    $scope.incrementUpvotes = function(candidate) {
      $scope.upvote(candidate);
    };
    
    $scope.delete = function(candidate){
      console.log("Deleting Name " + candidate.Name+ " ID " + candidate._id);
      $http.delete('/voting/'+candidate._id)
      .success(function(data){
        console.log("delete worked");
      });
      $scope.getAll();
    };
  }
]);


/*
$(document).ready(function() {
  $("#postCandidate").click(function() {
    var myobj = { Name: $("#name").val(), Votes: $("#vote").val() };
    var jobj = JSON.stringify(myobj);
    $("#json").text(jobj);
    var url = "candidate";
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
  
  
     $("#getCandidates").click(function() {
       var url = 'candidate';
       url += '?name=' + $("#name").val();
       console.log(url);
    $.getJSON(url, function(data) {
      console.log(data);
      var everything = "<ul>";
      for(var i in data) {
        var com = data[i];
        everything += "<li> Name: " + com.Name + " -- Votes: " + com.Votes + "</li>";
      }
      everything += "</ul>";
      $("#pasteVotes").html(everything);
    });
  });
  
  
  
  $('#deleteComments').on('click', function() {
      // var userId = $(this).attr('data-id');
      var url = "candidate";
      url += '?name=' + $("#name").val();
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

*/
