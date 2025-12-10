'use server';

import { getProductForEditById } from "@/app/lib/data";
import { saveProductUpdate } from "@/app/lib/actions";
import { funnel } from "@/app/ui/fonts";
import Link from "next/link";
import styles from "@/app/ui/list.module.css";

export default async function ItemEditForm({ id }: { id: number }) {

    const [itemArray] = await Promise.all([
        getProductForEditById(id)
    ]);

    const itemToEdit = itemArray[0];

    return (
        <>
            <div className={styles.goBackWrapper}><Link href={`/list/${itemToEdit.user_id}`} id={styles.goBack} className={funnel.className}>Go Back</Link></div>
            <form action={saveProductUpdate} className={styles.productForm}>
                <fieldset>
                    <legend className={funnel.className}>Edit {itemToEdit.product_name}</legend>
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

                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" min="0.01" step="0.01" max="2000" defaultValue={itemToEdit.price} required></input>

                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        defaultValue={itemToEdit.description}
                        maxLength={500}
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

                    <label htmlFor="image">Product Image</label>
                    <input type="file" id="image" name="image" accept="image/*" />

                </fieldset>
                
                <button type="submit" className={funnel.className} id={styles.submitButton}>Edit Item</button>
            </form>
        </>
    )
}
