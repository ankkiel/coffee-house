true&&(function polyfill() {
    const relList = document.createElement('link').relList;
    if (relList && relList.supports && relList.supports('modulepreload')) {
        return;
    }
    for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
        processPreload(link);
    }
    new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type !== 'childList') {
                continue;
            }
            for (const node of mutation.addedNodes) {
                if (node.tagName === 'LINK' && node.rel === 'modulepreload')
                    processPreload(node);
            }
        }
    }).observe(document, { childList: true, subtree: true });
    function getFetchOpts(link) {
        const fetchOpts = {};
        if (link.integrity)
            fetchOpts.integrity = link.integrity;
        if (link.referrerPolicy)
            fetchOpts.referrerPolicy = link.referrerPolicy;
        if (link.crossOrigin === 'use-credentials')
            fetchOpts.credentials = 'include';
        else if (link.crossOrigin === 'anonymous')
            fetchOpts.credentials = 'omit';
        else
            fetchOpts.credentials = 'same-origin';
        return fetchOpts;
    }
    function processPreload(link) {
        if (link.ep)
            // ep marker = processed
            return;
        link.ep = true;
        // prepopulate the load record
        const fetchOpts = getFetchOpts(link);
        fetch(link.href, fetchOpts);
    }
}());

(function() {
    const navigation = document.querySelector('.navigation');
    const burgerBtn = document.querySelector('.header__burger');
    const burgerLines = document.querySelectorAll('.header__burger-line');
    const navigationItems = document.querySelectorAll('.navigation__item');
    const body = document.querySelector('body');

    const toggleNavigation = () => {
        body.classList.toggle('fix-screen');
        navigation.classList.toggle('navigation--open');
        burgerBtn.classList.toggle('header__burger--active');
        burgerLines.forEach(item => {
            item.classList.toggle('header__burger-line--active');
        });
    };

    burgerBtn.addEventListener('click', toggleNavigation);

    navigationItems.forEach(item => {
        item.addEventListener('click', toggleNavigation);
    });
})();

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
    };

    const autoSlide = () => updateSlider(DIRECTION_RIGHT);

    let autoSlideInterval = setInterval(autoSlide, 5000);

    slider.addEventListener('click', () => {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(autoSlide, 5000);
    });
  }
})();

const scriptRel = 'modulepreload';const assetsURL = function(dep, importerUrl) { return new URL(dep, importerUrl).href };const seen = {};const __vitePreload = function preload(baseModule, deps, importerUrl) {
    // @ts-expect-error true will be replaced with boolean later
    if (!true || !deps || deps.length === 0) {
        return baseModule();
    }
    const links = document.getElementsByTagName('link');
    return Promise.all(deps.map((dep) => {
        // @ts-expect-error assetsURL is declared before preload.toString()
        dep = assetsURL(dep, importerUrl);
        if (dep in seen)
            return;
        seen[dep] = true;
        const isCss = dep.endsWith('.css');
        const cssSelector = isCss ? '[rel="stylesheet"]' : '';
        const isBaseRelative = !!importerUrl;
        // check if the file is already preloaded by SSR markup
        if (isBaseRelative) {
            // When isBaseRelative is true then we have `importerUrl` and `dep` is
            // already converted to an absolute URL by the `assetsURL` function
            for (let i = links.length - 1; i >= 0; i--) {
                const link = links[i];
                // The `links[i].href` is an absolute URL thanks to browser doing the work
                // for us. See https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#reflecting-content-attributes-in-idl-attributes:idl-domstring-5
                if (link.href === dep && (!isCss || link.rel === 'stylesheet')) {
                    return;
                }
            }
        }
        else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
            return;
        }
        const link = document.createElement('link');
        link.rel = isCss ? 'stylesheet' : scriptRel;
        if (!isCss) {
            link.as = 'script';
            link.crossOrigin = '';
        }
        link.href = dep;
        document.head.appendChild(link);
        if (isCss) {
            return new Promise((res, rej) => {
                link.addEventListener('load', res);
                link.addEventListener('error', () => rej(new Error(`Unable to preload CSS for ${dep}`)));
            });
        }
    }))
        .then(() => baseModule())
        .catch((err) => {
        const e = new Event('vite:preloadError', { cancelable: true });
        // @ts-expect-error custom payload
        e.payload = err;
        window.dispatchEvent(e);
        if (!e.defaultPrevented) {
            throw err;
        }
    });
};

