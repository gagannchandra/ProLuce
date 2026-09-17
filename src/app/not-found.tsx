import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Compass, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-site flex flex-col items-center justify-center py-24 text-center md:py-32">
      <Card className="max-w-md rounded-2xl border border-border p-8 text-center shadow-lg bg-card">
        <CardContent className="p-0 flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-muted/50 text-foreground mb-4">
            <FileQuestion className="h-6 w-6" />
          </div>

          <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-widest mb-2">
            Error 404 · Unmapped Coordinate
          </Badge>

          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Luminaire Not Found
          </h1>

          <p className="mt-3 text-xs font-mono text-muted-foreground leading-relaxed">
            The architectural specification or page reference you requested could not be resolved in the current catalogue registry.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 w-full">
            <Button asChild variant="outline" size="sm" className="font-mono text-xs uppercase tracking-wider gap-2 rounded-full px-5">
              <Link href="/">
                <Home className="h-3.5 w-3.5" />
                <span>Return to Studio</span>
              </Link>
            </Button>
            <Button asChild size="sm" className="font-mono text-xs uppercase tracking-wider gap-2 rounded-full px-5">
              <Link href="/catalogue">
                <Compass className="h-3.5 w-3.5" />
                <span>Browse Catalogue</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
