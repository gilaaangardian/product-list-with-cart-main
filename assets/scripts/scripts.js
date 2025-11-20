// get all nodelists from the document
const allDessertCards = document.querySelectorAll(".dessert");
const cartItemsContainer = document.querySelector(".cart-items-container");
const cartEmpty = document.querySelector(".cart-empty");
const cartTotalItems = document.querySelector(".cart-total-items");
const orderTotalPrice = document.querySelector(".order-total-price");
const cartItemOrderTotal = document.querySelector(".cart-item-order-total");
const cartCarbonNeutral = document.querySelector(".cart-carbon-neutral");
const btnConfirmOrder = document.querySelector(".btn-confirm-order");
const mainShadow = document.querySelector(".main-shadow");
const orderConfirmedItems = document.querySelector(".order-confirmed__items");
const orderConfirmedGrandTotalPrice = document.querySelector(".order-confirmed__grand-total-price");
const orderConfirmedBtn = document.querySelector(".order-confirmed__button");

// object to hold data
const cartData = {};

// loop through each nodelist one by one
allDessertCards.forEach((dessert) => {
  // get nodelist that are inside the dessert tag
  const btnCard = dessert.querySelector(".btn-card");
  const beforeClick = dessert.querySelector(".before-click");
  const afterClick = dessert.querySelector(".after-click");
  const btnMinus = dessert.querySelector(".btn-minus");
  const btnPlus = dessert.querySelector(".btn-plus");
  const itemQuantity = dessert.querySelector(".item-quantity");
  const description = dessert.nextElementSibling;
  const priceTag = description.querySelector(".price");
  const priceText = parseFloat(priceTag.textContent.slice(1));
  const priceFinal = Math.round(priceText * 100) / 100;
  const nameTag = description.querySelector(".name");
  const nameText = nameTag.textContent;
  const dessertId = dessert.dataset.id;
  const styles = window.getComputedStyle(dessert);
  const imageAddress = styles.backgroundImage;
  const imageAddressText = imageAddress.replace(/url\(["']?|["']?\)/g, "");

  // action to run when an item is selected
  function selectedItem() {
    beforeClick.style.display = "none";
    afterClick.style.display = "flex";
    btnCard.style.backgroundColor = "hsl(14, 86%, 42%)";
    btnCard.style.border = "1.5px solid hsla(14, 71%, 51%, 1.00)";
    dessert.style.border = "3px solid hsl(14, 86%, 42%)";
    // insert data into the object
    cartData[dessertId] = { qty: 1, price: priceFinal, name: nameText, image: imageAddressText };

    // update the cart
    updateCartDisplay();
  }

  // add event to each btn-card (beforeClick state)
  beforeClick.addEventListener("click", selectedItem);
  // add event to each btn-plus
  btnPlus.addEventListener("click", (event) => {
    event.stopPropagation(); // stop propagation

    // increment the item count
    cartData[dessertId].qty++;
    // update tag item quantity
    itemQuantity.textContent = cartData[dessertId].qty;

    // update the cart
    updateCartDisplay();
  });

  // add event to each btn-minus
  btnMinus.addEventListener("click", (event) => {
    event.stopPropagation(); // stop propagation

    // if the item is 1, then clicking will delete data and reset
    if (cartData[dessertId].qty === 1) {
      updateCardUI(dessertId);
    } else {
      // otherwise, decrement the data
      cartData[dessertId].qty--;
      // update the item quantity tag
      itemQuantity.textContent = cartData[dessertId].qty;
      // update the cart
      updateCartDisplay();
    }
  });
});

// action to run when btnMinus < 1 and btn close ite clicked
function updateCardUI(card) {
  const dessert = document.querySelector(`[data-id="${card}"]`);
  const btnCard = dessert.querySelector(".btn-card");
  const beforeClick = dessert.querySelector(".before-click");
  const afterClick = dessert.querySelector(".after-click");
  const itemQuantity = dessert.querySelector(".item-quantity");

  afterClick.style.display = "none";
  beforeClick.style.display = "flex";
  btnCard.style.backgroundColor = "hsl(20, 50%, 98%)";
  btnCard.style.border = "1.5px solid hsl(14, 25%, 72%)";
  dessert.style.border = "none";

  // delete data from the object
  delete cartData[card];
  // update quantity card
  itemQuantity.textContent = "1";

  // update the cart
  updateCartDisplay();
}

// action to run when updating the cart
function updateCartDisplay() {
  // clear the cart contents
  cartItemsContainer.innerHTML = "";

  // if the cart is empty
  if (Object.keys(cartData).length === 0) {
    // maka tampilkan display kosong
    cartEmpty.style.display = "flex";
    cartItemsContainer.style.display = "none";
    cartItemOrderTotal.style.display = "none";
    cartCarbonNeutral.style.display = "none";
    btnConfirmOrder.style.display = "none";
    cartTotalItems.textContent = "0";
  } else {
    // then show the empty display
    cartEmpty.style.display = "none";
    cartItemsContainer.style.display = "flex";
    cartItemOrderTotal.style.display = "flex";
    cartCarbonNeutral.style.display = "flex";
    btnConfirmOrder.style.display = "inline-block";

    // total items in cart
    let totalQty = 0;
    // order total item in cart
    let orderTotal = 0;

    // print (render) everything that is in the cart
    for (const dessertId in cartData) {
      const name = cartData[dessertId].name; // get the name
      const quantity = cartData[dessertId].qty; // get the quantity
      const itemPrice = cartData[dessertId].price; // get the original price
      // update the total items in cart
      totalQty += quantity;
      // update the order total
      orderTotal += quantity * itemPrice;

      // create cart-item
      const itemHTML = `
        <div class="cart-item" data-id="${dessertId}">
          <div class="item-description">
            <h4 class="item-name">${name}</h4>
            <div class="item-detail">
              <p class="item-qty">${quantity}x</p>
              <p class="item-price">&commat; &dollar;${itemPrice.toFixed(2)}</p>
              <p class="item-total">&dollar;${(quantity * itemPrice).toFixed(2)}</p>
            </div>
          </div>
          <button type="button" class="item-cart-btn" data-id="${dessertId}"><i class="far fa-times-circle"></i></button>
        </div><hr />`;

      // add the new HTML to the container
      cartItemsContainer.innerHTML += itemHTML;
    }
    // update the total items in the cart
    cartTotalItems.textContent = totalQty;
    orderTotalPrice.innerHTML = `&dollar;${orderTotal.toFixed(2)}`;
  }
}

// function run when user clicks confirm order
function orderConfirmed() {
  // display the cart confirm order
  mainShadow.style.opacity = "1";
  mainShadow.style.visibility = "visible";
  orderConfirmedItems.innerHTML = "";

  // if the object has contents (is not empty)
  if (Object.keys(cartData).length > 0) {
    // initialize order total
    let orderTotal = 0;
    // getting data from the object
    for (const dessertId in cartData) {
      const name = cartData[dessertId].name;
      const qty = cartData[dessertId].qty;
      const itemPrice = cartData[dessertId].price;
      const image = cartData[dessertId].image;
      const altImage = name
        .split(" ")
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");

      // update order total
      orderTotal += qty * itemPrice;

      // update card confirm order
      const orderConfirmedItem = `
      <div class="order-confirmed__item">
        <img src="${image}" alt="${altImage}" class="order-confirmed__item-img" />
          <div class="order-confirmed__item-detail">
            <p class="order-confirmed__item-name">${name}</p>
              <div class="order-confirmed__item-pricing">
                <p class="order-confirmed__item-qty">${qty}x</p>
                <p class="order-confirmed__item-price">&commat; &dollar;${itemPrice.toFixed(2)}</p>
              </div>
           </div>
        <p class="order-confirmed__item-subtotal">&dollar;${(qty * itemPrice).toFixed(2)}</p>
      </div>`;

      orderConfirmedItems.innerHTML += orderConfirmedItem;
    }
    orderConfirmedGrandTotalPrice.innerHTML = `&dollar;${orderTotal.toFixed(2)}`;
  }
}

// add event listener to the close button(s)
cartItemsContainer.addEventListener("click", function (event) {
  const closeBtn = event.target.closest(".item-cart-btn");

  // if the close button is clicked
  if (closeBtn) {
    // then send its dataset to the updateCardUI function
    const dessertId = closeBtn.dataset.id;
    updateCardUI(dessertId);
  }
});

// add event listener to the order confrim button (s)
btnConfirmOrder.addEventListener("click", orderConfirmed);
// add event listener to main shadow
mainShadow.addEventListener("click", function (event) {
  if (event.target === this) {
    mainShadow.style.opacity = "0";
    mainShadow.style.visibility = "hidden";
  }
});