const __vite_glob_0_0 = ""+new URL('coffee-1-6860mc2H.png', import.meta.url).href+"";

const __vite_glob_0_1 = ""+new URL('coffee-2-iWajrn9h.png', import.meta.url).href+"";

const __vite_glob_0_2 = ""+new URL('coffee-3-ryJ0ir9E.png', import.meta.url).href+"";

const __vite_glob_0_3 = ""+new URL('coffee-4-0FAo4p8D.png', import.meta.url).href+"";

const __vite_glob_0_4 = ""+new URL('coffee-5-LoJbNj4c.png', import.meta.url).href+"";

const __vite_glob_0_5 = ""+new URL('coffee-6-mRL8Ieay.png', import.meta.url).href+"";

const __vite_glob_0_6 = ""+new URL('coffee-7-0GeEnTlh.png', import.meta.url).href+"";

const __vite_glob_0_7 = ""+new URL('coffee-8-NpF8cX5i.png', import.meta.url).href+"";

const __vite_glob_0_8 = ""+new URL('coffee-slider-1-9vI3-e92.png', import.meta.url).href+"";

const __vite_glob_0_9 = ""+new URL('coffee-slider-2-jJZbSuxh.png', import.meta.url).href+"";

const __vite_glob_0_10 = ""+new URL('coffee-slider-3-qGZmknIp.png', import.meta.url).href+"";

const __vite_glob_0_11 = ""+new URL('dessert-1-91fMODjn.png', import.meta.url).href+"";

const __vite_glob_0_12 = ""+new URL('dessert-2-fLdcGk3c.png', import.meta.url).href+"";

const __vite_glob_0_13 = ""+new URL('dessert-3-5xkNvxuL.png', import.meta.url).href+"";

const __vite_glob_0_14 = ""+new URL('dessert-4-JtdIWUJK.png', import.meta.url).href+"";

const __vite_glob_0_15 = ""+new URL('dessert-5-3RsJlk0i.png', import.meta.url).href+"";

const __vite_glob_0_16 = ""+new URL('dessert-6-pjak7dbg.png', import.meta.url).href+"";

const __vite_glob_0_17 = ""+new URL('dessert-7-LiolByRS.png', import.meta.url).href+"";

const __vite_glob_0_18 = ""+new URL('dessert-8-xwuRSlgg.png', import.meta.url).href+"";

