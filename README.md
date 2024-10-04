{% raw %}

# htmljs

A lightweight, but powerful HTML template engine. It allows creating UI elements in a declarative way, similar to JSX, but with no dependencies or transpiling.

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

{% endraw %}
