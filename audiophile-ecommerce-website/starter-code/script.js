
const cartContainer = document.querySelector('.cart-container');



function eventlisterners() {

    document.getElementById('cart-btn').addEventListener('click', () => {
        cartContainer.classList.toggle('show-cart-container');
    });

}

eventlisterners();


function addToCart(productName, productPrice) {
    /* check if the product exit */
    const existingCartItem = document.querySelector(`#cart-item li[data-name="${productName}"]`);

    /* iF product exit increase  quantity */
    if(existingCartItem){
        const quantityElement = existingCartItem.querySelector('#quantity');

        const currentQuantity = parseInt(quantityElement.textContent);
        quantityElement.textContent = currentQuantity + 1;
   
    }else {
        const listItem = document.createElement('li');
        listItem.setAttribute('data-name', productName);
        listItem.setAttribute('data-price', productPrice)
        listItem.innerHTML = `
        
        <img src= "./assets/cart/image-xx99-mark-two-headphones.jpg" alt="${productName}" class="product-image"/>
        <span>${productName} - ${productPrice} </span>
         
        <button id="quantity" onclick="decreaseQuantity(this)" type="button">-</button>

        <span id="quantity">1</span>
        <button id="quantity" onclick="increaseQuantity(this)" type="button">+</button>


        `;

        document.getElementById('cart-item').appendChild(listItem);
    }
    updateTotalPrice();
    console.log(productPrice + 1);
}



/* function to increase Quantity */

function increaseQuantity(button) {
    const quantityElement = button.parentElement.querySelector('#quantity');
    const currentQuantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = currentQuantity + 1;

    // Update total price
    updateTotalPrice();
    console.log();
  }

  /* function to decrease Quantity */

  function decreaseQuantity(button) {
    const quantityElement = button.parentElement.querySelector('#quantity');
    const currentQuantity = parseInt(quantityElement.textContent);

    if (currentQuantity > 1) {
      quantityElement.textContent = currentQuantity - 1;

    updateTotalPrice();
    }

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