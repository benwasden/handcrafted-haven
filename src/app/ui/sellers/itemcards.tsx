import { getProductsBySellerId } from "@/app/lib/data";
import { Products } from "@/app/lib/definitions";



export default async function ItemCards({ id }: { id: number} ) {
    const items = (await getProductsBySellerId(id)) as Products[];
    const html = 
        <>
            <section className="product-grid">
            {items?.map((item) => (
                
                <div className="product-card" key={item.id}>
                    <img className="product-image" src={item.image_url} />
                    <h2 className="product-name">{item.product_name}</h2>
                    <p className="price">${item.price}</p>
                </div>
                
            ))}
                </section>
        </>;
    return html;
}