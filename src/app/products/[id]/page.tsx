
import { getProductById, getRatingsByProductId, addReview, getUserByEmail } from "@/app/lib/data";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import Link from "next/link";
import styles from "../../ui/product.module.css";


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
    <main className={styles.pageContainer}>
      <h1 className={styles.title}>{product.Product_Name}</h1>

      <img src={`${product.Image_URL}`} alt={product.Product_Name} />

        <div className={styles.productDetails}>
          <p className={styles.description}>{product.Description}</p>
          <p className={styles.price}>${product.Price}</p>
        </div>
      </div>

      

      {averageRating !== null ? (
        <p className={styles.averageRating}>
          Average Rating: {averageRating.toFixed(1)} / 10 ({reviews.length} review
          {reviews.length === 1 ? "" : "s"})
        </p>
      ) : (
        <p className={styles.noRating}>No ratings yet.</p>
      )}

      {reviews.length > 0 && (
        <section className={styles.reviewsBox}>
          <h2 className={styles.reviewsTitle}>Customer Reviews</h2>
          <ul className={styles.reviewsList}>
            {reviews.map((review) => (
              <li key={review.id} className={styles.reviewItem}>
                <p className={styles.reviewAuthor}>
                  {review.Rater_Name} — {review.rating} / 10
                </p>
                {review.comment && (
                  <p className={styles.reviewComment}>{review.comment}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}


      <h2 className={styles.reviewsTitle}>Reviews</h2>

      {!session?.user ? (
        <div className={styles.loginNotice}>
          <p>You must be logged in to leave a review.</p>
          <Link href={`/login?callbackUrl=/products/${id}`} className={styles.loginLink}>
            Log in to leave a review →
          </Link>
        </div>
      ) : (
        <form action={handleSubmit} className={styles.formBox}>
          <input type="hidden" name="productId" value={product.id} />

          <textarea
            name="comment"
            className={styles.commentInput}
            placeholder="Write your review here..."
          ></textarea>

          <div className={styles.ratingRow}>
            <label>Rating:</label>
            <select name="rating" className={styles.ratingSelect}>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <button className={styles.saveButton}>Save</button>
        </form>
      )}

    </main>
  );
}