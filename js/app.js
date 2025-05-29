// проверка поддержки webp, добавление класса webp или no-webp
function isWebp() {
   function testWebP(callback) {
      let webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height === 2);
      };
      webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }

   testWebP(function (support) {
      let bodyEl = document.body;
      if (!bodyEl) return;

      if (support) {
         bodyEl.classList.add('webp');
      } else {
         bodyEl.classList.add('no-webp');
      }
   });
}

document.addEventListener("DOMContentLoaded", isWebp);


/*------------------------------Классы анимаций для кнопок---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   function initButtonAnimation() {
      const buttons = document.querySelectorAll('[class*="btn-anim"]');

      if (buttons.length > 0) {
         buttons.forEach(function (button) {
            button.addEventListener('mouseover', function () {
               button.classList.remove('animated-out');
               button.classList.add('animated-in');
            });

            button.addEventListener('mouseout', function () {
               button.classList.remove('animated-in');
               button.classList.add('animated-out');
            });
         });
      }
   }

   function checkScreenSize() {
      if (window.innerWidth > 1023) {
         initButtonAnimation();
      }
   }

   window.addEventListener('load', checkScreenSize);
   window.addEventListener('resize', function () {
      if (window.innerWidth > 1023) {
         checkScreenSize();
      }
   });

   checkScreenSize();
});



/*------------------------------Video---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const videos = document.querySelectorAll('video');

   videos.forEach(video => {
      if (
         !video.classList.contains('article-video') &&
         !video.classList.contains('reels__video')
      ) {
         video.muted = true;
         video.play().catch(error => {
         });
      }
   });
});


/*------------------------------открытие меню---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const menuOpenButton = document.querySelector('.menu__open-button');
   const menuCloseButton = document.querySelector('.menu__close');
   const menuBody = document.querySelector('.menu__body');
   const body = document.body;

   if (menuOpenButton && menuCloseButton && menuBody) {
      menuOpenButton.addEventListener('click', function () {
         menuBody.classList.add('opened');
         body.classList.add('no-scroll');
      });

      menuCloseButton.addEventListener('click', function () {
         menuBody.classList.remove('opened');
         body.classList.remove('no-scroll');
      });
   }
});

/*------------------------------открытие коллбека в меню---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const openCallbackBtn = document.querySelector('.open-callback');
   const closeCallbackBtn = document.querySelector('.menu__callback-close');
   const callbackMenu = document.querySelector('.menu__callback');
   const callbackMenuBody = document.querySelector('.menu__callback-body');
   const menuBody = document.querySelector('.menu__body');

   if (openCallbackBtn && callbackMenu && menuBody) {
      openCallbackBtn.addEventListener('click', function () {
         callbackMenu.classList.add('opened');
         menuBody.classList.add('no-scroll');
      });
   }

   if (closeCallbackBtn && callbackMenu && menuBody) {
      closeCallbackBtn.addEventListener('click', function () {
         callbackMenu.classList.remove('opened');
         menuBody.classList.remove('no-scroll');
      });
   }

   document.addEventListener('click', function (event) {
      if (
         callbackMenu.classList.contains('opened') &&
         !callbackMenuBody.contains(event.target) &&
         !openCallbackBtn.contains(event.target)
      ) {
         callbackMenu.classList.remove('opened');
         menuBody.classList.remove('no-scroll');
      }
   });
});


/*------------------------------Инпуты в форме---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const inputs = document.querySelectorAll('.form__item input');

   if (inputs.length > 0) {
      inputs.forEach(input => {
         input.addEventListener('focus', function () {
            this.closest('.form__item').classList.add('active');
         });

         input.addEventListener('blur', function () {
            if (this.value.trim() === '') {
               this.closest('.form__item').classList.remove('active');
            }
         });

         if (input.value.trim() !== '') {
            input.closest('.form__item').classList.add('active');
         }
      });
   }
});


/*------------------------------Маска номера---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const elements = document.querySelectorAll('.tel-mask');

   if (elements.length > 0) {
      const maskOptions = {
         mask: '+{7}(000)000-00-00'
      };

      elements.forEach(function (element) {
         IMask(element, maskOptions);
      });
   }
});

/*------------------------------Бегущая строка---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const swiper = new Swiper('.marquee__slider', {
      slidesPerView: 'auto',
      speed: 5000,
      loop: true,
      allowTouchMove: false,
      autoplay: {
         delay: 0,
         disableOnInteraction: false
      },
      effect: 'slide'
   });
});


/*-------------------------КЕЙСЫ--------------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   document.querySelectorAll('.cases__slider').forEach(slider => {
      const sliderWrapper = slider.querySelector('.swiper-wrapper');
      const slides = Array.from(sliderWrapper.querySelectorAll('.cases__slide')).filter(slide => {
         return window.getComputedStyle(slide).display !== 'none';
      });

      const originalSlides = [...slides];

      const count = originalSlides.length;

      if (count === 2) {
         // Клонируем два раза
         for (let i = 0; i < 2; i++) {
            originalSlides.forEach(slide => {
               const clone = slide.cloneNode(true);
               sliderWrapper.appendChild(clone);
            });
         }
      } else if (count === 3 || count === 4 || count === 5) {
         // Клонируем один раз
         originalSlides.forEach(slide => {
            const clone = slide.cloneNode(true);
            sliderWrapper.appendChild(clone);
         });
      }



      new Swiper(slider, {
         loop: true,
         speed: 400,
         effect: 'slide',
         spaceBetween: 20,
         slideToClickedSlide: true,
         navigation: {
            nextEl: slider.querySelector('.cases__slide-next'),
            prevEl: slider.querySelector('.cases__slide-prev'),
         },
         breakpoints: {
            320: {
               slidesPerView: 1.2,
               spaceBetween: 10,
            },
            520: {
               slidesPerView: 2,
               spaceBetween: 10,
            },
            768: {
               slidesPerView: 2.5,
               spaceBetween: 20,
            },
            1000: {
               slidesPerView: 2.5,
               spaceBetween: 20,
            },
         }
      });
   });

   const gsBgImgSelector = ".slider-gallery img";
   const sliderImgs = document.querySelectorAll(gsBgImgSelector);

   if (sliderImgs.length > 0) {
      const dynamicEl = [...sliderImgs].map((sliderImg) => {
         return {
            src: sliderImg.src,
            thumb: sliderImg.src,
            subHtml: ''
         };
      });

      const dynamicGalleryButtons = document.querySelectorAll(".dynamic-gallery-button");

      dynamicGalleryButtons.forEach((button, idx) => {
         const popup = lightGallery(button, {
            dynamic: true,
            download: false,
            dynamicEl,
            mobileSettings: {
               showCloseIcon: true,
            },
         });

         button.addEventListener("click", () => {
            popup.openGallery(idx);
         });
      });

      [...document.querySelectorAll(".slider-gallery")].forEach((slide, idx) => {

         const button = slide.querySelector('.dynamic-gallery-button');
         if (button) {
            button.addEventListener("click", () => {
               const popup = lightGallery(button, {
                  dynamic: true,
                  download: false,
                  dynamicEl,
                  mobileSettings: {
                     showCloseIcon: true,
                  },
               });
               popup.openGallery(idx);
            });
         }
      });
   }
});




/*-------------------------КЕЙСЫ--------------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const circle = document.querySelector('.blur-circle');

   if (circle) {
      document.addEventListener('mousemove', function (e) {
         const circleWidth = circle.offsetWidth;
         const circleHeight = circle.offsetHeight;

         setTimeout(() => {
            circle.style.transform = `translate(${e.clientX - circleWidth / 2}px, ${e.clientY - circleHeight / 2}px)`;
         }, 30);
      });
   }
});



/*------------------------------Ценности---------------------------*/
document.addEventListener("DOMContentLoaded", function () {
   const items = document.querySelectorAll(".advantages__item");
   const observerOptions = {
      root: null,
      threshold: 1,
      rootMargin: "-100px 0px -100px 0px"
   };

   let lastIntersectingItem = null;
   const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            if (lastIntersectingItem !== entry.target) {
               items.forEach(item => item.classList.remove("active"));
               entry.target.classList.add("active");
               lastIntersectingItem = entry.target;
            }
         } else {
            if (entry.target.classList.contains("active")) {
               entry.target.classList.remove("active");
               let nextItem = findClosestVisible(items);
               if (nextItem) {
                  nextItem.classList.add("active");
                  lastIntersectingItem = nextItem;
               }
            }
         }
      });
   }, observerOptions);

   items.forEach(item => {
      observer.observe(item);
   });

   function findClosestVisible(items) {
      let closestItem = null;
      let closestDistance = Infinity;
      items.forEach(item => {
         const rect = item.getBoundingClientRect();
         const itemCenter = rect.top + rect.height / 2;
         const screenCenter = window.innerHeight / 2;
         const distance = Math.abs(itemCenter - screenCenter);
         if (distance < closestDistance) {
            closestDistance = distance;
            closestItem = item;
         }
      });
      return closestItem;
   }
});


