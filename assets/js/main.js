//Below, I try cover four main processes:
//1. AJAX call to the API and displaying gif
//2. Starting and stopping the gif's animation per click
//3. Displaying buttons from the celebrityGifs array
//4. Creating new buttons per user's form entry

$(document).ready(function () {

    // Initial array of gifs
    var celebrityGifs = ["Bill Murray", "Leo DiCaprio", "Michael B. Jordan", "Leslie Jones"];

    //GET function for information from API
    function displayImg() {

        var gif = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=niNkgKdPVBHsWcHSnD4iSleAqH99HRaJ&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .done(function (response) {
                console.log(response)

                $("#gifs-view").empty();

                // Storing the data from the AJAX request in the results variable, exercise 14
                var results = response.data;

                for (var j = 0; j < results.length; j++); {

                    // Creating a div to hold the gif
                    var gifDiv = $("<div class='holdGif'>");

                    // Storing the rating data
                    var rating = results[j].rating;
                    // Creating an element to have the rating displayed
                    var pRating = $("<p>").text("Rating: " + rating);

                    var urlStill = results[j].images.fixed_height_still.url;
                    var urlPlay = results[j].images.fixed_height.url;

                    //Creating an image, class, etc. for the gif
                    var gifImg = $("<img>").addClass("gif").attr("src", urlStill).attr("data-still", urlStill).attr("data-animate", urlPlay).attr("data-state", "still");

                    //Displaying the image
                    gifDiv.append(gifImg);
                    // Displaying the rating
                    gifDiv.append(pRating);

                    // Putting the entire gif above the previous gif
                    $("#gifs-view").append(gifDiv);

                }
                $(".gif").on("click", function () {
                    var state = $(this).attr("data-state");

                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    }

                    else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }

                });

            });
    };

    // Function for displaying buttons
    function renderButtons() {

        // Deleting the gif buttons prior to adding new ones
        // Which is necessary otherwise we will repeat buttons
        $("#buttons-view").empty();

        //Looping through array of gifs
        for (var i = 0; i < celebrityGifs.length; i++) {

            // Then generate buttons for each gif in array
            var a = $("<button>");
            // Adding a class and id
            a.attr("class", "btnInput");
            a.attr("id", "input");
            // Adding a data-attribute
            a.attr("data-name", celebrityGifs[i]);
            // Providing the initial button text
            a.text(celebrityGifs[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }

    //Creating new buttons
    $("#add-gif").on("click", function (event) {
        //Prevent default behavior
        event.preventDefault();

        //Grab gif from input box
        var gif = $("#gif-input").val().trim();
        form.reset();

        // Adding the gif from the textbox to our array
        celebrityGifs.push(gif);
        console.log(celebrityGifs)

        // Calling renderButtons which handles the processing of our array
        renderButtons();
    });

    // Calling the renderButtons function to display the initial buttons
    renderButtons();

});