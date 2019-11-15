var topics = ["babies", "puppies", "flowers", "baby hedgehogs", "sailormoon", "ballerinas"];

function renderButtons() {
    $("#buttonArea").empty();
    for (var i = 0; i < topics.length; i++) {
        var arrButton = $("<button>");
        arrButton.attr("type", "button");
        arrButton.attr("data-name", topics[i]);
        arrButton.addClass("btn btn-primary");
        arrButton.addClass("indexes")
        arrButton.text(topics[i]);
        $("#buttonArea").append(arrButton);
    }
    $(".indexes").click(function() {
      $("#gifPlace").empty();
      var topic = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=wvZA93HJeFN62qPtICTpyzNHSmByU5gC&q=" + topic + "&limit=10&rating=g";
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            console.log(response);

              for (i=0; i < response.data.length; i++) {
                var rating = $("<h5>");
                rating.text("Rating: " + response.data[i].rating);
                $("#gifPlace").append(rating);
                

                var gif = $("<img>");
                gif.addClass("gifClass");

                gif.attr("data-still", response.data[i].images.fixed_width_still.url);
                gif.attr("data-animate", response.data[i].images.fixed_width.url)

                gif.attr("data-current", "still");
                gif.attr("src", response.data[i].images.fixed_width_still.url);

                $("#gifPlace").append(gif);
                

            }
            $(".gifClass").click(function() {
              if ($(this).attr("data-current") == "still") {
                $(this).attr("data-current", "animate");
                var animateUrl = $(this).attr("data-animate");
                $(this).attr("src", animateUrl);
              }
              else if ($(this).attr("data-current") == "animate") {
                $(this).attr("data-current", "still");
                var stillUrl = $(this).attr("data-still");
                $(this).attr("src", stillUrl);
              }
            });
        });
    });
}
$(document).ready(function() {
  renderButtons();
  $("#add-topic").on("click", function(event) {
    event.preventDefault();
    var newTopic = $("#newq").val().trim();
    $("#newq").val("");
    topics.push(newTopic);
    renderButtons();

});

})