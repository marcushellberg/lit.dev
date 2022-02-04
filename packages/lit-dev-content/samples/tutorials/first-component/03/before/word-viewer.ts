import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('word-viewer')
class WordViewer extends LitElement {
  // TODO: Add `idx` state
  private idx = 0;
  @property() words: string = 'initial value';

  render() {
    // TODO: Split the `words` by `'.'`, and from the resulting word array
    // only show the word on index `this.idx`.
    return html`<pre>${this.words}</pre>`;
  }

  // Note: This method was added to change the word later, by updating
  // the index.
  tickToNextWord = () => { this.idx += 1; };
}

declare global {
  interface HTMLElementTagNameMap {
    "word-viewer": WordViewer
  }
}
