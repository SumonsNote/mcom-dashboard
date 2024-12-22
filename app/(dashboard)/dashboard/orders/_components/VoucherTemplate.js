import { convertToWords } from "@/utils/converNumber";

export const VoucherTemplate = (orderData) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sales Receipt - Kabbo Mobile Shop</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      font-size: 12px;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      border: 1px solid #ddd;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
      border-bottom: 2px solid #333;
      padding-bottom: 10px;
    }
    .header h1 {
      margin: 0;
      color: #2c3e50;
      font-size: 24px;
    }
    .header h2 {
      margin: 10px 0;
      color: #34495e;
      font-size: 18px;
    }
    .divider {
      border-top: 1px dashed #bbb;
      margin: 15px 0;
    }
    .customer-info, .payment-info {
      margin: 15px 0;
    }
    .customer-info p, .payment-info p {
      margin: 5px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
    }
    th, td {
      padding: 10px;
      border-bottom: 1px solid #ddd;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
      font-weight: bold;
    }
    .totals {
      margin-top: 20px;
      text-align: right;
    }
    .totals div {
      margin: 5px 0;
    }
    .totals strong {
      font-size: 14px;
    }
    .signature-section {
      display: flex;
      justify-content: space-between;
      margin-top: 50px;
    }
    .signature-line {
      width: 200px;
      text-align: center;
    }
    .signature-line p {
      margin-top: 5px;
      border-top: 1px solid #333;
      padding-top: 5px;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      font-style: italic;
      color: #7f8c8d;
    }
    .logo{
    width: 150px;  
    }
        .watermark{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('https://res.cloudinary.com/djrwougmx/image/upload/v1733326502/kabbo_shop_logo_1_kjycg8.png');
      background-size: 40%;
      background-repeat: no-repeat;
      background-position: center;
      opacity: 0.1;
      z-index: -1;
    }
    @media print {
      body {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  <div class="container">
  <div class="watermark"></div>
    <div class="header">
      <img class='logo' src="https://res.cloudinary.com/djrwougmx/image/upload/v1733326502/kabbo_shop_logo_1_kjycg8.png" alt="Logo" width="100" />
      <h2>SALES RECEIPT</h2>
      <p>Order #: ${orderData.order_number}</p>
      <p>Date: ${new Date().toLocaleString()}</p>
    </div>
    
    <div class="customer-info">

      <p><strong>Customer:</strong> ${orderData.customer.customer_name}</p>
      <p><strong>Mobile:</strong> ${
        orderData.customer.phone_number || "N/A"
      }</p>
      <p><strong>Email:</strong> ${orderData.customer.email || "N/A"}</p>
      <p><strong>Address:</strong> ${orderData.customer.address || "N/A"}</p>
    </div>
    
    <div class="divider"></div>
    
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${orderData.items
          .map(
            (item) => `
              <tr>
                <td>
                  ${item.model} ${item.color} ${item.variant} (${item.version})
                  <br>
                  <small>IMEI: ${item.imei || "N/A"}</small>
                  <br>
                  <small>Warranty: ${
                    item.warranty ? item.warranty + " months" : "N/A"
                  }</small>
                </td>
                <td>${item.quantity}</td>
                <td>৳${Number(item.price).toFixed(2)}</td>
                <td>৳${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
    
    <div class="divider"></div>
    
    <div class="payment-info">
      <p><strong>Payment Method:</strong> ${orderData.payment_info.method}</p>
    </div>
    
    <div class="totals">
      <div><strong>Total Amount:</strong> ৳${orderData.total_amount?.toFixed(
        2
      )}</div>
      <div><strong>Paid Amount:</strong> ৳${Number(
        orderData.payment_info.amount
      )?.toFixed(2)}</div>
      <div><strong>Change:</strong> ৳${orderData.payment_info.change_amount?.toFixed(
        2
      )}</div>
    </div>
    
    <div class="divider"></div>
    
    <h3 style="text-transform: uppercase; text-align: center;">
      In Words: ${convertToWords(orderData.payment_info.amount)}
    </h3>
    
    <div class="signature-section">
      <div class="signature-line">
        <p>Customer Signature</p>
      </div>
      <div class="signature-line">
        <p>Seller Signature</p>
      </div>
    </div>
    
    <div class="footer">
      <p>Thank you for shopping with us!</p>
      <p>Please visit again <a target="_blank" href='https://www.kabbomobileshop.com/'>www.kabbomobileshop.com/</a></p>
    </div>
  </div>
</body>
</html>
`;
export const VoucherTemplateOrder = (orderData) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sales Receipt - Kabbo Mobile Shop</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      font-size: 12px;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      border: 1px solid #ddd;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      position: relative;
    }
    .watermark{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('https://res.cloudinary.com/djrwougmx/image/upload/v1733326502/kabbo_shop_logo_1_kjycg8.png');
      background-size: 40%;
      background-repeat: no-repeat;
      background-position: center;
      opacity: 0.1;
      z-index: -1;
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
      border-bottom: 2px solid #333;
      padding-bottom: 10px;
    }
    .header h1 {
      margin: 0;
      color: #2c3e50;
      font-size: 24px;
    }
    .header h2 {
      margin: 10px 0;
      color: #34495e;
      font-size: 18px;
    }
    .divider {
      border-top: 1px dashed #bbb;
      margin: 15px 0;
    }
    .customer-info, .payment-info {
      margin: 15px 0;
    }
    .customer-info p, .payment-info p {
      margin: 5px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
    }
    th, td {
      padding: 10px;
      border-bottom: 1px solid #ddd;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
      font-weight: bold;
    }
    .totals {
      margin-top: 20px;
      text-align: right;
    }
    .totals div {
      margin: 5px 0;
    }
    .totals strong {
      font-size: 14px;
    }
    .signature-section {
      display: flex;
      justify-content: space-between;
      margin-top: 50px;
    }
    .signature-line {
      width: 200px;
      text-align: center;
    }
    .signature-line p {
      margin-top: 5px;
      border-top: 1px solid #333;
      padding-top: 5px;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      font-style: italic;
      color: #7f8c8d;
    }
    .logo {
      width: 150px;
      height: auto;
    }
    @media print {
      body {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  <div class="container">
  <div class="watermark"></div>

    <div class="header">
    <img class="logo" src="https://res.cloudinary.com/djrwougmx/image/upload/v1733326502/kabbo_shop_logo_1_kjycg8.png">
      <h2>SALES RECEIPT</h2>
      <p>Order #: ${orderData.order_number}</p>
      <p>Date: ${new Date(orderData.createdAt).toLocaleString()}</p>
    </div>
    
    <div class="customer-info">

      <p><strong>Customer:</strong> ${orderData.customer.customer_name}</p>
      <p><strong>Mobile:</strong> ${
        orderData.customer.phone_number || "N/A"
      }</p>
      <p><strong>Email:</strong> ${orderData.customer.email || "N/A"}</p>
      <p><strong>Address:</strong> ${orderData.customer.address || "N/A"}</p>
    </div>
    
    <div class="divider"></div>
    
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${orderData.items
          .map(
            (item) => `
              <tr>
                <td>
                  ${item.model} ${item.color} ${item.variant} (${item.version})
                  <br>
                  <small>IMEI: ${item.imei || "N/A"}</small>
                  <br>
                  <small>Warranty: ${
                    item.warranty ? item.warranty + " months" : "N/A"
                  }</small>
                </td>
                <td>${item.quantity}</td>
                <td>৳${Number(item.price).toFixed(2)}</td>
                <td>৳${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
    
    <div class="divider"></div>
    
    <div class="payment-info">
      <p><strong>Payment Method:</strong> ${orderData.payment_info.method}/ ${
  orderData.payment_info.provider
} / ${orderData.payment_info.transaction_id}</p>
      <p><strong>Payment Status:</strong> ${orderData.payment_info.status}</p>
      <p><strong>Delivery Status:</strong> ${orderData.status}</p>
    </div>
    
    <div class="totals">
        <div class="payment-info">
      <p><strong>Shipping Charge:</strong> ৳${Number(
        orderData.shipping_details.shipping_charge
      ).toFixed(2)}</p>
    </div>
      <div><strong>Total Amount:</strong> ৳${Number(
        orderData.total_amount
      ).toFixed(2)}</div>
      <div><strong>Paid Amount:</strong> ৳${Number(
        orderData.payment_info.transaction_amount
      ).toFixed(2)}</div>
      <div><strong>Due Amount:</strong> ৳${Number(
        orderData.total_amount - orderData.payment_info.transaction_amount
      ).toFixed(2)}</div>

    </div>
    
    <div class="divider"></div>
    
    <h3 style="text-transform: uppercase; text-align: center;">
      In Words: ${convertToWords(orderData.payment_info.transaction_amount)}
    </h3>
    
    <div class="signature-section">
      <div class="signature-line">
        <p>Customer Signature</p>
      </div>
      <div class="signature-line">
        <p>Seller Signature</p>
      </div>
    </div>
    
    <div class="footer">
      <p>Thank you for shopping with us!</p>
      <p>Please visit again <a target="_blank" href='https://www.kabbomobileshop.com/'>www.kabbomobileshop.com/</a></p>
    </div>
  </div>
</body>
</html>
`;
