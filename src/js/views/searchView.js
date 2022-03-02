//New class for SearchView (Left side)
class SearchView {
  #parentEl = document.querySelector('.search');

  getQuery() {
    const query = this.#parentEl.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    //Listen for click or enter key
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler(); //Call controlSearchResults function
    });
  }
}

export default new SearchView();
