export type User = {
    id: string;
    display_name: string;
    email: string;
    password: string;
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
    Category_ID: string;
    Age_Group_ID: string;
    Gender_ID: string;
    User_ID: string;
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