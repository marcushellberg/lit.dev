import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('word-viewer')
class WordViewer extends LitElement {
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
    return html`<pre>${splitWords[this.idx % splitWords.length]}</pre>`;
  }

  tickToNextWord = () => { this.idx += 1; };
}

declare global {
  interface HTMLElementTagNameMap {
    "word-viewer": WordViewer
  }
}
