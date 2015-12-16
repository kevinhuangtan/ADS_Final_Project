window.fbAsyncInit = function() {
  Parse.FacebookUtils.init({
    appId      : '1709073619326091',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.5'
  });

};
(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

function setUserLoggedIn(){
  $('#fb-login-btn').hide()
  $('#fb-logout-btn').show()
  $('#hello').text(username)
}
function setUserNotLoggedIn(){
  $('#fb-logout-btn').hide()
  $('#fb-login-btn').show()
  $('#hello').text("please log in")
}
function logout(){
  Parse.User.logOut()
  setUserNotLoggedIn()
}

function loginToFacebook(){
  Parse.FacebookUtils.logIn("public_profile", {
    success: function(user) {
      FB.api(
          "/me",
          function (response) {
            if (response && !response.error) {
              console.log(response)
              user.set("name", response.name);
              user.save(null, {
                success: function(user) {
                  // Hooray! Let them use the app now.
                },
                error: function(user, error) {
                  // Show the error message somewhere and let the user try again.
                  alert("Error: " + error.code + " " + error.message);
                }
              });
            }
          }
      );

      if (!user.existed()) {
         console.log("User signed up and logged in through Facebook!");
      } else {
         console.log("User logged in through Facebook!");
      }
      setUserLoggedIn()
    },
    error: function(user, error) {
      console.log("User cancelled the Facebook login or did not fully authorize.");
    }
  });
}

$(document).ready(function(){
  if (currentUser) {
      setUserLoggedIn();
  }
  else {
      setUserNotLoggedIn()
  }
});
