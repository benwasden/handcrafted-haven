import { fetchCatalog } from '@/app/lib/data';
import { Product } from '@/app/lib/definitions';

export default async function CardWrapper() {
    const products = (await fetchCatalog()) as Product[];

    return (
        <>
            {products.map((product) => (
                <div
                    key={product.id}
                    className="rounded-xl border bg-white p-4 shadow-sm flex flex-col gap-2"
                >
                    <img className="h-48 w-full object-cover rounded-md" src={product.Image_URL} alt={product.Product_Name} />
                    <h2 className="text-lg font-semibold">
                        {product.Product_Name}
                    </h2>
                    <p className="mt-2 text-base font-bold">
                        ${product.Price}
                    </p>
                </div>
            ))}
        </>
    );
}
