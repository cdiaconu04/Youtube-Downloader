import ytdl from "ytdl-core";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const url = searchParams.get("url");
        
        // If invalid return error
        if (!ytdl.validateURL(url)) { 
            return new Response(JSON.stringify({ error: "Invalid Youtube URL" }), { status: 400 });
        }

        const info = await ytdl.getBasicInfo(url);

        return new Response(JSON.stringify(info), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        })

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "An error occurred" }), { status: 400 });
    }
}
