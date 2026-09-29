// shared footer for every ghumgham page
// kept in a js file so it also works when the page is opened straight from the folder
// in wordpress this becomes footer.php

const siteFooter = `
  <div class="footer-wrap">
    <!-- himalaya scene drawn as an svg (images/footer-himalayas.svg), trekkers and a porter climb the zigzag trail on their own
         the bottom of the drawing fades into the footer colour, so the footer below slides up over it
         (the ?v= number is raised whenever the drawing changes, so browsers load the new one) -->
    <div class="footer-scene">
      <img src="images/footer-himalayas.svg?v=9" alt="footer himalayas">
    </div>

    <footer class="footer">
      <div class="container">
        <div class="footer-cols">
          <div>
            <h6>CONTACT</h6>
            <ul class="contact-list">
              <li><i class="fa-solid fa-phone-volume"></i>+977 - 9862964046</li>
              <li><i class="fa-solid fa-envelope"></i>info@ghumgham.com.np</li>
              <li><i class="fa-solid fa-location-dot"></i>Pulchowk-02, Lalitpur</li>
            </ul>
          </div>

          <div>
            <h6>DESTINATIONS</h6>
            <ul>
              <li><a href="destination-detail.html?country=nepal">Nepal</a></li>
              <li><a href="destination-detail.html?country=bhutan">Bhutan</a></li>
              <li><a href="destination-detail.html?country=tibet">Tibet</a></li>
              <li><a href="destination-detail.html?country=thailand">Thailand</a></li>
              <li><a href="destination-detail.html?country=indonesia">Indonesia</a></li>
              <li><a href="destination-detail.html?country=india">India</a></li>
            </ul>
          </div>

          <div>
            <h6>ACTIVITIES</h6>
            <ul>
              <li><a href="activity-detail.html?activity=trekking">Hiking</a></li>
              <li><a href="activity-detail.html?activity=trekking">Trekking</a></li>
              <li><a href="activity-detail.html?activity=sightseeing">City Tour</a></li>
              <li><a href="activity-detail.html?activity=paragliding">Paragliding</a></li>
              <li><a href="activity-detail.html?activity=wildlife-safari">Wildlife Safari</a></li>
              <li><a href="activity-detail.html?activity=cultural-heritage-tour">Culture Heritage Tour</a></li>
            </ul>
          </div>

          <div>
            <h6>COMPANY</h6>
            <ul>
              <li><a href="about.html">About</a></li>
              <li><a href="contact.html">Contacts</a></li>
              <li><a href="terms.html">Terms &amp; Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h6>POPULAR PACKAGES</h6>
            <ul>
              <li><a href="trip-detail.html?trip=bangkok-and-pattaya-tour">Bangkok and Pattaya Tour</a></li>
              <li><a href="trip-detail.html?trip=phuket-island-tours">Phuket Island Tours</a></li>
              <li><a href="trip-detail.html?trip=annapurna-wonderland">Annapurna Wonderland</a></li>
              <li><a href="trip-detail.html?trip=everest-hiking-trip">Everest Hiking Trip</a></li>
              <li><a href="trip-detail.html?trip=upper-mustang-trek">Upper Mustang Trek</a></li>
              <li><a href="trip-detail.html?trip=kathmandu-valley-heritage-tour">Kathmandu Valley Heritage Tour</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <div>
            <a href="homepage.html" class="logo"><span class="g">G</span>ghumgham</a>
            <small>©2025, All Rights Reserved.</small>
          </div>
          <div class="socials">
            <a href="#" aria-label="facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#" aria-label="instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="youtube"><i class="fa-brands fa-youtube"></i></a>
            <a href="#" aria-label="tiktok"><i class="fa-brands fa-tiktok"></i></a>
            <a href="#" aria-label="x"><i class="fa-brands fa-x-twitter"></i></a>
          </div>
        </div>
      </div>
    </footer>
  </div>
`;

document.getElementById('site-footer').outerHTML = siteFooter;

// the sky at the top of the drawing is see-through, so the footer takes the colour of the last section above it
// (grey after a grey section, white after a white one) and there is never a line between them
const lastSection = [...document.querySelectorAll('body > section')].pop();
if (lastSection) {
  document.querySelector('.footer-wrap').style.backgroundColor = getComputedStyle(lastSection).backgroundColor;
}

