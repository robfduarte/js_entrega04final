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
let timer;

const showInactiveAlert = () => {
    Swal.fire({
      title: 'Are you there?',
      html: `You have been inactive for more than 10 seconds. Do you want to continue adding services to the cart?`,
      showCancelButton: true,
      focusCancel: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, clear cart',
    }).then((result) => {
      if (result.isConfirmed) {
        clearTimeout(timer);
      } else {
        clearCart();
      }
    });
  };
  
const addToCart = () => {
    const selectedOption = servicesDropdown.value;
    if (!selectedOption) {
      Swal.fire({
        title: 'Error',
        html: `Please select a service`,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: 'OK',
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
      selectedServices.push({ ...selectedService, quantity: 1 });
    }
    total += selectedService.price;
    localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
    localStorage.setItem('total', total);
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

const SERVICE_OPTIONS = {};

const loadServices = async () => {
  try {
    const response = await fetch('services.json');
    const services = await response.json();
    const storedServices = localStorage.getItem('selectedServices');
    if (storedServices) {
      selectedServices = JSON.parse(storedServices);
    }
    for (const [id, service] of Object.entries(services)) {
      SERVICE_OPTIONS[id] = service;
      console.log('Servicios cargados');
    }
  } catch (error) {
    console.error('Error loading services', error);
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
document.addEventListener('mousemove', () => {
    clearTimeout(timer);
    timer = setTimeout(showInactiveAlert, 10000); // set the timer to 10 seconds
  });
