'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Everything is clear here, this page is just for signing in.
var SignIn = function (_React$Component) {
	_inherits(SignIn, _React$Component);

	function SignIn() {
		_classCallCheck(this, SignIn);

		return _possibleConstructorReturn(this, (SignIn.__proto__ || Object.getPrototypeOf(SignIn)).apply(this, arguments));
	}

	_createClass(SignIn, [{
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
						{ name: 'signinForm' },
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
							React.createElement('input', { type: 'password', className: 'form-control', placeholder: 'your password', required: true }),
							React.createElement('br', null)
						),
						React.createElement('input', { type: 'submit', className: 'btn btn-info', value: 'Submit' })
					),
					React.createElement('br', null),
					React.createElement(
						'div',
						null,
						React.createElement(
							'h4',
							null,
							React.createElement(
								'strong',
								null,
								'Don\'t you have account?'
							)
						),
						React.createElement('br', null),
						React.createElement(
							'a',
							{ href: '#/signup' },
							React.createElement('input', { type: 'submit', className: 'btn btn-danger', value: 'Signup' })
						)
					)
				)
			);
		}
	}]);

	return SignIn;
}(React.Component);

window.SignIn = SignIn;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hY2NvdW50L3NpZ25pbi5qc3giXSwibmFtZXMiOlsiU2lnbkluIiwiYmFja2dyb3VuZCIsImJhY2tncm91bmRQb3NpdGlvbiIsIm1pbkhlaWdodCIsInpJbmRleCIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwibWFyZ2luIiwiZm9udFdlaWdodCIsImNvbG9yIiwiUmVhY3QiLCJDb21wb25lbnQiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtJQUNNQSxNOzs7Ozs7Ozs7OzsyQkFDSTtBQUNSLFVBQ0M7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBLE9BQUssV0FBVSxLQUFmLEVBQXFCLE9BQVE7QUFDNUJDLG1CQUFZLDRCQURnQjtBQUU1QkMsMkJBQW9CLFFBRlE7QUFHNUJDLGtCQUFXLE9BSGlCO0FBSTVCQyxlQUFRLEdBSm9CO0FBSzVCQyxtQkFBWTtBQUxnQixPQUE3QjtBQVFBO0FBQUE7QUFBQSxRQUFLLFdBQVUsS0FBZixFQUFxQixPQUFPLEVBQUNDLGVBQWUsTUFBaEIsRUFBd0JDLFFBQVEsS0FBaEMsRUFBNUI7QUFDQTtBQUFBO0FBQUEsU0FBSyxXQUFVLHVDQUFmO0FBQ0E7QUFBQTtBQUFBLFVBQUksT0FBTyxFQUFDQyxZQUFZLE1BQWIsRUFBcUJDLE9BQU8sTUFBNUIsRUFBWDtBQUFBO0FBQUEsUUFEQTtBQUVBO0FBQUE7QUFBQSxVQUFJLE9BQU8sRUFBQ0EsT0FBTyxTQUFSLEVBQVg7QUFBQTtBQUFBLFFBRkE7QUFHQTtBQUFBO0FBQUEsVUFBSSxPQUFPLEVBQUNBLE9BQU8sU0FBUixFQUFYO0FBQUE7QUFBQTtBQUhBO0FBREE7QUFSQSxLQURBO0FBa0JBO0FBQUE7QUFBQSxPQUFLLFdBQVUsV0FBZjtBQUVBO0FBQUE7QUFBQSxRQUFNLE1BQUssWUFBWDtBQUNBO0FBQUE7QUFBQSxTQUFLLFdBQVUsWUFBZjtBQUNBO0FBQUE7QUFBQSxVQUFPLE9BQUksTUFBWDtBQUFBO0FBQUEsUUFEQTtBQUVBLHNDQUFPLE1BQUssTUFBWixFQUFtQixXQUFVLGNBQTdCLEVBQTRDLGFBQVksV0FBeEQsRUFBb0UsY0FBcEU7QUFGQSxPQURBO0FBS0E7QUFBQTtBQUFBLFNBQUssV0FBVSxZQUFmO0FBQ0E7QUFBQTtBQUFBLFVBQU8sT0FBSSxLQUFYO0FBQUE7QUFBQSxRQURBO0FBRUEsc0NBQU8sTUFBSyxVQUFaLEVBQXVCLFdBQVUsY0FBakMsRUFBZ0QsYUFBWSxlQUE1RCxFQUE0RSxjQUE1RSxHQUZBO0FBR0E7QUFIQSxPQUxBO0FBVUEscUNBQU8sTUFBSyxRQUFaLEVBQXFCLFdBQVUsY0FBL0IsRUFBOEMsT0FBTSxRQUFwRDtBQVZBLE1BRkE7QUFjQSxvQ0FkQTtBQWVBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBSixPQURBO0FBRUEscUNBRkE7QUFHQTtBQUFBO0FBQUEsU0FBRyxNQUFLLFVBQVI7QUFDQSxzQ0FBTyxNQUFLLFFBQVosRUFBcUIsV0FBVSxnQkFBL0IsRUFBZ0QsT0FBTSxRQUF0RDtBQURBO0FBSEE7QUFmQTtBQWxCQSxJQUREO0FBNENBOzs7O0VBOUNtQkMsTUFBTUMsUzs7QUFpRDNCQyxPQUFPWixNQUFQLEdBQWdCQSxNQUFoQiIsImZpbGUiOiJzaWduaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0V2ZXJ5dGhpbmcgaXMgY2xlYXIgaGVyZSwgdGhpcyBwYWdlIGlzIGp1c3QgZm9yIHNpZ25pbmcgaW4uXHJcbmNsYXNzIFNpZ25JbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblx0cmVuZGVyKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3dcIiBzdHlsZT0ge3tcclxuXHRcdFx0XHRiYWNrZ3JvdW5kOiAndXJsKC9hc3NldHMvaGVhZGVyLWJnLmpwZyknLFxyXG5cdFx0XHRcdGJhY2tncm91bmRQb3NpdGlvbjogJ2JvdHRvbScsXHJcblx0XHRcdFx0bWluSGVpZ2h0OiAnMjUwcHgnLFxyXG5cdFx0XHRcdHpJbmRleDogJzInLFxyXG5cdFx0XHRcdHBhZGRpbmdUb3A6ICcxMDBweCdcclxuXHRcdFx0fX0+XHJcblxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiIHN0eWxlPXt7cGFkZGluZ0JvdHRvbTogJzUwcHgnLCBtYXJnaW46ICcwcHgnfX0+XHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTEwIGNvbC1tZC1vZmZzZXQtMSB0ZXh0LWNlbnRlclwiPlxyXG5cdFx0XHQ8aDEgc3R5bGU9e3tmb250V2VpZ2h0OiAnYm9sZCcsIGNvbG9yOiAnI2ZmZid9fT5TaWduIEluIGF0IE90Ym81bHkhPC9oMT5cclxuXHRcdFx0PGgyIHN0eWxlPXt7Y29sb3I6ICcjZGVkZWRlJ319PlNpZ24gaW4gYW5kIGVuam95IG91ciBmZWF0dXJlcyEgU3RhcnQgb3JkZXJpbmcgaG9tZS1tYWRlIGZvb2QhPC9oMj5cclxuXHRcdFx0PGgyIHN0eWxlPXt7Y29sb3I6ICcjZGVkZWRlJ319PllhbGxhITwvaDI+XHJcblx0XHRcdDwvZGl2PjwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHJcblxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxyXG5cdFx0XHRcclxuXHRcdFx0PGZvcm0gbmFtZT1cInNpZ25pbkZvcm1cIj5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcblx0XHRcdDxsYWJlbCBmb3I9XCJ1c2VyXCI+VXNlciBOYW1lOjwvbGFiZWw+XHJcblx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwieW91ciBuYW1lXCIgcmVxdWlyZWQvPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcblx0XHRcdDxsYWJlbCBmb3I9XCJwd2RcIj5QYXNzd29yZDo8L2xhYmVsPlxyXG5cdFx0XHQ8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJ5b3VyIHBhc3N3b3JkXCIgcmVxdWlyZWQvPlxyXG5cdFx0XHQ8YnI+PC9icj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdDxpbnB1dCB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1pbmZvXCIgdmFsdWU9XCJTdWJtaXRcIi8+XHJcblx0XHRcdDwvZm9ybT5cclxuXHRcdFx0PGJyPjwvYnI+XHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdDxoND48c3Ryb25nPkRvbid0IHlvdSBoYXZlIGFjY291bnQ/PC9zdHJvbmc+PC9oND5cclxuXHRcdFx0PGJyPjwvYnI+XHJcblx0XHRcdDxhIGhyZWY9XCIjL3NpZ251cFwiPlxyXG5cdFx0XHQ8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzTmFtZT1cImJ0biBidG4tZGFuZ2VyXCIgdmFsdWU9XCJTaWdudXBcIi8+XHJcblx0XHRcdDwvYT5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KVxyXG5cdH1cclxufVxyXG5cclxud2luZG93LlNpZ25JbiA9IFNpZ25JbjsiXX0=