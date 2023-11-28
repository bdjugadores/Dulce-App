class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2023
        Jimenez Palomino Dulce Maria.
      </p>`;
  }
}

customElements.define(
  "mi-footer", MiFooter);
