
export function generateSearchSuggestions(arr) {
    let searchSuggestionsContainer = document.querySelector('.search__suggestions');
    let searchSuggestionsSpan = document.querySelectorAll('.search__suggestions_black')[1];
    for (const obj of arr) {
        let suggestionsLink = document.createElement('a');
        let suggestionsContainer = document.createElement('div');
        let suggestionsComma = searchSuggestionsSpan.cloneNode(true);
        let suggestionsOr = document.createElement('span');

        suggestionsContainer.classList.add('search__suggestions-container');
        suggestionsLink.classList.add('search__suggestions_pink');
        suggestionsOr.classList.add('or')

        suggestionsLink.textContent = obj.name;
        suggestionsLink.href = obj.href;
        suggestionsOr.textContent = 'или';

        suggestionsContainer.append(suggestionsLink);
        searchSuggestionsContainer.append(suggestionsContainer);

        if (obj == arr.at(-2)) {
            suggestionsContainer.insertAdjacentElement("afterend", suggestionsOr);
            continue;
        }
        else if (obj == arr.at(-1)) {
            break;
        }
        suggestionsContainer.insertAdjacentElement("afterend", suggestionsComma);
    }
}