const __vite_glob_0_19 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAeCAYAAADU8sWcAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAR3SURBVHgBtVZbbxtFFP5mb/b6uoE6kJAUu62UtBFqEqAlElIMKs/0n8A/aPgH/QeNeEVIQeWh4iXuU1secAqkhYfIG6W5NEmL40u8F+8OZzaXprDxbtrkky9jz+x853znzJnDEBNrT3770IVzk3OUGdg4OIoHcxxYAOMmY6io0OYGr0wux9mTRS1YefrrtOf5M0RYRkxw8IosSzPDl6/dx5uQ16oPikxld05CGmLGrCppM8cpEUr+7O9HVz0XczQs4i1BKpiKym4OjVx/HEm+T1yhoYHTQ11WUf6vAa+RC6klVaqeMvGhAaqkjh8NgXR0lojnz4hYwHB8p1KrVo3/kS8vPrqFmDF23S5a7V34vg9OZy8uKHmLkuZ88+o3DuWej0MuyFY3tiDJMvpyWaiqDJnGkWf2Feq+q5VKExP1wHMinsYJMvsdIwsjl4Pj8T37T+A9wTjwPiCnR7+N+ySTJKRSaaiainw+DyYrkCQZJwGpVw72Egkgqc4/UQ8IEuHp8+0tvKD3LsU8qafgeR7SmQzOvXsO7/cX4FltxAFJ36coSfeq70UvtnyGe3d/xJPqQ6wsr6DZbCOh63BtC319Bi6NjGDi8xu48eVX6DReRu4n6/a04nN/PLrEM8psjh++n8X61g4y2SxymTR8rsD1Vfy1tIHfF2sUPhmfXJvCTr2JQqEA5lrH7sh9FBVwFnmuPUqownsDuDP3C+79fBfrKyZaO3V4XQ+JlA49ncOFkVFcGRvF4uIiRkvDeL6+hqHBD9B1OsewM0OJIrYpzisbGxhWkkgmE5j89GOsDvSj3emgs0vvjkVxdynpONrtFiVhFk3LgdvtwrI7UHqIqtA9XCcrQiclRcWLl9uU4TJsim1KTwqTaVOLkm4brdYuukSSSGhELlFwSHhZwrO1dWiqhuGBHseQeBXGZZPDD5+n20CSxdHSA3JBrNERSyYSVFwUyIpEe8tIaApoiJ1GA41Gi3KB49LFiz3Pv+/xx4rnKPfpqIUvoIRJpzNwHDuobGZtiYg1ZDMp1MkIW2bQSBUjm8Lm5ibqSzXoVANE+SgODaEnusmFQG/zz4fzxzUNwvvtZpNi20a71cDa6ioZQw0VKWHbNjqWTbHehaKqyFHRyeYMlIbPY6R0HoyFh5OivFAcuz4RJBwtqpCioeSckukcedohqUUpLPR3yYgmLCsRHD+VSLVEMig0+UyOSm8eOv3HeiQak3A7+BYf+1WuhhjXqYinZbtwve7ejUavBIVAVSjushT1OHnNTU3XyoMXJpeD1eKGITNuIwYkcimV1JBPp2BQoTGyaeiUB3GIBSi8s4J4b7yPwHvNqR5tiU8bwuvi2Gelg9+H5grvfcn/goZ1nA3qQu6jf7ymVenylCkavTMwIGggD+QOJRcQHWZgAIOJU4CQOqxzDSU/MCAIAeOzeAtQclWE1GHEe/MRqP3xoCwz+RY1/2XEhCD1uPdd6aOpSu91MVF7Sk0mZ18zzsqcsyIJOn5kF5M2WiCJK77NfypNTJlx9vwXeYvRxeSSSp4AAAAASUVORK5CYII=";

const __vite_glob_0_20 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAeCAYAAADU8sWcAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAR5SURBVHgBtVbPbxtFFP5mdtZeN4ntpAmoFRQHAeKCGsShhyrYuTWJEE0DfwAXrnDnkPTOAa5c2hsH1CRIJOnNDig3pCSHIlEh4VZEIGgT49j1j92Z1zfrpHISr+O06ZP8Y3dn3ve+730zswI9xvry8huBU7tOBjlAjAkgc/CMiDYhUBQSBaXF0tXp2Qe95BQnDfh5ZSFrYOYFRA49BoEKEnL+w6kba3ge8Pzq9xlB7q3TgB4rgui2CzEfpURH8F/uLlzWhpbapX3uAoCiI8X18Ws3tk4E3wcu8IM0zioIJemI3NECDoG3pI5tnClwWwEKGGtvgTxUCcXyLwU4TI60L1DIL95KHwNfW74zdxY97o6PjPSSX7RdP5M7/7LBw2D5TbM8OjHzWSlkLuFmTwPcV6sj2FjH1vavkI7EqYLlP2AfziTCl73PJVz8aQWv3F3Ho+p9/FX7Df3pBLw+D0L2Vgiv/1yYK7+4mJZxs9vDFB6t4VZKuPD1d/CZ/b0Y4H31OUZGMpBKQDlxNBsG1XKtNb5LmEZ5kMfTZepOFVJq/g34QiPw6/j90jDKrkTq7VG8dvESYgkFh+V3BEEOONDpAWxv7yHQ0ZmdRCqrSIoxmM6DlHKQHpTwEh4nlhBciPP6MOQH74J3rfBawDBJLiyowug6U+Kb7hBeHXGx/U8zEpy0ySiQiVzXNnnmwgD8wIfxqzxhD9R8DNHkLgX/Q5g9FqMefkyzAQVbRBPN5BUkhsbD+RRFXoq0QpfwfY3ywyW4pgxJVcRdgtaai2CCxnBy01qrfM5S6AmHe+9B1R+iaVVyBIIgWnrFFi3ZyVGhWUaXeyngcHds7z2Q6/KTczy7H4glQTLJuCn+9LHqcWarWvJ3C0Ml9igVuxnOSb6HmMens5PgXg5wh23/2eZShYa2jMl6hgloVkMHAY/RrIxmlaIzG0lbStfEmox3ceW5dxBPxjkxhcms3OFHm7ChdiaRbQX33mdPNB7xtYOGGInut416ZTPUprCywFtra+EfjbfeHMb5wQQvG8uqBr9RYX/tsMF2Geg/kL8DXeX/QRmK6nxdQ5C6gkr/OB5H7h60mZ365P3QcEJQgSl0BK/s/AHs/gld+5eZMaj/hFkzU2s4Y50XwG+yJ5i9z3tBUGfHJ4dQa1jaEX0X8hv7E4KbuvyWdzm7xR5bdpXS38zqfsiIAgvsQ/tWZsn1cjvEMHw5DMTPw8RGoAdSXCSbMIg0XFGZeCGs4eDO2uqdOc42f3Sk6xfh1u+x7B6v4j4IlYJRXKPDTlcJkOi6Wjuwxnx2cvZm6+9+7O/xGzh2ullJ+Vuc+KLbSxSzU7OjBxfPjqGJmZmSEXKC/5ZwpNQzAi4p8nLtNw6dgROTM0UpY7njBbw4sM17dXr6QSS4jfFrH23tF1DE2URIyOY9+qDj6W8H2haQwG28QAghClbqTsDh85MS5Fd/yDlw5g7ePnoF5c315sTkp4Wu49Bj5FcXM3yEf8znd46MyLD/x9qyFNmTm/wqUeBd+EfrnV5yPgXThgIEsUIvogAAAABJRU5ErkJggg==";

