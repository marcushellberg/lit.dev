import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('word-viewer')
class WordViewer extends LitElement {
  @state() private idx = 0;
  @property() words: string = 'initial value';

  private intervalTimer?: number;

  // TODO: Override `connectedCallback` and set an interval with `setInterval`.
  // Assign the result of `setInterval` to `intervalTimer`.



  // TODO: Override `disconnectedCallback`, and use
  // `clearInterval(this.intervalTimer)` to stop the timer.


  

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
