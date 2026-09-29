// shared header for every ghumgham page
// kept in a js file so it also works when the page is opened straight from the folder
// in wordpress this becomes header.php

const siteHeader = `
  <header class="header" id="header">
    <div class="container nav">
      <a href="homepage.html" class="logo"><span class="g">G</span>ghumgham</a>

      <ul class="menu" id="menu">
        <li><a href="homepage.html">Home</a></li>
        <li class="has-mega">
          <a href="destination.html">Destination <i class="fa-solid fa-caret-down"></i></a>

          <!-- destination mega menu, opens on hover -->
          <div class="mega">
            <!-- left: activity and its regions -->
            <div class="mega-side">
              <i class="fa-solid fa-person-hiking mega-icon"></i>
              <h3>Trekking</h3>
              <ul class="mega-regions">
                <li><a href="region-detail.html?activity=trekking&region=everest-region" class="active">Everest Region <i class="fa-solid fa-arrow-right"></i></a></li>
                <li><a href="region-detail.html?activity=trekking&region=annapurna-region">Annapurna Region <i class="fa-solid fa-arrow-right"></i></a></li>
                <li><a href="region-detail.html?activity=trekking&region=manaslu-region">Manaslu Region <i class="fa-solid fa-arrow-right"></i></a></li>
                <li><a href="region-detail.html?activity=trekking&region=langtang-region">Langtang Region <i class="fa-solid fa-arrow-right"></i></a></li>
                <li><a href="region-detail.html?activity=trekking&region=langtang-region">Langtang Region <i class="fa-solid fa-arrow-right"></i></a></li>
              </ul>
              <img src="images/mega-trekker.png" alt="mega trekker">
            </div>

            <!-- middle: 8 package cards -->
            <div class="mega-packages">
              <a href="trip-detail.html?trip=annapurna-wonderland" class="mega-card">
                <img src="images/annapurna-wonderland.jpg" alt="annapurna wonderland">
                <div>
                  <div class="stars">★★★★★ <span>(52)</span></div>
                  <h4>Annapurna Wonderland</h4>
                  <div class="meta"><i class="fa-solid fa-location-dot"></i>Nepal • 7D/6N</div>
                  <div class="pkg-price">Npr. 66,500 <small>per person</small></div>
                </div>
              </a>
              <a href="trip-detail.html?trip=bangkok-and-pattaya-tour" class="mega-card">
                <img src="images/bangkok-and-pattaya-tour.jpg" alt="bangkok and pattaya tour">
                <div>
                  <div class="stars">★★★★★ <span>(48)</span></div>
                  <h4>Bangkok and Pattaya Tour</h4>
                  <div class="meta"><i class="fa-solid fa-location-dot"></i>Thailand • 5D/4N</div>
                  <div class="pkg-price">Npr. 47,500 <small>per person</small></div>
                </div>
              </a>
              <a href="trip-detail.html?trip=bali-island-escape" class="mega-card">
                <img src="images/bali-island-escape.jpg" alt="bali island escape">
                <div>
                  <div class="stars">★★★★★ <span>(36)</span></div>
                  <h4>Bali Island Escape</h4>
                  <div class="meta"><i class="fa-solid fa-location-dot"></i>Indonesia • 6D/5N</div>
                  <div class="pkg-price">Npr. 57,000 <small>per person</small></div>
                </div>
              </a>
              <a href="trip-detail.html?trip=maldives-honeymoon-escape" class="mega-card">
                <img src="images/maldives-honeymoon-escape.jpg" alt="maldives honeymoon escape">
                <div>
                  <div class="stars">★★★★★ <span>(29)</span></div>
                  <h4>Maldives Honeymoon Escape</h4>
                  <div class="meta"><i class="fa-solid fa-location-dot"></i>Maldives • 5D/4N</div>
                  <div class="pkg-price">Npr. 85,500 <small>per person</small></div>
                </div>
              </a>
              <a href="trip-detail.html?trip=golden-triangle-tour" class="mega-card">
                <img src="images/golden-triangle-tour.jpg" alt="golden triangle tour">
                <div>
                  <div class="stars">★★★★★ <span>(41)</span></div>
                  <h4>Golden Triangle Tour</h4>
                  <div class="meta"><i class="fa-solid fa-location-dot"></i>India • 6D/5N</div>
                  <div class="pkg-price">Npr. 1,02,600 <small>per person</small></div>
                </div>
              </a>
              <a href="trip-detail.html?trip=lhasa-city-tour" class="mega-card">
                <img src="images/lhasa-city-tour.jpg" alt="lhasa city tour">
                <div>
                  <div class="stars">★★★★★ <span>(23)</span></div>
                  <h4>Lhasa City Tour</h4>
                  <div class="meta"><i class="fa-solid fa-location-dot"></i>Tibet • 5D/4N</div>
                  <div class="pkg-price">Npr. 85,500 <small>per person</small></div>
                </div>
              </a>
              <a href="trip-detail.html?trip=everest-hiking-trip" class="mega-card">
                <img src="images/everest-hiking-trip.jpg" alt="everest hiking trip">
                <div>
                  <div class="stars">★★★★★ <span>(64)</span></div>
                  <h4>Everest Hiking Trip</h4>
                  <div class="meta"><i class="fa-solid fa-location-dot"></i>Nepal • 12D/11N</div>
                  <div class="pkg-price">Npr. 1,14,000 <small>per person</small></div>
                </div>
              </a>
              <a href="trip-detail.html?trip=phuket-island-tours" class="mega-card">
                <img src="images/phuket-island-tours.jpg" alt="phuket island tours">
                <div>
                  <div class="stars">★★★★★ <span>(33)</span></div>
                  <h4>Phuket Island Tours</h4>
                  <div class="meta"><i class="fa-solid fa-location-dot"></i>Thailand • 6D/5N</div>
                  <div class="pkg-price">Npr. 57,000 <small>per person</small></div>
                </div>
              </a>
            </div>

            <!-- right: promo card -->
            <div class="mega-promo">
              <h3>More than a trek</h3>
              <p>Experience breathtaking landscapes, rich cultures and the true spirit of the Himalayas</p>
              <a href="trips.html" class="pill white-line small">
                View All Packages
                <span class="circle"><i class="fa-solid fa-arrow-right"></i></span>
              </a>
              <img src="images/mega-promo.jpg" alt="mega promo">
            </div>
          </div>
        </li>
        <li>
          <a href="activities.html">Activities <i class="fa-solid fa-caret-down"></i></a>
          <div class="dropdown">
            <a href="activity-detail.html?activity=trekking">Trekking</a>
            <a href="activity-detail.html?activity=boating">Boating</a>
            <a href="activity-detail.html?activity=rafting">Rafting</a>
            <a href="activity-detail.html?activity=sightseeing">Sightseeing</a>
          </div>
        </li>
        <li><a href="about.html">About</a></li>
        <li><a href="blogs.html">Insights &amp; Blogs</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>

      <!-- wishlist heart and call us sit together on the right -->
      <div class="nav-right">
        <!-- the number shows how many trips are saved, filled in by common.js -->
        <a href="wishlist.html" class="wish-link" aria-label="wishlist">
          <!-- shopping cart with a heart inside, drawn as a small svg -->
          <svg viewBox="0 0 32 28" aria-hidden="true">
            <path d="M2 3h4l4.5 17h15l3-12h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.5 8h4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M18 13.5l-4-3.8a2.6 2.6 0 0 1 4-3.3 2.6 2.6 0 0 1 4 3.3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
            <circle cx="12.5" cy="24.5" r="2" fill="none" stroke="currentColor" stroke-width="1.8"/>
            <circle cx="23.5" cy="24.5" r="2" fill="none" stroke="currentColor" stroke-width="1.8"/>
          </svg>
          <span class="wish-count" id="wishCount" hidden></span>
        </a>

        <a href="tel:9862964046" class="call">
          <span class="icon"><i class="fa-solid fa-phone-volume"></i></span>
          <span>
            <small>Call us 24/7</small>
            <strong>9862964046</strong>
          </span>
        </a>
      </div>

      <!-- only shows on mobile -->
      <button class="burger" id="burger" aria-label="open menu"><span></span><span></span><span></span></button>
    </div>
  </header>
`;

document.getElementById('site-header').outerHTML = siteHeader;
