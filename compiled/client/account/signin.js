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
							{ href: '#/' },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hY2NvdW50L3NpZ25pbi5qc3giXSwibmFtZXMiOlsiU2lnbkluIiwiYmFja2dyb3VuZCIsImJhY2tncm91bmRQb3NpdGlvbiIsIm1pbkhlaWdodCIsInpJbmRleCIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwibWFyZ2luIiwiZm9udFdlaWdodCIsImNvbG9yIiwiUmVhY3QiLCJDb21wb25lbnQiLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7SUFFTUEsTTs7Ozs7Ozs7Ozs7MkJBQ0k7QUFDUixVQUNDO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQSxPQUFLLFdBQVUsS0FBZixFQUFxQixPQUFRO0FBQzVCQyxtQkFBWSw0QkFEZ0I7QUFFNUJDLDJCQUFvQixRQUZRO0FBRzVCQyxrQkFBVyxPQUhpQjtBQUk1QkMsZUFBUSxHQUpvQjtBQUs1QkMsbUJBQVk7QUFMZ0IsT0FBN0I7QUFRQTtBQUFBO0FBQUEsUUFBSyxXQUFVLEtBQWYsRUFBcUIsT0FBTyxFQUFDQyxlQUFlLE1BQWhCLEVBQXdCQyxRQUFRLEtBQWhDLEVBQTVCO0FBQ0E7QUFBQTtBQUFBLFNBQUssV0FBVSx1Q0FBZjtBQUNBO0FBQUE7QUFBQSxVQUFJLE9BQU8sRUFBQ0MsWUFBWSxNQUFiLEVBQXFCQyxPQUFPLE1BQTVCLEVBQVg7QUFBQTtBQUFBLFFBREE7QUFFQTtBQUFBO0FBQUEsVUFBSSxPQUFPLEVBQUNBLE9BQU8sU0FBUixFQUFYO0FBQUE7QUFBQSxRQUZBO0FBR0E7QUFBQTtBQUFBLFVBQUksT0FBTyxFQUFDQSxPQUFPLFNBQVIsRUFBWDtBQUFBO0FBQUE7QUFIQTtBQURBO0FBUkEsS0FEQTtBQWtCQTtBQUFBO0FBQUEsT0FBSyxXQUFVLFdBQWY7QUFFQTtBQUFBO0FBQUEsUUFBTSxNQUFLLFlBQVg7QUFDQTtBQUFBO0FBQUEsU0FBSyxXQUFVLFlBQWY7QUFDQTtBQUFBO0FBQUEsVUFBTyxPQUFJLE1BQVg7QUFBQTtBQUFBLFFBREE7QUFFQSxzQ0FBTyxNQUFLLE1BQVosRUFBbUIsV0FBVSxjQUE3QixFQUE0QyxhQUFZLFdBQXhELEVBQW9FLGNBQXBFO0FBRkEsT0FEQTtBQUtBO0FBQUE7QUFBQSxTQUFLLFdBQVUsWUFBZjtBQUNBO0FBQUE7QUFBQSxVQUFPLE9BQUksS0FBWDtBQUFBO0FBQUEsUUFEQTtBQUVBLHNDQUFPLE1BQUssVUFBWixFQUF1QixXQUFVLGNBQWpDLEVBQWdELGFBQVksZUFBNUQsRUFBNEUsY0FBNUUsR0FGQTtBQUdBO0FBSEEsT0FMQTtBQVVBLHFDQUFPLE1BQUssUUFBWixFQUFxQixXQUFVLGNBQS9CLEVBQThDLE9BQU0sUUFBcEQ7QUFWQSxNQUZBO0FBY0Esb0NBZEE7QUFlQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUosT0FEQTtBQUVBLHFDQUZBO0FBR0E7QUFBQTtBQUFBLFNBQUcsTUFBSyxJQUFSO0FBQ0Esc0NBQU8sTUFBSyxRQUFaLEVBQXFCLFdBQVUsZ0JBQS9CLEVBQWdELE9BQU0sUUFBdEQ7QUFEQTtBQUhBO0FBZkE7QUFsQkEsSUFERDtBQTRDQTs7OztFQTlDbUJDLE1BQU1DLFM7O0FBaUQzQkMsT0FBT1osTUFBUCxHQUFnQkEsTUFBaEIiLCJmaWxlIjoic2lnbmluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9FdmVyeXRoaW5nIGlzIGNsZWFyIGhlcmUsIHRoaXMgcGFnZSBpcyBqdXN0IGZvciBzaWduaW5nIGluLlxyXG5cclxuY2xhc3MgU2lnbkluIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHRyZW5kZXIoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiIHN0eWxlPSB7e1xyXG5cdFx0XHRcdGJhY2tncm91bmQ6ICd1cmwoL2Fzc2V0cy9oZWFkZXItYmcuanBnKScsXHJcblx0XHRcdFx0YmFja2dyb3VuZFBvc2l0aW9uOiAnYm90dG9tJyxcclxuXHRcdFx0XHRtaW5IZWlnaHQ6ICcyNTBweCcsXHJcblx0XHRcdFx0ekluZGV4OiAnMicsXHJcblx0XHRcdFx0cGFkZGluZ1RvcDogJzEwMHB4J1xyXG5cdFx0XHR9fT5cclxuXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93XCIgc3R5bGU9e3twYWRkaW5nQm90dG9tOiAnNTBweCcsIG1hcmdpbjogJzBweCd9fT5cclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMTAgY29sLW1kLW9mZnNldC0xIHRleHQtY2VudGVyXCI+XHJcblx0XHRcdDxoMSBzdHlsZT17e2ZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICcjZmZmJ319PlNpZ24gSW4gYXQgT3RibzVseSE8L2gxPlxyXG5cdFx0XHQ8aDIgc3R5bGU9e3tjb2xvcjogJyNkZWRlZGUnfX0+U2lnbiBpbiBhbmQgZW5qb3kgb3VyIGZlYXR1cmVzISBTdGFydCBvcmRlcmluZyBob21lLW1hZGUgZm9vZCE8L2gyPlxyXG5cdFx0XHQ8aDIgc3R5bGU9e3tjb2xvcjogJyNkZWRlZGUnfX0+WWFsbGEhPC9oMj5cclxuXHRcdFx0PC9kaXY+PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cclxuXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcblx0XHRcdFxyXG5cdFx0XHQ8Zm9ybSBuYW1lPVwic2lnbmluRm9ybVwiPlxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuXHRcdFx0PGxhYmVsIGZvcj1cInVzZXJcIj5Vc2VyIE5hbWU6PC9sYWJlbD5cclxuXHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJ5b3VyIG5hbWVcIiByZXF1aXJlZC8+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuXHRcdFx0PGxhYmVsIGZvcj1cInB3ZFwiPlBhc3N3b3JkOjwvbGFiZWw+XHJcblx0XHRcdDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cInlvdXIgcGFzc3dvcmRcIiByZXF1aXJlZC8+XHJcblx0XHRcdDxicj48L2JyPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PGlucHV0IHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJidG4gYnRuLWluZm9cIiB2YWx1ZT1cIlN1Ym1pdFwiLz5cclxuXHRcdFx0PC9mb3JtPlxyXG5cdFx0XHQ8YnI+PC9icj5cclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0PGg0PjxzdHJvbmc+RG9uJ3QgeW91IGhhdmUgYWNjb3VudD88L3N0cm9uZz48L2g0PlxyXG5cdFx0XHQ8YnI+PC9icj5cclxuXHRcdFx0PGEgaHJlZj1cIiMvXCI+XHJcblx0XHRcdDxpbnB1dCB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXJcIiB2YWx1ZT1cIlNpZ251cFwiLz5cclxuXHRcdFx0PC9hPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0XHQpXHJcblx0fVxyXG59XHJcblxyXG53aW5kb3cuU2lnbkluID0gU2lnbkluOyJdfQ==