import apiPublic from "./apiPublic";

export const getCustomerMenu = (restaurantId, tableId) => {
  return apiPublic.get(
    `/menu/customer_menu/${restaurantId}/${tableId}/`
  );
};


export const createCustomerOrder = (tableId, items) => {
  return apiPublic.post(
    `/orders/table/${tableId}/`,
    { items }
  );
};


export const getOrderStatus = (orderId) => {
  return apiPublic.get(`/orders/${orderId}/status/`);
};
