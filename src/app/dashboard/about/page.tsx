"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();
  const handleShop = () => {
    router.push("/dashboard/shop");
  };
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          About Office Assist
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Welcome to{" "}
          <span className="font-semibold text-gray-800">Office Assist</span>,
          your one-stop shop for premium office appliances and accessories. We
          are dedicated to helping you create a productive, efficient, and
          inspiring workspace.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section 1: Our Mission */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600">
              At Office Assist, we strive to make workspaces more functional and
              enjoyable. Whether you're outfitting your home office or upgrading
              your corporate setup, we offer the best products to meet your
              needs and elevate your workspace.
            </p>
          </div>

          {/* Section 2: What We Offer */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              What We Offer
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>High-quality office appliances and furniture</li>
              <li>Affordable pricing with regular discounts</li>
              <li>Exceptional customer service and support</li>
              <li>Fast and reliable shipping</li>
            </ul>
          </div>
        </div>

        {/* Section: Why Choose Us */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Why Choose Office Assist?
          </h2>
          <p className="text-gray-600">
            With years of experience in the industry, we understand the needs of
            modern professionals. Our curated collection is carefully selected
            to ensure top-notch quality, functionality, and style. Trust us to
            be your partner in building the perfect workspace.
          </p>
        </div>

        {/* Section: Call to Action */}
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Ready to transform your workspace?
          </h3>
          <p className="text-gray-600 mb-4">
            Discover the latest office solutions tailored for your success.
          </p>
          <Button onClick={handleShop}> Shop Now</Button>
        </div>
      </div>
    </div>
  );
}
