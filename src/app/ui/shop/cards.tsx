import { fetchCatalog } from '@/app/lib/data';
import { Product } from '@/app/lib/definitions';

export default async function CardWrapper() {
    const products = (await fetchCatalog()) as Product[];

    return (
        <>
            {products.map((product) => (
                <div
                    key={product.id}
                    className="product-card"
                >
                    <img className="product-image" src={product.Image_URL} alt={product.Product_Name} />
                    <h2 className="product-name">
                        {product.Product_Name}
                    </h2>
                    <p className="product-price">
                        ${product.Price}
                    </p>
                </div>
            ))}
        </>
    );
}
