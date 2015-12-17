////////////////////////////////////////////////
////////////////////////////////////////////////
///////////////// DATA STORE ///////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

var CART = []

////////////////////////////////////////////////
////////////////////////////////////////////////
/////////////// CART COMPONENTS ////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
var CartItem = React.createClass({
  handleClick: function(event) {
    clear_recommendations()
    var index = $.inArray(this.props.item, CART)
    CART.splice( index, 1 );
    this.props.onUserInput(
        CART
    );
  },
  render: function() {
    return (
      <div onClick={this.handleClick} className="cart-panel col-xs-4">
        <div className="img-container">
          <img src={this.props.img} />
        </div>
      </div>
    );
  }
});

var Cart = React.createClass({
    getInitialState: function() {
      return {
        data: [],
        cart: this.props.items
      };
    },
    componentDidMount: function() {
      var self = this;
      self.setState({'cart': CART})
    },
    render: function() {
      if(!this.state.cart){this.state.cart = []}
      return (
        <div id="cart" >
          <h1>cart</h1>
          {this.state.cart.map(function(item, i) {
            return (
              <CartItem onUserInput={this.props.onUserInput} key={i} item={item} img={item.get("image").url()}/>
            );
          }, this)}
        </div>
      );
    }
})

////////////////////////////////////////////////
////////////////////////////////////////////////
/////////////// LIST COMPONENTS ////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

var Panel = React.createClass({
  handleClick: function(event) {
    var index = $.inArray(this.props.item, CART)
    if(index == -1){
      CART.push(this.props.item)
    }
    this.props.onUserInput(
        CART
    );
    append_recommendations(this.props.item)
  },
  render: function() {
    return (
      <div onClick={this.handleClick} className="theo-panel col-xs-3">
        <div className="img-container">
          <img src={this.props.img} />
        </div>
      </div>
    );
  }
});

var List = React.createClass({
    getInitialState: function() {
      return {
        visibleEnd: $(window).height()
      };
    },
    scrollState: function(scroll) {
      if($(window).scrollTop() + $(window).height() == $(document).height()) {
        var visibleEnd = this.state.visibleEnd
        this.setState({visibleEnd: visibleEnd += $(window).height()});
      }
    },
    componentDidMount: function() {
      window.addEventListener('scroll', this.scrollState);
    },
    render: function() {
      var items = this.props.items
      if(!items){items = []}
      var PANEL_SIZE = 300.0
      var MARGIN_SIZE = 20.0
      var num_panels = 3
      var visible = Math.ceil(this.state.visibleEnd/(PANEL_SIZE + MARGIN_SIZE) * num_panels)
      items = items.slice(0, visible);
      return (
        <div>
          {items.map(function(item, i) {
            return (
              <Panel onUserInput={this.props.onUserInput} key={i} item ={item} img={item.get("image").url()} id={item.id} brand={item.get("brand")} />
            );
          }, this)}
        </div>
      );
    }
})

var Container = React.createClass({
    getInitialState: function() {
      return {
        items: [],
        cart: []
      };
    },
    componentDidMount: function() {
      this.setState({
        items: this.props.items,
        cart: this.props.cart
      })
    },
    handleUserInput: function(cart_items) {
        console.log('cart', cart_items)
        this.setState({
            cart: cart_items
        });
    },
    render: function() {
      return (
        <div>
          <Cart onUserInput={this.handleUserInput} cart={this.state.cart} />
          <List onUserInput={this.handleUserInput} items={this.state.items} />
        </div>
      )
    }

})

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////// INITIALIZE //////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

Parse.initialize("p5I9NyojKedE07IADm4FjywrHKBWorN7H3zMfcjC", "XCSCYfLiUBq9glZGkzKfpxSecW0jOvU2PjatEALr");
var currentUser = Parse.User.current();
if(currentUser){  console.log("user: " + currentUser.get("name"))}
var Items = Parse.Object.extend("Item");
var query = new Parse.Query(Items);
query.ascending("objectId");
query.find({
  success: function(items) {
    ReactDOM.render(
      <div>
        <Container items={items} cart={CART} />
      </div>,
      document.getElementById('list')
    );
  },
  error: function(object, error) {
    console.log(error)
  }
});


function clear_recommendations(){
  // $( "#recommend" ).empty();
  // $('#recommend').append("<p>recommended for this item</p>");
}
function append_recommendations(item){
  var edges = item.get("edges");
  $( "#recommend" ).empty();
  if(!edges){
    $('#recommend').append("<p>No recommendations for this item</p>");
  }
  else{

    $('#recommend').append("<p>recommendations for this item</p>");
    for (var key in edges){
        query.get(key, {
          success: function(item) {
            var image = item.get("image");
            var appended_image = "<div class='col-sm-3 recommend-panel'><img class='recc-pic' src='"+ image._url + "'/></div>"
            $('#recommend').append(appended_image);
          },
          error: function(object, error) {
            console.log(error)
          }
        });
    }
  }

}
