(function() {
  const slider = document.querySelector('.slider');
  const leftBtn = document.querySelector('.slider__btn--left');
  const rightBtn = document.querySelector('.slider__btn--right');
  const slides = document.querySelectorAll('.slider__card');
  const paginationItems = document.querySelectorAll('.pagination__item');

  const DIRECTION_LEFT = 'left';
  const DIRECTION_RIGHT = 'right';

  if (slider) {
    let activeSlide = 0;
    slides[activeSlide].classList.add('active');
    paginationItems[activeSlide].classList.add('active');

    function updateSlider(direction) {
      slides[activeSlide].classList.toggle('active');
      paginationItems[activeSlide].classList.toggle('active');

      if (direction === DIRECTION_LEFT) {
        activeSlide = activeSlide === 0 ? slides.length - 1 : activeSlide - 1;
      } else if (direction === DIRECTION_RIGHT) {
        activeSlide = activeSlide === slides.length - 1 ? 0 : activeSlide + 1;
      }

      slides[activeSlide].classList.toggle('active');
      paginationItems[activeSlide].classList.toggle('active');
      updateActiveItem(activeSlide);
    }

    leftBtn.addEventListener('click', () => {
      updateSlider(DIRECTION_LEFT);
    });

    rightBtn.addEventListener('click', () => {
      updateSlider(DIRECTION_RIGHT);
    });

    const updateActiveItem = (index) => {
      paginationItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
      });
    }

    const autoSlide = () => updateSlider(DIRECTION_RIGHT);

    let autoSlideInterval = setInterval(autoSlide, 5000);

    slider.addEventListener('click', () => {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(autoSlide, 5000);
    });
  }
})();