/*------------------------------Карточки услуг---------------------------*/
document.addEventListener("DOMContentLoaded", () => {
   if (window.innerWidth > 1000) {
      const cardContainers = document.querySelectorAll('.services__cards');

      cardContainers.forEach(container => {
         const cards = container.querySelectorAll('.services__card');
         let activeCard = null;

         cards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
               if (activeCard !== null) {
                  activeCard.parentElement.classList.remove(`hover-card-${activeCard.dataset.index}`);
               }

               card.parentElement.classList.add(`hover-card-${index + 1}`);
               activeCard = card;
               card.dataset.index = index + 1;
            });
         });

         container.addEventListener('mouseleave', () => {
            if (activeCard !== null) {
               activeCard.parentElement.classList.remove(`hover-card-${activeCard.dataset.index}`);
               activeCard = null;
            }
         });
      });
   }
});



/*------------------------------Скрыть услуги на моб---------------------------*/
document.addEventListener("DOMContentLoaded", function () {
   let showMoreBtn = document.querySelector('.services__show-more');
   let cards = document.querySelectorAll('.services__card');

   if (!showMoreBtn || cards.length === 0) {
      return;
   }

   let cardsToShow = 3;
   let currentCount = 3;

   function showNextCards() {
      for (let i = currentCount; i < currentCount + cardsToShow && i < cards.length; i++) {
         cards[i].style.display = 'block';
      }
      currentCount += cardsToShow;

      if (currentCount >= cards.length) {
         showMoreBtn.style.display = 'none';
      }
   }

   if (window.innerWidth <= 600) {
      for (let i = cardsToShow; i < cards.length; i++) {
         cards[i].style.display = 'none';
      }
   }

   showMoreBtn.addEventListener('click', function () {
      showNextCards();
   });
});


