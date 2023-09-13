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

  handleForward(){
    if ("startViewTransition" in document) {
      return (document as any).startViewTransition(() => {
        Router.go("/backward-page");
      });
    }
    else {
      Router.go("/backward-page");
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
