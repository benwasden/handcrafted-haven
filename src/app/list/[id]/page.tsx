import { Suspense } from "react";
import ItemsTable from "@/app/ui/sellers/itemstable";
import { getSellerById } from "@/app/lib/data";
import Link from "next/link";

export default async function ListPage(props: { params: Promise<{ id: number }>}) {
    const params = await props.params;
      const id = params.id;
    
      const [sellerArray] = await Promise.all([
        getSellerById(id)
      ]);

      const seller = sellerArray[0];

    return (
        <>
            <Link href={`/list/${id}/add`} className="addItem">Add Item</Link>
            <h1>{seller.friendly_name} Products:</h1>
            <Suspense key={seller.friendly_name + id}>
                <ItemsTable id={id} />
            </Suspense>
        </>
    )
}