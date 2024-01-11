
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


//update cart
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

    calculateTotalQuantity();
  }

  // display summary page
  function displaySummary() {
    const cartItems = getCartItems();
    const summaryItems = document.getElementById('summary-items');
    const totalElement = document.getElementById('totalPriceSumary');
    const vatElement = document.getElementById('vatFee');
    const shippingElement = document.getElementById('shippingPrice');
    const grandTotalElement = document.getElementById('grandTotal');
  
    summaryItems.innerHTML = '';
  
    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${getImageUrl(item.imageId)}" alt="${item.name}" class="cart-item-image">
            <span class="summary-item-name">${item.name}</span>
            <span class="summary-item-price"> $${(item.price * item.quantity).toFixed(2)}</span>
            <span class="summary-item-quantity">x ${item.quantity}</span>
            
        `;
        summaryItems.appendChild(listItem);
    });
  
    const total = calculateTotal();
  
    totalElement.textContent = total.totalPrice;
    vatElement.textContent = total.vatFee;
    shippingElement.textContent = total.shippingPrice;
    grandTotalElement.textContent = total.grandTotal;
  }


// function to get image url
  function getImageUrl(imageId) {
    const imageMap = {
        'image1': './assets/cart/image-xx99-mark-two-headphones.jpg',
        'image2': './assets/cart/image-xx99-mark-one-headphones.jpg',
       'image3': " ./assets/cart/image-xx59-headphones.jpg",
       'image4': './assets/cart/image-yx1-earphones.jpg',
       'image5': './assets/cart/image-zx7-speaker.jpg',
       'image6': './assets/cart/image-zx9-speaker.jpg',
    };


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

//function to remove item from the cart
  function removeFromCart(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCart();
  }


  //function to updateTotalPrice
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

  displaySummary()
  updateCart();
  increaseCount();
  decreaseCount();
  calculateTotalQuantity();
  submitForm(event);
  


  //function to increase and decrease add to cart button wfen clicked
  function increaseCount() {
    let count = parseInt(document.getElementById('count').textContent);
    document.getElementById('count').textContent = count + 1;
  }

  function decreaseCount() {
    let count = parseInt(document.getElementById('count').textContent);
    document.getElementById('count').textContent = count - 1;
  }


 
  //function to calculate the total number of items in the cart

  function calculateTotalQuantity() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let totalQuantity = 0;

    for (const item of cartItems) {
        totalQuantity += item.quantity || 0;
    }

    document.getElementById('totalQuantity').textContent = totalQuantity;
}
// redirect to checkout page
function redirectToCheckout() {
  window.location.href = 'checkout.html';
}

/* get items from cart**/
function getCartItems() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}; 


/* add up total price, vat and shipping */
function calculateTotal() {
  const cartItems = getCartItems();

  let totalPrice = 0;
  cartItems.forEach(item => {
      totalPrice += item.price * item.quantity;
  });

  const vatRate = 0.1; // 10% VAT rate
  const vatFee = totalPrice * vatRate; // Corrected calculation for VAT
  const shippingPrice = 50; 
  const grandTotal = totalPrice + vatFee + shippingPrice;


   return {
      totalPrice: totalPrice.toFixed(2),
      vatFee: vatFee.toFixed(2),
      shippingPrice: shippingPrice.toFixed(2),
      grandTotal: grandTotal.toFixed(2)
  };
}


/** checking which checkbox is been selected*/

function handleCheckboxChange() {
  var eMoneyCheckbox = document.getElementById('eMoney');
  var cashOnDeliveryCheckbox = document.getElementById('CashOnDelivery');
  var eMoneyDetails = document.getElementById('eMoneyDetails');
  var cashOnDeliveryDetails = document.getElementById('cashOnDeliveryDetails');

  if (eMoneyCheckbox.checked) {
    eMoneyDetails.classList.remove('hidden');
    cashOnDeliveryDetails.classList.add('hidden');
  } else if (cashOnDeliveryCheckbox.checked) {
    cashOnDeliveryDetails.classList.remove('hidden');
    eMoneyDetails.classList.add('hidden');
  } else {
    eMoneyDetails.classList.add('hidden');
    cashOnDeliveryDetails.classList.add('hidden');
  }
}


//form vaildation
function submitForm(event) {
  event.preventDefault();


  const name = document.getElementById('Name').value.trim();
  const email = document.getElementById('Email').value.trim();
  const phoneNumber = document.getElementById('phonenumber').value.trim();
  const address = document.getElementById('address').value.trim();
  const zipCode = document.getElementById('ZIPcode').value.trim();
  const city = document.getElementById('City').value.trim();
  const country = document.getElementById('Country').value.trim();

  if (!name || !email || !phoneNumber || !address || !zipCode || !city || !country) {
    alert('Please fill in all required fields.');
    return;
  }


  // If all validations pass, show the thank you page
  document.getElementById('checkoutForm').style.display = 'none';
  document.getElementById('thankYouPage').style.display = 'block';
}