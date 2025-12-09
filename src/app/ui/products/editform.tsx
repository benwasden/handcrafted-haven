'use server';

import { getProductForEditById } from "@/app/lib/data";
import { saveProductUpdate } from "@/app/lib/actions";

export default async function ItemEditForm({ id }: { id: number }) {

    const [itemArray] = await Promise.all([
        getProductForEditById(id)
    ]);

    const itemToEdit = itemArray[0];

    return (
        <>
            <h1>Edit {itemToEdit.product_name}</h1>

            <form action={saveProductUpdate}>
                <input type="hidden" name="id" value={itemToEdit.id} />
                <input type="hidden" name="user_id" value={itemToEdit.user_id} />

                <label htmlFor="product_name">Product Name</label>
                <input
                    type="text"
                    id="product_name"
                    name="productName"
                    defaultValue={itemToEdit.product_name}
                    required
                />

                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    defaultValue={itemToEdit.description}
                    required
                />

                <label htmlFor="category_id">Category</label>
                <select
                    id="category_id"
                    name="category"
                    defaultValue={itemToEdit.category_id}
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
                    defaultValue={itemToEdit.age_group_id}
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
                    defaultValue={itemToEdit.gender_id}
                    required
                >
                    <option value="1">Female</option>
                    <option value="2">Male</option>
                    <option value="3">Unisex</option>
                </select>
                
                <button type="submit">Edit Item</button>
            </form>
        </>
    )
}
