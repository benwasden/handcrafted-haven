import ItemEditForm from "@/app/ui/products/editform";
import { Suspense } from "react";

export default async function EditItemPage(props: { params: Promise<{ id: number; itemId: number }>}) {
    
    const params = await props.params;

    const itemId = params.itemId;

    return (
        <>
            <Suspense>
                <ItemEditForm id={itemId} />
            </Suspense>
        </>
    )
}