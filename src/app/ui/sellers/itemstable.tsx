import { getProductsBySellerId } from "@/app/lib/data";
import { Products } from "@/app/lib/definitions";
import { DeleteItem } from "./buttons";

import Link from "next/link";


export default async function ItemsTable({ id }: { id: number} ) {
    const items = (await getProductsBySellerId(id)) as Products[];
    return (
        <table>
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
                            <td>{item.description}</td>
                            <td><Link href={`/list/${item.user_id}/edit/${item.id}`}>Edit</Link></td>
                            <td><DeleteItem id={item.id} /></td>
                        </tr>
                ))}
            </tbody>
        </table>
    )
}