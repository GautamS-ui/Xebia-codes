let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function loadProducts() {
    let res = await fetch("/api/products");
    let data = await res.json();

    let categories = {};
    data.forEach(p => {
        if (!categories[p.category]) categories[p.category] = [];
        categories[p.category].push(p);
    });

    let container = document.getElementById("categories");
    container.innerHTML = "";

    for (let category in categories) {
        let section = document.createElement("section");
        section.id = category;
        section.innerHTML = `<h2>${category}</h2>`;

        let productsDiv = document.createElement("div");
        productsDiv.className = "products";

        categories[category].forEach(p => {
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

        section.appendChild(productsDiv);
        container.appendChild(section);
    }
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
loadProducts();
