import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data;
  render(data) {
    //Check if there is no data or empty array
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    //Process data and display data in the HTML
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    //Convert newMarkup to DOM element and compare
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //   console.log(curEl, newEl.isEqualNode(curEl)); //Compare node content

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('💥', newEl.firstChild?.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      //Replace the attributes of the curEl (DOM) by the attributes coming from the newEl (After clicking + or -)
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  //For loading
  renderSpinner() {
    const markup = `
        <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
        </div> 
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //Display Error in Page
  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
      </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
              <div>
                <svg>
                  <use href="${icons}#icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
      </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //Publisher
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
    // window.addEventListener('hashchange', showRecipe);
    // window.addEventListener('load', showRecipe);
  }
}
