import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styles } from '../styles/shared-styles';
import { Router } from '@vaadin/router';

@customElement('forward-page')
export class ForwardPage extends LitElement {

  static get styles() {
    return [
      styles,
      css`

        .blue {
          background-color: blue;
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

  async handleForward(){
    let host = this.shadowRoot!.host;

    if ("startViewTransition" in document) {
      //@ts-ignore
      host!.style.viewTransitionName = 'forward';
      console.log("transition started")
      // @ts-ignore
      const transiton = document.startViewTransition();

      Router.go(`/backward-page`);

      await transiton.finished;

      // @ts-ignore
      host!.style.viewTransitionName = '';
    } else {
      Router.go(`/backward-page`);
    }
  }

  render() {
    return html`
        <div class="blue">
          <button type="button" class="forward-button" @click="${() => this.handleForward()}">Forward</button>
        </div>
        <top-level-nav></top-level-nav>
    `;
  }
}
