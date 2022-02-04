import { css, html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, state } from 'lit/decorators.js';


@customElement('word-viewer')
class WordViewer extends LitElement {
  static styles = css`
    :host {
      color: violet;
      cursor: pointer;
    }
    pre {
      background-color: white;
      padding: 0.2em;
    }
    .backwards {
      background-color: violet;
      color: white;
    }
    :host {
      display: block;
    }
  `

  /** The direction the we iterate the words */
  @state() private playDirection = 1;
  /** Current index of what we are showing */
  @state() private idx = 0;
  /** Passed in string of space separated words which we will show one at a time. */
  @property() words: string = '';

  /** The setInterval timer handle */
  private intervalTimer?: number;

  override connectedCallback() {
    super.connectedCallback();
    this.intervalTimer = window.setInterval(this.tickToNextWord, 200);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.intervalTimer);
    this.intervalTimer = undefined;
  }

  render() {
    const splitWords = this.words.split('.');
    // Index is always postive.
    const word = splitWords[((this.idx % splitWords.length) + splitWords.length) % splitWords.length]
    return html`<pre
        @click=${this.switchPlayDirection}
        class="${classMap({ backwards: this.playDirection === -1 })}"
        >${word}</pre>`;
  }

  tickToNextWord = () => { this.idx += this.playDirection; };

  switchPlayDirection() {
    this.playDirection *= -1;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "word-viewer": WordViewer,
  }
}
