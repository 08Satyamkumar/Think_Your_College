"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function RankingRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Construct the query string from the search parameters
    const queryString = searchParams.toString();
    const targetUrl = queryString ? `/colleges?${queryString}` : "/colleges";
    router.replace(targetUrl);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] gap-3">
      <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest animate-pulse">Redirecting to colleges list...</p>
    </div>
  );
}

export default function RankingRedirectPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] gap-3">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest animate-pulse">Redirecting...</p>
      </div>
    }>
      <RankingRedirectContent />
    </Suspense>
  );
}
