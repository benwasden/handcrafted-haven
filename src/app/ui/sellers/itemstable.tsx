import { getProductsBySellerId } from "@/app/lib/data";
import { Products } from "@/app/lib/definitions";

import styles from "@/app/ui/list.module.css";

import Link from "next/link";


export default async function ItemsTable({ id }: { id: number} ) {
    const items = (await getProductsBySellerId(id)) as Products[];
    return (
        <table className={styles.itemTable}>
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {items?.map((item) => (
                        <tr key={item.id}>
                            <td>{item.product_name}</td>
                            <td>${item.price}</td>
                            <td className={styles.description}>{item.description}</td>
                            <td><Link href={`/list/${item.user_id}/edit/${item.id}`}>Edit</Link></td>
                            <td><Link href={`/list/${item.user_id}/delete/${item.id}`}>Delete</Link></td>
                        </tr>
                ))}
            </tbody>
        </table>
    )
}