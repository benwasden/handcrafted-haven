import { funnel } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { CardsSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/shop/cards';

export const metadata = {
    title: 'Handcrafted-Haven | Shop',
};

export default async function Shop() {
    return (
        <main>
            <div className="shop-page">
                <h1 className={`${funnel.className}`} id="shop-header">Shop</h1>

                <div className="product-grid">
                    <Suspense fallback={<CardsSkeleton />}>
                        {/* Async server component */}
                        <CardWrapper />
                    </Suspense>
                </div>

                <div className="cards">
                    <div className="image"></div>
                </div>
            </div>
        </main>
    );
}
