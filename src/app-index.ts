import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Router } from '@vaadin/router';

import './pages/app-home';
import './components/header';
import './styles/global.css';

/* const transitionMap: { [id: string] : string; } = {
  "/": "top-level",
  "/container-transform": "top-level",
  "/forward-page": "forward",
  "/backward-page": "backward",
  "/beyond-bounds": "top-level",
} */

@customElement('app-index')
export class AppIndex extends LitElement {
  static get styles() {
    return css`

      #routerOutlet {
        view-transition-name: top-level;
      }

      #routerOutlet > * {
        width: 100% !important;
      }
    `;
  }

  constructor() {
    super();
  }

  /* connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('vaadin-router-location-changed', (event) => {
      // This event will be triggered whenever the route changes
      const newLocation = event.detail.location;
      console.log('Page is changing to:', newLocation);
      // You can perform your custom actions here

      let routerOutlet = this.shadowRoot!.getElementById("routerOutlet");

      //@ts-ignore
      routerOutlet!.style.viewTransitionName = transitionMap[newLocation.pathname]
    });
  } */

  firstUpdated() {

    // this method is a lifecycle even in lit
    // for more info check out the lit docs https://lit.dev/docs/components/lifecycle/

    // For more info on using the @vaadin/router check here https://vaadin.com/router
    const router = new Router(this.shadowRoot?.querySelector('#routerOutlet'));
    router.setRoutes([
      // temporarily cast to any because of a Type bug with the router
      {
        path: (import.meta as any).env.BASE_URL,
        animate: true,
        children: [
          { path: '', component: 'app-home' },
          {
            path: '/forward-page',
            component: 'forward-page',
            action: async () => {
              await import('./pages/forward-page.js');
            },
          },
          {
            path: '/backward-page',
            component: 'backward-page',
            action: async () => {
              await import('./pages/backward-page.js');
            },
          },
          {
            path: '/container-transform',
            component: 'container-transform',
            action: async () => {
              await import('./pages/container-transform.js');
            },
          },
          {
            path: '/album-details/:name/:index',
            component: 'album-details',
            action: async () => {
              await import('./pages/album-details.js');
            },
          }
        ],
      } as any,
    ]);
  }

  render() {
    return html`
      <div>
        <main>
          <div id="routerOutlet"></div>
        </main>
      </div>
    `;
  }
}
