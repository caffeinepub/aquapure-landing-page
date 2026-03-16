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

// Low-contrast palette: medium gray-green bg, slightly darker text
const BG = "#b0b8b0";
const CARD_BG = "#a8b2a8";
const TEXT_MAIN = "#8a948a";
const TEXT_MUTED = "#96a096";

const colorVariants = [
  { name: "Midnight Black", value: "oklch(0.2 0.01 240)" },
  { name: "Ocean Blue", value: "oklch(0.5 0.18 240)" },
  { name: "Forest Green", value: "oklch(0.45 0.14 155)" },
  { name: "Rose Pink", value: "oklch(0.72 0.15 0)" },
  { name: "Arctic White", value: "oklch(0.96 0.01 200)" },
];

const sizeVariants = ["500ml", "750ml", "1L"];

const trustBadges = [
  { icon: Truck, label: "Free shipping over ₹499" },
  { icon: RotateCcw, label: "30-day returns" },
  { icon: Shield, label: "2-year warranty" },
];

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
  return (
    <div
      data-ocid={`reviews.item.${index}`}
      className="rounded p-2 flex flex-col gap-1"
      style={{ backgroundColor: CARD_BG }}
    >
      <div className="flex items-start justify-between gap-1">
        <div className="flex items-center gap-1">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ backgroundColor: "#9aaa9a", color: TEXT_MUTED }}
          >
            {review.initials}
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: TEXT_MAIN }}>
              {review.name}
            </p>
            <p className="text-xs" style={{ color: TEXT_MUTED }}>
              {review.date}
            </p>
          </div>
        </div>
      </div>
      <p className="text-xs leading-snug" style={{ color: TEXT_MUTED }}>
        {review.text}
      </p>
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
    <div className="min-h-screen" style={{ backgroundColor: BG }}>
      <Toaster position="top-right" />

      {/* Header */}
      <header
        className="border-b sticky top-0 z-10"
        style={{ backgroundColor: CARD_BG, borderColor: TEXT_MUTED }}
      >
        <div className="max-w-6xl mx-auto px-3 h-10 flex items-center justify-between">
          <a
            href="/"
            className="text-sm font-bold"
            style={{ color: TEXT_MAIN }}
          >
            AquaPure
          </a>
          <nav className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="text-xs"
              style={{ backgroundColor: CARD_BG, color: TEXT_MUTED }}
            >
              Free shipping on orders over ₹499
            </Badge>
          </nav>
        </div>
      </header>

      {/* Main product section */}
      <main className="max-w-6xl mx-auto px-3 py-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start">
          {/* Left: Small product image */}
          <div className="flex justify-start" style={{ backgroundColor: BG }}>
            <img
              src="/assets/generated/aquapure-bottle.dim_800x1000.png"
              alt="AquaPure bottle"
              className="w-full max-w-[160px] h-auto object-contain"
            />
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col gap-1">
            <p className="text-xs" style={{ color: TEXT_MUTED }}>
              AquaPure
            </p>

            <h1
              className="text-base font-bold leading-tight"
              style={{ color: TEXT_MAIN }}
            >
              Stainless Steel Insulated Water Bottle 750ml
            </h1>

            <Separator className="opacity-30 my-0.5" />

            {/* Description paragraph (no bullet points) */}
            <p className="text-xs leading-snug" style={{ color: TEXT_MUTED }}>
              Keeps drinks cold for 24 hours and hot for 12 hours thanks to
              double-wall insulation. Leakproof stainless steel design. BPA-free
              material. Lightweight and durable build perfect for everyday use,
              gym sessions, hikes, and travel.
            </p>

            {/* Price BELOW description */}
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-sm font-bold" style={{ color: TEXT_MAIN }}>
                ₹799
              </span>
              <span
                className="text-xs line-through"
                style={{ color: TEXT_MUTED }}
              >
                ₹1,199
              </span>
              <Badge
                className="text-xs"
                style={{ backgroundColor: CARD_BG, color: TEXT_MUTED }}
              >
                33% OFF
              </Badge>
            </div>
            <p className="text-xs" style={{ color: TEXT_MUTED }}>
              Inclusive of all taxes
            </p>

            <Separator className="opacity-30 my-0.5" />

            {/* Colour variants */}
            <div className="flex flex-col gap-1">
              <span className="text-xs" style={{ color: TEXT_MUTED }}>
                Colour: {selectedColor}
              </span>
              <div className="flex items-center gap-1.5">
                {colorVariants.map((c) => (
                  <button
                    key={c.name}
                    data-ocid="color.toggle"
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    aria-label={c.name}
                    aria-pressed={selectedColor === c.name}
                    className="w-6 h-6 rounded-full"
                    style={{
                      backgroundColor: c.value,
                      border:
                        selectedColor === c.name
                          ? "2px solid #666"
                          : "1px solid #999",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size variants */}
            <div className="flex flex-col gap-1">
              <span className="text-xs" style={{ color: TEXT_MUTED }}>
                Size: {selectedSize}
              </span>
              <div className="flex items-center gap-1">
                {sizeVariants.map((size) => (
                  <button
                    key={size}
                    data-ocid="size.toggle"
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className="px-2 py-0.5 rounded text-xs border"
                    style={{
                      backgroundColor:
                        selectedSize === size ? "#8a948a" : "transparent",
                      color: TEXT_MUTED,
                      borderColor: TEXT_MUTED,
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <Separator className="opacity-30 my-0.5" />

            {/* Quantity selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: TEXT_MUTED }}>
                Quantity
              </span>
              <div
                className="flex items-center border rounded overflow-hidden"
                style={{ borderColor: TEXT_MUTED, backgroundColor: CARD_BG }}
              >
                <button
                  data-ocid="quantity.button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2 py-1 text-xs disabled:opacity-40"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  type="button"
                  style={{ color: TEXT_MUTED }}
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span
                  className="px-3 py-1 text-xs min-w-[1.5rem] text-center"
                  style={{ color: TEXT_MUTED }}
                >
                  {quantity}
                </span>
                <button
                  data-ocid="quantity.button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="px-2 py-1 text-xs disabled:opacity-40"
                  disabled={quantity >= 10}
                  aria-label="Increase quantity"
                  type="button"
                  style={{ color: TEXT_MUTED }}
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Action buttons — small, not prominent */}
            <div className="flex flex-col gap-1 pt-0.5">
              <Button
                data-ocid="product.primary_button"
                onClick={handleAddToCart}
                size="sm"
                className="w-auto self-start text-xs px-3"
                style={{
                  backgroundColor: CARD_BG,
                  color: TEXT_MUTED,
                  border: `1px solid ${TEXT_MUTED}`,
                }}
              >
                <ShoppingCart className="w-3 h-3 mr-1" />
                Add to Cart — ₹{(799 * quantity).toLocaleString("en-IN")}
              </Button>

              <button
                data-ocid="product.secondary_button"
                onClick={handleWishlist}
                className="flex items-center gap-1 text-xs py-0.5 w-auto self-start"
                style={{ color: TEXT_MUTED }}
                type="button"
              >
                <Heart
                  className="w-3 h-3"
                  fill={wishlisted ? "currentColor" : "none"}
                />
                {wishlisted ? "Saved" : "Wishlist"}
              </button>

              <Dialog>
                <DialogTrigger asChild>
                  <button
                    data-ocid="policy.open_modal_button"
                    type="button"
                    className="flex items-center gap-1 text-xs py-0.5 w-auto self-start"
                    style={{ color: TEXT_MUTED }}
                  >
                    <Info className="w-3 h-3" />
                    Return &amp; Refund Policy
                  </button>
                </DialogTrigger>
                <DialogContent
                  data-ocid="policy.dialog"
                  className="max-w-md rounded"
                >
                  <DialogHeader>
                    <DialogTitle className="text-sm">
                      Return &amp; Refund Policy
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-2 py-1">
                    <div
                      className="rounded p-2 flex flex-col gap-2"
                      style={{ backgroundColor: CARD_BG }}
                    >
                      <div className="flex items-start gap-2">
                        <RotateCcw
                          className="w-3 h-3 mt-0.5 flex-shrink-0"
                          style={{ color: TEXT_MUTED }}
                        />
                        <p className="text-xs" style={{ color: TEXT_MUTED }}>
                          <span className="font-semibold">
                            30-day hassle-free returns
                          </span>{" "}
                          — not satisfied? Return it within 30 days of delivery,
                          no questions asked.
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2
                          className="w-3 h-3 mt-0.5 flex-shrink-0"
                          style={{ color: TEXT_MUTED }}
                        />
                        <p className="text-xs" style={{ color: TEXT_MUTED }}>
                          <span className="font-semibold">Conditions</span> —
                          item must be unused and in its original packaging with
                          all tags intact.
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Shield
                          className="w-3 h-3 mt-0.5 flex-shrink-0"
                          style={{ color: TEXT_MUTED }}
                        />
                        <p className="text-xs" style={{ color: TEXT_MUTED }}>
                          <span className="font-semibold">Refund timeline</span>{" "}
                          — refunds are processed within 5–7 business days to
                          your original payment method.
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Info
                          className="w-3 h-3 mt-0.5 flex-shrink-0"
                          style={{ color: TEXT_MUTED }}
                        />
                        <p className="text-xs" style={{ color: TEXT_MUTED }}>
                          <span className="font-semibold">Need help?</span> —
                          contact support@aquapure.in or call 1800-XXX-XXXX.
                        </p>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogTrigger asChild>
                      <Button
                        data-ocid="policy.close_button"
                        variant="outline"
                        className="w-full rounded text-xs"
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
              className="grid grid-cols-3 gap-1 rounded p-2 mt-1"
              style={{ backgroundColor: CARD_BG }}
            >
              {trustBadges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-0.5 text-center"
                >
                  <Icon className="w-3 h-3" style={{ color: TEXT_MUTED }} />
                  <span
                    className="text-[10px] leading-tight"
                    style={{ color: TEXT_MUTED }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews section */}
        <section data-ocid="reviews.section" className="mt-6">
          <div className="flex flex-col gap-0.5 mb-3">
            <h2 className="text-base font-bold" style={{ color: TEXT_MAIN }}>
              Customer Reviews
            </h2>
            <p className="text-xs" style={{ color: TEXT_MUTED }}>
              1,200 reviews
            </p>
          </div>

          <div
            className="rounded p-2 mb-4 max-w-xs"
            style={{ backgroundColor: CARD_BG }}
          >
            {[
              { stars: 5, pct: 72 },
              { stars: 4, pct: 18 },
              { stars: 3, pct: 6 },
              { stars: 2, pct: 2 },
              { stars: 1, pct: 2 },
            ].map(({ stars, pct }) => (
              <div key={stars} className="flex items-center gap-2 mb-0.5">
                <span
                  className="text-xs w-6 text-right"
                  style={{ color: TEXT_MUTED }}
                >
                  {stars}★
                </span>
                <div
                  className="flex-1 h-1.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: "#96a096" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, backgroundColor: TEXT_MUTED }}
                  />
                </div>
                <span className="text-xs w-6" style={{ color: TEXT_MUTED }}>
                  {pct}%
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {reviews.map((review, i) => (
              <ReviewCard key={review.name} review={review} index={i + 1} />
            ))}
          </div>
        </section>
      </main>

      <footer
        className="border-t py-3 mt-6"
        style={{ borderColor: TEXT_MUTED }}
      >
        <div className="max-w-6xl mx-auto px-3 text-center">
          <p className="text-xs" style={{ color: TEXT_MUTED }}>
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: TEXT_MUTED }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
