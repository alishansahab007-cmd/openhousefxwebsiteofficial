"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, type ReactNode } from "react";

const POLICY_ROUTES = new Set(["/privacy-policy", "/terms-and-conditions", "/sms-terms"]);
let pendingPolicy: string | null = null;

function cancelArrival() {
  pendingPolicy = null;
  window.removeEventListener("popstate", cancelArrival);
}

function showPolicyStart() {
  // An explicit route arrival must not inherit the global smooth hash scroll.
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  document.querySelector<HTMLElement>("[data-policy-content] h1")?.focus({ preventScroll: true });
}

export function NavigationLink({ href, children, className }: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const pathname = usePathname();

  // Native same-document fragments support repeated clicks and smooth scrolling.
  // Other routes use the App Router, retaining the shared welcome/ambient layout.
  if (pathname === "/" && href.startsWith("/#")) {
    return <a href={href} className={className}>{children}</a>;
  }

  return (
    <Link href={href} className={className} scroll={true}
      onClick={(event) => {
        if (pathname !== href || !POLICY_ROUTES.has(href) || event.button !== 0 ||
          event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        showPolicyStart();
      }}
      onNavigate={() => {
        if (!POLICY_ROUTES.has(href)) return;
        pendingPolicy = href;
        // A history traversal cancels an unfinished click, never overriding Back.
        window.addEventListener("popstate", cancelArrival, { once: true });
      }}
    >{children}</Link>
  );
}

export function PolicyArrival({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (pendingPolicy !== pathname) return;
    cancelArrival();
    showPolicyStart();
  }, [pathname]);

  return <article data-policy-content className="policy-content mx-auto max-w-3xl">{children}</article>;
}
