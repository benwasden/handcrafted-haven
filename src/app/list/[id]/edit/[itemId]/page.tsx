import ItemEditForm from "@/app/ui/products/editform";
import { Suspense } from "react";

export default async function EditItemPage(props: { params: Promise<{ id: number }>}) {
    
    const params = await props.params;

    const id = params.id;

    return (
        <>
            <Suspense>
                <ItemEditForm id={id} />
            </Suspense>
        </>
    )
}