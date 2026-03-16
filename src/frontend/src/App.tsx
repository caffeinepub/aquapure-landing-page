import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import {
  CheckCircle2,
  Heart,
  Info,
  Minus,
  Plus,
  RotateCcw,
  Shield,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STAR_PATH =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

function Star({ type }: { type: "full" | "half" | "empty" }) {
  if (type === "full") {
    return (
      <svg
        aria-hidden="true"
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
        style={{ color: "oklch(0.72 0.15 75)" }}
      >
        <path d={STAR_PATH} />
      </svg>
    );
  }
  if (type === "half") {
    return (
      <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 20 20">
        <defs>
          <linearGradient id="half-star-grad">
            <stop offset="50%" stopColor="oklch(0.72 0.15 75)" />
            <stop offset="50%" stopColor="oklch(0.88 0.04 195)" />
          </linearGradient>
        </defs>
        <path fill="url(#half-star-grad)" d={STAR_PATH} />
      </svg>
    );
  }
  return (
    <svg
      aria-hidden="true"
      className="w-5 h-5"
      viewBox="0 0 20 20"
      fill="currentColor"
      style={{ color: "oklch(0.88 0.04 195)" }}
    >
      <path d={STAR_PATH} />
    </svg>
  );
}

function StarRating({
  rating,
  count,
  size = "default",
}: { rating: number; count: number; size?: "default" | "small" }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const starTypes: Array<"full" | "half" | "empty"> = Array.from(
    { length: 5 },
    (_, i) => {
      if (i < fullStars) return "full";
      if (i === fullStars && hasHalf) return "half";
      return "empty";
    },
  );
  return (
    <div
      data-ocid="rating.section"
      className={`flex items-center gap-2 ${size === "small" ? "gap-1" : ""}`}
    >
      <div
        className={`flex items-center gap-0.5 ${size === "small" ? "scale-90 origin-left" : ""}`}
        role="img"
        aria-label={`${rating} out of 5 stars`}
      >
        {starTypes.map((type, pos) => (
          <Star key={`star-${pos + 1}`} type={type} />
        ))}
      </div>
      <span
        className={`font-semibold ${size === "small" ? "text-xs" : "text-sm"}`}
        style={{ color: "oklch(0.72 0.15 75)" }}
      >
        {rating}
      </span>
      <span
        className={`text-muted-foreground ${size === "small" ? "text-xs" : "text-sm"}`}
      >
        ({count.toLocaleString()} reviews)
      </span>
    </div>
  );
}

const benefits = [
  {
    icon: "🌡️",
    text: "Keeps drinks cold for 24 hours & hot for 12 hours — thanks to double-wall insulation",
  },
  { icon: "🔒", text: "Leakproof stainless steel design" },
  { icon: "✅", text: "BPA-free material" },
  { icon: "🪶", text: "Lightweight and durable" },
];

const trustBadges = [
  { icon: Truck, label: "Free shipping over ₹499" },
  { icon: RotateCcw, label: "30-day returns" },
  { icon: Shield, label: "2-year warranty" },
];

const colorVariants = [
  { name: "Midnight Black", value: "oklch(0.2 0.01 240)" },
  { name: "Ocean Blue", value: "oklch(0.5 0.18 240)" },
  { name: "Forest Green", value: "oklch(0.45 0.14 155)" },
  { name: "Rose Pink", value: "oklch(0.72 0.15 0)" },
  { name: "Arctic White", value: "oklch(0.96 0.01 200)" },
];

const sizeVariants = ["500ml", "750ml", "1L"];

const reviews = [
  {
    name: "Priya M.",
    rating: 5,
    date: "March 4, 2026",
    text: "Absolutely love this bottle! Keeps my water cold all day even in summer. The design is sleek and it fits perfectly in my bag.",
    initials: "PM",
  },
  {
    name: "Rahul K.",
    rating: 4,
    date: "February 18, 2026",
    text: "Great quality and looks premium. The only thing I'd change is a slightly wider mouth for adding ice. Otherwise perfect!",
    initials: "RK",
  },
  {
    name: "Sneha T.",
    rating: 5,
    date: "January 29, 2026",
    text: "Bought this for my gym sessions and it's been a game changer. No leaks, stays cold for hours, and the finish is gorgeous.",
    initials: "ST",
  },
];

function ReviewCard({
  review,
  index,
}: { review: (typeof reviews)[0]; index: number }) {
  const starTypes: Array<"full" | "half" | "empty"> = Array.from(
    { length: 5 },
    (_, i) => (i < review.rating ? "full" : "empty"),
  );
  return (
    <div
      data-ocid={`reviews.item.${index}`}
      className="rounded-2xl p-6 flex flex-col gap-3"
      style={{ backgroundColor: "oklch(0.96 0.025 195)" }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{
              backgroundColor: "oklch(0.88 0.08 200)",
              color: "oklch(0.3 0.12 200)",
            }}
          >
            {review.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {review.name}
            </p>
            <p className="text-xs text-muted-foreground">{review.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-0.5 mt-0.5">
          {starTypes.map((type, pos) => (
            <Star key={`review-star-${pos + 1}`} type={type} />
          ))}
        </div>
      </div>
      <p className="text-sm text-foreground leading-relaxed">{review.text}</p>
    </div>
  );
}

export default function App() {
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colorVariants[0].name);
  const [selectedSize, setSelectedSize] = useState("750ml");

  const handleAddToCart = () => {
    toast.success(
      `Added ${quantity} bottle${quantity > 1 ? "s" : ""} to cart!`,
      {
        description: `AquaPure ${selectedSize} · ${selectedColor} · ₹${(799 * quantity).toLocaleString("en-IN")}`,
      },
    );
  };

  const handleWishlist = () => {
    setWishlisted((prev) => !prev);
    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist ❤️");
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <a
            href="/"
            className="font-display text-xl font-bold"
            style={{ color: "oklch(var(--primary))" }}
          >
            AquaPure
          </a>
          <nav className="flex items-center gap-4">
            <Badge variant="secondary" className="text-xs font-medium">
              Free shipping on orders over ₹499
            </Badge>
          </nav>
        </div>
      </header>

      {/* Main product section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left: Product Image */}
          <div
            className="relative rounded-3xl flex items-center justify-center p-2"
            style={{ backgroundColor: "oklch(0.93 0.05 185)" }}
          >
            {/* White card with thin border — bottle sits inside */}
            <div
              className="relative rounded-2xl w-full overflow-hidden flex items-center justify-center"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid oklch(0.82 0.04 195)",
                padding: "2rem 1.5rem",
              }}
            >
              {/* Radial spotlight glow behind bottle */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 70% at 50% 50%, oklch(0.88 0.08 200 / 0.55) 0%, transparent 75%)",
                }}
              />
              <img
                src="/assets/generated/aquapure-bottle.dim_800x1000.png"
                alt="AquaPure Stainless Steel Insulated Water Bottle 750ml"
                className="relative z-10 w-full max-w-[340px] md:max-w-[460px] h-auto object-contain transition-transform duration-500 ease-out hover:scale-110 cursor-zoom-in"
                style={{
                  filter:
                    "drop-shadow(0 8px 32px oklch(0.4 0.12 200 / 0.25)) drop-shadow(0 2px 8px oklch(0.4 0.12 200 / 0.15))",
                  animation: "fade-up 0.6s ease-out forwards",
                }}
              />
            </div>
            {/* In Stock badge */}
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold shadow z-20"
              style={{
                backgroundColor: "oklch(0.96 0.08 155)",
                color: "oklch(0.35 0.12 155)",
              }}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              In Stock
            </div>
          </div>

          {/* Right: Product Details */}
          <div
            className="flex flex-col gap-5"
            style={{ animation: "fade-up 0.6s 0.1s ease-out both" }}
          >
            <p
              className="text-xs font-bold tracking-[0.18em] uppercase"
              style={{ color: "oklch(var(--primary))" }}
            >
              AquaPure
            </p>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-foreground">
              Stainless Steel Insulated Water Bottle
              <span
                className="block text-xl sm:text-2xl font-normal mt-1"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                750ml
              </span>
            </h1>

            <StarRating rating={4.5} count={1200} />

            <Separator className="opacity-50" />

            <div className="flex items-baseline gap-3">
              <span
                className="font-display text-4xl font-bold"
                style={{ color: "oklch(var(--foreground))" }}
              >
                ₹799
              </span>
              <span className="text-lg text-muted-foreground line-through">
                ₹1,199
              </span>
              <Badge
                className="text-xs font-bold"
                style={{
                  backgroundColor: "oklch(0.92 0.1 155)",
                  color: "oklch(0.3 0.12 155)",
                }}
              >
                33% OFF
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Inclusive of all taxes
            </p>

            <Separator className="opacity-50" />

            {/* Benefits list */}
            <ul className="flex flex-col gap-2.5">
              {benefits.map((b) => (
                <li
                  key={b.text}
                  className="flex items-start gap-3 text-sm text-foreground"
                >
                  <span className="text-base leading-none mt-0.5">
                    {b.icon}
                  </span>
                  <span className="font-serif italic">{b.text}</span>
                </li>
              ))}
            </ul>

            <Separator className="opacity-50" />

            {/* Colour variants */}
            <div className="flex flex-col gap-2.5">
              <span className="text-sm font-medium text-foreground">
                Colour:{" "}
                <span className="font-normal text-muted-foreground">
                  {selectedColor}
                </span>
              </span>
              <div className="flex items-center gap-2.5">
                {colorVariants.map((c) => (
                  <button
                    key={c.name}
                    data-ocid="color.toggle"
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    aria-label={c.name}
                    aria-pressed={selectedColor === c.name}
                    className="w-8 h-8 rounded-full transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    style={{
                      backgroundColor: c.value,
                      border:
                        c.name === "Arctic White"
                          ? "1.5px solid oklch(0.82 0.03 200)"
                          : "none",
                      boxShadow:
                        selectedColor === c.name
                          ? `0 0 0 3px oklch(var(--background)), 0 0 0 5px ${c.value}`
                          : "none",
                      transform:
                        selectedColor === c.name ? "scale(1.1)" : "scale(1)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size variants */}
            <div className="flex flex-col gap-2.5">
              <span className="text-sm font-medium text-foreground">
                Size:{" "}
                <span className="font-normal text-muted-foreground">
                  {selectedSize}
                </span>
              </span>
              <div className="flex items-center gap-2">
                {sizeVariants.map((size) => (
                  <button
                    key={size}
                    data-ocid="size.toggle"
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className="px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    style={{
                      backgroundColor:
                        selectedSize === size
                          ? "oklch(var(--primary))"
                          : "transparent",
                      color:
                        selectedSize === size
                          ? "oklch(var(--primary-foreground))"
                          : "oklch(var(--foreground))",
                      borderColor:
                        selectedSize === size
                          ? "oklch(var(--primary))"
                          : "oklch(var(--border))",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* Quantity selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">
                Quantity
              </span>
              <div
                className="flex items-center rounded-xl border border-border overflow-hidden"
                style={{ backgroundColor: "oklch(var(--card))" }}
              >
                <button
                  data-ocid="quantity.button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 hover:bg-muted transition-colors text-foreground disabled:opacity-40"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  type="button"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-5 py-2 text-sm font-semibold min-w-[2.5rem] text-center text-foreground">
                  {quantity}
                </span>
                <button
                  data-ocid="quantity.button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="px-3 py-2 hover:bg-muted transition-colors text-foreground disabled:opacity-40"
                  disabled={quantity >= 10}
                  aria-label="Increase quantity"
                  type="button"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {quantity >= 10 && (
                <span className="text-xs text-muted-foreground">
                  Max 10 per order
                </span>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 pt-1">
              <Button
                data-ocid="product.primary_button"
                onClick={handleAddToCart}
                size="lg"
                className="w-full py-5 text-base font-bold uppercase tracking-widest rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  backgroundColor: "oklch(var(--primary))",
                  color: "oklch(var(--primary-foreground))",
                  boxShadow: "0 4px 20px -4px oklch(0.42 0.11 200 / 0.45)",
                }}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                ADD TO CART — ₹{(799 * quantity).toLocaleString("en-IN")}
              </Button>

              <button
                data-ocid="product.secondary_button"
                onClick={handleWishlist}
                className="flex items-center justify-center gap-2 text-sm font-medium py-2 transition-colors"
                style={{
                  color: wishlisted
                    ? "oklch(0.55 0.18 20)"
                    : "oklch(var(--muted-foreground))",
                }}
                type="button"
              >
                <Heart
                  className="w-4 h-4"
                  fill={wishlisted ? "currentColor" : "none"}
                />
                {wishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
              </button>

              <Dialog>
                <DialogTrigger asChild>
                  <button
                    data-ocid="policy.open_modal_button"
                    type="button"
                    className="flex items-center justify-center gap-1.5 text-sm font-medium py-1 transition-colors hover:underline underline-offset-2"
                    style={{ color: "oklch(var(--muted-foreground))" }}
                  >
                    <Info className="w-4 h-4" />
                    Return &amp; Refund Policy
                  </button>
                </DialogTrigger>
                <DialogContent
                  data-ocid="policy.dialog"
                  className="max-w-md rounded-2xl"
                >
                  <DialogHeader>
                    <DialogTitle className="font-display text-lg">
                      Return &amp; Refund Policy
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-4 py-2">
                    <div
                      className="rounded-xl p-4 flex flex-col gap-3"
                      style={{ backgroundColor: "oklch(0.96 0.025 195)" }}
                    >
                      <div className="flex items-start gap-3">
                        <RotateCcw
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: "oklch(var(--primary))" }}
                        />
                        <p className="text-sm text-foreground">
                          <span className="font-semibold">
                            30-day hassle-free returns
                          </span>{" "}
                          — not satisfied? Return it within 30 days of delivery,
                          no questions asked.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: "oklch(var(--primary))" }}
                        />
                        <p className="text-sm text-foreground">
                          <span className="font-semibold">Conditions</span> —
                          item must be unused and in its original packaging with
                          all tags intact.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Shield
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: "oklch(var(--primary))" }}
                        />
                        <p className="text-sm text-foreground">
                          <span className="font-semibold">Refund timeline</span>{" "}
                          — refunds are processed within 5–7 business days to
                          your original payment method.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Info
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: "oklch(var(--primary))" }}
                        />
                        <p className="text-sm text-foreground">
                          <span className="font-semibold">Need help?</span> —
                          contact our support team at support@aquapure.in or
                          call 1800-XXX-XXXX (Mon–Sat, 9am–6pm).
                        </p>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogTrigger asChild>
                      <Button
                        data-ocid="policy.close_button"
                        variant="outline"
                        className="w-full rounded-xl"
                      >
                        Close
                      </Button>
                    </DialogTrigger>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Trust badges */}
            <div
              className="grid grid-cols-3 gap-3 rounded-2xl p-4"
              style={{ backgroundColor: "oklch(0.96 0.025 195)" }}
            >
              {trustBadges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 text-center"
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: "oklch(var(--primary))" }}
                  />
                  <span className="text-[11px] text-muted-foreground leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews section */}
        <section data-ocid="reviews.section" className="mt-16 md:mt-24">
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Customer Reviews
            </h2>
            <div className="flex items-center gap-4">
              <StarRating rating={4.5} count={1200} />
              <Separator orientation="vertical" className="h-4 opacity-50" />
              <span className="text-sm text-muted-foreground">
                4.5 out of 5
              </span>
            </div>
          </div>

          <div
            className="rounded-2xl p-5 mb-8 max-w-sm"
            style={{ backgroundColor: "oklch(0.96 0.025 195)" }}
          >
            {[
              { stars: 5, pct: 72 },
              { stars: 4, pct: 18 },
              { stars: 3, pct: 6 },
              { stars: 2, pct: 2 },
              { stars: 1, pct: 2 },
            ].map(({ stars, pct }) => (
              <div key={stars} className="flex items-center gap-3 mb-1.5">
                <span className="text-xs text-muted-foreground w-8 text-right">
                  {stars}★
                </span>
                <div
                  className="flex-1 h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: "oklch(0.9 0.03 195)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: "oklch(0.72 0.15 75)",
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8">
                  {pct}%
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((review, i) => (
              <ReviewCard key={review.name} review={review} index={i + 1} />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50 py-6 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
