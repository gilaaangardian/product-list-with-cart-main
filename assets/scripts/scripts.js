// mengambil semua nodelist dessert
const cartData = {};
const allDessertCards = document.querySelectorAll(".dessert");
const cartItemsContainer = document.querySelector(".cart-items-container");
const cartEmpty = document.querySelector(".cart-empty");
const cartTotalItems = document.querySelector(".cart-total-items");

allDessertCards.forEach((dessert) => {
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
  const dessertId = dessert.dataset.id;

  // aksi yang dijalankan ketika item dipilih
  function selectedItem() {
    beforeClick.style.display = "none";
    afterClick.style.display = "flex";
    btnCard.style.backgroundColor = "hsl(14, 86%, 42%)";
    btnCard.style.border = "1.5px solid hsla(14, 71%, 51%, 1.00)";
    dessert.style.border = "3px solid hsl(14, 86%, 42%)";

    cartData[dessertId] = { qty: 1, price: priceFinal };

    updateCartDisplay();
    console.info(allItemCartBtn);
  }

  // aksi yang dijalanakan ketika item nol
  function resetItem() {
    afterClick.style.display = "none";
    beforeClick.style.display = "flex";
    btnCard.style.backgroundColor = "hsl(20, 50%, 98%)";
    btnCard.style.border = "1.5px solid hsl(14, 25%, 72%)";
    dessert.style.border = "none";
    cartTotalItems.textContent = 0;
  }

  // menambahkan event ke setiap btn-card
  beforeClick.addEventListener("click", selectedItem);
  // menambahkan event ke setiap btn-plus
  btnPlus.addEventListener("click", (event) => {
    event.stopPropagation(); // menghentikan perambatan

    // menambahkan jumlah item
    cartData[dessertId].qty++;
    itemQuantity.textContent = cartData[dessertId].qty;

    updateCartDisplay();
  });
  // menambahkan event ke setiap btn-minus
  btnMinus.addEventListener("click", (event) => {
    event.stopPropagation(); // menghentikan perambatan

    // jika itemnya sama dengan satu, lalu diklik maka akan menghapus data dan mereset
    if (cartData[dessertId].qty === 1) {
      delete cartData[dessertId];
      resetItem();
      updateCartDisplay();
    } else {
      // selain itu mengurangi data
      cartData[dessertId].qty--;
      itemQuantity.textContent = cartData[dessertId].qty;

      updateCartDisplay();
    }
  });
});

function updateCartDisplay() {
  // 1. Kosongkan isi keranjang HTML
  cartItemsContainer.innerHTML = "";

  // 2. Cek apakah cartData kosong
  if (Object.keys(cartData).length === 0) {
    // Jika ya, tampilkan pesan kosong
    cartEmpty.style.display = "flex";
    cartItemsContainer.style.display = "none";
  } else {
    // Jika tidak, sembunyikan pesan kosong
    cartEmpty.style.display = "none";
    cartItemsContainer.style.display = "flex";
    let totalQty = 0;

    // 3. Loop melalui data di cartData dan buat HTML baru
    for (const dessertId in cartData) {
      const quantity = cartData[dessertId].qty; // Ambil quantitinya
      const itemPrice = cartData[dessertId].price; // Ambil harga aslinya
      totalQty += quantity;

      const itemHTML = `
        <div class="cart-item" data-id="${dessertId}">
          <div class="item-description">
            <h4 class="item-name">${dessertId}</h4>
            <div class="item-detail">
              <p class="item-qty">${quantity}x</p>
              <p class="item-price">&commat; &dollar;${itemPrice}</p>
              <p class="item-total">&dollar;${quantity * itemPrice}</p>
            </div>
          </div>
          <button type="button" class="item-cart-btn" data-id="${dessertId}"><i class="far fa-times-circle"></i></button>
        </div>`;

      // 4. Tambahkan HTML baru ke container
      cartItemsContainer.innerHTML += itemHTML;
    }
    cartTotalItems.textContent = totalQty;

    // const allItemCartBtn = document.querySelectorAll(".item-cart-btn");
    // allItemCartBtn.forEach((closeBtn) => {
    //   closeBtn.addEventListener("click", (event) => {
    //     event.stopPropagation();

    //     console.info(closeBtn);
    //   });
    // });
  }
}
