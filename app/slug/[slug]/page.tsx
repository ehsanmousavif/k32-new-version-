"use client";
import { useEffect, useState } from "react";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function Slug({ params }: PageProps) {
  const slug = params.slug;
  const [showCard, setShowCard] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCardBySlug = async () => {
    console.log(slug, "اینه");
    if (!slug) {
      console.warn("❗ اسلاگ وجود ندارد");
      return;
    }

    try {
      const res = await fetch("/api/internal/get-card-by-slug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        console.warn("⚠️ خطا در دریافت کارت:", data.error || data.message);
        return;
      }

      console.log("✅ کارت دریافت شد:", data.card);
      setShowCard(data.card);
    } catch (err) {
      setLoading(false);
      console.error("⛔ خطا در ارتباط با سرور:", err);
    }
  };

  useEffect(() => {
    fetchCardBySlug();
  }, [params]);

  return <div className="p-4 ">{}</div>;
}
