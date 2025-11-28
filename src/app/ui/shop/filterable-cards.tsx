'use client';

import { useState, useMemo } from 'react';
import { Product, Category, Gender, Age_Groups, User } from '@/app/lib/definitions';

type FilterableCardsProps = {
    products: Product[];
    categories: Category[];
    genders: Gender[];
    ageGroups: Age_Groups[];
    sellers: User[];
};

export default function FilterableCards({
    products,
    categories,
    genders,
    ageGroups,
    sellers,
}: FilterableCardsProps) {
    const [gender, setGender] = useState<string[]>([]);
    const [category, setCategory] = useState<string[]>([]);
    const [ageGroup, setAgeGroup] = useState<string[]>([]);
    const [seller, setSeller] = useState<string[]>([]);

    // toggle helpers
    const toggleGender = (id: string) => {
        setGender((prev) =>
            prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
        );
    };

    const toggleCategory = (id: string) => {
        setCategory((prev) =>
            prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
        );
    };

    const toggleAgeGroup = (id: string) => {
        setAgeGroup((prev) =>
            prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
        );
    };

    const toggleSeller = (id: string) => {
        setSeller((prev) =>
            prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
        );
    };

    const filteredProducts = useMemo(
        () =>
            products.filter((p) =>
                (gender.length ? gender.includes(p.Gender_ID) : true) &&
                (category.length ? category.includes(p.Category_ID) : true) &&
                (ageGroup.length ? ageGroup.includes(p.Age_Group_ID) : true) &&
                (seller.length ? seller.includes(p.User_ID) : true)
            ),
        [products, gender, category, ageGroup, seller]
    );

    const clearAll = () => {
        setGender([]);
        setCategory([]);
        setAgeGroup([]);
        setSeller([]);
    };

    return (
        <div className="catalog-layout">
            {/* LEFT SIDEBAR FILTERS */}
            <aside className="filter-sidebar">
                <h2 className="filter-title">Filter Products</h2>

                {/* Gender */}
                <div className="filter-section">
                    <h3 className="filter-section-title">Gender</h3>
                    <label className="filter-option">
                        <input
                            type="checkbox"
                            checked={gender.length === 0}
                            onChange={() => setGender([])}
                        />
                        <span>All</span>
                    </label>
                    {genders.map((g) => (
                        <label key={g.id} className="filter-option">
                            <input
                                type="checkbox"
                                checked={gender.includes(g.id)}
                                onChange={() => toggleGender(g.id)}
                            />
                            <span>{g.Gender}</span>
                        </label>
                    ))}
                </div>

                {/* Category */}
                <div className="filter-section">
                    <h3 className="filter-section-title">Category</h3>
                    <label className="filter-option">
                        <input
                            type="checkbox"
                            checked={category.length === 0}
                            onChange={() => setCategory([])}
                        />
                        <span>All</span>
                    </label>
                    {categories.map((c) => (
                        <label key={c.id} className="filter-option">
                            <input
                                type="checkbox"
                                checked={category.includes(c.id)}
                                onChange={() => toggleCategory(c.id)}
                            />
                            <span>{c.Category_Name}</span>
                        </label>
                    ))}
                </div>

                {/* Age Group */}
                <div className="filter-section">
                    <h3 className="filter-section-title">Age Group</h3>
                    <label className="filter-option">
                        <input
                            type="checkbox"
                            checked={ageGroup.length === 0}
                            onChange={() => setAgeGroup([])}
                        />
                        <span>All</span>
                    </label>
                    {ageGroups.map((a) => (
                        <label key={a.id} className="filter-option">
                            <input
                                type="checkbox"
                                checked={ageGroup.includes(a.id)}
                                onChange={() => toggleAgeGroup(a.id)}
                            />
                            <span>{a.Age_Range}</span>
                        </label>
                    ))}
                </div>

                {/* Seller */}
                <div className="filter-section">
                    <h3 className="filter-section-title">Seller</h3>
                    <label className="filter-option">
                        <input
                            type="checkbox"
                            checked={seller.length === 0}
                            onChange={() => setSeller([])}
                        />
                        <span>All</span>
                    </label>
                    {sellers.map((s) => (
                        <label key={s.id} className="filter-option">
                            <input
                                type="checkbox"
                                checked={seller.includes(s.id)}
                                onChange={() => toggleSeller(s.id)}
                            />
                            <span>{s.display_name}</span>
                        </label>
                    ))}
                </div>

                <button
                    type="button"
                    className="filter-clear-button"
                    onClick={() => {
                        setGender([]);
                        setCategory([]);
                        setAgeGroup([]);
                        setSeller([]);
                    }}
                >
                    Clear all filters
                </button>
            </aside>

            {/* RIGHT PRODUCT GRID */}
            <section className="product-grid">
                {filteredProducts.length === 0 ? (
                    <p className="no-products">No products match the selected filters.</p>
                ) : (
                    filteredProducts.map((product) => (
                        <article key={product.id} className="product-card">
                            <div className="product-content">
                                <img className="product-image" src={product.Image_URL} alt={product.Product_Name} />
                                <h2 className="product-name">{product.Product_Name}</h2>
                                <p className="product-price">${product.Price}</p>

                            </div>
                        </article>
                    ))
                )}
            </section>
        </div>
    );
}
