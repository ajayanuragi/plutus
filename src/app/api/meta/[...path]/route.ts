import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    const { path } = await params;
    const searchParams = request.nextUrl.searchParams.toString();
    const backendApi = process.env.BACKEND_API;

    if (!backendApi) {
        return NextResponse.json({ error: "Backend API URL not configured" }, { status: 500 });
    }

    const targetUrl = `${backendApi}/${path.join("/")}${searchParams ? `?${searchParams}` : ""}`;

    try {
        const response = await fetch(targetUrl, {
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `Backend responded with status: ${response.status}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Proxy error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
