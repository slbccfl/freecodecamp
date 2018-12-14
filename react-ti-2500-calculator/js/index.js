var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var projectName = 'javascript-calculator';
localStorage.setItem('example_project', 'Javascript Calculator');

var buttonsArray = [[
{ keyFace: 'CE', keyID: 'ced', keyClass: 'operation-keys' },
{ keyFace: String.fromCharCode(247), keyID: 'divide', keyClass: 'operation-keys' },
{ keyFace: String.fromCharCode(215), keyID: 'multiply', keyClass: 'operation-keys' }],
[
{ keyFace: '7', keyID: 'seven', keyClass: 'number-keys' },
{ keyFace: '8', keyID: 'eight', keyClass: 'number-keys' },
{ keyFace: '9', keyID: 'nine', keyClass: 'number-keys' },
{ keyFace: 'C', keyID: 'clear', keyClass: 'operation-keys' }],
[
{ keyFace: '4', keyID: 'four', keyClass: 'number-keys' },
{ keyFace: '5', keyID: 'five', keyClass: 'number-keys' },
{ keyFace: '6', keyID: 'six', keyClass: 'number-keys' },
{ keyFace: '-', keyID: 'subtract', keyClass: 'operation-keys' }],
[
{ keyFace: '1', keyID: 'one', keyClass: 'number-keys' },
{ keyFace: '2', keyID: 'two', keyClass: 'number-keys' },
{ keyFace: '3', keyID: 'three', keyClass: 'number-keys' },
{ keyFace: '+', keyID: 'add', keyClass: 'operation-keys' }],
[
{ keyFace: '0', keyID: 'zero', keyClass: 'number-keys' },
{ keyFace: '.', keyID: 'decimal', keyClass: 'number-keys' },
{ keyFace: '=', keyID: 'equals', keyClass: 'equal-key' }]];var


Button = function (_React$Component) {_inherits(Button, _React$Component);
  function Button(props) {_classCallCheck(this, Button);var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this,
    props));
    _this.state = {};

    _this.componentDidMount = _this.componentDidMount.bind(_this);
    _this.componentWillUnmount = _this.componentWillUnmount.bind(_this);
    _this.handleKeyPress = _this.handleKeyPress.bind(_this);
    _this.keyPress = _this.keyPress.bind(_this);
    _this.evalOperation = _this.evalOperation.bind(_this);return _this;
  }_createClass(Button, [{ key: 'componentDidMount', value: function componentDidMount()
    {
      document.addEventListener('keydown', this.handleKeyPress);
    } }, { key: 'componentWillUnmount', value: function componentWillUnmount()
    {
      document.removeEventListener('keydown', this.handleKeyPress);
    } }, { key: 'handleKeyPress', value: function handleKeyPress(
    e) {
      if (String.fromCharCode(e.keyCode) === this.props.buttonObj.keyFace) {
        this.keyPress();
      }
    } }, { key: 'keyPress', value: function keyPress(

    e) {
      console.log('keyPress: ');
      console.log(this.props);
      if (this.props.buttonObj.keyClass === 'number-keys') {
        if (this.props.currentState.operand == null) {
          this.props.currentState.operand = this.props.currentState.value;
          this.props.currentState.value = '';
        }
        if (this.props.currentState.value == 0) {
          this.props.currentState.value = '';
        }
        if ((this.props.buttonObj.keyFace != '.' ||
        !this.props.currentState.value.includes('.')) &&
        this.props.currentState.value.length < 15) {
          this.props.currentState.value += this.props.buttonObj.keyFace;
        }

      } else {
        console.log(this.props.buttonObj.keyID);

        switch (this.props.buttonObj.keyID) {
          case 'clear':
            this.props.currentState.value = 0;
            this.props.currentState.operand = 0;
            this.props.currentState.operator = '';
            break;
          case 'ced':
            this.props.currentState.value = 0;
            break;
          case 'add':
            this.evalOperation('+');
            console.log(this.props.currentState);
            break;
          case 'subtract':
            this.evalOperation('-');
            break;
          case 'multiply':
            this.evalOperation('*');
            break;
          case 'divide':
            this.evalOperation('/');
            break;
          case 'equals':
            this.evalOperation('');
            break;}

      }
      console.log('updateDisplay: ');
      console.log(this.props.currentState);
      this.props.updateDisplay(
      this.props.currentState.operand,
      this.props.currentState.operator,
      this.props.currentState.value);
    } }, { key: 'evalOperation', value: function evalOperation(

    operator) {
      if (this.props.currentState.operator != '' && this.props.currentState.operand != null) {
        this.props.currentState.value =
        eval(this.props.currentState.operand +
        this.props.currentState.operator +
        this.props.currentState.value);
      }
      this.props.currentState.operand = null;
      this.props.currentState.operator = operator;

      return;
    } }, { key: 'render', value: function render()


    {
      return (
        React.createElement('div', { id: this.props.buttonObj.keyID,
            className: this.props.buttonObj.keyClass,
            onClick: this.keyPress },
          this.props.buttonObj.keyFace));


    } }]);return Button;}(React.Component);
