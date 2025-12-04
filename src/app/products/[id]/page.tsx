
import { getProductById, getRatingsByProductId } from "@/app/lib/data";
import { notFound } from "next/navigation";

type ProductPageParams = { id: string };
type ProductPageProps = { params: Promise<ProductPageParams> };

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const [product, reviews] = await Promise.all([
    getProductById(id),
    getRatingsByProductId(id),
  ]);

  if (!product) {
    notFound();
  }

  // Average rating
  let averageRating: number | null = null;
  if (reviews.length > 0) {
    const sum = reviews.reduce((total, r) => total + r.rating, 0);
    averageRating = sum / reviews.length;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">{product.Product_Name}</h1>

      <img src={`../${product.Image_URL}`} alt={product.Product_Name} />

      <p className="mb-2">
        <span className="font-semibold">{product.Description}</span>
      </p>

      <p className="mb-4">Price: ${product.Price}</p>
      <p className="mb-4">Sold by: {product.Seller_Name}</p>

      {averageRating !== null ? (
        <p className="mt-2">
          Average Rating: {averageRating.toFixed(1)} / 5 ({reviews.length}{" "}
          review{reviews.length === 1 ? "" : "s"})
        </p>
      ) : (
        <p className="mt-2 italic">No ratings yet.</p>
      )}

      {reviews.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Customer Reviews</h2>
          <ul className="space-y-3">
            {reviews.map((review) => (
              <li key={review.id} className="border rounded p-3">
                <p className="font-semibold">
                  {review.Rater_Name} — {review.rating} / 5
                </p>
                {review.comment && (
                  <p className="text-sm mt-1">{review.comment}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
          )}
          <form>
              <h2 className="text-xl font-semibold mt-6 mb-2">Review</h2>
              <textarea
                  className="w-full border rounded p-2 mb-2"
                  placeholder="Write your review here..."
              ></textarea>
              <br />
              <label className="mr-2">Rating:</label>
              <select className="border rounded p-1">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
              </select>
              <button className="dropbtn">Save</button>
          </form>
    </main>
  );
}