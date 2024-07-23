

async function updateTotalAmount() {
  try {
    const response = await fetch("http://localhost:5000/total-amount");

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    // Check if totalAmount element exists before modifying it
    const totalAmountElement = document.getElementById('totalAmount');
    if (totalAmountElement) {
      totalAmountElement.innerText = `Total Amount: ${data.totalAmount}`;
    } else {
      console.error("Total amount element not found");
    }
  } catch (error) {
    console.error(error);
    // Check if totalAmount element exists before modifying it
    const totalAmountElement = document.getElementById('totalAmount');
    if (totalAmountElement) {
      totalAmountElement.innerText = 'Error occurred while fetching total amount';
    } else {
      console.error("Total amount element not found");
    }
  }
}

async function registerBarcode() {
  try {
    const barcode = document.getElementById('registerInput').value;
    
    const response = await fetch("http://localhost:5000/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ barcode })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const registerResultElement = document.getElementById('registerResult');
    if (registerResultElement) {
      registerResultElement.innerText = 'Barcode registered successfully';
    } else {
      console.error("Register result element not found");
    }

    updateTotalAmount();
  } catch (error) {
    console.error(error);
    const registerResultElement = document.getElementById('registerResult');
    if (registerResultElement) {
      registerResultElement.innerText = 'Error occurred during registration';
    } else {
      console.error("Register result element not found");
    }
  }
}

async function processPayment() {
  try {
    // const barcode = document.getElementById('scanInput').value;
    const amount = document.getElementById('amountInput').value;

    const paymentResponse = await fetch("http://localhost:5000/pay", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount })
    });

    if (!paymentResponse.ok) {
      throw new Error('Network response was not ok');
    }

    const paymentData = await paymentResponse.json();

    // Check if result element exists before modifying it
    const resultElement = document.getElementById('result');
    if (resultElement) {
      resultElement.innerText = ` ${JSON.stringify(paymentData)}`;
    } else {
      console.error("Result element not found");
    }

    updateTotalAmount();
  } catch (error) {
    console.error(error);
    // Check if result element exists before modifying it
    const resultElement = document.getElementById('result');
    if (resultElement) {
      resultElement.innerText = 'Error occurred during payment';
    } else {
      console.error("Result element not found");
    }
  }
}


// document.getElementById('registerButton').addEventListener('click', registerBarcode);
document.getElementById('payButton').addEventListener('click', processPayment);

updateTotalAmount();

// });
