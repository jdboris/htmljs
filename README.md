<h3 align="center">html.js</h3>

  <p align="center">
    A lightweight, but powerful HTML template library for JS.
    <br />
    Create UI elements in a declarative way, similar to JSX, but with no transpiling or dependencies.
    <br />
    <br />
    <a href="https://jdboris.github.io/htmljs/examples/product-list/product-list.html">View Demo</a>
    ·
    <a href="https://github.com/jdboris/htmljs/issues">Report Bug</a>
    ·
    <a href="https://github.com/jdboris/htmljs/issues">Request Feature</a>
  </p>
</div>

# Usage

```javascript
import html from "https://cdn.jsdelivr.net/gh/jdboris/htmljs@latest/html.js";

const Button = () => html`<button>Submit</button>`;

const Form = () => html`
  <form
    ${{
      onsubmit: () => {
        console.log("Submission!");
      },
    }}
  >
    ${Button()}
  </form>
`;

document.body.append(Form());
```
