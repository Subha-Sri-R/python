from flask import Flask, request, jsonify

app = Flask(__name__)

# Dictionary to store barcode numbers and their corresponding balances
barcode_balances = {}
# {0:'1235',}
# {a:'apple', b:'ball', key:'12345'}
# key:'value'
common_barcode = None

@app.route('/pay', methods=['POST'])
def process_payment():
    global common_barcode
    
    if common_barcode is None:
        return jsonify({'error': 'No barcode scanned yet'}), 400

    data = request.get_json()
    amount = int(data.get('amount'))
    
    if common_barcode in barcode_balances:
        barcode_balances[common_barcode] += amount
        # return jsonify({'message': f'Payment of {amount} for {common_barcode} processed successfully'})
        return jsonify({'message': f'Payment of Rs.{amount} for {common_barcode} processed successfully'})
    else:
        return jsonify({'error': f'Invalid barcode {common_barcode}'}), 400

@app.route('/total-amount', methods=['GET'])
def total_amount():
    global barcode_balances
    total_amount = 0
    try:
        # Iterate over registered barcodes and sum their balances
        for barcode in barcode_balances:
            total_amount += barcode_balances[barcode]
        return jsonify({'totalAmount': total_amount})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/balances', methods=['GET'])
def get_balances():
    global barcode_balances
    return jsonify(barcode_balances)


@app.route('/barcode', methods=['POST'])
def handle_barcode():
    global common_barcode
    
    data = request.get_json()
    if not data or 'product' not in data:
        return jsonify({'error': 'Invalid request payload'}), 400
    
    barcode = data.get('product')
    common_barcode = barcode
    
    if barcode not in barcode_balances:
        barcode_balances[barcode] = 0
    
    return 'Barcode data received and processed successfully'

if __name__ == '__main__':
    app.run(debug=True)
