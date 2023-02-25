const SERVICE_OPTIONS = {
    1: {
        name: "Basic Website Design",
        price: 3000
    },
    2: {
        name: "E-commerce Website Design",
        price: 5800
    },
    3: {
        name: "Custom Website Development",
        price: 8100
    },
    4: {
        name: "Website Maintenance",
        price: 10000
    },
    5: {
        name: "Search Engine Optimization",
        price: 6200
    }
};

const BRUBANK_DISCOUNT = 0.5;

const servicesDropdown = document.getElementById("services-dropdown");
const addToCartBtn = document.getElementById("add-to-cart-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");
const cartTable = document.getElementById("cart-table");
const cartBody = document.getElementById("cart-body");
const totalPrice = document.getElementById("total-price");
const paymentMethodDropdown = document.getElementById("payment-method-dropdown");
const checkoutBtn = document.getElementById("checkout-btn");

let total = 0;
let selectedServices = [];

const addToCart = () => {
    const selectedOption = servicesDropdown.value;
    if (!selectedOption) {
        Swal.fire({
            title: "Error",
            html: `Please select a service`,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: "OK",
        });

        return;
    }

    const selectedService = SERVICE_OPTIONS[selectedOption];

    // Check if the service is already in the cart
    let found = false;
    for (const [index, service] of selectedServices.entries()) {
        if (service.name === selectedService.name) {
            selectedServices[index].quantity++; // If found, increment the quantity
            found = true;
            break;
        }
    }
    // If not found, add the service to the cart
    if (!found) {
        selectedServices.push({...selectedService,quantity: 1});
    }

    total += selectedService.price;
    localStorage.setItem("selectedServices", JSON.stringify(selectedServices));
    localStorage.setItem("total", total);
    renderCart();
};

// Render the cart table
const renderCart = () => {
    let html = "";
    for (const [index, service] of selectedServices.entries()) {
        html += `
        <tr>
          <td>${service.name}</td>
          <td>${service.price}</td>
          <td>${service.quantity}</td>
          <td>${service.price * service.quantity}</td>
          <td><button class="boton2" onclick="removeFromCart(${index})">Remove</button></td>
        </tr>
      `;
    }
    cartBody.innerHTML = html; // Insert the generated HTML into the cart body
};

// Remove ittem from cart
const removeFromCart = (index) => {
    const service = selectedServices[index];
    total -= service.price * service.quantity;
    selectedServices.splice(index, 1);
    localStorage.setItem("selectedServices", JSON.stringify(selectedServices));
    localStorage.setItem("total", total);
    renderCart();
    totalPrice.textContent = total;
};

// Clear the cart
const clearCart = () => {
    selectedServices = [];
    total = 0;
    localStorage.clear();
    renderCart();
    totalPrice.innerHTML = "0";
};

const calculateDiscount = () => {
    let discountedPrice = total;
    if (paymentMethodDropdown.value === "Brubank") {
        discountedPrice *= BRUBANK_DISCOUNT;
    }
    totalPrice.textContent = discountedPrice;
    localStorage.setItem("discountedPrice", discountedPrice);
};

const loadServices = () => {
    const storedServices = localStorage.getItem("selectedServices");
    if (storedServices) {
        selectedServices = JSON.parse(storedServices);
    }
};

const loadTotal = () => {
    const storedTotal = localStorage.getItem("total");
    if (storedTotal) {
        total = parseInt(storedTotal);
    }
};

const loadDiscountedPrice = () => {
    const storedDiscountedPrice = localStorage.getItem("discountedPrice");
    if (storedDiscountedPrice) {
        totalPrice.textContent = storedDiscountedPrice;
    }
};

loadServices();
loadTotal();
renderCart();
loadDiscountedPrice();

addToCartBtn.addEventListener("click", addToCart);
clearCartBtn.addEventListener("click", clearCart);
checkoutBtn.addEventListener("click", calculateDiscount);

