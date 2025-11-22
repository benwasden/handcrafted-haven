export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type Product = {
    id: number;
    price: number;
    product_name: string;
    description: string;
    user_id: number;
};

export type UserType = {
    id: number;
    type: 'seller' | 'buyer';
};