"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="rounded-lg border bg-card p-6">
            <div className="text-lg font-semibold">Unexpected error</div>
            <div className="mt-2 text-sm text-muted-foreground">
              Please refresh or try again.
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => location.reload()}
              >
                Reload
              </Button>
              <Button type="button" variant="outline" onClick={reset}>
                Try again
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
