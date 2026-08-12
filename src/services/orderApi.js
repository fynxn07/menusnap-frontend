import api from "./api";


export const getAdminOrders = (status) => {
  if (status && status !== "ALL") {
    return api.get(`/orders/admin_order/?status=${status}`);
  }
  return api.get("/orders/admin_order/");
};


export const getAdminOrderDetail = (id) => { 
  return api.get(`/orders/admin_order/${id}/`);
};

export const updateOrderStatus = (id, status) => {
  return api.patch(`/orders/kitchen/${id}/update_status/`, { status });
};