const __vite_glob_0_21 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAeCAYAAADU8sWcAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARFSURBVHgBtVbNbhNXFP7unT//BduBpMEmiilpF1Uk0k03iNpWN4SoKoH2AfoE7RvEvEH7BLDroiKhi5Du7LTqusmurShyUCEB1Nj4b8aemXs5M46RAxnbgfhIlmfm3jnfd875zrnDMKL9sbEx5yjmDSmQA9giAzK9NSnlNhjKjKOkuuz+leVbu6P4ZMM2/PZgLSsgCgwshxFNQpY4eOHz6ze38C7gxc2fMkxqd04C+hYJKe9qYIWgTBwL/vuva5ddIe/3p/adCQBlhbMbV6/d3BkKfghcooUETsskqlxhuTcJHAHvplr/81SB+wiowGJ/CfgRJlIvjgXYd46EzVAqrt9JvAW+tXFv9TRqPBgfGR46813f/et0F8cN7hulX3RqF/Mr31b9yDm07EmBBdcxM78A25U4kVH6e9H74FLi+1HflZJBn5hEfGYWsXMzSM5+BCWS6FunEcP4EB8y5/Morq8nuCEqx22ilkNk8jysyh4YY7AER/jsLKbTKRiaSswl2raDpmnjyeNdaK3nSKbm4Ah617YhavuBBES7llQVQ14OSpzjuohNpWGTM9+REsZUeg4TsQiiIQUqZ2h1XHDNxPSFOaB9DgcvnkJp/Q8WT9FLgBaQBCUcz3LJ2WIQOy+6J4/+Rnr+E7QdiQ8uLSCRSCAaCyMSMhA1dEQjYcRicUwmz1L6k5DtFnRNAxc29FAkyDWkKzIqpBjY127HRDSsY/6zLyidDI5jo9ORFJHqBQaz7dB9B4LAJB15zJgA7AqViUKWItgxZwkVQ0xQJPvPXkBIxaNCZAw4FHHHUvw+7VDNzXYbltlGo9lEg8oQIi1o4Sjq+88R0YMhVDBeHcQwRlE/+ucvxCenoKkKnBABazpoVntHJwnLhe0QAcvCy3oT9XoDqQtTaNSqCGsKgqOSVZVclAd1qqfyzsEenpkWQlTfCP10nWrKu0pySZQdUnaz1ULtZd1Xf52ywK0qmBoMLrjcUV2TbXFj8KCYTsbw8L99tFoTMMMhAqc2Uw7BnS54yzTRoKhjmoRqqlAHAPtmNbb98Vp6sEajtdv4QWZabfz79AAaKdigmnPePRBdIXzBeZGDxLjwYZrUPkxKcjt7/etP/V2MyRKVLzdoe5haaz41iYeP91CruN20U0kEpV0IFxNRA5cunh8B2APkP3h//k5h8R9pynkjdmDbhYjAwscZ1GoNVGp1aj1SNQkvET9D4BFfHyNYWRVGyefQe7K1eW+Voi9g3MZQyC7duu1dvh5+XvQeK4zXyj3gI+D5lZWqYDxPl1WMx6qqDOX6HxwZ+/mllTLnem4MBKqe3yvLy7uB4J5dvfblziGBMk7H/IA8v28uHHvgeRu9EtB3w128h5H6S16qjwP214c5KG7+nFOgrPa+PkYFpSPodn7pm9LAfRjRipvrGRpqX9FYyUnBMjSlFvu8lKnFtyV4iVr/F087o/h8BYQTvy3w1KA/AAAAAElFTkSuQmCC";

