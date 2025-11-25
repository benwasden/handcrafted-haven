export type User = {
    id: string;
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