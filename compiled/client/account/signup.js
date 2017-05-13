'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignUp = function (_React$Component) {
      _inherits(SignUp, _React$Component);

      function SignUp() {
            _classCallCheck(this, SignUp);

            return _possibleConstructorReturn(this, (SignUp.__proto__ || Object.getPrototypeOf(SignUp)).apply(this, arguments));
      }

      _createClass(SignUp, [{
            key: 'render',
            value: function render() {
                  return React.createElement(
                        'div',
                        null,
                        React.createElement(
                              'div',
                              { className: 'row', style: {
                                          background: 'url(/assets/header-bg.jpg)',
                                          backgroundPosition: 'bottom',
                                          minHeight: '250px',
                                          zIndex: '2',
                                          paddingTop: '100px'
                                    } },
                              React.createElement(
                                    'div',
                                    { className: 'row', style: { paddingBottom: '50px', margin: '0px' } },
                                    React.createElement(
                                          'div',
                                          { className: 'col-md-10 col-md-offset-1 text-center' },
                                          React.createElement(
                                                'h1',
                                                { style: { fontWeight: 'bold', color: '#fff' } },
                                                'Sign In at Otbo5ly!'
                                          ),
                                          React.createElement(
                                                'h2',
                                                { style: { color: '#dedede' } },
                                                'Sign in and enjoy our features! Start ordering home-made food!'
                                          ),
                                          React.createElement(
                                                'h2',
                                                { style: { color: '#dedede' } },
                                                'Yalla!'
                                          )
                                    )
                              )
                        ),
                        React.createElement(
                              'div',
                              { className: 'container' },
                              React.createElement(
                                    'form',
                                    null,
                                    React.createElement(
                                          'div',
                                          { className: 'form-group' },
                                          React.createElement(
                                                'label',
                                                { 'for': 'user' },
                                                'Full Name:'
                                          ),
                                          React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'your first and last name', required: true })
                                    ),
                                    React.createElement(
                                          'div',
                                          { className: 'form-group' },
                                          React.createElement(
                                                'label',
                                                { 'for': 'user' },
                                                'User Name:'
                                          ),
                                          React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'your name', required: true })
                                    ),
                                    React.createElement(
                                          'div',
                                          { className: 'form-group' },
                                          React.createElement(
                                                'label',
                                                { 'for': 'pwd' },
                                                'Password:'
                                          ),
                                          React.createElement('input', { type: 'password', className: 'form-control', placeholder: 'your assword', required: true })
                                    ),
                                    React.createElement(
                                          'div',
                                          { className: 'form-group' },
                                          React.createElement(
                                                'label',
                                                { 'for': 'phone' },
                                                'Phone Number:'
                                          ),
                                          React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'your number', required: true })
                                    ),
                                    React.createElement(
                                          'div',
                                          { className: 'form-group' },
                                          React.createElement(
                                                'label',
                                                { 'for': 'user' },
                                                'Email address:'
                                          ),
                                          React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'your email', required: true })
                                    ),
                                    React.createElement(
                                          'div',
                                          { className: 'form-group' },
                                          React.createElement(
                                                'label',
                                                { 'for': 'user' },
                                                'Address:'
                                          ),
                                          React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'your address', required: true })
                                    ),
                                    React.createElement(
                                          'div',
                                          null,
                                          React.createElement(
                                                'h3',
                                                null,
                                                React.createElement(
                                                      'strong',
                                                      null,
                                                      'Are You Cooker ?!'
                                                )
                                          ),
                                          React.createElement(
                                                'div',
                                                { className: 'user', style: { fontSize: '17px' } },
                                                React.createElement('input', { name: 'userType', type: 'checkbox' }),
                                                ' Yub, I am Cooker'
                                          )
                                    ),
                                    React.createElement(
                                          'div',
                                          null,
                                          React.createElement(
                                                'h3',
                                                null,
                                                React.createElement(
                                                      'strong',
                                                      null,
                                                      'Insert Your Cooking Schedule Here'
                                                )
                                          ),
                                          React.createElement(
                                                'ul',
                                                { className: 'Days', style: { fontSize: '17px' } },
                                                React.createElement(
                                                      'li',
                                                      null,
                                                      React.createElement(
                                                            'h4',
                                                            { className: 'h4', style: { color: '#1E90FF' } },
                                                            React.createElement(
                                                                  'strong',
                                                                  null,
                                                                  'Saturday:'
                                                            )
                                                      ),
                                                      'Price:',
                                                      React.createElement('input', { type: 'text', name: 'price1', placeholder: 'JOD' }),
                                                      React.createElement(
                                                            'h4',
                                                            null,
                                                            'Cooking Name:'
                                                      ),
                                                      React.createElement(
                                                            'select',
                                                            { style: { width: '250px' } },
                                                            React.createElement(
                                                                  'option',
                                                                  null,
                                                                  'cook name'
                                                            )
                                                      )
                                                )
                                          ),
                                          React.createElement(
                                                'ul',
                                                { className: 'Days' },
                                                React.createElement(
                                                      'li',
                                                      null,
                                                      React.createElement(
                                                            'h4',
                                                            { className: 'h4', style: { color: '#1E90FF' } },
                                                            React.createElement(
                                                                  'strong',
                                                                  null,
                                                                  'Sunday:'
                                                            )
                                                      ),
                                                      'Price:',
                                                      React.createElement('input', { type: 'text', name: 'price2', placeholder: 'JOD' }),
                                                      React.createElement(
                                                            'h4',
                                                            null,
                                                            'Cooking Name:'
                                                      ),
                                                      React.createElement(
                                                            'select',
                                                            { style: { width: '250px' } },
                                                            React.createElement(
                                                                  'option',
                                                                  null,
                                                                  'cook name'
                                                            )
                                                      )
                                                )
                                          ),
                                          React.createElement(
                                                'ul',
                                                { className: 'Days' },
                                                React.createElement(
                                                      'li',
                                                      null,
                                                      React.createElement(
                                                            'h4',
                                                            { className: 'h4', style: { color: '#1E90FF' } },
                                                            React.createElement(
                                                                  'strong',
                                                                  null,
                                                                  'Monday:'
                                                            )
                                                      ),
                                                      'Price:',
                                                      React.createElement('input', { type: 'text', name: 'price3', placeholder: 'JOD' }),
                                                      React.createElement(
                                                            'h4',
                                                            null,
                                                            'Cooking Name:'
                                                      ),
                                                      React.createElement(
                                                            'select',
                                                            { style: { width: '250px' } },
                                                            React.createElement(
                                                                  'option',
                                                                  null,
                                                                  'cook name '
                                                            )
                                                      )
                                                )
                                          ),
                                          React.createElement(
                                                'ul',
                                                { className: 'Days' },
                                                React.createElement(
                                                      'li',
                                                      null,
                                                      React.createElement(
                                                            'h4',
                                                            { className: 'h4', style: { color: '#1E90FF' } },
                                                            React.createElement(
                                                                  'strong',
                                                                  null,
                                                                  'Tuesday:'
                                                            )
                                                      ),
                                                      'Price:',
                                                      React.createElement('input', { type: 'text', name: 'price4', placeholder: 'JOD' }),
                                                      React.createElement(
                                                            'h4',
                                                            null,
                                                            'Cooking Name:'
                                                      ),
                                                      React.createElement(
                                                            'select',
                                                            { style: { width: '250px' } },
                                                            React.createElement(
                                                                  'option',
                                                                  null,
                                                                  ' cook name'
                                                            )
                                                      )
                                                )
                                          ),
                                          React.createElement(
                                                'ul',
                                                { className: 'Days' },
                                                React.createElement(
                                                      'li',
                                                      null,
                                                      React.createElement(
                                                            'h4',
                                                            { className: 'h4', style: { color: '#1E90FF' } },
                                                            React.createElement(
                                                                  'strong',
                                                                  null,
                                                                  'Wednesday:'
                                                            )
                                                      ),
                                                      'Price:',
                                                      React.createElement('input', { type: 'text', name: 'price5', placeholder: 'JOD' }),
                                                      React.createElement(
                                                            'h4',
                                                            null,
                                                            'Cooking Name:'
                                                      ),
                                                      React.createElement(
                                                            'select',
                                                            { style: { width: '250px' } },
                                                            React.createElement(
                                                                  'option',
                                                                  null,
                                                                  ' cook name'
                                                            )
                                                      )
                                                )
                                          ),
                                          React.createElement(
                                                'ul',
                                                { className: 'Days' },
                                                React.createElement(
                                                      'li',
                                                      null,
                                                      React.createElement(
                                                            'h4',
                                                            { className: 'h4', style: { color: '#1E90FF' } },
                                                            React.createElement(
                                                                  'strong',
                                                                  null,
                                                                  'Thursday:'
                                                            )
                                                      ),
                                                      'Price:',
                                                      React.createElement('input', { type: 'text', name: 'price6', placeholder: 'JOD' }),
                                                      React.createElement(
                                                            'h4',
                                                            null,
                                                            'Cooking Name:'
                                                      ),
                                                      React.createElement(
                                                            'select',
                                                            { style: { width: '250px' } },
                                                            React.createElement(
                                                                  'option',
                                                                  null,
                                                                  ' cook name'
                                                            )
                                                      )
                                                )
                                          ),
                                          React.createElement(
                                                'ul',
                                                { className: 'Days' },
                                                React.createElement(
                                                      'li',
                                                      null,
                                                      React.createElement(
                                                            'h4',
                                                            { className: 'h4', style: { color: '#1E90FF' } },
                                                            React.createElement(
                                                                  'strong',
                                                                  null,
                                                                  'Friday:'
                                                            )
                                                      ),
                                                      'Price:',
                                                      React.createElement('input', { type: 'text', name: 'price7', placeholder: 'JOD' }),
                                                      React.createElement(
                                                            'h4',
                                                            null,
                                                            'Cooking Name:'
                                                      ),
                                                      React.createElement(
                                                            'select',
                                                            { style: { width: '250px' } },
                                                            React.createElement(
                                                                  'option',
                                                                  null,
                                                                  ' cook name'
                                                            )
                                                      )
                                                )
                                          )
                                    ),
                                    React.createElement('input', { type: 'submit', className: 'btn btn-info', value: 'Submit' })
                              ),
                              'user schedule',
                              React.createElement(
                                    'h4',
                                    null,
                                    React.createElement(
                                          'strong',
                                          null,
                                          'Do you have account already?'
                                    )
                              ),
                              React.createElement(
                                    'a',
                                    { href: '#/signin' },
                                    React.createElement('input', { type: 'submit', className: 'btn btn-danger', value: 'Signin' })
                              )
                        )
                  );
            }
      }]);

      return SignUp;
}(React.Component);