/*------------------------------Услуги Opacity на моб---------------------------*/
document.addEventListener("DOMContentLoaded", function () {
   const cards = document.querySelectorAll('.services__card');
   let currentVisibleCard = null;

   function handleVisibility(entries) {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            if (currentVisibleCard && currentVisibleCard !== entry.target) {
               currentVisibleCard.classList.remove('visibled');
            }
            entry.target.classList.add('visibled');
            currentVisibleCard = entry.target;
         }
      });
   }
   let options = {
      threshold: 1
   };
   const observer = new IntersectionObserver(handleVisibility, options);
   cards.forEach(card => {
      observer.observe(card);
   });
});


/*------------------------------Отзывы---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const buttons = document.querySelectorAll('.testimonial__button button');
   buttons.forEach((button, idx) => {
      button.addEventListener('click', function () {
         const galleryImages = [];
         const img = button.closest('.testimonial').querySelector('img');
         if (img) {
            galleryImages.push({ src: img.src, thumb: img.src });
         }
         const popup = lightGallery(button, {
            dynamic: true,
            dynamicEl: galleryImages,
            download: false,
            mobileSettings: {
               showCloseIcon: true,
            },
         });
         popup.openGallery(0);
      });
   });
});

/*------------------------------Scroll to top---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const scrollToTopBtn = document.querySelector('.scroll-top');

   if (scrollToTopBtn) {
      scrollToTopBtn.addEventListener('click', function () {
         window.scrollTo({
            top: 0,
            behavior: 'smooth'
         });
      });

      window.addEventListener('scroll', function () {
         if (window.scrollY > 100) {
            scrollToTopBtn.style.display = 'block';
         } else {
            scrollToTopBtn.style.display = 'none';
         }
      });
   }
});


/*-------------------------Области применения--------------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const sliderWrapper = document.querySelector('.applications__slider .swiper-wrapper');

   if (!sliderWrapper) {
      console.warn('Slider wrapper не найден');
      return;
   }

   const slides = sliderWrapper.children;
   const minSlides = 5;

   if (slides.length < minSlides) {
      let count = slides.length;
      while (sliderWrapper.children.length < minSlides) {
         for (let i = 0; i < count; i++) {
            if (sliderWrapper.children.length >= minSlides) break;
            let clone = slides[i].cloneNode(true);
            sliderWrapper.appendChild(clone);
         }
      }
   }

   const swiperAppl = new Swiper('.applications__slider', {
      loop: true,
      speed: 400,
      effect: 'slide',
      spaceBetween: 20,
      slideToClickedSlide: true,
      navigation: {
         nextEl: '.applications__slide-next',
         prevEl: '.applications__slide-prev',
      },
      breakpoints: {
         320: {
            slidesPerView: 1.2,
            spaceBetween: 10,
         },
         1000: {
            slidesPerView: 1.5,
            spaceBetween: 20,
         },
      }
   });
});


/*------------------------------faq---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const tabItems = document.querySelectorAll('.description__item');

   if (tabItems.length > 0) {
      tabItems[0].classList.add('active');

      tabItems.forEach(item => {
         const question = item.querySelector('.description__question');
         question.addEventListener('click', function () {
            const isActive = item.classList.contains('active');

            tabItems.forEach(i => i.classList.remove('active'));

            if (!isActive) {
               item.classList.add('active');
            }
         });
      });
   }
});


/*------------------------------CASES TABS---------------------------*/

