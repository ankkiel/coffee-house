class Menu {
  constructor() {
    this.currentCategory = 'coffee';
    this.tabs = document.querySelectorAll('.tabs__item');
    this.init();
  }
  // Инициализация
  async init() {
    const { default: products } = await import('./products.json');
    this.productArray = Object.values(products);

    this.tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        this.currentCategory = tab.dataset.category;
        this.updateTabs();
        this.updateMenuProducts();
      });
    });

    this.updateMenuProducts();
  }
  // Обновляем табы
  updateTabs() {
    this.tabs.forEach((tab) => {
      if (tab.dataset.category === this.currentCategory) {
        tab.classList.add('tabs__item--active');
      } else {
        tab.classList.remove('tabs__item--active');
      }
    });
  }

  updateMenuProducts() {
    const menuProducts = document.querySelector('.menu__products');
    // Удаляем все существующие карточки продуктов
    menuProducts.innerHTML = '';
  
    // Фильтруем продукты по выбранной категории
    const filteredProducts = this.productArray.filter(
      (product) => product.category === this.currentCategory
    );
  
    // Определяем, сколько элементов отображать на планшете
    const maxItems = window.innerWidth < 768 ? 4 : filteredProducts.length;

    const refreshBtn = document.querySelector('.menu__refresh');
  
    // Создаем карточки продуктов только для отфильтрованных продуктов и добавляем их в обертку
    filteredProducts.slice(0, maxItems).forEach((product, idx) => {
      const menuCard = this.createMenuCard(product, idx);
      menuProducts.appendChild(menuCard);
    });
  
    if (filteredProducts.length > maxItems) {
      refreshBtn.addEventListener('click', () => {
        // Добавляем оставшиеся элементы
        filteredProducts.slice(maxItems).forEach((product, idx) => {
          const menuCard = this.createMenuCard(product, idx + maxItems);
          menuProducts.appendChild(menuCard);
        });
        // Удаляем кнопку
        refreshBtn.remove();
      });
    }
  }
  
  createMenuCard(product, idx) {
    // Создаем карточку продукта
    const menuCard = document.createElement('a');
    menuCard.classList.add('menu__card', 'menu-card');
    menuCard.href = '#';

    // Добавляем изображение продукта
    const image = document.createElement('div');
    image.classList.add('menu-card__image');
    const img = document.createElement('img');
    img.src = new URL(`../../assets/images/${product.category}-${idx + 1}.png`, import.meta.url)
    img.alt = product.name;
    image.appendChild(img);
    menuCard.appendChild(image);

    // Добавляем название и описание продукта
    const body = document.createElement('div');
    body.classList.add('menu-card__body');

    const title = document.createElement('h3');
    title.classList.add('menu-card__title');
    title.textContent = product.name;

    const description = document.createElement('p');
    description.classList.add('menu-card__description');
    description.textContent = product.description;

    const price = document.createElement('span');
    price.classList.add('menu-card__price');
    price.textContent = `$${product.price}`;

    body.appendChild(title);
    body.appendChild(description);
    body.appendChild(price);
    menuCard.appendChild(body);

    return menuCard;
  }
}

new Menu();
