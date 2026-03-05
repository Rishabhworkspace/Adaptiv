import { connectDB } from "@/lib/mongoose";
import Portfolio from "@/lib/models/Portfolio";
import { getTemplateById } from "@/data/templates";
import { PortfolioRenderer } from "@/components/templates/PortfolioRenderer";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    await connectDB();
    const portfolio = await Portfolio.findOne({ slug: id }).lean();

    if (!portfolio) {
        return { title: "Portfolio Not Found" };
    }

    const inputs = portfolio.inputs as { profile?: { name?: string; title?: string } };
    const name = inputs?.profile?.name || "Portfolio";
    const title = inputs?.profile?.title || "";

    return {
        title: `${name} — ${title || "Portfolio"}`,
        description: `${name}'s professional portfolio${title ? ` — ${title}` : ""}`,
        openGraph: {
            title: `${name} — ${title || "Portfolio"}`,
            description: `${name}'s professional portfolio`,
            type: "website",
        },
    };
}

export default async function PublicPortfolioPage({ params }: Props) {
    const { id } = await params;
    await connectDB();

    const portfolio = await Portfolio.findOne({ slug: id }).lean();

    if (!portfolio) {
        notFound();
    }

    const template = getTemplateById(portfolio.templateId);
    if (!template) {
        notFound();
    }

    return (
        <PortfolioRenderer
            template={template}
            inputs={portfolio.inputs as Record<string, unknown>}
        />
    );
}