document.addEventListener('DOMContentLoaded', function () {
   // Получаем все родительские контейнеры с классом cases__body
   const containers = document.querySelectorAll('.tabs-body-multy');

   containers.forEach((container, index) => {
      // Добавляем уникальный префикс для каждого контейнера
      const prefix = `cases__body-${index + 1}`;
      container.setAttribute('data-prefix', prefix);

      // Ищем внутри текущего контейнера элементы для табов и слайдов
      const tags = container.querySelectorAll('.cases__tag');
      const slides = container.querySelectorAll('.cases__slide-wrapper');

      // Устанавливаем первый таб и слайд активными по умолчанию
      if (tags.length > 0 && slides.length > 0) {
         tags[0].classList.add('active');
         slides[0].style.display = 'block';
      }


      // Массив для хранения выбранных категорий
      //let selectedCategories = ['favorites'];
      let selectedCategories = [document.querySelectorAll('.tabs-body-multy .cases__tag.tag')[0].getAttribute('data-category')];

      // Добавляем обработчики событий для каждого тега
      tags.forEach(tag => {
         tag.addEventListener('click', function (e) {
            e.preventDefault();

            const swiperContainer = e.target.closest('.tabs-body-multy').querySelector('.swiper');
            const category = tag.getAttribute('data-category');

            const categoryIndex = selectedCategories.indexOf(category);
            const favoritesIndex = selectedCategories.indexOf("favorites");

            // === Новая логика: если нажали "favorites", убираем все остальные ===
            if (category === "favorites") {
               // Очистить все кроме favorites
               selectedCategories.length = 0; // очищаем массив
               selectedCategories.push("favorites");

               // Удаляем класс active со всех, кроме текущего
               tags.forEach(t => {
                  if (t.getAttribute('data-category') !== "favorites") {
                     t.classList.remove('active');
                  }
               });

               tag.classList.add('active');
            } else {
               // Условие: если в списке ТОЛЬКО "favorites" и нажата другая категория — удаляем "favorites"
               if (selectedCategories.length === 1 && favoritesIndex !== -1) {
                  selectedCategories.splice(favoritesIndex, 1);
                  const favoritesTag = document.querySelector('[data-category="favorites"]');
                  if (favoritesTag) favoritesTag.classList.remove('active');
               }

               // Добавление/удаление категории
               if (categoryIndex === -1) {
                  selectedCategories.push(category);
                  tag.classList.add('active');
               } else {
                  selectedCategories.splice(categoryIndex, 1);
                  tag.classList.remove('active');
               }
            }

            // Очистка слайдов
            swiperContainer.swiper.removeAllSlides();

            const filteredSliders = cases__sliders.filter(slider =>
               selectedCategories.every(value => slider.slugs.includes(value))
            );

            filteredSliders.forEach(slider => {
               swiperContainer.swiper.appendSlide(slider.slide);
            });

            // Если слайдов меньше 6, добавляем недостающие
            let slideCount = swiperContainer.swiper.slides.length;
            if (slideCount > 1) {
               while (slideCount < 6) {
                  const indexToAdd = slideCount % filteredSliders.length;
                  swiperContainer.swiper.appendSlide(filteredSliders[indexToAdd].slide);
                  slideCount++;
               }
            }

            console.log(filteredSliders);
         });
      });
   });
});


