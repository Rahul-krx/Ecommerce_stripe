// Products Array
// header scroll...
//  'npm start' to start
let header = document.querySelector('header');
window.addEventListener('scroll',()=>{
    header.classList.toggle('.shadow', window.scrollY > 0)
})
const products = [
    {
        id: 1,
        title: "Autumn Hoodie",
        price: 264.9,
        image:
            "https://pangaia.com/cdn/shop/products/Recycled-Nylon-NW-Flwrdwn-Quilted-Collarless-Jacket-Cerulean-Blue-Female-1_bf4b2a54-8a7f-4174-bc49-8ef22b24bfdd.jpg?v=1666708230&width=1426",
    },
    {
        id: 2,
        title: "FUSION HOODIE",
        price: 295,
        image:
            "https://images.undiz.com/on/demandware.static/-/Sites-ZLIN-master/default/dw2264d914/merch/BTS/654206666_x.jpg?sw=1250",
    },
    {
        id: 3,
        title: "Chestnut Brown",
        price: 74.9,
        image:
            "https://www.snitch.co.in/cdn/shop/files/NOTAG-HOODIES-M34.jpg?v=1700039374&width=1080",
    },
    {
        id: 4,
        title: "Nike Sportswear",
        price: 80,
        image:
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/61734ec7-dad8-40f3-9b95-c7500939150a/sportswear-club-mens-french-terry-crew-neck-sweatshirt-tdFDRc.png",
    },
    {
        id: 5,
        title: "Champion BASIC",
        price: 48.99,
        image:
            "https://img01.ztat.net/article/spp-media-p1/7067458719b744fe81ffee62d3d0b912/abad421e7d8e47f08a2abc1c6ffe07dc.jpg?imwidth=1800",
    },
    {
        id: 6,
        title: "Cotton Hoodie",
        price: 395,
        image:
            "https://pangaia.com/cdn/shop/files/Reclaim-3.0-Hoodie-Reclaim-Jade-Womens-3.jpg?v=1693398673&width=1426",
    },
    {
        id: 7,
        title: "CLASSIC CREWN",
        price: 48.99,
        image:
            "https://img01.ztat.net/article/spp-media-p1/10cea44041564f81ac585fc6c8978907/c4c32dbc45dd4dbc9d15087c846538f2.jpg?imwidth=1800",
    },
    {
        id: 8,
        title: "TAPE HOODED",
        price: 79.99,
        image:
            "https://img01.ztat.net/article/spp-media-p1/d391f90be278469ebfdff731800cfccc/6d2101bd672f4e059501f01fe726f315.jpg?imwidth=1800",
    },
    {
        id: 9,
        title: "College Bag",
        price: 34.34 ,
        image: "https://file.aiquickdraw.com/m/1738585120_77522eabeee445b99cea97fa5267a3fc.png"
    },
    {
        id: 10,
        title: "Smartwatch",
        price: 78.54 ,
        image: "https://file.aiquickdraw.com/m/1738585349_eb9a4fe731ff429784124dc13ddb0ba6.png"
    },
    {
        id: 11,
        title: "Smart Ring",
        price: 92.88 ,
        image: "https://file.aiquickdraw.com/m/1738585434_df639f26eec24409b27aafbf3c85f090.png"
    },
    {
        id: 12,
        title: "silver-plated locket",
        price: 92.88 ,
        image: "https://file.aiquickdraw.com/m/1738585735_55b23c395ee944dc989ae0d9b313a598.png"
    },
    
];

// get the product list and elements.
const productList = document.getElementById("productList")

const cartItemsElement = document.getElementById("cartItems")

const cartTotalElement = document.getElementById("cartTotal");

// store cart items in local storage......

