function mainMenu() {
    let total = 0;
    let cart;
    let selectedServices = [];
    do {
        cart = prompt("Select an option to continue: \n1 - Add services to cart \n2 - Checkout \n3 - Exit");
        cart = parseInt(cart);
        switch (cart) {
            case 1:
                let service = selectService();
                total = total + service.price;
                selectedServices.push(service);
                break;
            case 2:
                if (total == 0) {
                    alert("You have not selected any service yet")
                    break;
                } else {
                    alert("Your total is: $" + total + "\nPlease select next available payment options for discounts");
                    let paymentMethod = prompt("Select payment method: \n1 - BRUBANK (50% OFF) \n2 - Other methods");
                    paymentMethod = parseInt(paymentMethod);
                    if (paymentMethod === 1) {
                        total = total * 0.5;
                        alert("Your total with discount is: $" + total);
                    } else if (paymentMethod === 2) {
                        alert("Your total without discount is: $" + total);
                    } else {
                        alert("Invalid option");
                        break;
                    }
                    showReceipt(selectedServices, total);
                    selectedServices = [];
                    total = 0;
                    break;
                }
                case 3:
                    alert("Bye!");
                    break;
                default:
                    alert("Invalid option");
        }
    } while (cart !== 3);
}

function selectService() {
    let service = {};
    let serviceOption = prompt("Select the desired service: \n1 - Basic Website Design \n2 - E-commerce Website Design \n3 - Custom Website Development \n4 - Website Maintenance \n5 - Search Engine Optimization (SEO) \n6 - Exit");
    serviceOption = parseInt(serviceOption);
    switch (serviceOption) {
        case 1:
            service.name = "Basic Website Design";
            service.price = 3000;
            break;
        case 2:
            service.name = "E-commerce Website Design";
            service.price = 5800;
            break;
        case 3:
            service.name = "Custom Website Development";
            service.price = 8100;
            break;
        case 4:
            service.name = "Website Maintenance";
            service.price = 10000;
            break;
        case 5:
            service.name = "Search Engine Optimization";
            service.price = 6200;
            break;
        case 6:
            alert("Exit");
            break;
        default:
            alert("Invalid option");
            service.price = 0;
    }
    return service;
}

function showReceipt(services, total) {
    let receipt = "Receipt:\n";
    services.forEach(function (service) {
        receipt = receipt + "Service: " + service.name + " Price: $" + service.price + "\n";
    });
    receipt = receipt + "Total price with discount (if apply): $" + total;
    alert(receipt);
}

mainMenu();
