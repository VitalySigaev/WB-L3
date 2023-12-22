const searchSuggestionsBody = document.querySelector('.search-suggestions');
export function generateSearchSuggestions(searchSuggestions) {
    for (let i = 0; i < searchSuggestions.length; i++) {
        const suggestion = searchSuggestions[i];
        const link = document.createElement('a');
        link.href = suggestion.href;
        link.textContent = suggestion.name;
        link.classList.add('search-suggestions__link');
        link.setAttribute('data-text', suggestion.name);
        searchSuggestionsBody.append(link);
        
        if (i === searchSuggestions.length - 2) {
            searchSuggestionsBody.append(createOr());
        } else if (i !== searchSuggestions.length - 1) {
            searchSuggestionsBody.append(createComma());
        }
    }
}

function createComma() {
    const comma = document.createElement('span');
    comma.textContent = ','
    comma.classList.add('search-suggestions__comma');
    return comma;
}

function createOr() {
    const or = createComma();
    or.textContent = 'или';
    or.classList.add('search-suggestions__or')
    return or;
}