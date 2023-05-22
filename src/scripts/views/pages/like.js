import FavoriteRestaurants from '../../data/favorite';
import { createMovieItemTemplate } from '../templates/template-creator';

const Like = {
  async render() {
    return `
            <div class="content">
                <h2 class="content__heading">Restoran yang disukai!</h2>
                <div id="movies" class="movies"></div>
            </div>
        `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurants.getAllRestaurants();
    const moviesContainer = document.querySelector('#movies');

    restaurants.forEach((res) => {
      moviesContainer.innerHTML += createMovieItemTemplate(res);
    });
  },
};

export default Like;
