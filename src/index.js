import { fetchProductsByCategory } from "./js/api";
import { renderProducts } from "./js/dom";
import { addToCart } from "./js/cart";

const init = () => {
  const buttons = document.querySelectorAll(".store__category-button");
  const productList = document.querySelector(".store__list");

  const changeCategory = async ({ target }) => {
    const category = target.textContent.trim();

    buttons.forEach((button) => {
      button.classList.remove("store__category-button_active");
    });

    target.classList.add("store__category-button_active");
    const products = await fetchProductsByCategory(category);
    renderProducts(products, productList);
  };

  buttons.forEach((button) => {
    button.addEventListener("click", changeCategory);

    if (button.classList.contains("store__category-button_active")) {
      changeCategory({ target: button });
    }
  });

  productList.addEventListener("click", ({ target }) => {
    // console.log("target: ", target);
    if (target.closest(".product__btn-add-cart")) {
      const productId = target.dataset.id;
      // console.log("productId: ", productId);
      addToCart(productId);
    }
  });
};

init();
