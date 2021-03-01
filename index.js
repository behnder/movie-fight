const fetchData = async (value) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '94867394',
            s: value
        }
    });
    if (response.data.Error) {
        return []
    }

    return response.data.Search
};


const autocompleteConfig = {

    renderOption(movie) {
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
        <img src="${imgSrc}" /> 
        ${movie.Title}(${movie.Year})
        `;
    },
    onOptionSelect(movie) {
        return onMovieselect(movie);
    },
    inputValue(movie) {
        return movie.Title
    },
    async fetchData(searchTerm) {
        const response = await axios.get('http://www.omdbapi.com/', {
            params: {
                apikey: '94867394',
                s: searchTerm
            }
        });
        if (response.data.Error) {
            return []
        }

        return response.data.Search
    },
}

createAutoComplete({
    ...autocompleteConfig,
    root: document.querySelector('.left-autocomplete'),
});
createAutoComplete({
    ...autocompleteConfig,
    root: document.querySelector('.right-autocomplete'),
});


// ---------------------------------------------------

const onMovieselect = async (movieID) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '94867394',

            i: movieID
        }
    });
    if (response.data.Error) {
        return []
    }
    return response.data

};

const movieTemplate = (movieDetail) => {

    let awards
    if (movieDetail.Awards === "N/A") {
        awards = "No Awards for this movie"

    } else {
        awards = movieDetail.Awards
    }
    return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetail.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
            <h1>${movieDetail.Title}</h1>
             <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>
    <article class = "notification is-primary">
        <p class = "title"> ${awards} </p> 
        <p class = "subtitle"> Awards </p> 
      
    </article>
    <article class = "notification is-primary">
    <p class = "title"> ${movieDetail.BoxOffice} </p> 
    <p class = "subtitle"> Box  Office </p> 
  
    </article>
    <article class = "notification is-primary">
    <p class = "title"> ${movieDetail.Metascore} </p> 
    <p class = "subtitle"> Metascorte</p> 

    </article>
    <article class = "notification is-primary">
    <p class = "title"> ${movieDetail.imdbRating} </p> 
    <p class = "subtitle"> imdb Rating</p> 

    </article>
    <article class = "notification is-primary">
    <p class = "title"> ${movieDetail.imdbVotes} </p> 
    <p class = "subtitle"> imdb Votes</p> 

    </article>
    
  `;

}