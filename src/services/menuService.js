import api from "./api";


export const getCategories = () => {
    return api.get("/menu/categories/");
};

export const createCategory = (data) => {
    return api.post("/menu/categories/", data);
};

export const getCategory = (id) => {
    return api.get(`/menu/categories/${id}/`);
};

export const updateCategory = (id, data) => {
    return api.patch(`/menu/categories/${id}/`, data);
};

export const deleteCategory = (id) => {
    return api.delete(`/menu/categories/${id}/`);
};




export const getItems = (categoryId = null) => {
    return api.get("/menu/items/", {
        params: categoryId ? { category: categoryId } : {},
    });
};

export const createItem = (data) => {
  return api.post("/menu/items/", data);
};

export const updateItem = (id, data) => {
  return api.patch(`/menu/items/${id}/`, data);
};


export const getItem = (id) => {
    return api.get(`/menu/items/${id}/`);
};



export const deleteItem = (id) => {
    return api.delete(`/menu/items/${id}/`);
};




export const getMenuStats = () => {
    return api.get("/menu/stats/");
};
