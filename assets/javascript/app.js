// SETUP VARIABLES
// =====================================================================
// var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=nNJaO7RRux2S8GgjGHR8eQiVlVx79M9r&limit=10";
var queryURLBase = "https://api.giphy.com/v1/gifs/search?api_key=nNJaO7RRux2S8GgjGHR8eQiVlVx79M9r&limit=10";
console.log("queryURLBase: " + queryURLBase);

// Populate buttons into "animal-buttons" div
var topics = ["happy", "sad", "angry", "anxious", "hilarious", "jealous", "cocky", "excited"];

function runQuery(input) {
    // Performing an AJAX request with the queryURL
    $.ajax({
        url: input,
        method: "GET"
    }).then(function (response) {

        // De-reference data in response by storing to variable "results"
        var results = response.data;

        // FOR LOOP ADDING GIFS TO PAGE
        for (var i = 0; i < results.length; i++) {

            // Create div for all giphs and respective information about them (Ratings) to be appended too.
            var $emotionalDiv = $("<div>");
            $emotionalDiv.attr("id", "gif-div");
            // Create paragraph html element and place Rating of giph inside
            var $p = $("<p>").text("Rating " + results[i].rating);
            // Create image div
            var $emotionalGiphy = $("<img>");
            // Add "src" attribute to image element and pull url from results placing still image of giphy
            $emotionalGiphy.attr("src", results[i].images.fixed_width_still.url);
            // Add width 100% for styling/layout purposes
            $emotionalGiphy.attr("style", "width:100%");
            // Add "data-state" attribute to image element called "data-still" so we can reference this later to stop and start giphy
            $emotionalGiphy.attr("data-still", results[i].images.fixed_width_still.url);
            // Add "data-state" attribute to image element called "data-animate" so we can reference this later to stop and start giphy
            $emotionalGiphy.attr("data-animate", results[i].images.fixed_width.url);
            // Add "data-state" attribute called "still" 
            $emotionalGiphy.attr("data-state", "still");
            // Add class to reference later to stop and start giphy
            $emotionalGiphy.addClass("gif");
            // Append div with giphy and paragraph text
            $emotionalDiv.append($emotionalGiphy);
            $emotionalDiv.append($p);
            
            if (i === 0 || i === 1 || i === 2) {
            // Prepend div containing giphy and paragraph text to hardcoded div in HTML. Use Prepend so the div is added to the beginning of the div not at the end. 
            $("#first-gif-column").prepend($emotionalDiv);
            } else if (i === 3 || i === 4 || i === 5) {
                $("#second-gif-column").prepend($emotionalDiv);
            } else if (i === 6 || i === 7 || i === 8) {
                $("#third-gif-column").prepend($emotionalDiv);
            } else {
                $("#fourth-gif-column").prepend($emotionalDiv);
            };
        };

        animateGif();
    
    });
};


function addButton(input) {
    // Loop through topics array to place buttons for each on the page. Also adds attribute to each button using the actual value of the array versus the index number so that we can pull from this attribute when making our ajax request.
    $.each(input, function (index, value) {
        console.log(index + " " + value);
        var emotionalButtons = $("<button>");
        emotionalButtons.addClass("emotional-button emotional-button-styling btn-lg");
        emotionalButtons.attr("type", "button");
        emotionalButtons.attr("data-emotion", [value]);
        emotionalButtons.text(input[index]);
        $("#emotional-buttons").append(emotionalButtons);
    });
};

function animateGif() {

    // ANIMATE LOGIC - When gif is clicked change from still <-> animate
    $(".gif").on("click", function () {
        // Create variable to reference the attribute "data-state" on the object we're clicking
        var state = $(this).attr("data-state");
        console.log(state);
        // Create if/else condition so that the gif knows when to change from still to animate and visa versa. Because the initial source is the still image, we need to first state that...
        // IF the "data-state" is "still" then...
        if (state === "still") {
            // ...change out the "src" of the image to the animated url
            $(this).attr("src", $(this).attr("data-animate"));
            // then, set/update "data-state" to "animate"
            $(this).attr("data-state", "animate");
        } else {
            // if the gif is NOT still then we want to make it still on click of it; change out the src attribute for the still url
            $(this).attr("src", $(this).attr("data-still"));
            // then, set/update "data-state" back to "still"
            $(this).attr("data-state", "still");
        }

        // on .gif closing bracket for changing "data-states" if gifs
    });
};

addButton(topics);

// CALL QUERY
$(".emotional-button").on("click", function () {
    // Clear/empty previous set of giphys from "emotional-giphys" div
    $("#first-gif-column").empty();
    $("#second-gif-column").empty();
    $("#third-gif-column").empty();
    $("#fourth-gif-column").empty();
    // this refers to the attr data emotion. Anything clicked on that has data-emotion as an attribute will populate the queryURL which then moves through into ajax request and subsequent for loop to place all giphs related to the data onto the page.
    var emotion = $(this).attr("data-emotion");
    // Constructing a URL to search Giphy for the name of the person who said the quote
    queryURLBase = queryURLBase + "&q=" + emotion;
    runQuery(queryURLBase);
});

// ADDING EMOTIONAL BUTTON
$("#add-emotional-button").on("click", function () {

    // Retrive user input
    var newEmotion = $("#emotional-input").val().trim();
    console.log("newEmotion: " + newEmotion);

    // var newEmotionArray = [];
    // newEmotionArray.push(newEmotion);
    queryURLBase = queryURLBase + "&q=" + newEmotion
    runQuery(queryURLBase);

    return false;

    

});
