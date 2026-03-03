import apiPublic from "./apiPublic";




export const analyticsService = {

  getRevenue: (restaurantId) =>
    apiPublic.get(`/analytics/restaurants/${restaurantId}/revenue/`),

 
  getPeakHours: (restaurantId) =>
    apiPublic.get(`/analytics/restaurants/${restaurantId}/peak-hours/`),


  getOrderTrends: (restaurantId) =>
    apiPublic.get(`/analytics/restaurants/${restaurantId}/order-trends/`),


  getPopularDishes: (restaurantId) =>
    apiPublic.get(`/analytics/restaurants/${restaurantId}/popular-dishes/`),


  getTableUtilization: (restaurantId) =>
    apiPublic.get(`/analytics/restaurants/${restaurantId}/table-utilization/`),


  getEvents: (restaurantId) =>
    apiPublic.get(`/analytics/restaurants/${restaurantId}/events/`),
};