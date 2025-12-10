export type User = {
    id: string;
    display_name: string;
    email: string;
    password: string;
    friendly_name: string;
    usertype: string;
    description: string;
};

export interface Product {
    id: string;
    Price: string;
    Product_Name: string;
    Description: string;
    Image_URL: string;
    Category_ID: string;
    Age_Group_ID: string;
    Gender_ID: string;
    User_ID: string;
    Seller_Name: string;
};

export interface Products {
    id: number;
    price: number;
    product_name: string;
    description: string;
    category_id: number;
    age_group_id: number;
    gender_id: number;
    image_url: string;
    user_id: string;
};

export type Category = {
    id: string;
    Category_Name: string;
};

export type Gender = {
    id: string;
    Gender: string;
};

export type Age_Groups = {
    id: string;
    Age_Range: string;
}

export type Reviews = {
    id: string;
    rating: number;
    comment: string;
    product_id: string;
    user_id: string;
}

export type ReviewWithUser = Reviews & {
  Rater_Name: string; 
};
