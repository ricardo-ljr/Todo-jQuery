$(function() {
  var topic = "";
  //Italian sources
  var sources = [
    "ansa",
    "la-repubblica",
    "google-news-it",
    "abc-news",
    "ars-technica",
    "google-news",
    "associated-press",
    "bleacher-report",
    "business-insider"
  ];
  //some of the principles English/American sources
  //sources: ["abc-news", "ars-technica", "google-news", "associated-press","bleacher-report","business-insider"];
  var max_articles = 3;

  $.ajax({
    url:
      "http://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=5207cf9c327a477a9f94a09283d51a47",

    dataType: "json",
    success: function(data) {
      $(".news").empty();
      if (data.status == "ok" && data.totalResults > 0) {
        console.log(
          "http://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=5207cf9c327a477a9f94a09283d51a47"
        );

        var counter = 0;

        $.each(data.articles, function(i, e) {
          if (counter < max_articles) {
            $(".news").append(
              "<li>" + '<a href="' + e.url + '">' + e.title + "</a></li>"
            );
            counter++;
          }
        });
      } else {
        $(".news").append("<li>No news were found with these parameters.</li>");
      }
    }
  });

  $("#save_topic").click(function() {
    topic = $("#selectedTopic").val();

    $.ajax({
      url:
        "https://newsapi.org/v2/top-headlines?apiKey=5207cf9c327a477a9f94a09283d51a47&q=" +
        topic +
        "&sources=" +
        sources,
      dataType: "json",
      success: function(data) {
        $(".news").empty();
        if ((data.status == "ok") & (data.totalResults > 0)) {
          console.log(
            "https://newsapi.org/v2/top-headlines?apiKey=5207cf9c327a477a9f94a09283d51a47&q=" +
              topic +
              "&sources=" +
              sources
          );

          counter = 0;

          $.each(data.articles, function(i, e) {
            if (counter < max_articles) {
              $(".news").append(
                "<li>" + '<a href="' + e.url + '">' + e.title + "</a></li>"
              );
              counter++;
            }
          });
        } else {
          $(".news").append(
            "<li>No news were found with these parameters.</li>"
          );
        }
      }
    });
  });
});
