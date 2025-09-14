// main.js

document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Carousel Logic (for index.html) ---
  const carouselTrack = document.querySelector('.carousel-track');
  if (carouselTrack) {
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const dots = Array.from(document.querySelectorAll('.dot'));
    let currentIndex = 0;

    const updateCarousel = () => {
      carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    };

    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
      updateCarousel();
    });

    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
      updateCarousel();
    });

    dots.forEach(dot => {
      dot.addEventListener('click', (event) => {
        currentIndex = parseInt(event.target.dataset.slideIndex);
        updateCarousel();
      });
    });
  }

  // --- Scroll-Triggered Animations (Global) ---
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };

  const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.animationDelay;
        if (delay) {
          entry.target.style.animationDelay = delay;
        }
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(animateOnScroll, observerOptions);
  document.querySelectorAll('.hidden-on-load').forEach(el => observer.observe(el));

  // --- Animated Background Elements (Global) ---
  const createAnimatedBackgroundElements = (container, numberOfElements) => {
    if (!container) return;
    for (let i = 0; i < numberOfElements; i++) {
      const element = document.createElement('div');
      element.classList.add('animated-bg-element');
      const isBall = Math.random() > 0.5;
      element.classList.add(isBall ? 'shape-ball' : 'shape-target');
      
      const size = Math.random() * 40 + 20;
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.opacity = 0.25;
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      element.style.animationDelay = `${Math.random() * 5}s`;
      element.style.animationDuration = `${Math.random() * 10 + 15}s`;

      container.appendChild(element);
    }
  };

  document.querySelectorAll('.animated-bg-container').forEach(container => {
      const count = parseInt(container.dataset.bgElementCount) || 5;
      createAnimatedBackgroundElements(container, count);
  });
});