;var

App = function (_React$Component2) {_inherits(App, _React$Component2);
  function App(props) {_classCallCheck(this, App);var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this,
    props));
    _this2.state = {
      operand: 0,
      operator: '',
      value: 0 };

    _this2.updateState = _this2.updateState.bind(_this2);
    _this2.buttonCell = _this2.buttonCell.bind(_this2);
    _this2.buttonsTable = _this2.buttonsTable.bind(_this2);return _this2;
  }_createClass(App, [{ key: 'updateState', value: function updateState(

    operand, operator, value) {
      // console.log(operand);
      // console.log(operator);
      // console.log(value);
      this.setState({
        operand: operand,
        operator: operator,
        value: value });

    } }, { key: 'buttonCell', value: function buttonCell(

    buttonObject, index) {
      return (
        React.createElement('td', null,
          React.createElement(Button, {
            buttonObj: buttonObject,
            updateDisplay: this.updateState,
            currentState: this.state })));


    } }, { key: 'buttonsTable', value: function buttonsTable()

    {
      return (
        React.createElement('div', { id: 'key-pad' },
          React.createElement('table', null,
            React.createElement('tr', null,
              buttonsArray[0].map(this.buttonCell)),

            React.createElement('tr', null,
              buttonsArray[1].map(this.buttonCell)),

            React.createElement('tr', null,
              buttonsArray[2].map(this.buttonCell)),

            React.createElement('tr', null,
              buttonsArray[3].map(this.buttonCell))),


          React.createElement('table', null,
            React.createElement('tr', null,
              buttonsArray[4].map(this.buttonCell)))));




    } }, { key: 'render', value: function render()

    {
      return (
        React.createElement('div', null,
          React.createElement('div', { id: 'calcInfo' },
            React.createElement('h1', null, 'TI 2500 "Datamath" Calculator'),
            React.createElement('p', null, 'The TI 2500 "Datamath" was Texas Instruments first calculator, first announced in April 1972, with a suggested retail price (SRP) of $149.95. Adjusted for inflation, this is equivalent to $900 in 2018. The SRP was reduced to $119.95 ($720 in 2018 dollars) by September 21, 1972, the date of its formal introduction.'),
            React.createElement('p', null, 'In this exercise I have attempted to reproduce the experience of how early calculators behaved when they could only display numbers and not any information about the keys pressed to perform math operations. ')),

          React.createElement('div', { id: 'calculator', className: 'inner-container' },
            React.createElement('div', { id: 'display' },
              this.state.value),

            React.createElement('div', { id: 'logoStrip' },
              React.createElement('span', { id: 'TIlogo' }),

              React.createElement('span', { id: 'datamath' }, 'Datamath')),



            React.createElement(this.buttonsTable, null))));



    } }]);return App;}(React.Component);
;

ReactDOM.render(
React.createElement(App, null),
document.getElementById('app'));