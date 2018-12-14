var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var projectName = 'pomodoro-clock';
localStorage.setItem('example_project', 'Pomodoro Clock');

function clockify(time) {
  var minutes = Math.floor(time / 60);
  var seconds = time - minutes * 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return minutes + ':' + seconds;
}var

ChildComponent = function (_React$Component) {_inherits(ChildComponent, _React$Component);
  function ChildComponent(props) {_classCallCheck(this, ChildComponent);var _this = _possibleConstructorReturn(this, (ChildComponent.__proto__ || Object.getPrototypeOf(ChildComponent)).call(this,
    props));
    _this.state = {};

    _this.componentDidMount = _this.componentDidMount.bind(_this);
    _this.componentWillUnmount = _this.componentWillUnmount.bind(_this);
    _this.handleKeyPress = _this.handleKeyPress.bind(_this);
    _this.keyPress = _this.keyPress.bind(_this);return _this;
  }_createClass(ChildComponent, [{ key: 'componentDidMount', value: function componentDidMount()
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
    } }, { key: 'render', value: function render()

    {
      return (
        React.createElement('div', null));



    } }]);return ChildComponent;}(React.Component);
;var

App = function (_React$Component2) {_inherits(App, _React$Component2);
  function App(props) {_classCallCheck(this, App);var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this,
    props));
    _this2.state = {
      pomodoroLength: 25,
      breakLength: 5,
      timer: 25 * 60,
      pomodoroOn: true,
      pauseOn: false,
      timerOn: false };

    _this2.method = _this2.method.bind(_this2);
    _this2.reset = _this2.reset.bind(_this2);
    _this2.decrementBreak = _this2.decrementBreak.bind(_this2);
    _this2.incrementBreak = _this2.incrementBreak.bind(_this2);
    _this2.decrementPomodoro = _this2.decrementPomodoro.bind(_this2);
    _this2.incrementPomodoro = _this2.incrementPomodoro.bind(_this2);
    _this2.timerControl = _this2.timerControl.bind(_this2);
    _this2.startTimer = _this2.startTimer.bind(_this2);
    _this2.switchTimers = _this2.switchTimers.bind(_this2);return _this2;
  }_createClass(App, [{ key: 'method', value: function method()

    {
    } }, { key: 'reset', value: function reset()

    {
      this.setState({
        pomodoroLength: 25,
        breakLength: 5,
        timer: 25 * 60,
        pomodoroOn: true,
        pauseOn: false,
        timerOn: false,
        intervalID: '' });


      clearInterval(this.state.intervalID);
      this.audioBeep.pause();
      this.audioBeep.currentTime = 0;
    } }, { key: 'decrementPomodoro', value: function decrementPomodoro()

    {
      if (this.state.pomodoroLength == 1) return;
      this.setState({
        timer: (this.state.pomodoroLength - 1) * 60,
        pomodoroLength: this.state.pomodoroLength - 1 });

    } }, { key: 'incrementPomodoro', value: function incrementPomodoro()

    {
      if (this.state.pomodoroLength == 60) return;
      this.setState({
        timer: (this.state.pomodoroLength + 1) * 60,
        pomodoroLength: this.state.pomodoroLength + 1 });

    } }, { key: 'decrementBreak', value: function decrementBreak()

    {
      if (this.state.breakLength == 1) return;
      this.setState({
        breakLength: this.state.breakLength - 1 });

    } }, { key: 'incrementBreak', value: function incrementBreak()

    {
      if (this.state.breakLength == 60) return;
      this.setState({
        breakLength: this.state.breakLength + 1 });

    } }, { key: 'timerControl', value: function timerControl()


    {
      if (this.state.timerOn) {
        this.setState({ timerOn: false });
        clearInterval(this.state.intervalID);
      } else {
        this.startTimer();
        this.setState({ timerOn: true });
      }
    } }, { key: 'startTimer', value: function startTimer()

    {var _this3 = this;
      this.setState({
        intervalID: setInterval(function () {
          _this3.setState({ timer: _this3.state.timer - 1 });
          _this3.switchTimers();
        }, 1000) });

    } }, { key: 'switchTimers', value: function switchTimers()

    {
      if (this.state.timer < 0) {
        this.audioBeep.play();
        clearInterval(this.state.intervalID);
        if (this.state.pomodoroOn) {
          this.setState({
            timer: this.state.breakLength * 60,
            pomodoroOn: false });

        } else {
          this.setState({
            timer: this.state.pomodoroLength * 60,
            pomodoroOn: true });

        }
        this.startTimer();
      }
    } }, { key: 'render', value: function render()


    {var _this4 = this;
      return (
        React.createElement('div', null,
          React.createElement('div', { id: 'session-label' }, 'Pomodoro Length in Minutes'),


          React.createElement('div', { id: 'session-length' },
            this.state.pomodoroLength),

          React.createElement('button', { id: 'session-increment', onClick: this.incrementPomodoro }, '+'),


          React.createElement('button', { id: 'session-decrement', onClick: this.decrementPomodoro }, '-'),


          React.createElement('div', { id: 'break-label' }, 'Break Length in Minutes'),


          React.createElement('div', { id: 'break-length' },
            this.state.breakLength),

          React.createElement('button', { id: 'break-increment', onClick: this.incrementBreak }, '+'),


          React.createElement('button', { id: 'break-decrement', onClick: this.decrementBreak }, '-'),


          React.createElement('div', { id: 'timer-label' },
            this.state.pomodoroOn ? 'Session' : 'Break', ' Time Remaining',
            React.createElement('div', { id: 'time-left' },
              clockify(this.state.timer)),

            React.createElement('button', { id: 'start_stop', onClick: this.timerControl }, 'Start/Stop'),


            React.createElement('audio', {
                id: 'beep',
                src: 'https://actions.google.com/sounds/v1/emergency/beeper_emergency_call.ogg',
                ref: function ref(audio) {_this4.audioBeep = audio;} }, 'Your browser does not support the ',

              React.createElement('code', null, 'audio'), ' element.'),

            React.createElement('button', { id: 'reset', onClick: this.reset }, 'Reset'))));





    } }]);return App;}(React.Component);
;

ReactDOM.render(
React.createElement(App, null),
document.getElementById('app'));