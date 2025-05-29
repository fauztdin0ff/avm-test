document.addEventListener('DOMContentLoaded', () => {
   const searchForm = document.querySelector('.search__form');
   if (!searchForm) return;

   const searchArea = searchForm.querySelector('.search__area');
   if (!searchArea) return;

   const input = searchArea.querySelector('input');
   const resetButton = searchArea.querySelector('button[type="reset"]');

   if (!input || !resetButton) return;

   // Добавляем класс `active`, если есть текст в поле ввода
   input.addEventListener('input', () => {
      if (input.value.trim()) {
         searchArea.classList.add('active');
      } else {
         searchArea.classList.remove('active');
      }
   });

   // Добавляем класс `focused` при фокусе и убираем при потере фокуса
   input.addEventListener('focus', () => {
      searchArea.classList.add('focused');
   });

   input.addEventListener('blur', () => {
      searchArea.classList.remove('focused');
   });

   // Сбрасываем текст в поле ввода и класс `active` при нажатии кнопки reset
   resetButton.addEventListener('click', () => {
      input.value = '';
      searchArea.classList.remove('active');
   });
});



/*------------------------------
Dropdown
---------------------------*/
document.addEventListener("DOMContentLoaded", () => {
   const dropdowns = document.querySelectorAll(".tag-dropdown");

   if (dropdowns.length === 0) return;

   dropdowns.forEach((dropdown) => {
      const button = dropdown.querySelector(".tag-dropdown__button");
      const buttonText = button.querySelector("span:not(.tag-dropdown-close)");
      const closeBtn = button.querySelector(".tag-dropdown-close");
      const list = dropdown.querySelector(".tag-dropdown__list");
      const items = Array.from(dropdown.querySelectorAll(".tag-dropdown__item"));
      const input = dropdown.querySelector(".tag-dropdown__input");

      let selectedValues = [];
      const defaultButtonText = "Тег";
      const focusButtonText = "Выберите тег";

      // Открытие/закрытие списка
      button.addEventListener("click", (event) => {
         if (event.target.closest(".tag-dropdown-close")) return;
         const isOpened = list.classList.toggle("_visible");
         dropdown.classList.toggle("_opened", isOpened);

         if (isOpened && selectedValues.length === 0) {
            buttonText.textContent = focusButtonText;
         } else if (!isOpened && selectedValues.length === 0) {
            buttonText.textContent = defaultButtonText;
         }
      });

      items.forEach((item) => {
         item.addEventListener("click", () => {
            const value = item.dataset.category;

            if (selectedValues.includes(value)) {
               selectedValues = selectedValues.filter((val) => val !== value);
               item.classList.remove("_checked");
            } else {
               selectedValues.push(value);
               item.classList.add("_checked");
            }

            updateDropdown();
         });
      });

      closeBtn.addEventListener("click", (event) => {
         event.stopPropagation();
         selectedValues = [];
         items.forEach((item) => item.classList.remove("_checked"));
         updateDropdown();
         list.classList.remove("_visible");
         dropdown.classList.remove("_opened");
      });

      // Обновление отображения кнопки
      function updateDropdown() {
         if (selectedValues.length > 0) {
            const firstSelected = items.find((item) => item.dataset.category === selectedValues[0]);
            const firstValue = firstSelected ? firstSelected.childNodes[0].textContent.trim() : defaultButtonText;

            if (selectedValues.length === 1) {
               buttonText.textContent = firstValue;
            } else {
               buttonText.textContent = `${firstValue} +${selectedValues.length - 1}`;
            }

            dropdown.classList.add("_selected");
         } else {
            buttonText.textContent = defaultButtonText;
            dropdown.classList.remove("_selected");
         }

         // Значение в скрытый input
         input.value = selectedValues.join(",");
      }

      // Закрытие списка при клике вне его
      document.addEventListener("click", (event) => {
         if (!dropdown.contains(event.target)) {
            list.classList.remove("_visible");
            dropdown.classList.remove("_opened");

            if (selectedValues.length === 0) {
               buttonText.textContent = defaultButtonText;
            }
         }
      });

      // Изменение placeholder при фокусе и blur
      button.addEventListener("focus", () => {
         if (selectedValues.length === 0) {
            buttonText.textContent = focusButtonText;
         }
      });

      button.addEventListener("blur", () => {
         if (selectedValues.length === 0) {
            buttonText.textContent = defaultButtonText;
         }
      });
   });
});



window.addEventListener('load', function () {
   const video = document.getElementById('delayedVideo');
   const src = video.getAttribute('data-src');

   if (video && src) {
      video.src = src;
      video.load();
   }
});