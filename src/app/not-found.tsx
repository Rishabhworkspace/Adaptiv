import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center section-padding">
            <div className="container-custom max-w-lg text-center space-y-6">
                <p className="font-mono text-accent text-sm tracking-widest">/// 404</p>
                <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-accent/20">
                    404
                </h1>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight -mt-4">
                    Page not found.
                </h2>
                <p className="text-secondary text-lg leading-relaxed">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                    <Link href="/" className="minimal-button primary px-6 py-3">
                        Go Home
                    </Link>
                    <Link href="/portfolio" className="minimal-button outline px-6 py-3">
                        View Portfolio
                    </Link>
                </div>
            </div>
        </main>
    );
}
