import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('word-viewer')
class WordViewer extends LitElement {
  static styles = css`
    :host {
      color: violet;
      cursor: pointer;
      display: block;
      background-color: white;
    }
    pre {
      padding: 0.2em;
    }
  `

  // Note: New playDirection state.
  @state() private playDirection = 1;
  @state() private idx = 0;
  @property() words: string = 'initial value';

  private intervalTimer?: number;
  
  override connectedCallback () {
    super.connectedCallback();
    this.intervalTimer = setInterval(this.tickToNextWord, 1000);
  }
  
  override disconnectedCallback () {
    super.disconnectedCallback();
    clearInterval(this.intervalTimer);
    this.intervalTimer = undefined;
  }

  render() {
    const splitWords = this.words.split('.');
    return html`<pre
      @click=${/* TODO: Add method to call on click here */null}
      >
        <!-- Note: Math updated so idx can go negative. -->
        ${splitWords[((this.idx % splitWords.length) + splitWords.length) % splitWords.length]}
      </pre>`;
  }

  // Note: We increment the `idx` by playDirection.
  tickToNextWord = () => { this.idx += this.playDirection; };

  // Note: Method added.
  switchPlayDirection() {
    this.playDirection *= -1;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "word-viewer": WordViewer
  }
}
