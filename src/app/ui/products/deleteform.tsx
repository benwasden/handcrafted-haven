'use server';

import { getProductForEditById } from "@/app/lib/data";
import { deleteItem } from "@/app/lib/actions";
import { funnel } from "@/app/ui/fonts";
import Link from "next/link";
import styles from "@/app/ui/list.module.css";

export default async function ItemDeleteForm({ id }: { id: number }) {

    const [itemArray] = await Promise.all([
        getProductForEditById(id)
    ]);

    const itemToEdit = itemArray[0];

    return (
        <>
            <div className={styles.goBackWrapper}><Link href={`/list/${itemToEdit.user_id}`} id={styles.goBack} className={funnel.className}>Go Back</Link></div>
            <form action={deleteItem} className={styles.productForm}>
                <fieldset>
                    <legend className={funnel.className}>Are you sure you want to delete {itemToEdit.product_name}?</legend>
                    <input type="hidden" name="id" value={itemToEdit.id} />
                    <input type="hidden" name="user_id" value={itemToEdit.user_id} />

                    <label htmlFor="product_name">Product Name</label>
                    <input
                        type="text"
                        id="product_name"
                        name="productName"
                        defaultValue={itemToEdit.product_name}
                        required
                        disabled
                    />

                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" min="0.01" step="0.01" max="2000" defaultValue={itemToEdit.price} required disabled></input>

                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        defaultValue={itemToEdit.description}
                        maxLength={500}
                        required
                        disabled
                    />

                </fieldset>
                
                <button type="submit" className={funnel.className} id={styles.submitButton}>Delete Item</button>
            </form>
        </>
    )
}
