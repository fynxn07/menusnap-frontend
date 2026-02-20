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
