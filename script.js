console.log("Connected!! Mission 2");

// adding functionality to the slider buttons
const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(
    ".slider-wrapper .slide-button"
  );
  const sliderScrollbar = document.querySelector(
    ".container .slider-scrollbar"
  );
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;

    // update scrollbar position on mouse move
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;

      //prevent slider going outside scrollbar area
      const maxThumbPosition =
        sliderScrollbar.getBoundingClientRect().width -
        scrollbarThumb.offsetWidth;
      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );
      const scrollPosition =
        (boundedPosition / maxThumbPosition) * maxScrollLeft;
      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    };

    // remove event listeners on mouse up
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    // add event listeners for mouse drag
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  // slides images left or right according to the slide buttons being clicked
  slideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });
  // hides left slide button from display when end of left scrolling is reached
  const handleSlideButtons = () => {
    slideButtons[0].style.display =
      imageList.scrollLeft <= 0 ? "none" : "block";
    slideButtons[1].style.display =
      imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
  };

  // updates scrollbar thumb position based on image scroll left or right
  const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };
  imageList.addEventListener("scroll", () => {
    handleSlideButtons();
    updateScrollThumbPosition();
  });
};
window.addEventListener("load", initSlider);
