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
  render: function() {
    return (
      <div className="cart-panel col-xs-3">
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
              <CartItem key={i} data={item.id} />
            );
          })}
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
    var index = $.inArray(this.props.data, CART)
    if(index == -1){
      CART.push(this.props.data)
    }
    else{
      CART.splice(index, 1);
    }
    this.props.onUserInput(
        CART
    );
  },
  render: function() {
    return (
      <div onClick={this.handleClick} className="theo-panel col-xs-3">
        {this.props.data}
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
      var MARGIN_SIZE = 40.0
      var num_panels = 3
      var visible = Math.ceil(this.state.visibleEnd/(PANEL_SIZE + MARGIN_SIZE) * num_panels)
      items = items.slice(0, visible)
      return (
        <div>
          {items.map(function(item, i) {
            return (
              <Panel onUserInput={this.props.onUserInput} key={i} data={item.id} />
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
          <Cart cart={this.state.cart} />
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
var query_all = new Parse.Query(Items);
query.exists("edges");
query_all.find({
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


function add_edges(items){
  for (var i = 0; i < items.length; i++){
    (function(i) {
          query_all.get(items[i]['id'], {
            success: function(item) {
            },
            error: function(object, error) {
              console.log(error)
            }
          });
    })(i);
  }
}
