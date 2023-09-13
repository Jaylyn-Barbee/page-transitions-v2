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

  handleBackward(){
    if ("startViewTransition" in document) {
      return (document as any).startViewTransition(() => {
        Router.go("/forward-page");
      });
    }
    else {
      Router.go("/forward-page");
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
