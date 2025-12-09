
import { getProductById, getRatingsByProductId, addReview, getUserByEmail } from "@/app/lib/data";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import Link from "next/link";


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
    const session = await auth();

    async function handleSubmit(formData: FormData) {
    "use server";

    const productId = formData.get("productId") as string;

    // 1️⃣ Get session
    const session = await auth();

    // 2️⃣ If not logged in, send them to login
    if (!session?.user?.email) {
      redirect(`/login?callbackUrl=/products/${productId}`);
    }

    // 3️⃣ Look up the user in your DB using email
    const dbUser = await getUserByEmail(session.user.email!);
    if (!dbUser) {
      throw new Error("Logged-in user not found in database.");
    }

    const userId = dbUser.id; // this is what reviews.user_id expects

    // 4️⃣ Get rating + comment from form
    const rating = Number(formData.get("rating"));
    const comment = (formData.get("comment") as string) ?? "";

    // 5️⃣ Save review
    await addReview(productId, userId, rating, comment);

    // 6️⃣ Revalidate this product page
    revalidatePath(`/products/${productId}`);
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

      <img src={`${product.Image_URL}`} alt={product.Product_Name} />

      <p className="mb-2">
        <span className="font-semibold">{product.Description}</span>
      </p>

      <p className="mb-4">Price: ${product.Price}</p>
      <p className="mb-4">Sold by: {product.Seller_Name}</p>

      {averageRating !== null ? (
        <p className="mt-2">
          Average Rating: {averageRating.toFixed(1)} / 10 ({reviews.length}{" "}
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
                  {review.Rater_Name} — {review.rating} / 10
                </p>
                {review.comment && (
                  <p className="text-sm mt-1">{review.comment}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
          )}

          <h2 className="text-xl font-semibold mt-6 mb-2">Reviews</h2>
          {!session?.user ? (
              // Not logged in → show message
              <div className="border p-4 rounded-lg bg-gray-50 text-center">
                  <p className="mb-2">You must be logged in to leave a review.</p>
                  <Link
                      href={`/login?callbackUrl=/products/${id}`}
                      className="text-blue-600 underline"
                  >
                      Log in to leave a review →
                  </Link>
              </div>
          ) : (
              <form action={handleSubmit} className="mt-6">
              
                  <input type="hidden" name="productId" value={product.id} />
                  {/* Uncomment for testing
              <input type="hidden" name="userId" value="5" /> */}
                  <textarea
                      name="comment"
                      className="w-full border rounded p-2 mb-2"
                      placeholder="Write your review here..."
                  ></textarea>
                  <br />
                  <label className="mr-2">Rating:</label>
                  <select name="rating" className="border rounded p-1">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                  </select>
                  <button className="dropbtn">Save</button>
              </form>
          )}
    </main>
  );
}