const __vite_glob_0_22 = ""+new URL('mobile-screens-Ogb7OiR1.png', import.meta.url).href+"";

const __vite_glob_0_23 = ""+new URL('tea-1-qbDAbsBm.png', import.meta.url).href+"";

const __vite_glob_0_24 = ""+new URL('tea-2-JWZdUOQd.png', import.meta.url).href+"";

const __vite_glob_0_25 = ""+new URL('tea-3-PATmPuxJ.png', import.meta.url).href+"";

const __vite_glob_0_26 = ""+new URL('tea-4-Ostnf3UG.png', import.meta.url).href+"";

(function() {
  const menu = document.querySelector('.menu');
  if (menu) {
    class Menu {
      constructor() {
        this.currentCategory = 'coffee';
        this.tabs = document.querySelectorAll('.tabs__item');
        this.init();
      }
      // Инициализация
      async init() {
        const { default: products } = await __vitePreload(() => import('./products-SbBGq_UI.js'),true?__vite__mapDeps([]):void 0,import.meta.url);
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
        img.src = new URL((/* #__PURE__ */ Object.assign({"../../assets/images/coffee-1.png": __vite_glob_0_0,"../../assets/images/coffee-2.png": __vite_glob_0_1,"../../assets/images/coffee-3.png": __vite_glob_0_2,"../../assets/images/coffee-4.png": __vite_glob_0_3,"../../assets/images/coffee-5.png": __vite_glob_0_4,"../../assets/images/coffee-6.png": __vite_glob_0_5,"../../assets/images/coffee-7.png": __vite_glob_0_6,"../../assets/images/coffee-8.png": __vite_glob_0_7,"../../assets/images/coffee-slider-1.png": __vite_glob_0_8,"../../assets/images/coffee-slider-2.png": __vite_glob_0_9,"../../assets/images/coffee-slider-3.png": __vite_glob_0_10,"../../assets/images/dessert-1.png": __vite_glob_0_11,"../../assets/images/dessert-2.png": __vite_glob_0_12,"../../assets/images/dessert-3.png": __vite_glob_0_13,"../../assets/images/dessert-4.png": __vite_glob_0_14,"../../assets/images/dessert-5.png": __vite_glob_0_15,"../../assets/images/dessert-6.png": __vite_glob_0_16,"../../assets/images/dessert-7.png": __vite_glob_0_17,"../../assets/images/dessert-8.png": __vite_glob_0_18,"../../assets/images/icon-coffee.png": __vite_glob_0_19,"../../assets/images/icon-dessert.png": __vite_glob_0_20,"../../assets/images/icon-tea.png": __vite_glob_0_21,"../../assets/images/mobile-screens.png": __vite_glob_0_22,"../../assets/images/tea-1.png": __vite_glob_0_23,"../../assets/images/tea-2.png": __vite_glob_0_24,"../../assets/images/tea-3.png": __vite_glob_0_25,"../../assets/images/tea-4.png": __vite_glob_0_26}))[`../../assets/images/${product.category}-${idx + 1}.png`], import.meta.url);
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
  }
})();
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}