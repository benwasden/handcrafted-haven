import { Suspense } from "react"
import { SellersSkeleton } from "@/app/ui/skeletons"
import { Metadata } from "next"
import SellersTable from "@/app/ui/sellers/table";


export const metadata: Metadata = {
    title: 'Sellers Table',
};

export default async function Page() {

    return (
        <div className="w-full">
            <Suspense fallback={<SellersSkeleton />}>
                <SellersTable />
            </Suspense>
        </div>
    )
}