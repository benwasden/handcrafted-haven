'use server';

import { saveProduct } from "@/app/lib/actions";
import { funnel } from "@/app/ui/fonts";
import Link from "next/link";

export default async function ItemAddForm({ id }: { id: number }) {

    return (
        <>
            <Link href={`/list/${id}`} id="go_back" className={funnel.className}>Go Back</Link>
            <form action={saveProduct} className="productForm">
                <fieldset>
                    <legend className={funnel.className}>Add New Product</legend>
                    <input type="hidden" name="user_id" value={id} />

                    <label htmlFor="product_name">Product Name</label>
                    <input
                        type="text"
                        id="product_name"
                        name="productName"
                        required
                    />

                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" min="0.01" step="0.01" max="2000" required></input>

                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        required
                    />

                    <label htmlFor="category_id">Category</label>
                    <select
                        id="category_id"
                        name="category"
                        required
                    >
                        <option value="1">Belts</option>
                        <option value="2">Soaps</option>
                        <option value="3">Shoes</option>
                    </select>

                    <label htmlFor="age_group_id">Age Group</label>
                    <select
                        id="age_group_id"
                        name="age_group"
                        required
                    >
                        <option value="1">Newborn</option>
                        <option value="2">Infant</option>
                        <option value="3">Toddler</option>
                        <option value="4">Child</option>
                        <option value="5">Teen</option>
                        <option value="6">Adult</option>
                    </select>

                    <label htmlFor="gender_id">Gender</label>
                    <select
                        id="gender_id"
                        name="gender"
                        required
                    >
                        <option value="1">Female</option>
                        <option value="2">Male</option>
                        <option value="3">Unisex</option>
                    </select>

                    <label htmlFor="image">Product Image</label>
                    <input type="file" id="image" name="image" accept="image/*" />

                </fieldset>
                
                <button type="submit" className={funnel.className}>Add Item</button>
            </form>
        </>
    )
}
