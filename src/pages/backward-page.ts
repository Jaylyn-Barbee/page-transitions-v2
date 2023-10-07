import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styles } from '../styles/shared-styles';
import { Router } from '@vaadin/router';

@customElement('backward-page')
export class BackwardPage extends LitElement {

  static get styles() {
    return [
      styles,
      css`
        .red {
          background-color: red;
          height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `
    ];
  }

  constructor() {
    super();
  }

  async firstUpdated() {

  }

  async handleBackward(){
    let host = this.shadowRoot!.host;

    if ("startViewTransition" in document) {
      //@ts-ignore
      host!.style.viewTransitionName = 'backward';
      console.log("transition started")
      // @ts-ignore
      const transiton = document.startViewTransition();

      Router.go(`/forward-page`);

      await transiton.finished;

      console.log(transiton)
      console.log("transition finished")
      // @ts-ignore
      host!.style.viewTransitionName = '';
    } else {
      Router.go(`/forward-page`);
    }
  }

  render() {
    return html`
        <div class="red">
          <button type="button" class="backward-button" @click="${() => this.handleBackward()}">Backward</button>
        </div>
        <top-level-nav></top-level-nav>
    `;
  }
}
