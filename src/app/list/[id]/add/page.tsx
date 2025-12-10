import ItemAddForm from "@/app/ui/products/addform";
import { Suspense } from "react";

export default async function AddForm(props: { params: Promise<{ id: number }>}) {
    const params = await props.params;
      const id = params.id;
    return (
        <>
            <Suspense>
                <ItemAddForm id={id} />
            </Suspense>
        </>
    )
}