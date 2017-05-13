'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
	}

	_createClass(App, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ style: { backgroundImage: 'url(/assets/header-bg.jpg)',
						backgroundPosition: 'bottom',
						paddingTop: '10px' } },
				React.createElement(
					'div',
					null,
					React.createElement(
						'div',
						{ className: 'container-fluid' },
						React.createElement(
							'nav',
							{ className: 'navbar navbar-inverse', style: { margin: '25px 50px',
									backgroundColor: 'rgba(31, 31, 31, 0.7)',
									borderColor: '#484848',
									zIndex: '3',
									position: 'absolute'
								} },
							React.createElement(
								'div',
								{ className: 'container' },
								React.createElement(
									'div',
									{ className: 'navbar-header' },
									React.createElement(
										'button',
										{ type: 'button', className: 'navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#bs-example-navbar-collapse-1', 'aria-expanded': 'false' },
										React.createElement(
											'span',
											{ className: 'sr-only' },
											'Toggle navigation'
										),
										React.createElement('span', { className: 'icon-bar' }),
										React.createElement('span', { className: 'icon-bar' }),
										React.createElement('span', { clNameass: 'icon-bar' })
									),
									React.createElement(
										'a',
										{ className: 'navbar-brand', href: '#/', style: { color: "#257204" } },
										'Otbo5ly',
										React.createElement(
											'small',
											null,
											' beta'
										)
									)
								),
								React.createElement(
									'div',
									{ className: 'collapse navbar-collapse', id: 'bs-example-navbar-collapse-1' },
									React.createElement(
										'ul',
										{ className: 'nav navbar-nav' },
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#/users' },
												'My Profile'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#/orders' },
												'My Orders'
											)
										),
										React.createElement(
											'li',
											null,
											' ',
											React.createElement(
												'a',
												{ href: '#/signin' },
												'Sign In'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '<SignUp></SignUp>' },
												'Sign Up'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#/signout' },
												'Sign out'
											)
										)
									),
									React.createElement(
										'ul',
										{ className: 'nav navbar-nav navbar-right' },
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: 'http://www.rbk.org', target: '_blank' },
												'RBK'
											)
										),
										React.createElement(
											'li',
											{ className: 'dropdown' },
											React.createElement(
												'a',
												{ className: 'dropdown-toggleName', 'data-toggle': 'dropdown', role: 'button', 'aria-haspopup': 'true', 'aria-expanded': 'false' },
												'Developers ',
												React.createElement('span', { 'class': 'caret' })
											),
											React.createElement(
												'ul',
												{ className: 'dropdown-menu' },
												React.createElement(
													'li',
													null,
													React.createElement(
														'a',
														{ href: 'https://github.com/montaserRahmani', target: '_blank' },
														'M. Rahmani'
													)
												),
												React.createElement(
													'li',
													null,
													React.createElement(
														'a',
														{ href: 'https://github.com/saeedhomsy', target: '_blank' },
														'S. Alhomsi'
													)
												),
												React.createElement(
													'li',
													null,
													React.createElement(
														'a',
														{ href: 'https://github.com/ZainabOmar', target: '_blank' },
														'Z. Hammami'
													)
												),
												React.createElement(
													'li',
													null,
													React.createElement(
														'a',
														{ href: 'https://github.com/HadeelBaloush', target: '_blank' },
														'H. Baloush'
													)
												)
											)
										)
									)
								)
							)
						)
					),
					React.createElement(
						'div',
						null,
						React.createElement('br', null),
						React.createElement('br', null),
						React.createElement('br', null),
						React.createElement('br', null),
						React.createElement('br', null)
					)
				),
				React.createElement(MainPage, null),
				React.createElement(
					Router,
					{ history: hashHistory },
					React.createElement(
						Route,
						{ path: '/signup', component: SignUp },
						'signup'
					),
					React.createElement(
						Route,
						{ path: 'signin', component: SignIn },
						'signin'
					)
				)
			);
		}
	}]);

	return App;
}(React.Component);

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined


