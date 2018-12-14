var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var projectName = "markdown-previewer";
localStorage.setItem('example_project', 'Markdown Previewer');

// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({
  breaks: true });


// INSERTS target="_blank" INTO HREF TAGS (required for codepen links)
var renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return '<a target="_blank" href="' + href + '">' + text + '</a>';
};var

App = function (_React$Component) {_inherits(App, _React$Component);
  function App(props) {_classCallCheck(this, App);var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this,
    props));
    _this.state = {
      markdown: placeholder };


    _this.handleChange = _this.handleChange.bind(_this);return _this;
  }_createClass(App, [{ key: 'handleChange', value: function handleChange(
    e) {
      this.setState({
        markdown: e.target.value });

    } }, { key: 'render', value: function render()
    {
      return (
        React.createElement('div', { id: 'container' },
          React.createElement('div', { id: 'header' }, React.createElement('h1', null, 'Markdown Previewer')),
          React.createElement(Editor, { markdown: this.state.markdown,
            onChange: this.handleChange }),
          React.createElement(Preview, { markdown: this.state.markdown })));


    } }]);return App;}(React.Component);
;

var Editor = function Editor(props) {
  return (
    React.createElement('textarea', { id: 'editor',
      value: props.markdown,
      onChange: props.onChange,
      type: 'text' }));

};

var Preview = function Preview(props) {
  return (
    React.createElement('div', { id: 'preview', dangerouslySetInnerHTML: { __html: marked(props.markdown, { renderer: renderer }) } }));

};


var placeholder = '# Welcome to my React Markdown Previewer!\n---\n## Sub Heading\n---\n### Sub-sub Heading\n---\nTable Example:\n\nheader 1 | header 2 | header 3\n---|\ndetail 1 | detail 2 | detail 3\ndetail 4 | detail 5 | detail 6\n---\nCode Example:\n\n```\nfunction example(a, b) {\n  return a + b;\n}\n```\n---\nInline Code Example: \n\nYour first HTML code might be: `<div>Hello World</div>`. But you won\'t know until you try an example.\n\n---\nLink Example:  [links](https://www.freecodecamp.com)\n\n---\nList Example: \n- Apples\n- Oranges\n- Bananas\n---\n**Bold Text** Example.\n\n---\n> A Block Quote Example.\n\n---\nAn Embedded Image Example:\n\n![React Logo w/ Text](https://goo.gl/Umyytc)\n';












































ReactDOM.render(React.createElement(App, null), document.getElementById('app'));