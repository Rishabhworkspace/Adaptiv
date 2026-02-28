import profileData from "@/data/profile.json";

export function Footer() {
    return (
        <footer className="border-t border-white/5 py-8 mt-24">
            <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-4 text-[#8a8a9a] text-sm font-mono">
                <p>© {new Date().getFullYear()} {profileData.name} // SYSTEM_END</p>
                <p>Designing for the future with the raw aesthetics of the past.</p>
            </div>
        </footer>
    );
}
