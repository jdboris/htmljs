/**
 * A tag function that parses the given HTML string and returns the `Element` it forms.
 * It also uses the interpolated values either for properties to assign to `Element`s, or as `Node`s to insert.
 *
 * @param {string[]} htmlParts
 * @param {any[]} values
 *
 * @example
 * ```
 * const Button = () => html`<button>Submit</button>`;
 *
 * const Form = () => html`
 *   <form ${{ onsubmit: () => { console.log("Submission!") } }}>
 *     ${Button()}
 *   </form>
 * `;
 *
 * document.body.append(
 *  Form()
 * );
 * ```
 */
export default function html(htmlParts, ...values) {
  const template = document.createElement("template");

  // Combine the HTML parts with placeholders in between...
  template.innerHTML = htmlParts
    .reduce((total, currentHtml, i) => {
      return (
        total +
        // If the value is a group of properties...
        (isValueProperties(values[i - 1])
          ? // ...then, add a placeholder for properties...
            `data-props-index="${i - 1}"`
          : typeof values[i - 1] === "object"
          ? // ...otherwise, add a placeholder for a Node.
            `<script data-node-index="${i - 1}"></script>`
          : values[i - 1]) +
        currentHtml
      );
    })
    .trim();

  const element = template.content.firstElementChild;

  // Replace all the Node placeholders with their respective Nodes...
  element.querySelectorAll("[data-node-index]").forEach((placeholder) => {
    const arg = values[Number(placeholder.dataset.nodeIndex)];

    // If invalid type...
    if (typeof arg == "boolean" || arg === null || typeof arg == "undefined") {
      // ...don't render.
      placeholder.replaceWith("");

      // If array...
    } else if (Array.isArray(arg)) {
      // assume they're all Nodes.
      placeholder.replaceWith(...arg);
    } else {
      // Assume it's a Node.
      placeholder.replaceWith(arg);
    }
  });

  // For each element with property placeholders...
  [
    ...(element.dataset.propsIndex ? [element] : []),
    ...element.querySelectorAll("[data-props-index]"),
  ].forEach((placeholder) => {
    // ...assign them their properties.
    Object.assign(placeholder, values[Number(placeholder.dataset.propsIndex)]);
    delete placeholder.dataset.propsIndex;
  });

  return element;
}

/**
 * Returns true if the given value is an object intended for its properties to be copied to an Element.
 */
function isValueProperties(value) {
  const result =
    // If the argument is an object...
    typeof value === "object" &&
    // ...AND not a Node...
    !(value instanceof Node) &&
    // ...AND not an array...
    !Array.isArray(value) &&
    // ...AND not null...
    value !== null;

  return result;
}
