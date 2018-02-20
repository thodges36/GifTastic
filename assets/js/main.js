     // Initial array of gifs
     var celebrityGifs = ["Bill Murray", "Leo DiCaprio", "Michael B. Jordan", "Leslie Jones"];

     // Function for displaying gifs
     function renderGifs(){

        // Deleting the gif buttons prior to adding new ones
        // Which is necessary otherwise we will repeat buttons
        $("#en").empty();

        //Looping through array of gifs
        for (var i = 0; i < celebrityGifs.length; i++) {

            // Then generate buttons for each gif in array
            var a = $("<button>");
            // Adding a class
            a.addClass("")
        }
     }


     //Trigger AJAX call
$("#enterTerm").on("click", function(event){
    //Prevent default behavior
    event.preventDefault();

    //Grab gif from input box
    var gif = $("#enterTerm").val();

    //Construct gif via URL
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=niNkgKdPVBHsWcHSnD4iSleAqH99HRaJ&limit=5";
    
    //Hit url with ajax
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        $("#movie-view").text(JSON.stringify(response));
      });
});