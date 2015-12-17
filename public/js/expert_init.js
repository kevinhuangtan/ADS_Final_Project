var Items = Parse.Object.extend("Item");
var query = new Parse.Query(Items);
query.find({
  success: function(items) {
    size = 16
    var random_sample = create_random_sample(items, size)
    var key_item = items[random_sample[0]]
    var existing_edges = items[random_sample[0]].get("edges")
    if(typeof existing_edges === 'undefined'){
        existing_edges = {}
    }
    var selected_edges = {}

    set_key_image(items, random_sample)
    set_sampled_images(items, random_sample)

    $('.test-pic').click(function(){
      $(this).toggleClass("selected");
      var selected_images = $(".selected").map(function() {
          return parseInt($(this).attr('data-index'));
      }).get();
       selected_edges = set_selected(items, selected_images, random_sample)
    });

    $('#save-btn').click(function(){
      var final_edges = merge_edges(existing_edges, selected_edges)
      items[random_sample[0]].set("edges", final_edges)
      items[random_sample[0]].save(null, {
        success: function(item) {
          console.log('success');
          location.reload();
        },
        error: function(model, error) {
          console.log('Failed to create new object, with error code: ' + error.message);
        }
      })
    })
  },
  error: function(object, error) {

  }
});
