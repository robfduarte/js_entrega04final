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

const mainMenu = () => {
    let total = 0;
    let cart;
    let selectedServices = [];
    do {
        cart = prompt("Select an option to continue: \n1 - Add services to cart \n2 - Checkout \n3 - Exit");
        if (cart === "1") {
            const service = selectService();
            total += service.price;
            selectedServices.push(service);
        } else if (cart === "2") {
            if (total === 0) {
                alert("You have not selected any service yet");
            } else {
                alert(`Your total is: $${total} \nPlease select next available payment options for discounts`);
                const paymentMethod = prompt("Select payment method: \n1 - BRUBANK (50% OFF) \n2 - Other methods");
                if (paymentMethod === "1") {
                    total *= BRUBANK_DISCOUNT;
                    alert(`Your total with discount is: $${total}`);
                } else if (paymentMethod === "2") {
                    alert(`Your total without discount is: $${total}`);
                } else {
                    alert("Invalid option");
                }
                showReceipt(selectedServices, total);
                selectedServices = [];
                total = 0;
            }
        } else if (cart === "3") {
            alert("Bye!");
        } else {
            alert("Invalid option");
        }
    } while (cart !== "3");
};

const selectService = () => {
    const serviceOption = prompt(`Select the desired service: \n1 - Basic Website Design \n2 - E-commerce Website Design \n3 - Custom Website Development \n4 - Website Maintenance \n5 - Search Engine Optimization (SEO) \n6 - Exit`);
    if (SERVICE_OPTIONS[serviceOption]) {
        return SERVICE_OPTIONS[serviceOption];
    } else {
        alert("Invalid option");
        return {
            price: 0
        };
    }
};

const showReceipt = (services, total) => {
    let receipt = "Receipt:\n";
    services.forEach(service => {
        receipt += `Service: ${service.name} Price: $${service.price}\n`;
    });
    receipt += `Total price with discount (if apply): $${total}`;
    alert(receipt);
};

mainMenu();