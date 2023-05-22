import UrlParser from '../../routes/url-parser';
import RestaurantDb from '../../data/restaurantdb-source';
import { createMovieDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import FavoriteRestaurants from '../../data/favorite';

const Detail = {
  async render() {
    return `
      <div id="movie" class="movie"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantDb.detailRestaurant(url.id);
    const movieContainer = document.querySelector('#movie');
    movieContainer.innerHTML = createMovieDetailTemplate(restaurant);

    const likeBtn = document.querySelector('#likeButtonContainer');
    LikeButtonInitiator.init({
      likeButtonContainer: likeBtn,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        city: restaurant.city,
        rating: restaurant.rating,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
      },
      favoriteRestaurant: FavoriteRestaurants,
    });
  },
};

export default Detail;
