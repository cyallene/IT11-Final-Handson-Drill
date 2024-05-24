const apiKey = '1bfdbff05c2698dc917dd28c08d41096';
const baseImageUrl = 'http://image.tmdb.org/t/p/w500/';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    if (movieId) {
        const detailUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
        const similarUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}&language=en-US&page=1`;

        fetchMovieDetail(detailUrl);
        fetchSimilarMovies(similarUrl);
    } else {
        console.error('Movie ID not provided');
    }
});

function fetchMovieDetail(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => displayMovieDetail(data))
        .catch(error => console.error('Error fetching movie detail:', error));
}


function fetchSimilarMovies(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => displaySimilarMovies(data.results))
        .catch(error => console.error('Error fetching similar movies:', error));
}

function displayMovieDetail(movie) {
    const detailContainer = document.getElementById('detail-container');
    detailContainer.innerHTML = '';

    const imageUrl = baseImageUrl + movie.poster_path;
    const image = document.createElement('img');
    image.src = imageUrl;

    const title = document.createElement('h2');
    title.textContent = movie.title;

    const overview = document.createElement('p');
    overview.textContent = movie.overview;

    const detailContent = document.createElement('div');
    detailContent.classList.add('detail-content');
    detailContent.appendChild(image);
    detailContent.appendChild(title);
    detailContent.appendChild(overview);

    detailContainer.appendChild(detailContent);
    
    addGoBackButton();

function addGoBackButton() {
    const container = document.querySelector('.container');
        
    const goBackButton = document.createElement('button');
    goBackButton.textContent = 'Go Back';
    goBackButton.classList.add('go-back-button'); 
    goBackButton.style.marginBottom = '20px'; 
    goBackButton.addEventListener('click', () => {
        window.history.back(); 
    });
    
        container.appendChild(goBackButton);
    }
}

function displaySimilarMovies(similarMovies) {
    const similarMoviesContainer = document.getElementById('similar-movies');
    similarMoviesContainer.innerHTML = '<h3>Related Movies</h3>';
    
    similarMovies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        similarMoviesContainer.appendChild(movieCard);
    });
}

function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    movieCard.addEventListener('dblclick', () => {
        window.location.href = `detail.html?id=${movie.id}`;
    });

    const imageUrl = baseImageUrl + movie.poster_path;
    const image = document.createElement('img');
    image.src = imageUrl;

    const title = document.createElement('p');
    title.textContent = movie.title
    
    movieCard.addEventListener('click', () => {
        window.location.href = `detail.html?id=${movie.id}`;
    });

    movieCard.appendChild(image);
    movieCard.appendChild(title);

    return movieCard;
}
