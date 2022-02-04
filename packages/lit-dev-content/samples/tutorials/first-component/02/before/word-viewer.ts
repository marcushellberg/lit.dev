import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('word-viewer')
class WordViewer extends LitElement {
  // TODO: Make this a reactive property with an attribute
  // using `@property()`.
  words = 'initial value'

  render() {
    return html`<pre>${this.words}</pre>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "word-viewer": WordViewer
  }
}