window.SignUp = SignUp;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hY2NvdW50L3NpZ251cC5qc3giXSwibmFtZXMiOlsiU2lnblVwIiwiYmFja2dyb3VuZCIsImJhY2tncm91bmRQb3NpdGlvbiIsIm1pbkhlaWdodCIsInpJbmRleCIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwibWFyZ2luIiwiZm9udFdlaWdodCIsImNvbG9yIiwiZm9udFNpemUiLCJ3aWR0aCIsIlJlYWN0IiwiQ29tcG9uZW50Iiwid2luZG93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLE07Ozs7Ozs7Ozs7O3FDQUNLO0FBQ1AseUJBQ0U7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBLGdDQUFLLFdBQVUsS0FBZixFQUFxQixPQUFRO0FBQzNCQyxzREFBWSw0QkFEZTtBQUUzQkMsOERBQW9CLFFBRk87QUFHM0JDLHFEQUFXLE9BSGdCO0FBSTNCQyxrREFBUSxHQUptQjtBQUszQkMsc0RBQVk7QUFMZSxxQ0FBN0I7QUFRQTtBQUFBO0FBQUEsc0NBQUssV0FBVSxLQUFmLEVBQXFCLE9BQU8sRUFBQ0MsZUFBZSxNQUFoQixFQUF3QkMsUUFBUSxLQUFoQyxFQUE1QjtBQUNBO0FBQUE7QUFBQSw0Q0FBSyxXQUFVLHVDQUFmO0FBQ0E7QUFBQTtBQUFBLGtEQUFJLE9BQU8sRUFBQ0MsWUFBWSxNQUFiLEVBQXFCQyxPQUFPLE1BQTVCLEVBQVg7QUFBQTtBQUFBLDJDQURBO0FBRUE7QUFBQTtBQUFBLGtEQUFJLE9BQU8sRUFBQ0EsT0FBTyxTQUFSLEVBQVg7QUFBQTtBQUFBLDJDQUZBO0FBR0E7QUFBQTtBQUFBLGtEQUFJLE9BQU8sRUFBQ0EsT0FBTyxTQUFSLEVBQVg7QUFBQTtBQUFBO0FBSEE7QUFEQTtBQVJBLHlCQURBO0FBaUJBO0FBQUE7QUFBQSxnQ0FBSyxXQUFVLFdBQWY7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUEsNENBQUssV0FBVSxZQUFmO0FBQ0E7QUFBQTtBQUFBLGtEQUFPLE9BQUksTUFBWDtB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TSxRQUFwRDtBQTFIQSwrQkFGQTtBQUFBO0FBa0lBO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBSiwrQkFsSUE7QUFtSUE7QUFBQTtBQUFBLHNDQUFHLE1BQUssVUFBUjtBQUNBLG1FQUFPLE1BQUssUUFBWixFQUFxQixXQUFVLGdCQUEvQixFQUFnRCxPQUFNLFFBQXREO0FBREE7QUFuSUE7QUFqQkEsbUJBREY7QUEySkg7Ozs7RUE3Sm9CQyxNQUFNQyxTOztBQWdLM0JDLE9BQU9kLE1BQVAsR0FBZ0JBLE1BQWhCIiwiZmlsZSI6InNpZ251cC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFNpZ25VcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIiBzdHlsZT0ge3tcclxuICAgICAgICBiYWNrZ3JvdW5kOiAndXJsKC9hc3NldHMvaGVhZGVyLWJnLmpwZyknLFxyXG4gICAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogJ2JvdHRvbScsXHJcbiAgICAgICAgbWluSGVpZ2h0OiAnMjUwcHgnLFxyXG4gICAgICAgIHpJbmRleDogJzInLFxyXG4gICAgICAgIHBhZGRpbmdUb3A6ICcxMDBweCdcclxuICAgICAgfX0+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiIHN0eWxlPXt7cGFkZGluZ0JvdHRvbTogJzUwcHgnLCBtYXJnaW46ICcwcHgnfX0+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTEwIGNvbC1tZC1vZmZzZXQtMSB0ZXh0LWNlbnRlclwiPlxyXG4gICAgICA8aDEgc3R5bGU9e3tmb250V2VpZ2h0OiAnYm9sZCcsIGNvbG9yOiAnI2ZmZid9fT5TaWduIEluIGF0IE90Ym81bHkhPC9oMT5cclxuICAgICAgPGgyIHN0eWxlPXt7Y29sb3I6ICcjZGVkZWRlJ319PlNpZ24gaW4gYW5kIGVuam95IG91ciBmZWF0dXJlcyEgU3RhcnQgb3JkZXJpbmcgaG9tZS1tYWRlIGZvb2QhPC9oMj5cclxuICAgICAgPGgyIHN0eWxlPXt7Y29sb3I6ICcjZGVkZWRlJ319PllhbGxhITwvaDI+XHJcbiAgICAgIDwvZGl2PjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcblxyXG4gICAgICA8Zm9ybT5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgIDxsYWJlbCBmb3I9XCJ1c2VyXCI+RnVsbCBOYW1lOjwvbGFiZWw+XHJcbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwieW91ciBmaXJzdCBhbmQgbGFzdCBuYW1lXCIgcmVxdWlyZWQgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICA8bGFiZWwgZm9yPVwidXNlclwiPlVzZXIgTmFtZTo8L2xhYmVsPlxyXG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cInlvdXIgbmFtZVwiIHJlcXVpcmVkIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgPGxhYmVsIGZvcj1cInB3ZFwiPlBhc3N3b3JkOjwvbGFiZWw+XHJcbiAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cInlvdXIgYXNzd29yZFwiIHJlcXVpcmVkIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgPGxhYmVsIGZvciA9IFwicGhvbmVcIj5QaG9uZSBOdW1iZXI6PC9sYWJlbD5cclxuICAgICAgPGlucHV0ICB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwieW91ciBudW1iZXJcIiByZXF1aXJlZCAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgIDxsYWJlbCBmb3I9XCJ1c2VyXCI+RW1haWwgYWRkcmVzczo8L2xhYmVsPlxyXG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cInlvdXIgZW1haWxcIiByZXF1aXJlZCAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgIDxsYWJlbCBmb3I9XCJ1c2VyXCI+QWRkcmVzczo8L2xhYmVsPlxyXG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cInlvdXIgYWRkcmVzc1wiIHJlcXVpcmVkIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2PlxyXG4gICAgICA8aDM+PHN0cm9uZz5BcmUgWW91IENvb2tlciA/ISBcclxuICAgICAgPC9zdHJvbmc+PC9oMz5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1c2VyXCIgc3R5bGUgPSB7eyBmb250U2l6ZTogJzE3cHgnIH19PlxyXG4gICAgICA8aW5wdXQgbmFtZT1cInVzZXJUeXBlXCIgdHlwZT1cImNoZWNrYm94XCIgLz4gWXViLCBJIGFtIENvb2tlclxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXY+XHJcbiAgICAgIDxoMz48c3Ryb25nPkluc2VydCBZb3VyIENvb2tpbmcgU2NoZWR1bGUgSGVyZVxyXG4gICAgICA8L3N0cm9uZz48L2gzPlxyXG4gICAgICA8dWwgY2xhc3NOYW1lPVwiRGF5c1wiIHN0eWxlPXt7Zm9udFNpemU6ICcxN3B4J319PlxyXG4gICAgICA8bGk+PGg0IGNsYXNzTmFtZT1cImg0XCIgc3R5bGUgPSB7eyBjb2xvcjogJyMxRTkwRkYnfX0+PHN0cm9uZz5TYXR1cmRheTo8L3N0cm9uZz48L2g0PlxyXG4gICAgICBQcmljZTpcclxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInByaWNlMVwiIHBsYWNlaG9sZGVyPVwiSk9EXCIvPlxyXG4gICAgICBcclxuICAgICAgPGg0PkNvb2tpbmcgTmFtZTo8L2g0PlxyXG4gICAgICA8c2VsZWN0IHN0eWxlPSB7e3dpZHRoOiAnMjUwcHgnfX0+XHJcbiAgICAgIDxvcHRpb24gPmNvb2sgbmFtZTwvb3B0aW9uPlxyXG4gICAgICA8L3NlbGVjdD5cclxuICAgICAgPC9saT5cclxuICAgICAgPC91bD5cclxuICAgICAgXHJcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJEYXlzXCI+XHJcbiAgICAgIDxsaT48aDQgY2xhc3NOYW1lPVwiaDRcIiBzdHlsZSA9IHt7IGNvbG9yOiAnIzFFOTBGRid9fT48c3Ryb25nPlN1bmRheTo8L3N0cm9uZz48L2g0PlxyXG4gICAgICBQcmljZTpcclxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInByaWNlMlwiIHBsYWNlaG9sZGVyPVwiSk9EXCIgLz5cclxuXHJcbiAgICAgIDxoND5Db29raW5nIE5hbWU6PC9oND5cclxuICAgICAgPHNlbGVjdCBzdHlsZT17eyB3aWR0aDogJzI1MHB4JyB9fT5cclxuICAgICAgPG9wdGlvbj5jb29rIG5hbWU8L29wdGlvbj5cclxuICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICAgIFxyXG4gICAgICA8dWwgY2xhc3NOYW1lPVwiRGF5c1wiPlxyXG4gICAgICA8bGk+PGg0IGNsYXNzTmFtZT1cImg0XCIgc3R5bGUgPSB7eyBjb2xvcjogJyMxRTkwRkYnfX0+PHN0cm9uZz5Nb25kYXk6PC9zdHJvbmc+PC9oND5cclxuICAgICAgUHJpY2U6XHJcbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJwcmljZTNcIiBwbGFjZWhvbGRlcj1cIkpPRFwiIC8+XHJcbiAgICAgIFxyXG4gICAgICA8aDQ+Q29va2luZyBOYW1lOjwvaDQ+XHJcbiAgICAgIDxzZWxlY3Qgc3R5bGU9e3t3aWR0aDogJzI1MHB4J319PlxyXG4gICAgICA8b3B0aW9uPmNvb2sgbmFtZSA8L29wdGlvbj5cclxuICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICAgIFxyXG4gICAgICA8dWwgY2xhc3NOYW1lPVwiRGF5c1wiPlxyXG4gICAgICA8bGk+PGg0IGNsYXNzTmFtZT1cImg0XCIgc3R5bGUgPSB7eyBjb2xvcjogJyMxRTkwRkYnfX0+PHN0cm9uZz5UdWVzZGF5Ojwvc3Ryb25nPjwvaDQ+XHJcbiAgICAgIFByaWNlOlxyXG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwicHJpY2U0XCIgcGxhY2Vob2xkZXI9XCJKT0RcIiAvPlxyXG4gICAgICBcclxuICAgICAgPGg0PkNvb2tpbmcgTmFtZTo8L2g0PlxyXG4gICAgICA8c2VsZWN0ICBzdHlsZT17eyB3aWR0aDogJzI1MHB4J319PlxyXG4gICAgICA8b3B0aW9uPiBjb29rIG5hbWU8L29wdGlvbj5cclxuICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcblxyXG5cclxuICAgICAgPHVsIGNsYXNzTmFtZT1cIkRheXNcIj5cclxuICAgICAgPGxpPjxoNCBjbGFzc05hbWU9XCJoNFwiIHN0eWxlID0ge3sgY29sb3I6ICcjMUU5MEZGJ319PjxzdHJvbmc+V2VkbmVzZGF5Ojwvc3Ryb25nPjwvaDQ+XHJcbiAgICAgIFByaWNlOlxyXG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwicHJpY2U1XCIgcGxhY2Vob2xkZXI9XCJKT0RcIiAvPlxyXG4gICAgICBcclxuICAgICAgPGg0PkNvb2tpbmcgTmFtZTo8L2g0PlxyXG4gICAgICA8c2VsZWN0IHN0eWxlPSB7e3dpZHRoOiAnMjUwcHgnfX0+XHJcbiAgICAgIDxvcHRpb24+IGNvb2sgbmFtZTwvb3B0aW9uPlxyXG4gICAgICA8L3NlbGVjdD5cclxuICAgICAgPC9saT5cclxuICAgICAgPC91bD5cclxuICAgICAgXHJcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJEYXlzXCI+XHJcbiAgICAgIDxsaT48aDQgY2xhc3NOYW1lPVwiaDRcIiBzdHlsZSA9IHt7IGNvbG9yOiAnIzFFOTBGRid9fT48c3Ryb25nPlRodXJzZGF5Ojwvc3Ryb25nPjwvaDQ+XHJcbiAgICAgIFByaWNlOlxyXG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwicHJpY2U2XCIgcGxhY2Vob2xkZXI9XCJKT0RcIiAvPlxyXG4gICAgICBcclxuICAgICAgPGg0PkNvb2tpbmcgTmFtZTo8L2g0PlxyXG4gICAgICA8c2VsZWN0IHN0eWxlPXt7d2lkdGg6ICcyNTBweCd9fT5cclxuICAgICAgPG9wdGlvbj4gY29vayBuYW1lPC9vcHRpb24+XHJcbiAgICAgIDwvc2VsZWN0PlxyXG4gICAgICA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgICBcclxuICAgICAgPHVsIGNsYXNzTmFtZT1cIkRheXNcIj5cclxuICAgICAgPGxpPjxoNCBjbGFzc05hbWU9XCJoNFwiIHN0eWxlID0ge3sgY29sb3I6ICcjMUU5MEZGJ319PjxzdHJvbmc+RnJpZGF5Ojwvc3Ryb25nPjwvaDQ+XHJcbiAgICAgIFByaWNlOlxyXG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwicHJpY2U3XCIgcGxhY2Vob2xkZXI9XCJKT0RcIiAvPlxyXG4gICAgICBcclxuICAgICAgPGg0PkNvb2tpbmcgTmFtZTo8L2g0PlxyXG4gICAgICA8c2VsZWN0IHN0eWxlPXt7d2lkdGg6ICcyNTBweCd9fT5cclxuICAgICAgPG9wdGlvbj4gY29vayBuYW1lPC9vcHRpb24+XHJcbiAgICAgIDwvc2VsZWN0PlxyXG4gICAgICA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgICBcclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzTmFtZT1cImJ0biBidG4taW5mb1wiIHZhbHVlPVwiU3VibWl0XCIgLz5cclxuICAgICAgPC9mb3JtPlxyXG5cclxuICAgICAgdXNlciBzY2hlZHVsZVxyXG5cclxuXHJcbiAgICAgIDxoND48c3Ryb25nPkRvIHlvdSBoYXZlIGFjY291bnQgYWxyZWFkeT88L3N0cm9uZz48L2g0PlxyXG4gICAgICA8YSBocmVmPVwiIy9zaWduaW5cIj5cclxuICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlclwiIHZhbHVlPVwiU2lnbmluXCIgLz5cclxuICAgICAgPC9hPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIClcclxufVxyXG59XHJcblxyXG53aW5kb3cuU2lnblVwID0gU2lnblVwOyJdfQ==