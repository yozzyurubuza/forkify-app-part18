//New class for SearchView (Left side)
//Create new class and file each time you manipulate a certain view in the page.
class SearchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    //Listen for click or enter key
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler(); //Call controlSearchResults function
    });
  }
}

export default new SearchView();
