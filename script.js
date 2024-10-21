let cart = JSON.parse(localStorage.getItem('cart')) || [];


function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}


function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name);
    if (!existingProduct) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart)); 
        updateCartCount();
        updateCart(); 
    }
}


function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart)); 
    updateCart(); 
    updateCartCount(); 
}


function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');

    if (!cartItemsContainer) {
        
        return;
    }

    cartItemsContainer.innerHTML = ''; 

    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>No tienes productos en el carrito todavía.</p>';
    } else {
        cart.forEach((product, index) => {
            const productElement = document.createElement('div');
            productElement.classList.add('cart-item');
            productElement.style.border = "1px solid #ddd";
            productElement.style.padding = "16px";
            productElement.style.marginBottom = "16px";
            productElement.style.borderRadius = "8px";
            productElement.style.boxShadow = "0px 2px 5px rgba(0,0,0,0.1)";

            
            productElement.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <img src="${product.image}" alt="${product.name}" loading="lazy" style="width: 100px; height: auto; margin-right: 20px;">
                    <div>
                        <h4 style="margin: 0;">${product.name}</h4>
                        <p style="margin: 5px 0;">Precio: ${product.price}</p>
                        <button onclick="removeFromCart(${index})" style="background-color: red; color: white; border: none; padding: 10px; border-radius: 5px; cursor: pointer;">Eliminar</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(productElement);

            
            const priceNumber = parseFloat(product.price.replace(/[^0-9,.]/g, '').replace(',', '.'));
            total += priceNumber;
        });
    }

   
    document.getElementById('total-price').textContent = `Total: $${total.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`;
}


document.addEventListener('DOMContentLoaded', () => {
    updateCartCount(); 
    updateCart(); 
});


document.querySelectorAll('.product button').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.parentElement;
        const product = {
            name: productElement.querySelector('h3').textContent,
            price: productElement.querySelector('p').textContent,
            image: productElement.querySelector('img').getAttribute('src') 
        };
        addToCart(product);
    });
});
