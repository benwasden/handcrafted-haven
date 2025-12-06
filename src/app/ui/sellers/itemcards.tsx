import { getProductsBySellerId } from "@/app/lib/data";
import { Products } from "@/app/lib/definitions";


export default async function ItemCards({ id }: { id: number} ) {
    const items = (await getProductsBySellerId(id)) as Products[];
    const html = 
        <>
            {items?.map((item) => (
                    <figure>
                        <img src={item.image_url} />
                        <figcaption>{item.product_name}</figcaption>
                        <p className="price">${item.price}</p>
                    </figure>
            ))}
        </>;
    return html;
}