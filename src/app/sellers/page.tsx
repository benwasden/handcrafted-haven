import { Suspense } from "react"
import { SellersSkeleton } from "@/app/ui/skeletons"
import { Metadata } from "next"
import Search from "@/app/ui/search";
// import SellerWrapper from "@/app/ui/sellers/sellers";
import SellersTable from "@/app/ui/sellers/table";

export const metadata: Metadata = {
    title: 'Sellers',
};

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    return (
        <div className="w-full">
            <Suspense fallback={<SellersSkeleton />}>
                <SellersTable />
            </Suspense>
        </div>
    )
}