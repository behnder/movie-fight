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
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieselect(movie, document.querySelector('#left-summary'), 'left');
    },

});
createAutoComplete({
    ...autocompleteConfig,
    root: document.querySelector('.right-autocomplete'),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieselect(movie, document.querySelector('#right-summary'), 'right');
    },

});


// ---------------------------------------------------

let leftMovie;
let rightMovie;

const onMovieselect = async (movieID, summaryElement, side) => {

    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '94867394',

            i: movieID
        }
    });


    summaryElement.innerHTML = movieTemplate(response.data);
    // if (response.data.Error) {
    //     return []
    // }
    if (side === "left") {
        leftMovie = response.data
    } else {
        rightMovie = response.data
    }
    if (leftMovie && rightMovie) {
        runComparison();
    }
    // return response.data

};

const runComparison = () => {

    console.log("TIME FOR COMPARISON");
}




const movieTemplate = (movieDetail) => {

    // let dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''))
    // let metascore = parseInt(movieDetail.Metascore)



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
    <article class = "notification is-primary" >
        <p class = "title awards"> ${movieDetail.Awards} </p> 
        <p class = "subtitle"> Awards </p> 
      
    </article>
    <article class = "notification is-primary box-office"> 
    <p class = "title"> ${movieDetail.BoxOffice} </p> 
    <p class = "subtitle"> Box  Office </p> 
  
    </article>
    <article class = "notification is-primary metascore" >
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