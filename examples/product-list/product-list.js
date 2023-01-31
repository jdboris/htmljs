import html from "../../html.js";

/**
 * @return Function
 * @param {Object} options
 * @param {Object} options.product - The product DTO.
 * @param {('read'|'edit')} options.mode - The rendering mode of the form.
 * @param {Function} options.onProductSave
 */
const ProductForm = ({ product, mode, onProductSave }) => html`
  <form
    ${{
      onsubmit(e) {
        e.preventDefault();
        onProductSave(product);

        // "Re-render" the form...
        // NOTE: THIS DESTROYS THE OLD FORM
        this.closest("form").replaceWith(
          ProductForm({
            product,
            mode: "read",
            onProductSave,
          })
        );
      },
    }}
  >
    ${Object.keys(product).map(
      (key) => html`
        <label>
          ${key}
          <input
            type="text"
            ${{
              disabled: mode == "read",
              value: product[key],
              oninput() {
                product[key] = this.value;
              },
            }}
          />
        </label>
      `
    )}
    ${mode == "read" &&
    html`
      <button
        ${{
          onclick(e) {
            e.preventDefault();

            // "Re-render" the form...
            // NOTE: THIS DESTROYS THE OLD FORM
            this.closest("form").replaceWith(
              ProductForm({
                product,
                mode: "edit",
                onProductSave,
              })
            );
          },
        }}
      >
        Edit
      </button>
    `}
    ${mode == "edit" && html`<button>Save</button>`}
  </form>
`;

const ProductList = ({ products, onProductSave }) => html`
  <div class="product-list">
    ${products.map((product) =>
      ProductForm({
        product,
        mode: "read",
        onProductSave,
      })
    )}
    <form></form>
    <form></form>
    <form></form>
    <form></form>
  </div>
`;

export default ProductList;
