import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  //Event Delegation
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      //Find out which button was clicked
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto; //Convert to number
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButRight(curPage);
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButLeft(curPage);
    }

    // Other page
    if (curPage < numPages && curPage !== 1) {
      const generateButtons =
        this._generateMarkupButLeft(curPage) +
        this._generateMarkupButRight(curPage);
      return generateButtons;
    }

    // Page 1, and there are NO other pages - No buttons
    return '';
  }

  _generateMarkupButRight(curPage) {
    return `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}.svg#icon-arrow-right"></use>
            </svg>
        </button>
      `;
  }

  _generateMarkupButLeft(curPage) {
    return `
      <button button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
      `;
  }
}

export default new PaginationView();
