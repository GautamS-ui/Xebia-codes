let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCheckout() {
    let checkoutCartList = document.getElementById("checkoutCart");
    checkoutCartList.innerHTML = "";
    let subtotal = 0;

    cart.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.name} - ₹${item.price}`;
        checkoutCartList.appendChild(li);
        subtotal += item.price;
    });

    let gstAmount = subtotal * 0.12;
    let totalAmount = subtotal + gstAmount;

    document.getElementById("subtotal").textContent = `Subtotal: ₹${subtotal.toFixed(2)}`;
    document.getElementById("gst").textContent = `GST (12%): ₹${gstAmount.toFixed(2)}`;
    document.getElementById("total").textContent = `Total: ₹${totalAmount.toFixed(2)}`;
}

document.getElementById("placeOrderBtn").addEventListener("click", async () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart })
    });
    let result = await res.json();
    alert(result.message);

    localStorage.removeItem("cart");
    window.location.href = "index.html";
});

renderCheckout();
