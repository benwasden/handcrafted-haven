import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { CardsSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/shop/cards';

export const metadata = {
    title: 'Handcrafted-Haven | Shop',
};

export default async function Shop() {
    return (
        <main>
            <h1 className={`${lusitana.className} text-3xl font-bold mb-6`}>Shop</h1>

            <div className="product-grid">
                <Suspense fallback={<CardsSkeleton />}>
                    {/* Async server component */}
                    <CardWrapper />
                </Suspense>
            </div>

            <div className="cards">
                <div className="image">Image Placeholder</div>
            </div>
        </main>
    );
}
