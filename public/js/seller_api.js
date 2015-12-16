$(document).ready(function(){
  function readURL(input) {

      if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = function (e) {
              $('#preview').attr('src', e.target.result);
          }

          reader.readAsDataURL(input.files[0]);
      }
  }

  var file;
  $('#preview').hide()
  $('#image').bind("change", function(e) {
    $('#preview').show()
    $('#submitted').hide()
    var files = e.target.files || e.dataTransfer.files;
    // Our file var now holds the selected file
    file = files[0];
  });

  $('form input[name="image"]').change(function(){
      readURL(this);
  });

  $('#seller-form').submit(function(){
      var brand = $('form input[name="brand"]').val()
      var name = file.name; //This does *NOT* need to be a unique name
      var parseFile = new Parse.File(name, file);

      parseFile.save().then(function() {
        var Item = Parse.Object.extend("Item");
        var item = new Item();
        item.set("brand", brand);
        item.set("image", parseFile);
        item.set("seller_name", username);
        item.set("seller", currentUser);


        item.save(null, {
          success: function(item) {
            console.log('New object created with objectId: ' + item.id);
            $('#preview').hide()
            $('#submitted').show()
            return false
          },
          error: function(model, error) {
            console.log('Failed to create new object, with error code: ' + error.message);
            return false
          }
        });
      });
      return false;
  });

});
