import RestaurantDb from '../../data/restaurantdb-source';
import { createMovieItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Daftar Restoran</h2>
        <div id="movies" class="movies">
        </div>
      </div>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantDb.getRestaurants();

    const moviesContainer = document.querySelector('#movies');
    restaurants.forEach((res) => {
      moviesContainer.innerHTML += createMovieItemTemplate(res);
    });
  },
};

export default Home;
