import Image from "next/image";
import { ZoomIn } from "lucide-react";

type FeaturedGalleryProps = {
  variant: "featured";
  images: string[];
  zoomLabel: string;
  primaryAlt: string;
};

type ProductsGalleryProps = {
  variant: "products";
  images: string[];
  activeImage: string;
  onSelect: (image: string) => void;
};

export const ProductGallery = (props: FeaturedGalleryProps | ProductsGalleryProps) => {
  if (props.variant === "products") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-[2.1fr_1fr] gap-6">
        <div className="rounded-3xl overflow-hidden bg-white shadow-premium border border-stone-200/70">
          <div className="relative aspect-square">
            <Image
              src={props.activeImage}
              alt="Everest Organic Shilajit resin texture"
              fill
              className="object-cover lux-image"
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
          </div>
        </div>
        <div className="space-y-4">
          {props.images.map((image) => (
            <button
              key={image}
              type="button"
              onClick={() => props.onSelect(image)}
              className={`relative aspect-[5/4] min-h-[84px] sm:min-h-[92px] w-full overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft ${
                props.activeImage === image
                  ? "border-primary-600 shadow-premium"
                  : "border-stone-200/70 hover:border-primary-300"
              }`}
            >
              <Image
                src={image}
                alt="Himalayan Shilajit resin close-up"
                fill
                className="object-cover lux-image"
                sizes="(min-width: 1024px) 18vw, 30vw"
              />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-stone-200/60 bg-white/80 backdrop-blur-sm p-6 shadow-soft lg:sticky top-[100px] self-start">
      <div className="group relative aspect-square overflow-hidden rounded-2xl bg-stone-100">
        <Image
          src={props.images[0]}
          alt={props.primaryAlt}
          fill
          className="object-cover lux-image"
          sizes="(min-width: 1024px) 40vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        <div className="absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold text-stone-700 shadow-soft">
          <ZoomIn className="h-3.5 w-3.5 text-stone-500" />
          {props.zoomLabel}
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4">
        {props.images.map((image) => (
          <div
            key={image}
            className="relative aspect-[5/4] min-h-[84px] sm:min-h-[92px] overflow-hidden rounded-2xl border border-stone-200/60 bg-stone-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-300/70 hover:shadow-soft"
          >
            <Image
              src={image}
              alt="Pure Himalayan Shilajit resin texture"
              fill
              className="object-cover lux-image"
              sizes="(min-width: 1024px) 16vw, 32vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
