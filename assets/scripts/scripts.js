// mengambil semua nodelist dessert
const allDessertCards = document.querySelectorAll(".dessert");
allDessertCards.forEach((dessert) => {
  const btnCard = dessert.querySelector(".btn-card");
  const beforeClick = dessert.querySelector(".before-click");
  const afterClick = dessert.querySelector(".after-click");
  const btnMinus = dessert.querySelector(".btn-minus");
  const btnPlus = dessert.querySelector(".btn-plus");
  const itemQuantity = dessert.querySelector(".item-quantity");

  let item = parseInt(itemQuantity.textContent);

  // aksi yang dijalankan ketika item dipilih
  function selectedItem() {
    beforeClick.style.display = "none";
    afterClick.style.display = "flex";
    btnCard.style.backgroundColor = "hsl(14, 86%, 42%)";
    btnCard.style.border = "1.5px solid hsla(14, 71%, 51%, 1.00)";
    dessert.style.border = "3px solid hsl(14, 86%, 42%)";
  }

  // aksi yang dijalanakan ketika item nol
  function resetItem() {
    afterClick.style.display = "none";
    beforeClick.style.display = "flex";
    btnCard.style.backgroundColor = "hsl(20, 50%, 98%)";
    btnCard.style.border = "1.5px solid hsl(14, 25%, 72%)";
    dessert.style.border = "none";
  }

  // menambahkan event ke setiap btn-card
  btnCard.addEventListener("click", selectedItem);
  // menambahkan event ke setiap btn-plus
  btnPlus.addEventListener("click", (event) => {
    event.stopPropagation(); // menghentikan perambatan

    // menambahkan jumlah item
    item++;
    itemQuantity.textContent = item;
  });
  // menambahkan event ke setiap btn-minus
  btnMinus.addEventListener("click", (event) => {
    event.stopPropagation(); // menghentikan perambatan

    // jika itemnya sama dengan satu, lalu diklik maka akan mereset
    if (item === 1) {
      resetItem();
    } else {
      // selain itu maka mengurangi item
      item--;
      itemQuantity.textContent = item;
    }
  });
});
