import BaseCard from './base-card';

class QuoteCard extends BaseCard {
  static get observedAttributes() {
    return ['quote', 'author'];
  }

  render() {
    const quote = this.getAttribute('quote') || '';
    const author = this.getAttribute('author') || '';

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          border: 1px solid var(--border);
          padding: 1.5rem;
          background: var(--card-bg);
          color: var(--text);
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: box-shadow 0.3s;
        }
        :host:hover {
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        .quote {
          font-style: italic;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          line-height: 1.4;
        }
        .author {
          text-align: right;
          font-weight: bold;
          color: var(--accent);
        }
      </style>
      <div class="quote">"${quote}"</div>
      <div class="author">- ${author}</div>
    `;
    }
  }
}

customElements.define('quote-card', QuoteCard);