window.App = App;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9hcHAvYXBwLmpzeCJdLCJuYW1lcyI6WyJBcHAiLCJwcm9wcyIsImJhY2tncm91bmRJbWFnZSIsImJhY2tncm91bmRQb3NpdGlvbiIsInBhZGRpbmdUb3AiLCJtYXJnaW4iLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJDb2xvciIsInpJbmRleCIsInBvc2l0aW9uIiwiY29sb3IiLCJoYXNoSGlzdG9yeSIsIlNpZ25VcCIsIlNpZ25JbiIsIlJlYWN0IiwiQ29tcG9uZW50Iiwid2luZG93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU1BLEc7OztBQUVMLGNBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxtR0FDWkEsS0FEWTtBQUVsQjs7OzsyQkFFUTtBQUNSLFVBQ0M7QUFBQTtBQUFBLE1BQUssT0FBUyxFQUFDQyxpQkFBaUIsNEJBQWxCO0FBQ2RDLDBCQUFvQixRQUROO0FBRWRDLGtCQUFZLE1BRkUsRUFBZDtBQUdBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQSxRQUFLLFdBQVUsaUJBQWY7QUFDQTtBQUFBO0FBQUEsU0FBSyxXQUFVLHVCQUFmLEVBQXVDLE9BQVMsRUFBRUMsUUFBUSxXQUFWO0FBQ2hEQywwQkFBaUIsdUJBRCtCO0FBRWhEQyxzQkFBYSxTQUZtQztBQUdoREMsaUJBQVEsR0FId0M7QUFJaERDLG1CQUFVO0FBSnNDLFNBQWhEO0FBTUQ7QUFBQTtBQUFBLFVBQUssV0FBVSxXQUFmO0FBQ0E7QUFBQTtBQUFBLFdBQUssV0FBVSxlQUFmO0FBQ0E7QUFBQTtBQUFBLFlBQVEsTUFBSyxRQUFiLEVBQXNCLFdBQVUseUJBQWhDLEVBQTBELGVBQVksVUFBdEUsRUFBaUYsZUFBWSwrQkFBN0YsRUFBNkgsaUJBQWMsT0FBM0k7QUFDQTtBQUFBO0FBQUEsYUFBTSxXQUFVLFNBQWhCO0FBQUE7QUFBQSxXQURBO0FBRUEsd0NBQU0sV0FBVSxVQUFoQixHQUZBO0FBR0Esd0NBQU0sV0FBVSxVQUFoQixHQUhBO0FBSUEsd0NBQU0sV0FBVSxVQUFoQjtBQUpBLFVBREE7QUFPQTtBQUFBO0FBQUEsWUFBRyxXQUFVLGNBQWIsRUFBNEIsTUFBSyxJQUFqQyxFQUFzQyxPQUFTLEVBQUNDLE9BQU8sU0FBUixFQUEvQztBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBUEEsU0FEQTtBQVdBO0FBQUE7QUFBQSxXQUFLLFdBQVUsMEJBQWYsRUFBMEMsSUFBRyw4QkFBN0M7QUFDQTtBQUFBO0FBQUEsWUFBSSxXQUFVLGdCQUFkO0FBQ0E7QUFBQTtBQUFBO0FBQUk7QUFBQTtBQUFBLGNBQUcsTUFBSyxTQUFSO0FBQUE7QUFBQTtBQUFKLFdBREE7QUFFQTtBQUFBO0FBQUE7QUFBSTtBQUFBO0FBQUEsY0FBRyxNQUFLLFVBQVI7QUFBQTtBQUFBO0FBQUosV0FGQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQUs7QUFBQTtBQUFBLGNBQUcsTUFBTyxVQUFWO0FBQUE7QUFBQTtBQUFMLFdBSEE7QUFJQTtBQUFBO0FBQUE7QUFBSTtBQUFBO0FBQUEsY0FBRyxNQUFLLG1CQUFSO0FBQUE7QUFBQTtBQUFKLFdBSkE7QUFLQTtBQUFBO0FBQUE7QUFBSTtBQUFBO0FBQUEsY0FBRyxNQUFLLFdBQVI7QUFBQTtBQUFBO0FBQUo7QUFMQSxVQURBO0FBUUE7QUFBQTtBQUFBLFlBQUksV0FBVSw2QkFBZDtBQUNBO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSxjQUFHLE1BQUssb0JBQVIsRUFBNkIsUUFBTyxRQUFwQztBQUFBO0FBQUE7QUFBSixXQURBO0FBRUE7QUFBQTtBQUFBLGFBQUksV0FBVSxVQUFkO0FBQ0E7QUFBQTtBQUFBLGNBQUcsV0FBVSxxQkFBYixFQUFtQyxlQUFZLFVBQS9DLEVBQTBELE1BQUssUUFBL0QsRUFBd0UsaUJBQWMsTUFBdEYsRUFBNkYsaUJBQWMsT0FBM0c7QUFBQTtBQUE4SCwwQ0FBTSxTQUFNLE9BQVo7QUFBOUgsWUFEQTtBQUVBO0FBQUE7QUFBQSxjQUFJLFdBQVUsZUFBZDtBQUNBO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSxnQkFBRyxNQUFLLG9DQUFSLEVBQTZDLFFBQU8sUUFBcEQ7QUFBQTtBQUFBO0FBQUosYUFEQTtBQUVBO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSxnQkFBRyxNQUFLLCtCQUFSLEVBQXdDLFFBQU8sUUFBL0M7QUFBQTtBQUFBO0FBQUosYUFGQTtBQUdBO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSxnQkFBRyxNQUFLLCtCQUFSLEVBQXdDLFFBQU8sUUFBL0M7QUFBQTtBQUFBO0FBQUosYUFIQTtBQUlBO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQSxnQkFBRyxNQUFLLGtDQUFSLEVBQTJDLFFBQU8sUUFBbEQ7QUFBQTtBQUFBO0FBQUo7QUFKQTtBQUZBO0FBRkE7QUFSQTtBQVhBO0FBTkM7QUFEQSxNQURBO0FBMkNEO0FBQUE7QUFBQTtBQUNBLHFDQURBO0FBRUEscUNBRkE7QUFHQSxxQ0FIQTtBQUlBLHFDQUpBO0FBS0E7QUFMQTtBQTNDQyxLQUhBO0FBc0RELHdCQUFDLFFBQUQsT0F0REM7QUF1REQ7QUFBQyxXQUFEO0FBQUEsT0FBUSxTQUFTQyxXQUFqQjtBQUNBO0FBQUMsV0FBRDtBQUFBLFFBQU8sTUFBSyxTQUFaLEVBQXNCLFdBQVdDLE1BQWpDO0FBQUE7QUFBQSxNQURBO0FBRUE7QUFBQyxXQUFEO0FBQUEsUUFBTyxNQUFLLFFBQVosRUFBcUIsV0FBV0MsTUFBaEM7QUFBQTtBQUFBO0FBRkE7QUF2REMsSUFERDtBQTZERTs7OztFQXBFY0MsTUFBTUMsUzs7QUF1RXZCO0FBQ0E7OztBQUNBQyxPQUFPaEIsR0FBUCxHQUFhQSxHQUFiIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcblx0XHRzdXBlcihwcm9wcyk7XHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IHN0eWxlID0ge3tiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwoL2Fzc2V0cy9oZWFkZXItYmcuanBnKScsXHJcblx0XHRcdGJhY2tncm91bmRQb3NpdGlvbjogJ2JvdHRvbScsXHJcblx0XHRcdHBhZGRpbmdUb3A6ICcxMHB4J319PlxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lci1mbHVpZFwiPlxyXG5cdFx0XHQ8bmF2IGNsYXNzTmFtZT1cIm5hdmJhciBuYXZiYXItaW52ZXJzZVwiIHN0eWxlID0ge3sgbWFyZ2luOiAnMjVweCA1MHB4JyxcclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAncmdiYSgzMSwgMzEsIDMxLCAwLjcpJyxcclxuXHRcdFx0Ym9yZGVyQ29sb3I6ICcjNDg0ODQ4JyxcclxuXHRcdFx0ekluZGV4OiAnMycsXHJcblx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnXHJcblx0XHR9fT5cclxuXHRcdDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm5hdmJhci1oZWFkZXJcIj5cclxuXHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cIm5hdmJhci10b2dnbGUgY29sbGFwc2VkXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGRhdGEtdGFyZ2V0PVwiI2JzLWV4YW1wbGUtbmF2YmFyLWNvbGxhcHNlLTFcIiBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cclxuXHRcdDxzcGFuIGNsYXNzTmFtZT1cInNyLW9ubHlcIj5Ub2dnbGUgbmF2aWdhdGlvbjwvc3Bhbj5cclxuXHRcdDxzcGFuIGNsYXNzTmFtZT1cImljb24tYmFyXCI+PC9zcGFuPlxyXG5cdFx0PHNwYW4gY2xhc3NOYW1lPVwiaWNvbi1iYXJcIj48L3NwYW4+XHJcblx0XHQ8c3BhbiBjbE5hbWVhc3M9XCJpY29uLWJhclwiPjwvc3Bhbj5cclxuXHRcdDwvYnV0dG9uPlxyXG5cdFx0PGEgY2xhc3NOYW1lPVwibmF2YmFyLWJyYW5kXCIgaHJlZj1cIiMvXCIgc3R5bGUgPSB7e2NvbG9yOiBcIiMyNTcyMDRcIn19Pk90Ym81bHlcclxuXHRcdDxzbWFsbD4gYmV0YTwvc21hbGw+PC9hPlxyXG5cdFx0PC9kaXY+XHJcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbGxhcHNlIG5hdmJhci1jb2xsYXBzZVwiIGlkPVwiYnMtZXhhbXBsZS1uYXZiYXItY29sbGFwc2UtMVwiPlxyXG5cdFx0PHVsIGNsYXNzTmFtZT1cIm5hdiBuYXZiYXItbmF2XCI+XHJcblx0XHQ8bGk+PGEgaHJlZj1cIiMvdXNlcnNcIj5NeSBQcm9maWxlPC9hPjwvbGk+XHJcblx0XHQ8bGk+PGEgaHJlZj1cIiMvb3JkZXJzXCI+TXkgT3JkZXJzPC9hPjwvbGk+XHJcblx0XHQ8bGk+IDxhIGhyZWYgPSBcIiMvc2lnbmluXCI+U2lnbiBJbjwvYT48L2xpPlxyXG5cdFx0PGxpPjxhIGhyZWY9XCI8U2lnblVwPjwvU2lnblVwPlwiPlNpZ24gVXA8L2E+PC9saT5cclxuXHRcdDxsaT48YSBocmVmPVwiIy9zaWdub3V0XCI+U2lnbiBvdXQ8L2E+PC9saT5cclxuXHRcdDwvdWw+XHJcblx0XHQ8dWwgY2xhc3NOYW1lPVwibmF2IG5hdmJhci1uYXYgbmF2YmFyLXJpZ2h0XCI+XHJcblx0XHQ8bGk+PGEgaHJlZj1cImh0dHA6Ly93d3cucmJrLm9yZ1wiIHRhcmdldD1cIl9ibGFua1wiPlJCSzwvYT48L2xpPlxyXG5cdFx0PGxpIGNsYXNzTmFtZT1cImRyb3Bkb3duXCI+XHJcblx0XHQ8YSBjbGFzc05hbWU9XCJkcm9wZG93bi10b2dnbGVOYW1lXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIHJvbGU9XCJidXR0b25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPkRldmVsb3BlcnMgPHNwYW4gY2xhc3M9XCJjYXJldFwiPjwvc3Bhbj48L2E+XHJcblx0XHQ8dWwgY2xhc3NOYW1lPVwiZHJvcGRvd24tbWVudVwiPlxyXG5cdFx0PGxpPjxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vbW9udGFzZXJSYWhtYW5pXCIgdGFyZ2V0PVwiX2JsYW5rXCI+TS4gUmFobWFuaTwvYT48L2xpPlxyXG5cdFx0PGxpPjxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vc2FlZWRob21zeVwiIHRhcmdldD1cIl9ibGFua1wiPlMuIEFsaG9tc2k8L2E+PC9saT5cclxuXHRcdDxsaT48YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL1phaW5hYk9tYXJcIiB0YXJnZXQ9XCJfYmxhbmtcIj5aLiBIYW1tYW1pPC9hPjwvbGk+XHJcblx0XHQ8bGk+PGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9IYWRlZWxCYWxvdXNoXCIgdGFyZ2V0PVwiX2JsYW5rXCI+SC4gQmFsb3VzaDwvYT48L2xpPlxyXG5cdFx0PC91bD5cclxuXHRcdDwvbGk+XHJcblx0XHQ8L3VsPlxyXG5cdFx0PC9kaXY+XHJcblx0XHQ8L2Rpdj5cclxuXHRcdDwvbmF2PlxyXG5cdFx0PC9kaXY+XHJcblx0XHQ8ZGl2PlxyXG5cdFx0PGJyPjwvYnI+XHJcblx0XHQ8YnI+PC9icj5cclxuXHRcdDxicj48L2JyPlxyXG5cdFx0PGJyPjwvYnI+XHJcblx0XHQ8YnI+PC9icj5cclxuXHRcdDwvZGl2PlxyXG5cdFx0PC9kaXY+XHJcblx0XHQ8TWFpblBhZ2U+PC9NYWluUGFnZT5cclxuXHRcdDxSb3V0ZXIgaGlzdG9yeT17aGFzaEhpc3Rvcnl9PlxyXG5cdFx0PFJvdXRlIHBhdGg9Jy9zaWdudXAnIGNvbXBvbmVudD17U2lnblVwfT5zaWdudXA8L1JvdXRlPlxyXG5cdFx0PFJvdXRlIHBhdGg9J3NpZ25pbicgY29tcG9uZW50PXtTaWduSW59PnNpZ25pbjwvUm91dGU+XHJcblx0XHQ8L1JvdXRlcj5cclxuXHRcdDwvZGl2PlxyXG5cdFx0KX1cclxuXHR9XHJcblxyXG5cdC8vIEluIHRoZSBFUzYgc3BlYywgZmlsZXMgYXJlIFwibW9kdWxlc1wiIGFuZCBkbyBub3Qgc2hhcmUgYSB0b3AtbGV2ZWwgc2NvcGVcclxuXHQvLyBgdmFyYCBkZWNsYXJhdGlvbnMgd2lsbCBvbmx5IGV4aXN0IGdsb2JhbGx5IHdoZXJlIGV4cGxpY2l0bHkgZGVmaW5lZFxyXG5cdHdpbmRvdy5BcHAgPSBBcHA7XHJcbiJdfQ==