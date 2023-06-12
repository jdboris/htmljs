# htmljs

A simple, but powerful HTML templating library.

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
