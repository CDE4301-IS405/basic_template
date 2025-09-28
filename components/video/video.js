class Video extends HTMLElement {
  static get observedAttributes() {
    return ["tag", "source", "subtitle"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, _, newValue) {
    this[name] = newValue;
    // ADDDED...
    if (name === 'tag') {
      this.id = newValue; // Set the id on the custom element
    }
    // ...ADDED
  }

  render() {
    // ADDED...
    if (this.tag) {
      this.id = this.tag; // Set the id on the custom element
    }
    // ...ADDED
    
    const div = document.createElement("div");
    div.innerHTML = `
    <iframe id="${this.tag}" width="100%" src="${this.source}"
      allowfullscreen></iframe>
    <sub>${this.subtitle}</sub>
    <style>
      :host {
        display: block;
        text-align: center;
      }

      sub {
        font-size: 1rem;
        font-style: italic;
      }

      iframe {
        aspect-ratio: 16 / 9;
        display: block;
        margin: auto;
      }
    </style>
  `;

    this.shadowRoot.appendChild(div);
  }
}

customElements.define("video-component", Video);
