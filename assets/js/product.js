const images = [
  { id: "img-1", src: "../assets/images/P1.png", alt: "Dolomite" },
  { id: "img-2", src: "../assets/images/P1.png", alt: "Product 2" },
];

function getProductDataById(productId) {
  // Example of hardcoded product data; replace with actual AJAX call if necessary
  const images = {
    "img-1": {
      src: "../assets/images/P1.png",
      alt: "Dolomite",
      title: "Dolomite",
      description: `LKC coatings pvt ltd produces various grades of crystalline structure Dolomite Powders underdifferent brightness and particle sizes. It is widely used as an cost effective filler in various end formulation further it aids to improve Weatherability and Increase Mechanical Stability. 
      We have dark to whiter shades of Dolomites under our brands which are pure, Micronized and with controlled particle size available from the finest resources.
      It is used in a variety of applications and quite widely accepted across a cross section of industries serving various properties. We produce it in a broad range of particle sizes ranging from 20 to 150 mesh  depending on the nature of your application and requirement by offering customized grades as well in various packaging sizes.
      This dolomites has its application in Paints, Construction chemical, Detergents, Welding electrodes, adhesives and allied industries
      `,
      specifications: [
        "2 mm",
        "1.2 mm",
        "1 mm",
        "30 - 80 mesh",
        "100 mesh",
        "120 mesh (Agriculture Grade)",
        "150 mesh",
      ],
      applications: [
        { name: "Agriculture", icon: "fa-solid fa-wheat-awn" },
        { name: "Cosmetic", icon: "fa-solid fa-wand-magic-sparkles" },
        { name: "Ceramic", icon: "fa-solid fa-honey-pot" },
        { name: "Animal Feed", icon: "fa-solid fa-cow" },
        { name: "Construction", icon: "fa-solid fa-trowel-bricks" },
        { name: "Detergent & Soaps", icon: "fa-solid fa-soap" },
        { name: "Welding electrodes", icon: "fa-solid fa-wheat-awn" },
      ],
    },
    "img-2": {
      src: "../assets/images/P1.png",
      alt: "Calcium Oxide",
      title: "Calcium Oxide (Quick Lime)",
      description: `As a leading producer of high calcium quicklime, LKC Coatings works with you to deliver a high-performance product to meet your specific needs. High calcium quicklime, chemically known as calcium oxide (CaO), or commonly referred to as lime, is a widely used chemical compound that originates from calcium carbonate (aka limestone). Quicklime is primarily made up of calcium, magnesium, and small amounts of other chemical compounds depending on the formation of the originating limestone.

    Our LKC Coatings high calcium quicklime is derived from select high calcium limestone deposits containing no more than 5% magnesium content. Our material is routinely tested for quality and consistency to ensure the right chemistry and physical properties for industrial applications.`,
      specifications: [
        "Calcium content range (CaO): 93-97%",
        "Size range: 2 ¼” down to 0”",
        "Reactivity: 30-50 °C minimum 3-minute heat rise",
      ],
      applications: [
        { name: "Water treatment", icon: "fa-solid fa-water" },
        { name: "PCC and pulp & paper", icon: "fa-solid fa-toilet-paper" },
        { name: "Agriculture", icon: "fa-solid fa-wheat-awn" },
      ],
    },

    // Add more images as needed
  };

  return images[productId] || null;
}

function showProductModal(productId) {
  const productData = getProductDataById(productId);

  $("#modalLabel").text(productData.title);
  $(".modal-body .img-fluid").attr("src", productData.src);
  $(".modal-body .mt-3").text(productData.description);

  const ulElement = $(".spec-list");

  ulElement.empty();

  productData.specifications.forEach((item) => {
    ulElement.append(`<li>${item}</li>`);
  });

  const appElement = $("#applications-list");

  appElement.empty();

  productData.applications.forEach((item) => {
    appElement.append(`<div class="col-md-3 col-sm-6">
            <div class="card">
              <div class="card-body text-center">
                <i class="${item.icon} mb-2"></i>
                <p>${item.name}</p>
              </div>
            </div>
          </div>`);
  });

  $("#productmmm").modal("show");

  $("#productmmm").on("hidden.bs.modal", function () {
    localStorage.removeItem("selectedProductId");
  });
}

function initSlider() {
  const $imageList = $(".slider-wrapper .image-list");
  const $slideButtons = $(".slider-wrapper .slide-button");
  const $sliderScrollbar = $(".container .slider-scrollbar");
  const $scrollbarThumb = $sliderScrollbar.find(".scrollbar-thumb");
  const maxScrollLeft = $imageList[0].scrollWidth - $imageList[0].clientWidth;

  // Clear the existing image list (if any)
  $imageList.empty();

  // Iterate over the images array and append each image to the list
  images.forEach((image) => {
    const $img = $("<img>")
      .addClass("image-item")
      .attr("src", image.src)
      .attr("alt", image.alt)
      .attr("data-id", image.id); // Optional: add data-id for further use

    $imageList.append($img);
  });

  // Handle scrollbar thumb drag
  $scrollbarThumb.on("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = $scrollbarThumb.position().left;
    const maxThumbPosition =
      $sliderScrollbar.width() - $scrollbarThumb.outerWidth();

    // Update thumb position on mouse move
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;

      // Ensure the scrollbar thumb stays within bounds
      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );
      const scrollPosition =
        (boundedPosition / maxThumbPosition) * maxScrollLeft;

      $scrollbarThumb.css("left", `${boundedPosition}px`);
      $imageList.scrollLeft(scrollPosition);
    };

    // Remove event listeners on mouse up
    const handleMouseUp = () => {
      $(document).off("mousemove", handleMouseMove);
      $(document).off("mouseup", handleMouseUp);
    };

    // Add event listeners for drag interaction
    $(document).on("mousemove", handleMouseMove);
    $(document).on("mouseup", handleMouseUp);
  });

  // Slide images according to the slide button clicks
  $slideButtons.on("click", function () {
    const direction = $(this).attr("id") === "prev-slide" ? -1 : 1;
    const scrollAmount = $imageList.width() * direction;
    $imageList.animate({ scrollLeft: `+=${scrollAmount}` }, "smooth");
  });

  // Show or hide slide buttons based on scroll position
  const handleSlideButtons = () => {
    $slideButtons
      .eq(0)
      .css("display", $imageList.scrollLeft() <= 0 ? "none" : "flex");
    $slideButtons
      .eq(1)
      .css(
        "display",
        $imageList.scrollLeft() >= maxScrollLeft ? "none" : "flex"
      );
  };

  // Update scrollbar thumb position based on image scroll
  const updateScrollThumbPosition = () => {
    const scrollPosition = $imageList.scrollLeft();
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      ($sliderScrollbar.width() - $scrollbarThumb.outerWidth());
    $scrollbarThumb.css("left", `${thumbPosition}px`);
  };

  // Call these two functions when image list scrolls
  $imageList.on("scroll", () => {
    updateScrollThumbPosition();
    handleSlideButtons();
  });

  $(".image-item").on("click", function () {
    const productId = $(this).attr("data-id");
    localStorage.setItem("selectedProductId", productId);
    showProductModal(productId);
  });
}

// Call initSlider when the document is ready and on window resize
$(document).ready(initSlider);
$(window).resize(initSlider);
