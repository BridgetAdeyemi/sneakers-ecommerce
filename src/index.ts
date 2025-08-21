const menuBtn: HTMLElement = document.getElementById("menu-btn")!;
const closeMenuBtn: HTMLElement = document.getElementById("close-menu")!;
const mobileNav: HTMLElement = document.getElementById("mobile-nav")!;

// image thumbnail
const mainImage: HTMLImageElement = document.getElementById(
  "main-image"
) as HTMLImageElement;
const pageThumbs = document.querySelectorAll(".thumb");
const leftBtn = document.getElementById("left-btn") as HTMLButtonElement;
const rightBtn = document.getElementById("right-btn") as HTMLButtonElement;

// quantity and add to cart
const quantityNum: HTMLElement = document.getElementById("quantity")!;
const increBtn: HTMLElement = document.getElementById("increament")!;
const decreBtn: HTMLElement = document.getElementById("decrement")!;
const addToCartBtn: HTMLElement = document.getElementById("add-to-cart")!;

// cart dropdown
const cartBtn: HTMLElement = document.getElementById("cart-btn")!;
const cartCount: HTMLElement = document.getElementById("cart-count")!;
const cartDropdown: HTMLElement = document.getElementById("cart-dropdown")!;
const emptyCart: HTMLElement = document.getElementById("empty-cart")!;
const cartItems: HTMLElement = document.getElementById("cart-items")!;
const checkoutBtn: HTMLElement = document.getElementById("checkout-btn")!;

// image modal
const modal: HTMLElement = document.getElementById("image-modal")!;
const closeModal: HTMLElement = document.getElementById("close-modal")!;
const modalMainImage: HTMLImageElement = document.getElementById(
  "modal-main-image"
) as HTMLImageElement;

const modalThumbs: NodeListOf<Element> =
  document.querySelectorAll(".modal-thumb");

const prevBtn: HTMLElement = document.getElementById("prev-btn")!;
const nextBtn: HTMLElement = document.getElementById("next-btn")!;

let quantity: number = 0;
let cartQuantity: number = 0;
let currentIndex: number = 0;
let currentIndexNum: number = 0;

// mobile menu toggle
menuBtn.addEventListener("click", () => {
  mobileNav.classList.remove("hidden");
});

closeMenuBtn.addEventListener("click", () => {
  mobileNav.classList.add("hidden");
});

// this switch main image from thumbnails
function showImageDesktop(index: number) {
  const thumbs = Array.from(pageThumbs) as HTMLImageElement[];
  if (index < 0) index = thumbs.length - 1;
  if (index >= thumbs.length) index = 0;
  mainImage.src = thumbs[index].dataset.full!;
  currentIndex = index;
}

pageThumbs.forEach((thumb: Element, index: number) => {
  thumb.addEventListener("click", () => {
    const fullImg: string = (thumb as HTMLImageElement).dataset.full!;
    mainImage.src = fullImg;
    currentIndex = index;
  });
});

// Mobile navigation arrows
if (leftBtn && rightBtn) {
  leftBtn.addEventListener("click", () => showImageDesktop(currentIndex - 1));
  rightBtn.addEventListener("click", () => showImageDesktop(currentIndex + 1));
}

// this is Quantity increase and decrease
increBtn.addEventListener("click", () => {
  quantity++;
  quantityNum.textContent = quantity.toString();
});

decreBtn.addEventListener("click", () => {
  if (quantity > 0) {
    quantity--;
    quantityNum.textContent = quantity.toString();
  }
});

// Toggle cart dropdown
cartBtn.addEventListener("click", () => {
  cartDropdown.classList.toggle("hidden");
});

// Add to cart
addToCartBtn.addEventListener("click", () => {
  if (quantity === 0) return;

  cartQuantity = quantity;
  cartCount.textContent = cartQuantity.toString();
  cartCount.classList.remove("hidden");

  emptyCart.classList.add("hidden");
  cartItems.classList.remove("hidden");
  checkoutBtn.classList.remove("hidden");

  cartItems.innerHTML = `
    <div class="flex  items-center gap-4 pt-4">
      <img src="${mainImage.src}" style="width: 48px; height: 48px;" />
      <div>
        <p class="text-gray-300">Fall Limited Edition Sneakers</p>
        <p>$125.00 x ${cartQuantity} <span class="font-bold">$${
    125 * cartQuantity
  }.00</span></p>
      </div>
      <button id="remove-item" class="ml-auto text-gray-400 hover:text-red-500">🗑</button>
    </div>
  `;

  // Remove item
  document.getElementById("remove-item")?.addEventListener("click", () => {
    cartQuantity = 0;
    cartCount.classList.add("hidden");
    cartItems.classList.add("hidden");
    checkoutBtn.classList.add("hidden");
    emptyCart.classList.remove("hidden");
  });
});

//open modal
mainImage.addEventListener("click", () => {
  modal.classList.remove("hidden");
  modalMainImage.src = mainImage.src;
  currentIndex = Array.from(modalThumbs).findIndex(
    (t) => (t as HTMLImageElement).dataset.full === mainImage.src
  );
});

// close modal
closeModal.addEventListener("click", () => modal.classList.add("hidden"));

// switch modal images via thumbnails
modalThumbs.forEach((thumb: Element, index: number) => {
  thumb.addEventListener("click", () => {
    const fullImg: string = (thumb as HTMLImageElement).dataset.full!;
    modalMainImage.src = fullImg;
    currentIndex = index;
  });
});

function showImage(index: number) {
  const thumbs = Array.from(modalThumbs) as HTMLImageElement[];
  if (index < 0) index = thumbs.length - 1;
  if (index >= thumbs.length) index = 0;
  modalMainImage.src = thumbs[index].dataset.full!;
  currentIndex = index;
}

prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
nextBtn.addEventListener("click", () => showImage(currentIndex + 1));
