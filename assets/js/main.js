//Below, I try cover four main processes:
//1. AJAX call to the API and displaying gif
//2. Starting and stopping the gif's animation per click
//3. Displaying buttons from the celebrityGifs array
//4. Creating new buttons per user's form entry

$(document).ready(function () {

    // Initial array of gifs
    var celebrityGifs = ["Bill Murray", "Leo DiCaprio", "Michael B. Jordan", "Leslie Jones"];

    function displayImg() {

        //The buttons that appear (new and existing) on the page starts the function
        $("#gifs-view").empty();

        var gif = $(this).attr("data-name");
        var limit = 10;
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=niNkgKdPVBHsWcHSnD4iSleAqH99HRaJ&limit=" + limit;

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response)

                // Storing the data from the AJAX request in the results variable, exercise 14
                var results = response.data;

                for (var j = 0; j < limit; j++); {

                    // Creating a div to hold the gif
                    var gifDiv = $("<div class='holdGif'>");

                    //Creating an image for the gif
                    var gifImg = $("<img>");
                    // Fetching the image and setting up various states, see exercise 15
                    gifImg.attr("src", results[j].images.original_still.url);
                    gifImg.attr("data-still", results[j].images.original_still.url);
                    gifImg.attr("data-animate", results[j].images.original.url);
                    gifImg.attr("data-state", "still");
                    gifImg.attr("class", "gif");
                    //Displaying the image
                    gifDiv.append(gifImg);

                    // Storing the rating data
                    var rating = results[j].rating;
                    // Creating an element to have the rating displayed
                    var pRating = $("<p>").text("Rating: " + rating);
                    // Displaying the rating
                    gifDiv.append(pRating);

                    // Putting the entire gif above the previous gif
                    $("#gifs-view").prepend(gifDiv);

                }
            });

    };

    //Function for the gif's image state, see exercise 15
    function stateChange() {

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if (state === "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if (state === "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
    }


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

    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", stateChange);

});