

function append_recommendations(item, i){
  var edges = item.get("edges")
  console.log(edges)
  for (var key in edges){
      query_all.get(key, {
        success: function(item) {
          var image = item.get("image");
          var appended_image = "<div class='col-sm-1 theo-panel'><img class='recc-pic' src='"+ image._url + "'/></div>"
          $('#item' + i).append(appended_image);
        },
        error: function(object, error) {
          console.log(error)
        }
      });
  }
}