document.addEventListener('DOMContentLoaded', function () {
   // Получаем все родительские контейнеры с классом cases__body
   const containers = document.querySelectorAll('.tabs-body:not(.tabs-body-multy)');

   containers.forEach((container, index) => {
      // Добавляем уникальный префикс для каждого контейнера
      const prefix = `cases__body-${index + 1}`;
      container.setAttribute('data-prefix', prefix);

      // Ищем внутри текущего контейнера элементы для табов и слайдов
      const tags = container.querySelectorAll('.cases__tag');
      const slides = container.querySelectorAll('.cases__slide-wrapper');

      // Устанавливаем первый таб и слайд активными по умолчанию
      if (tags.length > 0 && slides.length > 0) {
         tags[0].classList.add('active');
         slides[0].style.display = 'block';
      }


      // Добавляем обработчики событий для каждого тега
      tags.forEach(tag => {
         tag.addEventListener('click', function (e) {

            e.preventDefault();

            // Удаляем класс active у всех табов внутри текущего контейнера
            tags.forEach(t => t.classList.remove('active'));

            // Добавляем класс active на кликнутый таб
            tag.classList.add('active');

            // Получаем категорию из атрибута data-category
            const category = tag.getAttribute('data-category');

            const btn_more = e.target.parentElement.nextElementSibling.nextElementSibling.nextElementSibling;

            if (btn_more && btn_more.classList.contains('all-cases-link')) {
               console.log('Элемент имеет класс all-cases-link');
               btn_more.href = category;
            }

            // Скрываем все слайды в текущем контейнере
            slides.forEach(slide => {
               slide.style.display = 'none';
            });

            // Показываем только слайд для выбранной категории
            slides.forEach(slide => {
               if (slide.getAttribute('data-category') === category) {
                  slide.style.display = 'block';
               }
            });
         });
      });
   });
});

var searchInput_value = '';
const searchInput = document.querySelector('form.search__form input[type="text"]');
function handleEventSearchInput(event) {
   // Логика при изменении текста
   searchInput_value = searchInput.value.toLowerCase();  // Приводим введенный текст к нижнему регистру
   //console.log('Текст изменен:', searchInput_value);

   var items = searchInput.closest('.blog-post__panel').nextElementSibling.querySelectorAll('.portfolio__item, .blog-post__item');

   // Проходим по всем div элементам
   items.forEach(item => {
      const paragraph = item.querySelector('p');
      if (paragraph && paragraph.innerText.toLowerCase().includes(searchInput_value)) {  // Приводим текст элемента к нижнему регистру
         item.style.display = "block";  // Показываем элемент
      } else {
         item.style.display = "none";   // Скрываем элемент
      }
   });
}

if (searchInput) {
   searchInput.addEventListener('input', handleEventSearchInput);
   document.querySelector('form.search__form').addEventListener('reset', handleEventSearchInput);
}



