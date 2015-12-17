function create_random_sample(items, size){
  var arr = []
  while(arr.length < size){
    var randomnumber=Math.ceil(Math.random()*(items.length - 1))
    var found=false;
    for(var i=0;i<arr.length;i++){
    if(arr[i]==randomnumber){found=true;break}
    }
    if(!found)arr[arr.length]=randomnumber;
  }
  return arr
}

function set_key_image(items, random_sample){
  var image = items[random_sample[0]].get("image")
  $('#compare').attr("src", image._url)
}

function set_sampled_images(items, random_sample){
  for (var i = 1; i < random_sample.length; i++){
    var image = items[random_sample[i]].get("image")
    var appended_image = "<div class='col-sm-2 expert-panel'><img class='test-pic' data-index = '" + random_sample[i] +"' src='"+ image._url + "'/></div>"
    $('#parse-images').append(appended_image)
  }
}
function set_selected(items, selected_images, random_sample){
  selected_edges = {}
  for (var i = 0; i < selected_images.length; i++){
    var edge = items[selected_images[i]]['id']
    selected_edges[edge] = 1
  }
  console.log(selected_edges)
  return selected_edges
  // items[random_sample[0]].set("edges", selected_edges)
}
function merge_edges(existing_edges, selected_edges){
  for(edge in selected_edges){
    if(edge in existing_edges){
      existing_edges[edge] += 1
    }
    else{
      existing_edges[edge] = 1
    }
  }
  return existing_edges
}