let cart = JSON.parse(localStorage.getItem('cart')) || [];
// console.log(cart)
// render products on page load....
function renderProducts() {
    productList.innerHTML = products
        .map(
            (product) => `<div class="product">
                <img src="${product.image}" alt="${product.title}" class="product-img">
                <div class="product-info">
                    <h2 class="product-title">${product.title}</h2>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <a class="add-to-cart" data-id="${product.id}">
                        Add to cart
                    </a>
                </div>
            </div>`

        )
        .join("");

    // Add to cart......

    const addTocartButton = document.getElementsByClassName('add-to-cart');
    for (let i = 0; i < addTocartButton.length; i++) {
        const addTocartbutton = addTocartButton[i];
        addTocartbutton.addEventListener('click', addToCart);
    }

};

//Add to cart....

function addToCart(event) {
    const productID = parseInt(event.target.dataset.id);
    const product = products.find((product) => product.id === productID);

    if (product) {
        const existingItem = cart.find((item) => item.id === productID);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            const cartItem = {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1,
            }
            cart.push(cartItem);
        }

        // change add to cart text to added...
        event.target.textContent = "Added";
        updateCartIcon();

        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
        // saveToLocalStorage();
        calculateCartTotal();
    }

}
// Remove from cart.... 
function removeFromCart(event) {
    const productID = parseInt(event.target.dataset.id);
    cart = cart.filter((item) => item.id !== productID);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
    // saveToLocalStorage();
    calculateCartTotal();
    updateCartIcon();
}
// Quantity change...
function changeQuantity(event) {
    const productID = parseInt(event.target.dataset.id);
    const quantity = parseInt(event.target.value);

    if (quantity > 0) {
        const cartItem = cart.find((item) => item.id === productID);
        if (cartItem) {
            cartItem.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            // renderCartItems();
            calculateCartTotal();
            updateCartIcon();
        }
    }
}

// Save to local storage.....

// function saveToLocalStorage() {
//     localStorage.setItem('cart', JSON.stringify(cart));
// }



//Render products on cart page..
function renderCartItems() {
    cartItemsElement.innerHTML = cart
        .map(
            (item) => `
        <div class="cart-item">
                <img src="${item.image}" alt="${item.title
                }">
                <div class="cart-item-info">
                    <h2 class="cart-item-title">${item.title}</h2>
                    <input class="cart-item-quantity" type="number" name="" min="1" value="${item.quantity}" data-id="${item.id}">
                </div>
                <h2 class="cart-item-price">$${item.price}</h2>
                <button class="remove-from-cart" data-id="${item.id}">Remove</button>
              </div> `

        )
        .join("");

    //Remove from cart.......
    const removeFromCartButtons = document.getElementsByClassName('remove-from-cart');
    for (let i = 0; i < removeFromCartButtons.length; i++) {
        const removeCartButton = removeFromCartButtons[i];
        removeCartButton.addEventListener('click', removeFromCart);
    }

    // Quantity change....
    const quantityInputs = document.querySelectorAll('.cart-item-quantity')
    quantityInputs.forEach((input) => {
        input.addEventListener('change', changeQuantity)
    })
}

// calculate Total.....

function calculateCartTotal() {
    const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartTotalElement.textContent = ` Total: $${total.toFixed(2)}`;

}

// check if on cart page 
if (window.location.pathname.includes("cart.html")) {
    renderCartItems();
    calculateCartTotal();

} else if(window.location.pathname.includes("success.html")){
    clearCart();
}
else {
    // if not on cart page, render products.
    renderProducts();
}
// Empty cart on successfull payment....

function clearCart(){
    cart = [];
    localStorage.removeItem('cart');
    updateCartIcon();
   
}

// Cart icon quantity.....

const cartIcon = document.getElementById('cart-icon');
function updateCartIcon() {
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0)
    cartIcon.setAttribute('data-quantity', totalQuantity)
}
updateCartIcon();

function updateCartIconOnCartChange() {
    updateCartIcon();

}
window.addEventListener('storage', updateCartIconOnCartChange);

function updateCartIcon() {
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0)
    const cartIcon = document.getElementById('cart-icon');
    cartIcon.setAttribute('data-quantity', totalQuantity)

}

renderProducts();
renderCartItems();
calculateCartTotal();

