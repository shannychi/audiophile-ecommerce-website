
const cartContainer = document.querySelector('.cart-container');
const cartBackground = document.querySelector('.cart-background');



function eventlisterners() {

    document.getElementById('cart-btn').addEventListener('click', () => {
        cartContainer.classList.toggle('show-cart-container');
    });

    document.getElementById('cart-btn').addEventListener('click', () => {
      cartBackground.classList.toggle('showbackground');
  });


}

eventlisterners();


function addToCart(productId, imageId) {
    const product = document.querySelector(`.product[data-id="${productId}"]`);
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  

    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem = {
        id: productId,
        name: product.dataset.name,
        price: parseFloat(product.dataset.price),
        quantity: 1,
        imageId: imageId
      };
      cartItems.push(newItem);
    }
  
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCart();
  }



  function updateCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-item');
    const totalPriceElement = document.getElementById('totalPrice');
    let totalPrice = 0;
  
    cartList.innerHTML = '';
  
    cartItems.forEach(item => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
    
      <img src="${getImageUrl(item.imageId)}" alt="${item.name}" class="cart-item-image">
        <span class="item-name">${item.name} </span> </br>
        <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
        
        <span class="item-quantity">
        <button onclick="decreaseQuantity(${item.id}); decreaseCount();  calculateTOtalQuantity()"  class="item-button decrease">-</button>
        <span >${item.quantity}</span>
        <button onclick="increaseQuantity(${item.id}); increaseCount();  calculateTOtalQuantity()" class="item-button increase">+</button>
        
        </span>
      
        <button onclick="removeFromCart(${item.id})" class="remove-item">Remove</button>
        
        
      `;
      cartList.appendChild(listItem);
  
      totalPrice += item.price * item.quantity;
    });
  
    totalPriceElement.textContent = totalPrice.toFixed(2);
  }



  function getImageUrl(imageId) {
    const imageMap = {
        'image1': './assets/cart/image-xx99-mark-two-headphones.jpg',
        'image2': './assets/cart/image-xx99-mark-one-headphones.jpg',
       'image3': " ./assets/cart/image-xx59-headphones.jpg",
       'image4': './assets/cart/image-yx1-earphones.jpg',
       'image5': './assets/cart/image-zx7-speaker.jpg',
       'image6': './assets/cart/image-zx9-speaker.jpg',
    };

    // Return the corresponding image URL if found, or a default URL if not found
    return imageMap[imageId] || './assets/cart/default-image.jpg';
}

/* function to increase Quantity */

function increaseQuantity(productId) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      item.quantity += 1;
      localStorage.setItem('cart', JSON.stringify(cartItems));
      updateCart();
    }
  }

  /* function to decrease Quantity */
  function decreaseQuantity(productId) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cartItems.find(item => item.id === productId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      localStorage.setItem('cart', JSON.stringify(cartItems));
      updateCart();
    }
  }


  function removeFromCart(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCart();
  }

function updateTotalPrice() {
    const cartItems = document.getElementById('cart-item').children;
    let totalPrice = 0;

    for (const cartItem of cartItems) {
      const productPrice = parseFloat(cartItem.getAttribute('data-price'));
      const quantity = parseInt(cartItem.querySelector('#quantity').textContent);
      totalPrice += productPrice * quantity;
    }

    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);



  }


  updateCart();
  increaseCount();
  decreaseCount();
  calculateTOtalQuantity();

  function increaseCount() {
    let count = parseInt(document.getElementById('count').textContent);
    document.getElementById('count').textContent = count + 1;
  }

  function decreaseCount() {
    let count = parseInt(document.getElementById('count').textContent);
    document.getElementById('count').textContent = count - 1;
  }


 

function calculateTOtalQuantity() {
   let totalQuantity = 0;

   for (const item of cartItems) {
    totalQuantity += item.quantity || 0;

}

document.getElementById('totalQuantity').textContent = totalQuantity;

}