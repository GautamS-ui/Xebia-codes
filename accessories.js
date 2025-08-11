let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function loadAccessories() {
    let res = await fetch("/api/products");
    let data = await res.json();

    let filter = data.filter(p => p.category === "Accessories");

    let container = document.getElementById("category-products");
    container.innerHTML = '<section><h2>Accessories</h2><div class="products"></div></section>';

    let productsDiv = container.querySelector(".products");
    filter.forEach(p => {
        let div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Add to Cart</button>
        `;
        productsDiv.appendChild(div);
    });
}

function addToCart(id, name, price) {
    cart.push({ id, name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    let cartList = document.getElementById("cart");
    cartList.innerHTML = "";
    cart.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.name} - ₹${item.price}`;
        cartList.appendChild(li);
    });
}

displayCart();
loadAccessories();
