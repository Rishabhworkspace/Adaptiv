export default function PortfolioLoading() {
    return (
        <main className="container-custom pt-24 min-h-screen">
            <section className="pt-40 pb-20 min-h-[90vh]">
                <div className="max-w-4xl w-full mx-auto space-y-6">
                    {/* Title skeleton */}
                    <div className="h-4 w-32 bg-accent/20 rounded animate-pulse" />
                    <div className="h-16 w-3/4 bg-bg-secondary rounded-lg animate-pulse" />
                    <div className="h-16 w-1/2 bg-bg-secondary rounded-lg animate-pulse" />
                    <div className="h-6 w-2/3 bg-bg-secondary/60 rounded animate-pulse mt-6" />
                    <div className="flex gap-4 mt-8">
                        <div className="h-12 w-40 bg-bg-secondary rounded-lg animate-pulse" />
                        <div className="h-12 w-48 bg-bg-secondary rounded-lg animate-pulse" />
                    </div>
                </div>
            </section>
        </main>
    );
}
