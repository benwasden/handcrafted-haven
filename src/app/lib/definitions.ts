export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    friendly_name: string;
    usertype_id: number;
};

export type UserType = {
    id: number;
    type: 'seller' | 'buyer';
    display_name: string;
    email: string;
    password: string;
    usertype_id: string;
};

export type Product = {
    id: string;
    Price: string;
    Product_Name: string;
    Description: string;
    Image_URL: string;
    User_ID: string;
};