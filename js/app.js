var React = require('react');

var _items = ['banana', 'orange', 'potato'];
var List = React.createClass({
  removeItem: function(index) {
    console.log('removeItem', index);
    this.props.fn(index);
  },
  render: function() {
       var self = this;
       return <ul>{
         this.props.items.map(function(item, index) {
           console.log(item, index)
           return (
               <li data-key={index} key={index}>{item} <button type="button" onClick={self.removeItem.bind(self, index)}>-</button></li>
           );
         })
       }</ul>;
  }
});
var App = React.createClass({
  getInitialState: function(){
    return {
        items: _items,
        text: ''
    };
  },
  addItem: function(e) {
    e.preventDefault();
    this.state.items.push(this.state.text);
    this.state.text = "";
    console.log('addItem!')
    console.log(this.state.items);
    this.setState({
      items: this.state.items,
      text: ''
    });
  },
  removeItemHandler: function(index) {
    console.log('call removeItemHandler');
    this.state.items.splice(index, 1);
    this.setState({
        items: this.state.items
    });
  },
  onInput: function(e) {
    // this.state.text = e.target.value; <- this will cause input alwasy to be ''
    this.setState({text: e.target.value}); //use setState
  },
  render: function() {
    return (
      <div>
        <h3>TODOXD</h3>
        <List items={this.state.items} fn={this.removeItemHandler}/>
        <form>
          <input type='text' value={this.state.text /*use value='' will broke form*/} onChange={this.onInput}/>
          <button onClick={this.addItem}>+</button>
        </form>
      </div>
    );
  }
});

React.render(<App />, document.body);
