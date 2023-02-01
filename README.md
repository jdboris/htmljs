# htmljs

A simple, but powerful HTML parsing library.

# Usage

```javascript
import html from "./html.js";

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
