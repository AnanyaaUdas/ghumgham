// wishlist page
// shows every trip saved with the like button (the list itself is handled in common.js)

const wishGrid = document.getElementById('wishGrid');
const wishEmpty = document.getElementById('wishEmpty');

function showWishlist() {
  const list = getWishlist();

  // the normal package card, with a heart button on top to take it off the list
  wishGrid.innerHTML = list.map(trip => `
    <div class="wish-item">
      ${packageCard(trip.title, trip.place, trip.days, trip.price)}
      <button class="wish-remove" data-slug="${trip.slug}" aria-label="remove ${trip.title} from wishlist"><i class="fa-solid fa-heart"></i></button>
    </div>`).join('');

  wishEmpty.hidden = list.length > 0;
}

wishGrid.addEventListener('click', event => {
  const button = event.target.closest('.wish-remove');
  if (!button) return;

  saveWishlist(getWishlist().filter(trip => trip.slug !== button.dataset.slug));
  showWishlist();
});

showWishlist();
