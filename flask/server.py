import requests

# Function to fetch total amount from Flask backend
def fetch_total_amount():
    try:
        response = requests.get('http://localhost:5000/total-amount')
        response.raise_for_status()  # Raise an error for bad status codes (4xx or 5xx)
        # total_amount = response.json()['total_amount']
        total_amount = response.json()['totalAmount']
        
        print(f'Total Amount: {total_amount}')
    except requests.exceptions.HTTPError as http_err:
        print(f'HTTP error occurred: {http_err}')
    except requests.exceptions.RequestException as req_err:
        print(f'Request error occurred: {req_err}')
    except ValueError as val_err:
        print(f'Error decoding JSON: {val_err}')
    except Exception as e:
        print(f'Error fetching total amount: {e}')

# Call the function to fetch and display the total amount

def fetch_balances():
    try:
        response = requests.get('http://localhost:5000/balances')
        response.raise_for_status()  # Raise an error for bad status codes (4xx or 5xx)
        barcode_balances = response.json()
        
        # Process the retrieved balances
        for barcode, balance in barcode_balances.items():
            print(f'ID No.: {barcode}, Balance: {balance}')
    except requests.exceptions.HTTPError as http_err:
        print(f'HTTP error occurred: {http_err}')
    except requests.exceptions.RequestException as req_err:
        print(f'Request error occurred: {req_err}')
    except ValueError as val_err:
        print(f'Error decoding JSON: {val_err}')
    except Exception as e:
        print(f'Error fetching balances: {e}')

# Call the function to fetch and display balances
fetch_balances()
fetch_total_amount()