
var PanelImage = React.createClass({
  render: function() {
    return (
      <img src={this.props.source}/>
    );
  }
});

var Panel = React.createClass({
  render: function() {
    return (
      <div className="theo-panel col-xs-3">
        <PanelImage data={this.props.data}/>
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
      var items = this.props.data
      if(!items){items = []}
      var PANEL_SIZE = 300.0
      var MARGIN_SIZE = 40.0
      var num_panels = 3
      var visible = Math.ceil(this.state.visibleEnd/(PANEL_SIZE + MARGIN_SIZE) * num_panels)
      console.log(visible)
      items = items.slice(0, visible)
      console.log(items)
      return (
        <div>
          {items.map(function(item) {
            return <Panel key={item.id} />;
          })}
        </div>
      );
    }
})


Parse.initialize("p5I9NyojKedE07IADm4FjywrHKBWorN7H3zMfcjC", "XCSCYfLiUBq9glZGkzKfpxSecW0jOvU2PjatEALr");
var currentUser = Parse.User.current();
if(currentUser){  console.log("user: " + currentUser.get("name"))}
var Items = Parse.Object.extend("Item");
var query = new Parse.Query(Items);
var query_all = new Parse.Query(Items);
query.exists("edges");


function render(items){
  ReactDOM.render(
    <List data={items} />,
    document.getElementById('list')
  );
}

query_all.find({
  success: function(items) {
    render(items)
  },
  error: function(object, error) {
    console.log(error)
  }
});

















function append_image(item, i){
  // var image = item.get("image");
  // // var appended_image = "<div class='row' id='item" + i +"'><div class='col-sm-6 theo-panel'><img src='"+ image._url + "'/></div></div>"
  // var appended_image = "<div class='col-sm-4 theo-panel'><img src='"+ image._url + "'/></div>"
  //
  // $('#list').append(appended_image);
  // var edges = item.get("edges")
}

function add_edges(items){
  for (var i = 0; i < items.length; i++){
    (function(i) {
          query_all.get(items[i]['id'], {
            success: function(item) {
              // append_image(item, i)
              // append_recommendations(item, i)
            },
            error: function(object, error) {
              console.log(error)
            }
          });
    })(i);
  }
}
