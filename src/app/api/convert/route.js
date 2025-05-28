import ytdl from "ytdl-core";

export async function POST(req) {
    try {
        const { url } = await req.json();

        // If invalid return error
        if (!ytdl.validateURL(url)) { 
            return new Response(JSON.stringify({ error: "Invalid Youtube URL" }), { status: 400 });
        }

        const info = await ytdl.getInfo(url);

        const format = ytdl.chooseFormat(info.formats, {
            quality: "highestaudio",
            filter: "audioonly"
        });

        const info2 = await ytdl.downloadFromInfo(info, {
            format: format
        });

        return new Response(info2, {
            status: 200,
            headers: {
                "Content-Type": audioFormat.mimeType || "audio/webm",
                "Content-Disposition": `attachment; filename="${title}.webm"`
            }
        });

    } catch (error) {
        console.error(error);
    }
}

