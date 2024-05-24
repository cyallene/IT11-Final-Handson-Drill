document.addEventListener('DOMContentLoaded', () => {
    loadUpcomingMovies();
});

function loadUpcomingMovies() {
    const apiKey = '1bfdbff05c2698dc917dd28c08d41096';
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayMovies(data.results))
        .catch(error => console.error('Error fetching upcoming movies:', error));
}

function searchMovies() {
    const apiKey = '1bfdbff05c2698dc917dd28c08d41096';
    const searchQuery = document.getElementById('search').value;
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayMovies(data.results))
        .catch(error => console.error('Error searching movies:', error));
}

function displayMovies(movies) {
    const movieContainer = document.getElementById('movie-container');
    movieContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        movieContainer.appendChild(movieCard);
    });
}

function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    movieCard.addEventListener('dblclick', () => {
        window.location.href = `detail.html?id=${movie.id}`;
    });

    const imageUrl = `http://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    const image = document.createElement('img');
    image.src = imageUrl;

    const title = document.createElement('p');
    title.textContent = movie.title;

    movieCard.appendChild(image);
    movieCard.appendChild(title);

    return movieCard;
}
