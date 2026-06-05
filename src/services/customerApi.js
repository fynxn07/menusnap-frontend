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


export const joinTable = (manualCode) => {
  return apiPublic.post(
    "/restaurants/join-table/",
    {
      manual_code: manualCode,
    }
  );
};

export const getRestaurantTables = () => {
    return apiPublic.get("/restaurants/tables/", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
    });
};