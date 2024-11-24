function openModal(productName, price) {
    // Show modal
    document.getElementById('modal').style.display = 'block';
    document.getElementById('modal-overlay').style.display = 'block';

    // Update product name
    document.getElementById('product-name').innerText = `Product: ${productName} ($${price})`;

    // Render PayPal button
    paypal.Buttons({
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: price.toFixed(2) // Dynamic price
                    }
                }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                alert('Payment completed by ' + details.payer.name.given_name);
                closeModal(); // Close modal after successful payment
            });
        },
        onError: function (err) {
            console.error(err);
            alert('There was an error processing the payment.');
        }
    }).render('#paypal-button-container');
}

function closeModal() {
    // Hide modal
    document.getElementById('modal').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';

    // Clear PayPal button container to avoid duplicates
    document.getElementById('paypal-button-container').innerHTML = '';
}

