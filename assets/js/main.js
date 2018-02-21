// Initial array of gifs
var celebrityGifs = ["Bill Murray", "Leo DiCaprio", "Michael B. Jordan", "Leslie Jones"];

// Function for dumping the JSON content for each button into the div
function displayGifs() {

    var gif = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=niNkgKdPVBHsWcHSnD4iSleAqH99HRaJ&limit=" + limit;
    var limit = 10;

    // Starting the AJAX
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        for (var a = 0; a < limit; a++); {

            // Creating a div to hold the gif
            var gifDiv = $("<div class='gif'>");

            // Storing the rating data
            var rating = response.data[a].rating;
            console.log(response);

            // Creating an element to have the rating displayed
            var pRating = $("<p>").text("Rating: " + rating);

            // Displaying the rating
            gifDiv.append(pRating);

            //Creating an image for the gif
            var gifImg = $("<img>");

            

            // Putting the entire gif above the previous gif
            $("#gifs-view").prepend(gifDiv);

        }

    });
}


// Function for displaying gifs data
function renderButtons() {

    // Deleting the gif buttons prior to adding new ones
    // Which is necessary otherwise we will repeat buttons
    $("#buttons-view").empty();

    //Looping through array of gifs
    for (var i = 0; i < celebrityGifs.length; i++) {

        // Then generate buttons for each gif in array
        var a = $("<button>");
        // Adding a class
        a.addClass("gif")
        // Adding a data-attribute
        a.attr("data-name", celebrityGifs[i]);
        // Providing the initial button text
        a.text(celebrityGifs[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

//On click event for gif button
$("#add-gif").on("click", function (event) {
    //Prevent default behavior
    event.preventDefault();

    //Grab gif from input box
    var gif = $("#gif-input").val().trim();

    // Adding the gif from the textbox to our array
    celebrityGifs.push(gif);
    console.log(celebrityGifs)

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Function for displaying the gif info
// Using $(document).on to add event listeners to dynamically generated elements
$(document).on("click", ".gif", displayGifs);

// Calling the renderButtons function to display the initial buttons
renderButtons();