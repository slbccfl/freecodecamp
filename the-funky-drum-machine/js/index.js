var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var projectName = 'drum-machine';
localStorage.setItem('example_project', 'Drum Machine');

var buttonLetters = 'QWEASDZXC';
var buttonsArray = [
{ letter: 'Q',
  audioClipName: 'Chord-1',
  audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3' },

{ letter: 'W',
  audioClipName: 'Chord-2',
  audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3' },

{ letter: 'E',
  audioClipName: 'Chord-3',
  audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3' },

{ letter: 'A',
  audioClipName: 'Closed-HH',
  audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },

{ letter: 'S',
  audioClipName: 'Open-HH',
  audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },

{ letter: 'D',
  audioClipName: 'Heater-2',
  audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },

{ letter: 'Z',
  audioClipName: 'Clap',
  audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },

{ letter: 'X',
  audioClipName: 'Side-Stick',
  audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3' },

{ letter: 'C',
  audioClipName: 'Snare',
  audioClip: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3' }];var



Button = function (_React$Component) {_inherits(Button, _React$Component);
  function Button(props) {_classCallCheck(this, Button);var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this,
    props));
    _this.state = {};

    _this.componentDidMount = _this.componentDidMount.bind(_this);
    _this.componentWillUnmount = _this.componentWillUnmount.bind(_this);
    _this.handleKeyPress = _this.handleKeyPress.bind(_this);
    _this.playSound = _this.playSound.bind(_this);return _this;
  }_createClass(Button, [{ key: 'componentDidMount', value: function componentDidMount()
    {
      document.addEventListener('keydown', this.handleKeyPress);
    } }, { key: 'componentWillUnmount', value: function componentWillUnmount()
    {
      document.removeEventListener('keydown', this.handleKeyPress);
    } }, { key: 'handleKeyPress', value: function handleKeyPress(
    e) {
      if (String.fromCharCode(e.keyCode) === this.props.buttonObj.letter) {
        this.playSound();
      }
    } }, { key: 'playSound', value: function playSound(

    e) {
      var sound = document.getElementById(this.props.buttonObj.letter);
      sound.currentTime = 0;
      sound.play();
      this.props.updateDisplay(this.props.buttonObj.audioClipName);
      console.log(this.props);
      // this.activatePad();
      // setTimeout(() => this.activatePad(), 100);
      // this.props.updateDisplay(this.props.clipId.replace(/-/g, ' '));
    } }, { key: 'render', value: function render()

    {
      return (
        React.createElement('div', { id: this.props.buttonObj.audioClipName,
            className: 'drum-pad',
            onClick: this.playSound },
          React.createElement('audio', { className: 'clip',
            id: this.props.buttonObj.letter,
            src: this.props.buttonObj.audioClip }),

          this.props.buttonObj.letter));


    } }]);return Button;}(React.Component);
;var

App = function (_React$Component2) {_inherits(App, _React$Component2);
  function App(props) {_classCallCheck(this, App);var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this,
    props));
    _this2.state = {
      display: 'Be Funky' };

    _this2.displayClipName = _this2.displayClipName.bind(_this2);
    _this2.buttonsTable = _this2.buttonsTable.bind(_this2);return _this2;
  }_createClass(App, [{ key: 'displayClipName', value: function displayClipName(

    name) {
      this.setState({
        display: name });

    } }, { key: 'buttonsTable', value: function buttonsTable()

    {
      return (
        React.createElement('table', null,
          React.createElement('tr', null,
            React.createElement('td', null,
              React.createElement(Button, {
                buttonObj: buttonsArray[0],
                updateDisplay: this.displayClipName })),

            React.createElement('td', null,
              React.createElement(Button, {
                buttonObj: buttonsArray[1],
                updateDisplay: this.displayClipName })),

            React.createElement('td', null,
              React.createElement(Button, {
                buttonObj: buttonsArray[2],
                updateDisplay: this.displayClipName }))),


          React.createElement('tr', null,
            React.createElement('td', null,
              React.createElement(Button, {
                buttonObj: buttonsArray[3],
                updateDisplay: this.displayClipName })),

            React.createElement('td', null,
              React.createElement(Button, {
                buttonObj: buttonsArray[4],
                updateDisplay: this.displayClipName })),

            React.createElement('td', null,
              React.createElement(Button, {
                buttonObj: buttonsArray[5],
                updateDisplay: this.displayClipName }))),


          React.createElement('tr', null,
            React.createElement('td', null,
              React.createElement(Button, {
                buttonObj: buttonsArray[6],
                updateDisplay: this.displayClipName })),

            React.createElement('td', null,
              React.createElement(Button, {
                buttonObj: buttonsArray[7],
                updateDisplay: this.displayClipName })),

            React.createElement('td', null,
              React.createElement(Button, {
                buttonObj: buttonsArray[8],
                updateDisplay: this.displayClipName })))));




    } }, { key: 'render', value: function render()

    {
      return (
        React.createElement('div', null,
          React.createElement('h1', null, 'The Funky Drum Machine'),
          React.createElement('div', { id: 'drum-machine', className: 'inner-container' },
            React.createElement('div', null,
              React.createElement(this.buttonsTable, null))),


          React.createElement('div', { id: 'display' },
            this.state.display)));



    } }]);return App;}(React.Component);
;

ReactDOM.render(
React.createElement(App, null),
document.getElementById('app'));