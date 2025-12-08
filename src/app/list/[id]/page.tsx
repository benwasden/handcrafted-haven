import { Suspense } from "react";
import ItemsTable from "@/app/ui/sellers/itemstable";
import { getSellerById } from "@/app/lib/data";

export default async function ListPage(props: { params: Promise<{ id: number }>}) {
    const params = await props.params;
      const id = params.id;
    
      const [sellerArray] = await Promise.all([
        getSellerById(id)
      ]);

      const seller = sellerArray[0];

    return (
        <>
            <h1>{seller.friendly_name}'s Products:</h1>
            <Suspense key={seller.friendly_name + id}>
                <ItemsTable id={id} />
            </Suspense>
        </>
    )
}