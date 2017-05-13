"use strict";

var MainPage = function MainPage(props) {
  return React.createElement(
    "div",
    { className: "container" },
    React.createElement(
      "div",
      { className: "row", style: { paddingBottom: '50px', margin: '0px' } },
      React.createElement(
        "div",
        { className: "col-md-10 col-md-offset-1 text-center" },
        React.createElement(
          "h1",
          { style: { fontWeight: 'bold', color: '#fff' } },
          "Welcome to Otbo5ly!"
        ),
        React.createElement(
          "h2",
          { style: { color: '#dedede' } },
          "Hungry ? want delicious home-made middle eastren food ?"
        ),
        React.createElement(
          "h2",
          { style: { color: '#dedede' } },
          "YES! you are in the right place!"
        ),
        React.createElement(
          "div",
          { className: "col-md-6 col-xs-12", style: { color: '#fff', marginTop: '20px' } },
          React.createElement("i", { className: "glyphicon glyphicon-user", style: { fontSize: '5em' } }),
          React.createElement(
            "p",
            { style: { padding: '20px', fontSize: '1.3em' } },
            "Want to order food ?"
          ),
          React.createElement(
            "button",
            { href: "#/signup", className: "btn btn-lg btn-primary" },
            "Sign up now and start ordering!"
          )
        ),
        React.createElement(
          "div",
          { className: "col-md-6 col-xs-12", style: { color: '#fff', marginTop: '20px', borderLeft: '1px solid' } },
          React.createElement("i", { className: "glyphicon glyphicon-cutlery", style: { fontSize: '5em' } }),
          React.createElement(
            "p",
            { style: { padding: '20px', fontSize: '1.3em' } },
            "Ready to cook and sell ?"
          ),
          React.createElement(
            "button",
            { href: "#/signup", className: "btn btn-lg btn-primary" },
            "Sign up now and start selling!"
          )
        )
      )
    ),
    React.createElement(
      "div",
      { className: "row", style: { marginTop: '40px' } },
      React.createElement(
        "div",
        { className: "col-md-3 col-md-offset-1 col-xs-12" },
        React.createElement(
          "div",
          { className: "panel panel-primary" },
          React.createElement(
            "div",
            { className: "panel-heading" },
            React.createElement(
              "h3",
              { className: "panel-title" },
              "Top Cookers"
            )
          ),
          React.createElement(
            "ul",
            { className: "list-group" },
            React.createElement(
              "li",
              { className: "list-group-item" },
              "Om Ta7seen",
              React.createElement("a", { href: "#/users" })
            ),
            React.createElement(
              "li",
              { className: "list-group-item" },
              "Om A7mad",
              React.createElement("a", { href: "#/users" })
            ),
            React.createElement(
              "li",
              { className: "list-group-item" },
              "Om Ali",
              React.createElement("a", { href: "#/users" })
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "col-md-7 col-xs-12" },
        React.createElement(
          "div",
          { className: "panel panel-default" },
          React.createElement(
            "div",
            { className: "panel-heading" },
            React.createElement(
              "h3",
              { className: "panel-title" },
              "Today's Cookings"
            )
          ),
          React.createElement(
            "ul",
            { className: "list-group" },
            React.createElement(
              "li",
              { className: "list-group-item" },
              React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                  "div",
                  { className: "col-md-4" },
                  React.createElement("img", { src: "/assets/chef.png", className: "img-responsive thumbnail", style: { margin: 'auto' } }),
                  React.createElement("img", { className: "img-responsive thumbnail", style: { margin: 'auto' } })
                ),
                React.createElement(
                  "div",
                  { className: "col-md-8" },
                  React.createElement(
                    "div",
                    { className: "caption", style: { display: 'inline-block', height: '100%' } },
                    React.createElement(
                      "h3",
                      null,
                      "Om Ta7seen"
                    ),
                    React.createElement(
                      "p",
                      null,
                      React.createElement("a", { href: "#/users" })
                    ),
                    React.createElement(
                      "p",
                      { className: "btn btn-info", style: { marginBottom: '20px' } },
                      "30 JOD"
                    ),
                    React.createElement(
                      "p",
                      null,
                      React.createElement(
                        "a",
                        { className: "btn btn-primary", role: "button" },
                        "Order Now"
                      ),
                      " "
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  );
};

// In the ES6 spec, files are "modules" and do not share a top-level scope.
// `var` declarations will only exist globally where explicitly defined.
window.MainPage = MainPage;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NsaWVudC9tYWluL21haW4uanN4Il0sIm5hbWVzIjpbIk1haW5QYWdlIiwicHJvcHMiLCJwYWRkaW5nQm90dG9tIiwibWFyZ2luIiwiZm9udFdlaWdodCIsImNvbG9yIiwibWFyZ2luVG9wIiwiZm9udFNpemUiLCJwYWRkaW5nIiwiYm9yZGVyTGVmdCIsImRpc3BsYXkiLCJoZWlnaHQiLCJtYXJnaW5Cb3R0b20iLCJ3aW5kb3ciXSwibWFwcGluZ3MiOiI7O0FBQ0EsSUFBSUEsV0FBVyxTQUFYQSxRQUFXLENBQUNDLEtBQUQ7QUFBQSxTQUNiO0FBQUE7QUFBQSxNQUFLLFdBQVksV0FBakI7QUFDQTtBQUFBO0FBQUEsUUFBSyxXQUFVLEtBQWYsRUFBcUIsT0FBTyxFQUFDQyxlQUFlLE1BQWhCLEVBQXdCQyxRQUFRLEtBQWhDLEVBQTVCO0FBQ0E7QUFBQTtBQUFBLFVBQUssV0FBVSx1Q0FBZjtBQUNBO0FBQUE7QUFBQSxZQUFJLE9BQVMsRUFBQ0MsWUFBWSxNQUFiLEVBQXFCQyxPQUFPLE1BQTVCLEVBQWI7QUFBQTtBQUFBLFNBREE7QUFFQTtBQUFBO0FBQUEsWUFBSSxPQUFRLEVBQUNBLE9BQU8sU0FBUixFQUFaO0FBQUE7QUFBQSxTQUZBO0FBR0E7QUFBQTtBQUFBLFlBQUksT0FBUSxFQUFDQSxPQUFPLFNBQVIsRUFBWjtBQUFBO0FBQUEsU0FIQTtBQUlBO0FBQUE7QUFBQSxZQUFLLFdBQVUsb0JBQWYsRUFBb0MsT0FBUSxFQUFDQSxPQUFPLE1BQVIsRUFBZ0JDLFdBQVcsTUFBM0IsRUFBNUM7QUFDQSxxQ0FBRyxXQUFVLDBCQUFiLEVBQXdDLE9BQVEsRUFBQ0MsVUFBVSxLQUFYLEVBQWhELEdBREE7QUFFQTtBQUFBO0FBQUEsY0FBRyxPQUFRLEVBQUNDLFNBQVMsTUFBVixFQUFrQkQsVUFBVSxPQUE1QixFQUFYO0FBQUE7QUFBQSxXQUZBO0FBR0E7QUFBQTtBQUFBLGNBQVEsTUFBSyxVQUFiLEVBQXdCLFdBQVUsd0JBQWxDO0FBQUE7QUFBQTtBQUhBLFNBSkE7QUFTQTtBQUFBO0FBQUEsWUFBSyxXQUFVLG9CQUFmLEVBQW9DLE9BQVEsRUFBQ0YsT0FBTyxNQUFSLEVBQWdCQyxXQUFXLE1BQTNCLEVBQW1DRyxZQUFZLFdBQS9DLEVBQTVDO0FBQ0EscUNBQUcsV0FBVSw2QkFBYixFQUEyQyxPQUFRLEVBQUNGLFVBQVUsS0FBWCxFQUFuRCxHQURBO0FBRUE7QUFBQTtBQUFBLGNBQUcsT0FBUSxFQUFDQyxTQUFTLE1BQVYsRUFBa0JELFVBQVUsT0FBNUIsRUFBWDtBQUFBO0FBQUEsV0FGQTtBQUdBO0FBQUE7QUFBQSxjQUFRLE1BQUssVUFBYixFQUF3QixXQUFVLHdCQUFsQztBQUFBO0FBQUE7QUFIQTtBQVRBO0FBREEsS0FEQTtBQW9CQztBQUFBO0FBQUEsUUFBSyxXQUFVLEtBQWYsRUFBcUIsT0FBUSxFQUFDRCxXQUFXLE1BQVosRUFBN0I7QUFDRDtBQUFBO0FBQUEsVUFBSyxXQUFVLG9DQUFmO0FBQ0E7QUFBQTtBQUFBLFlBQUssV0FBVSxxQkFBZjtBQUNBO0FBQUE7QUFBQSxjQUFLLFdBQVUsZUFBZjtBQUNBO0FBQUE7QUFBQSxnQkFBSSxXQUFVLGFBQWQ7QUFBQTtBQUFBO0FBREEsV0FEQTtBQUlBO0FBQUE7QUFBQSxjQUFJLFdBQVUsWUFBZDtBQUNBO0FBQUE7QUFBQSxnQkFBSSxXQUFVLGlCQUFkO0FBQUE7QUFBMEMseUNBQUcsTUFBSyxTQUFSO0FBQTFDLGFBREE7QUFFQTtBQUFBO0FBQUEsZ0JBQUksV0FBVSxpQkFBZDtBQUFBO0FBQXdDLHlDQUFHLE1BQUssU0FBUjtBQUF4QyxhQUZBO0FBR0E7QUFBQTtBQUFBLGdCQUFJLFdBQVUsaUJBQWQ7QUFBQTtBQUFzQyx5Q0FBRyxNQUFLLFNBQVI7QUFBdEM7QUFIQTtBQUpBO0FBREEsT0FEQztBQWFEO0FBQUE7QUFBQSxVQUFLLFdBQVUsb0JBQWY7QUFDQTtBQUFBO0FBQUEsWUFBSyxXQUFVLHFCQUFmO0FBQ0E7QUFBQTtBQUFBLGNBQUssV0FBVSxlQUFmO0FBQ0E7QUFBQTtBQUFBLGdCQUFJLFdBQVUsYUFBZDtBQUFBO0FBQUE7QUFEQSxXQURBO0FBSUE7QUFBQTtBQUFBLGNBQUksV0FBVSxZQUFkO0FBQ0E7QUFBQTtBQUFBLGdCQUFJLFdBQVUsaUJBQWQ7QUFDQTtBQUFBO0FBQUEsa0JBQUssV0FBVSxLQUFmO0FBQ0E7QUFBQTtBQUFBLG9CQUFLLFdBQVUsVUFBZjtBQUNBLCtDQUFLLEtBQUksa0JBQVQsRUFBNEIsV0FBVSwwQkFBdEMsRUFBaUUsT0FBUSxFQUFDSCxRQUFRLE1BQVQsRUFBekUsR0FEQTtBQUVBLCtDQUFLLFdBQVUsMEJBQWYsRUFBMEMsT0FBUSxFQUFDQSxRQUFRLE1BQVQsRUFBbEQ7QUFGQSxpQkFEQTtBQUtBO0FBQUE7QUFBQSxvQkFBSyxXQUFVLFVBQWY7QUFDQTtBQUFBO0FBQUEsc0JBQUssV0FBVSxTQUFmLEVBQXlCLE9BQVEsRUFBQ08sU0FBUyxjQUFWLEVBQTBCQyxRQUFRLE1BQWxDLEVBQWpDO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFEQTtBQUVBO0FBQUE7QUFBQTtBQUFHLGlEQUFHLE1BQUssU0FBUjtBQUFILHFCQUZBO0FBR0E7QUFBQTtBQUFBLHdCQUFHLFdBQVUsY0FBYixFQUE0QixPQUFRLEVBQUNDLGNBQWEsTUFBZCxFQUFwQztBQUFBO0FBQUEscUJBSEE7QUFJQTtBQUFBO0FBQUE7QUFBRztBQUFBO0FBQUEsMEJBQUcsV0FBVSxpQkFBYixFQUErQixNQUFLLFFBQXBDO0FBQUE7QUFBQSx1QkFBSDtBQUFBO0FBQUE7QUFKQTtBQURBO0FBTEE7QUFEQTtBQURBO0FBSkE7QUFEQTtBQWJDO0FBcEJELEdBRGE7QUFBQSxDQUFmOztBQStEQTtBQUNBO0FBQ0FDLE9BQU9iLFFBQVAsR0FBa0JBLFFBQWxCIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxudmFyIE1haW5QYWdlID0gKHByb3BzKSA9PiAoXHJcbiAgPGRpdiBjbGFzc05hbWUgPSBcImNvbnRhaW5lclwiPlxyXG4gIDxkaXYgY2xhc3NOYW1lPVwicm93XCIgc3R5bGU9e3twYWRkaW5nQm90dG9tOiAnNTBweCcsIG1hcmdpbjogJzBweCd9fT5cclxuICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0xMCBjb2wtbWQtb2Zmc2V0LTEgdGV4dC1jZW50ZXJcIj5cclxuICA8aDEgc3R5bGUgPSB7e2ZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICcjZmZmJ319PldlbGNvbWUgdG8gT3RibzVseSE8L2gxPlxyXG4gIDxoMiBzdHlsZT0ge3tjb2xvcjogJyNkZWRlZGUnfX0+SHVuZ3J5ID8gd2FudCBkZWxpY2lvdXMgaG9tZS1tYWRlIG1pZGRsZSBlYXN0cmVuIGZvb2QgPzwvaDI+XHJcbiAgPGgyIHN0eWxlPSB7e2NvbG9yOiAnI2RlZGVkZSd9fT5ZRVMhIHlvdSBhcmUgaW4gdGhlIHJpZ2h0IHBsYWNlITwvaDI+XHJcbiAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNiBjb2wteHMtMTJcIiBzdHlsZT0ge3tjb2xvcjogJyNmZmYnLCBtYXJnaW5Ub3A6ICcyMHB4J319PlxyXG4gIDxpIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tdXNlclwiIHN0eWxlPSB7e2ZvbnRTaXplOiAnNWVtJ319PjwvaT5cclxuICA8cCBzdHlsZT0ge3twYWRkaW5nOiAnMjBweCcsIGZvbnRTaXplOiAnMS4zZW0nfX0+V2FudCB0byBvcmRlciBmb29kID88L3A+XHJcbiAgPGJ1dHRvbiBocmVmPVwiIy9zaWdudXBcIiBjbGFzc05hbWU9XCJidG4gYnRuLWxnIGJ0bi1wcmltYXJ5XCI+U2lnbiB1cCBub3cgYW5kIHN0YXJ0IG9yZGVyaW5nITwvYnV0dG9uPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTYgY29sLXhzLTEyXCIgc3R5bGU9IHt7Y29sb3I6ICcjZmZmJywgbWFyZ2luVG9wOiAnMjBweCcsIGJvcmRlckxlZnQ6ICcxcHggc29saWQnfX0+XHJcbiAgPGkgY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1jdXRsZXJ5XCIgc3R5bGU9IHt7Zm9udFNpemU6ICc1ZW0nfX0+PC9pPlxyXG4gIDxwIHN0eWxlPSB7e3BhZGRpbmc6ICcyMHB4JywgZm9udFNpemU6ICcxLjNlbSd9fT5SZWFkeSB0byBjb29rIGFuZCBzZWxsID88L3A+XHJcbiAgPGJ1dHRvbiBocmVmPVwiIy9zaWdudXBcIiBjbGFzc05hbWU9XCJidG4gYnRuLWxnIGJ0bi1wcmltYXJ5XCI+U2lnbiB1cCBub3cgYW5kIHN0YXJ0IHNlbGxpbmchPC9idXR0b24+XHJcbiAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiBcclxuXHJcbiAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCIgc3R5bGU9IHt7bWFyZ2luVG9wOiAnNDBweCd9fT5cclxuICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0zIGNvbC1tZC1vZmZzZXQtMSBjb2wteHMtMTJcIj5cclxuICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsIHBhbmVsLXByaW1hcnlcIj5cclxuICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWhlYWRpbmdcIj5cclxuICA8aDMgY2xhc3NOYW1lPVwicGFuZWwtdGl0bGVcIj5Ub3AgQ29va2VyczwvaDM+XHJcbiAgPC9kaXY+XHJcbiAgPHVsIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXBcIj5cclxuICA8bGkgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtXCI+T20gVGE3c2VlbjxhIGhyZWY9XCIjL3VzZXJzXCI+PC9hPjwvbGk+XHJcbiAgPGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbVwiPk9tIEE3bWFkPGEgaHJlZj1cIiMvdXNlcnNcIj48L2E+PC9saT5cclxuICA8bGkgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtXCI+T20gQWxpPGEgaHJlZj1cIiMvdXNlcnNcIj48L2E+PC9saT5cclxuICA8L3VsPlxyXG4gIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTcgY29sLXhzLTEyXCI+XHJcbiAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCI+XHJcbiAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1oZWFkaW5nXCI+XHJcbiAgPGgzIGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlXCI+VG9kYXkncyBDb29raW5nczwvaDM+XHJcbiAgPC9kaXY+XHJcbiAgPHVsIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXBcIj5cclxuICA8bGkgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtXCI+XHJcbiAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC00XCI+XHJcbiAgPGltZyBzcmM9XCIvYXNzZXRzL2NoZWYucG5nXCIgY2xhc3NOYW1lPVwiaW1nLXJlc3BvbnNpdmUgdGh1bWJuYWlsXCIgc3R5bGU9IHt7bWFyZ2luOiAnYXV0byd9fS8+XHJcbiAgPGltZyBjbGFzc05hbWU9XCJpbWctcmVzcG9uc2l2ZSB0aHVtYm5haWxcIiBzdHlsZT0ge3ttYXJnaW46ICdhdXRvJ319Lz5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC04XCI+XHJcbiAgPGRpdiBjbGFzc05hbWU9XCJjYXB0aW9uXCIgc3R5bGU9IHt7ZGlzcGxheTogJ2lubGluZS1ibG9jaycsIGhlaWdodDogJzEwMCUnfX0+XHJcbiAgPGgzPk9tIFRhN3NlZW48L2gzPlxyXG4gIDxwPjxhIGhyZWY9XCIjL3VzZXJzXCI+PC9hPjwvcD5cclxuICA8cCBjbGFzc05hbWU9XCJidG4gYnRuLWluZm9cIiBzdHlsZT0ge3ttYXJnaW5Cb3R0b206JzIwcHgnfX0+MzAgSk9EPC9wPlxyXG4gIDxwPjxhIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIHJvbGU9XCJidXR0b25cIj5PcmRlciBOb3c8L2E+IDwvcD5cclxuICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8L2xpPlxyXG4gIDwvdWw+XHJcbiAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gICk7XHJcblxyXG4vLyBJbiB0aGUgRVM2IHNwZWMsIGZpbGVzIGFyZSBcIm1vZHVsZXNcIiBhbmQgZG8gbm90IHNoYXJlIGEgdG9wLWxldmVsIHNjb3BlLlxyXG4vLyBgdmFyYCBkZWNsYXJhdGlvbnMgd2lsbCBvbmx5IGV4aXN0IGdsb2JhbGx5IHdoZXJlIGV4cGxpY2l0bHkgZGVmaW5lZC5cclxud2luZG93Lk1haW5QYWdlID0gTWFpblBhZ2U7Il19