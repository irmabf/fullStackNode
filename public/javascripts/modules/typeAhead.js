const axios = require('axios');

function searchResultsHTML(products){
  return products.map(product => {
    return `
      <a href="/product/${product.slug}" class="search__result">
        <strong>${product.name}</strong>
      </a>
    `;
  }).join('');
}

function typeAhead(search){
  if(!search) return;
  const searchInput = search.querySelector('input[name="search"]');
  const searchResults = search.querySelector('.search__results');

  searchInput.on('input', function(){
    if(!this.value){
      searchResults.style.display = 'none';
      return;
    }
    searchResults.style.display = 'block';
    searchResults.innerHTML = '';
    axios
      .get(`/api/search?q=${this.value}`)
      .then(res => {
        if(res.data.length){
          console.log('There is something to show');
          const html = searchResultsHTML(res.data);
          searchResults.innerHTML = html;
        }
      })
        .catch(err => {
          console.log(err);
        });
  });

  
}

export default typeAhead;