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
    this.setState({text: e.target.value});
  },
  render: function() {
    return (
      <div>
        <h3>TODO</h3>
        <List items={this.state.items} fn={this.removeItemHandler}/>
        <form>
          <input type='text' value={this.state.text} onChange={this.onInput}/>
          <button onClick={this.addItem}>+</button>
        </form>
      </div>
    );
  }
});

React.render(<App />, document.body);
