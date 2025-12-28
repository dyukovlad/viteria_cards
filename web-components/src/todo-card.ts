import BaseCard from './base-card';

class TodoCard extends BaseCard {
  static get observedAttributes() {
    return ['todo', 'completed'];
  }

  render() {
    const todo = this.getAttribute('todo') || '';
    const completed = this.getAttribute('completed') === 'true';

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
        .todo {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }
        .status {
          font-weight: bold;
          color: ${completed ? '#28a745' : '#dc3545'};
        }
      </style>
      <div class="todo">${todo}</div>
      <div class="status">${completed ? 'Выполнено' : 'Не выполнено'}</div>
    `;
    }
  }
}

customElements.define('todo-card', TodoCard);
