import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styles } from '../styles/shared-styles';
import { albums } from '../data/music';
import { Router } from '@vaadin/router';

@customElement('container-transform')
export class ContainerTransform extends LitElement {

  static get styles() {
    return [
      styles,
      css`
        .red {
          height: 90vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 10px;
          place-items: center;
        }

        .container {
          position: relative;
        }

        .container:hover {
          cursor: pointer;
        }

        .album-art {
          max-width: 350px;
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
      `
    ];
  }

  constructor() {
    super();
  }

  async firstUpdated() {

  }

 handleAlbumClick(name: string, index: number){
    let album: HTMLElement = this.shadowRoot!.querySelector(`[data-name="${name}"]`)!

    if ("startViewTransition" in document) {
      //@ts-ignore
      album!.style.viewTransitionName = 'container-transform';

      // @ts-ignore
      document.startViewTransition(() => {
        //@ts-ignore
        album!.style.viewTransitionName = '';
        Router.go(`/album-details/${name}/${index}`);
      });
    }
  }

  render() {
    return html`
        <div class="red">
          ${albums.map((album: any, index: number) =>
            html`
              <div class="container" data-name="${album.name}" @click=${() => this.handleAlbumClick(album.name, index)}>
                <img class="album-art" src=${"/assets/" + album.cover} alt="Album Cover for ${album.name}" />
                <p class="album-name">${album.name} by ${album.artist}</p>
              </div>
            `
          )}
        </div>
        <top-level-nav></top-level-nav>
    `;
  }
}
