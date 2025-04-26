
/**
 * Calculates estimated delivery date based on location
 * In a real app, this would use the user's pincode and address
 * to determine shipping times from warehouses
 */
export const deliveryEstimate = (pincode?: string) => {
  // Default delivery estimate is 3-5 days
  let daysToDelivery = 4;
  
  // If we have a pincode, we can provide more accurate estimates
  // This is a simplified example - in a real app, you'd have a database of pincodes
  // and their associated delivery times
  if (pincode) {
    // Metro cities - faster delivery (2-3 days)
    if (['400001', '110001', '600001', '700001', '560001'].includes(pincode)) {
      daysToDelivery = 3;
    } 
    // Remote areas - slower delivery (5-7 days)
    else if (pincode.startsWith('8') || pincode.startsWith('9')) {
      daysToDelivery = 6;
    }
  }
  
  // Calculate the delivery date
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + daysToDelivery);
  
  // Format the date as "Day, Month Date"
  return deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });
};

/**
 * Calculate delivery time range based on location
 */
export const getDeliveryTimeRange = (pincode?: string) => {
  // Default: 3-5 days
  let minDays = 3;
  let maxDays = 5;
  
  // Adjust based on pincode
  if (pincode) {
    // Metro cities
    if (['400001', '110001', '600001', '700001', '560001'].includes(pincode)) {
      minDays = 2;
      maxDays = 3;
    } 
    // Remote areas
    else if (pincode.startsWith('8') || pincode.startsWith('9')) {
      minDays = 5;
      maxDays = 7;
    }
  }
  
  return { minDays, maxDays };
};
