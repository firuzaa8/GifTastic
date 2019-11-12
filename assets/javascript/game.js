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
              var gif = $("<img>");
              var data = response.data[i]
              gif.addClass("gifClass");
              gif.attr("data-state", "still");
              gif.attr("data-still", response.data[i].images.fixed_width_still.url);
              gif.attr("data-animate", response.data[i].images.fixed_width.url);
              
              gif.attr("src", response.data[i].images.fixed_width_still.url);
              
                            
              $("#gifPlace").append(gif);
            }

            /*
           $(".gifClass").click(function() {
            if ($(this) = gif.attr("src", response.data[i].images.fixed_width_still.url)) {
              
            }
            });*/
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