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

const colorVariants = [
  { name: "Midnight Black", value: "oklch(0.2 0.01 240)" },
  { name: "Ocean Blue", value: "oklch(0.5 0.18 240)" },
  { name: "Forest Green", value: "oklch(0.45 0.14 155)" },
  { name: "Rose Pink", value: "oklch(0.72 0.15 0)" },
  { name: "Arctic White", value: "oklch(0.96 0.01 200)" },
];

const sizeVariants = ["500 ml", "750 ml", "1 L"];

const trustBadges = [
  { icon: Truck, label: "Free shipping over ₹499" },
  { icon: RotateCcw, label: "30-day returns" },
  { icon: Shield, label: "2-year warranty" },
];

const characteristics = [
  "Keeps drinks cold for 24 hours & hot for 12 hours — thanks to double-wall insulation",
  "Leakproof stainless steel design",
  "BPA-free material",
  "Lightweight and durable",
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

function StarRating({ rating, count }: { rating: number; count: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex text-amber-400 text-lg">
        {[1, 2, 3, 4, 5].map((s) => (
          <span key={s}>
            {s <= Math.floor(rating)
              ? "★"
              : s === Math.ceil(rating)
                ? "★"
                : "☆"}
          </span>
        ))}
      </div>
      <span className="text-sm text-slate-500">
        {rating} · {count} reviews
      </span>
    </div>
  );
}

function ReviewCard({
  review,
  index,
}: { review: (typeof reviews)[0]; index: number }) {
  return (
    <div
      data-ocid={`reviews.item.${index}`}
      className="rounded-xl bg-white p-3 flex flex-col gap-2 shadow-sm border border-slate-100"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center text-sm font-bold text-teal-700 flex-shrink-0">
            {review.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">
              {review.name}
            </p>
            <p className="text-xs text-slate-400">{review.date}</p>
          </div>
        </div>
        <div className="flex text-amber-400 text-sm">
          {"★"
            .repeat(review.rating)
            .split("")
            .map((star, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: star rating position is stable
              <span key={i}>{star}</span>
            ))}
        </div>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">{review.text}</p>
    </div>
  );
}

function GoodUXPage() {
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colorVariants[0].name);
  const [selectedSize, setSelectedSize] = useState("750 ml");
  const [hovered, setHovered] = useState(false);

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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-10 flex items-center justify-between">
          <a
            href="/"
            className="text-xl font-bold text-teal-600 tracking-tight"
          >
            AquaPure
          </a>
          <nav className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="bg-teal-50 text-teal-700 border-teal-200 text-xs"
            >
              Free shipping on orders over ₹499
            </Badge>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-5">
        <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-8 md:items-start">
          {/* LEFT — Product image */}
          <div
            className="relative flex items-center justify-center rounded-2xl overflow-hidden cursor-zoom-in"
            style={{
              background:
                "radial-gradient(ellipse at center, #e0faf4 60%, #b2ead8 100%)",
              border: "3px solid #99e0cc",
              minHeight: 200,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at 50% 60%, rgba(0,200,160,0.18) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <button
              data-ocid="product.secondary_button"
              onClick={handleWishlist}
              type="button"
              aria-label={
                wishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
              className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors"
            >
              <Heart
                className="w-5 h-5 transition-colors"
                fill={wishlisted ? "#f43f5e" : "none"}
                color={wishlisted ? "#f43f5e" : "#94a3b8"}
              />
            </button>
            <img
              src="/assets/generated/aquapure-bottle.dim_800x1000.png"
              alt="AquaPure Stainless Steel Insulated Water Bottle"
              className="relative z-10 w-full object-contain transition-transform duration-300"
              style={{
                maxHeight: "clamp(260px, 40vw, 420px)",
                transform: hovered ? "scale(1.10)" : "scale(1)",
                filter: "drop-shadow(0 8px 32px rgba(0,160,120,0.18))",
              }}
            />
          </div>

          {/* RIGHT — Product details */}
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-xs font-semibold text-teal-500 uppercase tracking-widest mb-1">
                AquaPure
              </p>
              <h1 className="text-xl font-bold text-slate-800 leading-tight">
                Stainless Steel Insulated Water Bottle – 750 ml
              </h1>
              <div className="mt-1.5">
                <StarRating rating={4.5} count="1,200" />
              </div>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-2xl font-bold text-slate-800">₹799</span>
                <span className="text-base text-slate-400 line-through">
                  ₹1,199
                </span>
                <Badge className="bg-green-100 text-green-700 border-green-200 text-xs font-semibold">
                  33% OFF
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Inclusive of all taxes
              </p>
            </div>

            <Separator />

            {/* Colour */}
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-700">
                Colour: <span className="text-teal-600">{selectedColor}</span>
              </span>
              <div className="flex items-center gap-2">
                {colorVariants.map((c) => (
                  <button
                    key={c.name}
                    data-ocid="color.toggle"
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    aria-label={c.name}
                    aria-pressed={selectedColor === c.name}
                    className="w-8 h-8 rounded-full transition-all"
                    style={{
                      backgroundColor: c.value,
                      border:
                        selectedColor === c.name
                          ? "3px solid #0d9488"
                          : "2px solid #cbd5e1",
                      boxShadow:
                        selectedColor === c.name ? "0 0 0 2px #ccfbf1" : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-700">
                Size: <span className="text-teal-600">{selectedSize}</span>
              </span>
              <div className="flex items-center gap-2">
                {sizeVariants.map((size) => (
                  <button
                    key={size}
                    data-ocid="size.toggle"
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className="px-4 py-1.5 rounded-lg text-sm font-medium border transition-all"
                    style={{
                      backgroundColor:
                        selectedSize === size ? "#ccfbf1" : "white",
                      color: selectedSize === size ? "#0d9488" : "#64748b",
                      borderColor:
                        selectedSize === size ? "#0d9488" : "#cbd5e1",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700">
                Quantity
              </span>
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                <button
                  data-ocid="quantity.button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  type="button"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 text-sm font-semibold text-slate-800 min-w-[2.5rem] text-center">
                  {quantity}
                </span>
                <button
                  data-ocid="quantity.button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="px-3 py-2 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                  disabled={quantity >= 10}
                  aria-label="Increase quantity"
                  type="button"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              data-ocid="product.primary_button"
              onClick={handleAddToCart}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold uppercase tracking-widest py-6 text-base rounded-xl shadow-md transition-all"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              ADD TO CART — ₹{(799 * quantity).toLocaleString("en-IN")}
            </Button>

            <Separator />

            {/* Characteristics */}
            <ul className="flex flex-col gap-1.5">
              {characteristics.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  <span
                    className="text-slate-600 italic"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {c}
                  </span>
                </li>
              ))}
            </ul>

            {/* Return & Refund Policy */}
            <Dialog>
              <DialogTrigger asChild>
                <button
                  data-ocid="policy.open_modal_button"
                  type="button"
                  className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors w-fit"
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
                  <DialogTitle>Return &amp; Refund Policy</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3 py-2">
                  <div className="rounded-xl bg-slate-50 p-4 flex flex-col gap-3">
                    {[
                      {
                        icon: RotateCcw,
                        title: "30-day hassle-free returns",
                        body: "Not satisfied? Return it within 30 days of delivery, no questions asked.",
                      },
                      {
                        icon: CheckCircle2,
                        title: "Conditions",
                        body: "Item must be unused and in its original packaging with all tags intact.",
                      },
                      {
                        icon: Shield,
                        title: "Refund timeline",
                        body: "Refunds are processed within 5–7 business days to your original payment method.",
                      },
                      {
                        icon: Info,
                        title: "Need help?",
                        body: "Contact support@aquapure.in or call 1800-XXX-XXXX.",
                      },
                    ].map(({ icon: Icon, title, body }) => (
                      <div key={title} className="flex items-start gap-3">
                        <Icon className="w-4 h-4 mt-0.5 text-teal-500 flex-shrink-0" />
                        <p className="text-sm text-slate-600">
                          <span className="font-semibold text-slate-700">
                            {title}
                          </span>{" "}
                          — {body}
                        </p>
                      </div>
                    ))}
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

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 rounded-xl bg-white border border-slate-100 p-3 shadow-sm">
              {trustBadges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1 text-center"
                >
                  <Icon className="w-5 h-5 text-teal-500" />
                  <span className="text-xs text-slate-500 leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <section data-ocid="reviews.section" className="mt-10">
          <div className="flex items-end justify-between mb-3">
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Customer Reviews
              </h2>
              <p className="text-sm text-slate-400 mt-0.5">
                Based on 1,200 verified reviews
              </p>
            </div>
            <StarRating rating={4.5} count="1,200" />
          </div>
          <div className="rounded-2xl bg-white border border-slate-100 p-4 mb-3 max-w-sm shadow-sm">
            {[
              { stars: 5, pct: 72 },
              { stars: 4, pct: 18 },
              { stars: 3, pct: 6 },
              { stars: 2, pct: 2 },
              { stars: 1, pct: 2 },
            ].map(({ stars, pct }) => (
              <div key={stars} className="flex items-center gap-3 mb-1.5">
                <span className="text-xs text-amber-400 w-6 text-right">
                  {stars}★
                </span>
                <div className="flex-1 h-2 rounded-full overflow-hidden bg-slate-100">
                  <div
                    className="h-full rounded-full bg-amber-400"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-slate-400 w-8">{pct}%</span>
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

      <footer className="border-t border-slate-200 py-4 mt-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-teal-600 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

function PoorUXPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(colorVariants[0].name);
  const [selectedSize, setSelectedSize] = useState("750 ml");

  const handleAddToCart = () => {
    toast.success("Added to cart");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Minimal header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-10 flex items-center">
          <span className="text-lg font-semibold text-gray-700">AquaPure</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-6 md:items-start">
          {/* LEFT — Smaller product image, no wishlist */}
          <div
            className="flex items-center justify-center rounded-lg overflow-hidden bg-gray-200"
            style={{ minHeight: 160 }}
          >
            <img
              src="/assets/generated/aquapure-bottle.dim_800x1000.png"
              alt="AquaPure Stainless Steel Insulated Water Bottle"
              className="w-full object-contain"
              style={{ maxHeight: "clamp(160px, 28vw, 280px)" }}
            />
          </div>

          {/* RIGHT — Product details with poor layout */}
          <div className="flex flex-col gap-2">
            {/* Title */}
            <h1 className="text-lg font-semibold text-gray-800">
              Stainless Steel Insulated Water Bottle – 750ml
            </h1>

            {/* Description / features as paragraph (no bullets) */}
            <p className="text-sm text-gray-600 leading-snug">
              Keeps drinks cold for 24 hours & hot for 12 hours thanks to
              double-wall insulation. Leakproof stainless steel design. BPA-free
              material. Lightweight and durable.
            </p>

            {/* Price below description */}
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-800">₹799</span>
              <span className="text-sm text-gray-400 line-through">₹1,199</span>
            </div>

            <Separator />

            {/* Colour */}
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-600">Colour</span>
              <div className="flex items-center gap-1.5">
                {colorVariants.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    aria-label={c.name}
                    className="w-6 h-6 rounded-full"
                    style={{
                      backgroundColor: c.value,
                      border:
                        selectedColor === c.name
                          ? "2px solid #555"
                          : "1px solid #ccc",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-600">Size</span>
              <div className="flex items-center gap-1.5">
                {sizeVariants.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className="px-2.5 py-1 rounded text-xs border"
                    style={{
                      backgroundColor:
                        selectedSize === size ? "#e5e7eb" : "white",
                      borderColor: "#d1d5db",
                      color: "#4b5563",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">Qty</span>
              <div className="flex items-center border border-gray-200 rounded overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2 py-1.5 text-gray-400 hover:bg-gray-50 disabled:opacity-40"
                  disabled={quantity <= 1}
                  type="button"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="px-3 py-1.5 text-sm text-gray-700">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="px-2 py-1.5 text-gray-400 hover:bg-gray-50 disabled:opacity-40"
                  disabled={quantity >= 10}
                  type="button"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Smaller, less prominent Add to Cart */}
            <Button
              onClick={handleAddToCart}
              className="w-auto self-start bg-teal-600 hover:bg-teal-700 text-white text-sm px-5 py-2 rounded"
            >
              Add to Cart
            </Button>

            {/* Return policy — plain text, no icon */}
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="text-xs text-gray-400 underline w-fit"
                >
                  Return &amp; Refund Policy
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-md rounded-2xl">
                <DialogHeader>
                  <DialogTitle>Return &amp; Refund Policy</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3 py-2">
                  <div className="rounded-xl bg-slate-50 p-4 flex flex-col gap-3">
                    {[
                      {
                        icon: RotateCcw,
                        title: "30-day hassle-free returns",
                        body: "Not satisfied? Return it within 30 days of delivery, no questions asked.",
                      },
                      {
                        icon: CheckCircle2,
                        title: "Conditions",
                        body: "Item must be unused and in its original packaging with all tags intact.",
                      },
                      {
                        icon: Shield,
                        title: "Refund timeline",
                        body: "Refunds are processed within 5–7 business days to your original payment method.",
                      },
                      {
                        icon: Info,
                        title: "Need help?",
                        body: "Contact support@aquapure.in or call 1800-XXX-XXXX.",
                      },
                    ].map(({ icon: Icon, title, body }) => (
                      <div key={title} className="flex items-start gap-3">
                        <Icon className="w-4 h-4 mt-0.5 text-teal-500 flex-shrink-0" />
                        <p className="text-sm text-slate-600">
                          <span className="font-semibold text-slate-700">
                            {title}
                          </span>{" "}
                          — {body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <DialogFooter>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full rounded-xl">
                      Close
                    </Button>
                  </DialogTrigger>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Customer Reviews — kept but below fold */}
        <section className="mt-8">
          <h2 className="text-base font-semibold text-gray-700 mb-2">
            Customer Reviews
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="rounded-lg bg-white p-3 flex flex-col gap-1 border border-gray-200"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                    {review.initials}
                  </div>
                  <p className="text-xs font-medium text-gray-700">
                    {review.name}
                  </p>
                </div>
                <p className="text-xs text-gray-500 leading-snug">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 py-4 mt-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-teal-600 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<"good" | "poor">("good");

  return (
    <>
      <Toaster position="top-right" />
      {/* Toggle bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-white border border-slate-200 rounded-full shadow-lg px-2 py-1">
        <button
          type="button"
          onClick={() => setView("good")}
          data-ocid="view.tab"
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            view === "good"
              ? "bg-teal-600 text-white"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Good UX
        </button>
        <button
          type="button"
          onClick={() => setView("poor")}
          data-ocid="view.tab"
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            view === "poor"
              ? "bg-slate-700 text-white"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Poor UX
        </button>
      </div>
      {view === "good" ? <GoodUXPage /> : <PoorUXPage />}
    </>
  );
}
