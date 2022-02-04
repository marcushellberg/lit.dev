import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
// Note: New import!
import { classMap } from 'lit/directives/class-map.js';

@customElement('word-viewer')
class WordViewer extends LitElement {
  static styles = css`
    :host {
      color: violet;
      cursor: pointer;
      display: block;
    }
    pre {
      padding: 0.2em;
      background-color: white;
    }
    /* Note: New class selector! */
    .backwards {
      color: white;
      background-color: violet;
    }
  `

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
      class="TODO: Add the classMap here!"
      @click=${this.switchPlayDirection}
      >
        ${splitWords[((this.idx % splitWords.length) + splitWords.length) % splitWords.length]}
      </pre>`;
  }

  tickToNextWord = () => { this.idx += this.playDirection; };

  switchPlayDirection() {
    this.playDirection *= -1;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "word-viewer": WordViewer
  }
}
