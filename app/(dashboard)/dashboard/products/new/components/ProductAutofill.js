import React from "react";

const AutofillButton = ({ setValue }) => {
  const handleAutofill = () => {
    // Sample product data
    const sampleProduct = {
      // Basic Product Info
      name: "iPhone 14 Pro 256GB Graphite",
      model: "iPhone 14 Pro",

      purchase_price: 999.99,
      original_price: 1299.99,
      discount_price: 1199.99,
      brand: "apple",
      storage: "256GB",
      ram: "6GB",
      colors: "Graphite, Silver, Gold, Deep Purple",
      region: "United States",

      // Used Product Details
      isUsed: "true",
      usedDuration: "6-12 Months",
      batteryHealth: "88%",
      scratches: "Minor Scratches",
      dents: "No Dents",
      accessoriesWithDevice: "Charger, Original Earphones, SIM Ejector Tool",
      box: "With Box",

      // Additional Details
      simVariant: "Dual SIM",
      warrantyStatus: "6 Months Manufacturer Warranty",
      stock: 5,

      // Descriptive Fields
      short_description:
        "Excellent condition iPhone 14 Pro with powerful A16 Bionic chip and professional camera system. Barely used and well-maintained.",
      specificationsHtml: `
<table class="data-table flex-table" style="width: 98.2633%;" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
            <td class="heading-row" style="width: 199.947%;" colspan="3">
            <h2 style='margin:10px'>Display</h2>
            </td>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td class="name" style="width: 24.659%;"><strong>Size</strong></td>
            <td class="value" style="width: 75.3946%;">6.1 inches</td>
            </tr>
            <tr>
            <td class="name" style="width: 24.659%;"><strong>Type</strong></td>
            <td class="value" style="width: 75.3946%;">Super Retina XDR display<br>All‑screen OLED display</td>
            </tr>
          </tbody>
          </table>
      `,

      // Placeholder for images (would typically be handled by ImageUpload component)
      images: [],
    };

    // Dynamically set all values
    Object.entries(sampleProduct).forEach(([key, value]) => {
      setValue(key, value);
    });
  };

  return (
    <button
      type="button"
      onClick={handleAutofill}
      className="absolute -top-20 w-36 right-0 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    >
      Autofill Product
    </button>
  );
};

export default AutofillButton;
