import { getSellerById } from "@/app/lib/data";
import ItemCards from "@/app/ui/sellers/itemcards";
import { Suspense } from "react";

export default async function SellerProfile(props: { params: Promise<{ id: number }>}) {
  const params = await props.params;
  const id = params.id;

  const [sellerArray] = await Promise.all([
    getSellerById(id)
  ]);

  const seller = sellerArray[0];

  return (
    <>
    <h1>{seller.friendly_name}</h1>
    <Suspense>
      <ItemCards id={id} />
    </Suspense>
    </>
);
}
