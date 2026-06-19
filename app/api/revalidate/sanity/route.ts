import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type SanityWebhookPayload = {
  _type?: string;
  slug?: string;
  categorySlug?: string;
};

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { message: "Missing SANITY_REVALIDATE_SECRET" },
      { status: 500 },
    );
  }

  try {
    const { isValidSignature, body } =
      await parseBody<SanityWebhookPayload>(request, secret, true);

    if (!isValidSignature) {
      return NextResponse.json(
        { message: "Invalid webhook signature" },
        { status: 401 },
      );
    }

    if (!body?._type) {
      return NextResponse.json(
        { message: "Missing document type in webhook body" },
        { status: 400 },
      );
    }

    revalidateTag("articles", "max");
    revalidateTag("categories", "max");
    revalidatePath("/insights");
    revalidatePath("/sitemap.xml");

    if (body.slug) {
      revalidateTag(`article:${body.slug}`, "max");
      revalidatePath(`/insights/${body.slug}`);
    }

    if (body.categorySlug) {
      revalidateTag(`category:${body.categorySlug}`, "max");
      revalidatePath(`/insights/category/${body.categorySlug}`);
    }

    return NextResponse.json({
      revalidated: true,
      body,
      now: Date.now(),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown revalidation error";

    return NextResponse.json({ message }, { status: 500 });
  }
}
