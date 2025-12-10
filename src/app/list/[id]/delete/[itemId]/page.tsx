import ItemDeleteForm from "@/app/ui/products/deleteform";
import { Suspense } from "react";

export default async function DeleteItemPage(props: { params: Promise<{ id: number; itemId: number }>}) {
    
    const params = await props.params;

    const itemId = params.itemId;

    return (
        <>
            <Suspense>
                <ItemDeleteForm id={itemId} />
            </Suspense>
        </>
    )
}