/*------------------------------AJAX---------------------------*/
/*
document.addEventListener("DOMContentLoaded", function () {
   const contentContainer = document.getElementById("ajax-content");

   // Функция для выполнения AJAX-запроса
   async function loadContent(url, updateHistory = true) {
      try {
         const response = await fetch(url, { method: "GET", cache: "no-cache" });
         if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.status}`);
         }
         const text = await response.text();

         // Извлекаем содержимое контейнера
         const parser = new DOMParser();
         const doc = parser.parseFromString(text, "text/html");
         const newContent = doc.querySelector("#ajax-content");

         if (newContent) {
            contentContainer.innerHTML = newContent.innerHTML;

            // Обновляем историю, если нужно
            if (updateHistory) {
               window.history.pushState({ path: url }, "", url);
            }
         } else {
         }
      } catch (error) {
         console.error("Ошибка при загрузке контента:", error);
         alert("Не удалось загрузить контент. Попробуйте снова.");
      }
   }

   // Делегируем клики на ссылки с классом .mainentance__tag
   document.body.addEventListener("click", function (event) {
      const target = event.target.closest(".mainentance__tag");
      if (target && target.tagName === "A") {
         event.preventDefault();
         const url = target.getAttribute("href");
         if (url && url !== window.location.href) {
            loadContent(url);
         }
      }
   });

   // Обработка события popstate для кнопок "Назад" и "Вперед"
   window.addEventListener("popstate", function () {
      const url = location.pathname;
      console.log("popstate вызван, текущий URL:", url);
      loadContent(url, false); // Загружаем контент без добавления в историю
   });
});
*/



/*------------------------------POPAP VIDEO---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const openVideoButton = document.querySelector('.open-video');
   const popup = document.getElementById('videoPopup');
   const closePopupButton = document.getElementById('videoPopupClose');
   const videoPopupContent = document.querySelector('.video-popup-content');
   let videoIframe = document.getElementById('videoIframe');
   let videoSrc = videoIframe ? videoIframe.src : '';

   if (openVideoButton && popup) {
      openVideoButton.addEventListener('click', function (event) {
         event.preventDefault();
         popup.style.display = 'flex';

         // Если iframe был удален, создаем его заново
         if (!videoIframe) {
            videoIframe = document.createElement('iframe');
            videoIframe.id = 'videoIframe';
            videoIframe.src = videoSrc.includes('?')
               ? `${videoSrc}&autoplay=1`
               : `${videoSrc}?autoplay=1`;
            videoIframe.setAttribute('frameborder', '0');
            videoIframe.setAttribute('allow', 'encrypted-media');
            videoIframe.setAttribute('allowfullscreen', '');
            videoIframe.setAttribute('loading', 'lazy');
            videoPopupContent.appendChild(videoIframe);
         } else {
            // Если iframe существует, просто обновляем src для автозапуска
            videoIframe.src = videoSrc.includes('?')
               ? `${videoSrc}&autoplay=1`
               : `${videoSrc}?autoplay=1`;
         }
      });
   }

   if (closePopupButton && popup) {
      closePopupButton.addEventListener('click', function () {
         popup.style.display = 'none';
         console.log('Video stopped');

         // Удаляем iframe из DOM
         if (videoIframe) {
            videoIframe.remove();
            videoIframe = null; // Сбрасываем ссылку на iframe
         }
      });
   }

   // Обработка навигации назад
   window.addEventListener('popstate', function () {
      console.log('popstate triggered');
      if (popup.style.display === 'flex') {
         popup.style.display = 'none';

         // Удаляем iframe из DOM
         if (videoIframe) {
            videoIframe.remove();
            videoIframe = null; // Сбрасываем ссылку на iframe
         }
      }
   });
});


/*------------------------------
Video in service
---------------------------*/
document.addEventListener('DOMContentLoaded', () => {
   const wrapper = document.querySelector('.reels__wrapper');
   if (!wrapper) return;

   const cover = wrapper.querySelector('.reels__cover');
   const icon = wrapper.querySelector('.reels__icon');
   const video = wrapper.querySelector('.reels__video');

   if (!cover || !icon || !video) return;

   const playVideo = () => {
      cover.style.display = 'none';
      icon.style.display = 'none';
      video.style.display = 'block';
      video.play();
   };

   cover.addEventListener('click', playVideo);
   icon.addEventListener('click', playVideo);
});



/*------------------------------
Gallery block
---------------------------*/
if (typeof lightGallery === 'function' && document.getElementById('galleryBlock')) {
   lightGallery(document.getElementById('galleryBlock'), {
      download: false,
      mobileSettings: {
         showCloseIcon: true,
      },
      speed: 500
   });
}
