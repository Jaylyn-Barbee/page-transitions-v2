import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styles } from '../styles/shared-styles';

import '../components/top-level-nav'
import { BeforeEnterObserver, RouterLocation } from '@vaadin/router';
import { albums, tracklists } from '../data/music';

type Params = {
    name: string;
    index: number;
};

@customElement('album-details')
export class AlbumDetails extends LitElement implements BeforeEnterObserver {



  static get styles() {
    return [
      styles,
      css`
        .wrapper {
          height: 90vh;
          width: 100vw;
          display: grid;
          grid-template-rows: 1fr 1fr;
          align-items: center;
          justify-content: center;
          place-items: center;
        }
        .container {
          max-width: 400px;
          position: relative;
          view-transition-name: container-transform;
        }

        .container:hover {
          cursor: pointer;
        }

        .album-art {
          max-width: 400px;
          height: auto;
          border-radius: 10px;
        }

        .album-name {
          position: absolute;
          bottom: 4px;
          background-color: hsl(0deg 0% 0% / 75%);
          color: white;
          width: 100%;
          margin: 0;
          height: 15%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
        }

        .reveal-container {
          overflow: hidden;
          height: 0;
          transition: height 1s ease;
          place-self: baseline;
          justify-self: center;
        }

      `
    ];
  }

  private paramsData: null | Params = null;

  async onBeforeEnter(location: RouterLocation) {
    this.paramsData = location.params as unknown as Params;
  }

  constructor() {
    super();
  }

  firstUpdated() {
    const container = this.shadowRoot!.querySelector('.reveal-container')! as HTMLElement;

    const contentHeight = container.querySelector('ol')!.offsetHeight;

    container.style.height = contentHeight + "px";
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="container" data-name="${albums[this.paramsData!.index].name}">
            <img class="album-art" src=${"/assets/" + albums[this.paramsData!.index].cover} alt="Album Cover for ${albums[this.paramsData!.index].name}" />
            <p class="album-name">${albums[this.paramsData!.index].name} by ${albums[this.paramsData!.index].artist}</p>
        </div>
        <div class="reveal-container">
          <ol start="1">
              ${tracklists[this.paramsData!.name].map((song: string) =>
                  html`
                      <li>${song}</li>
                  `
              )}
          </ol>
        </div>
      </div>
      <top-level-nav></top-level-nav>
    `;
  }
}