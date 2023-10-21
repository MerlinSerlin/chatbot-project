import OpenAI from "openai";

export async function POST( req: Request ){
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    
    const { animal } = await req.json()

    const image = await openai.images.generate({ 
        prompt: 
        `A majestic spirit animal in the shape of ${animal[0].name} in the foreground with a background of deep blues and greens and warm orange, yellows, and reds. 
        For reference, spirit animals look like the images on this website: https://tinyurl.com/3we4vvkz
        The spirit animal's face should be in the center of the image, and their eyes should be looking directly at the viewer. 
        Their eyes should show emotion, primarily empathy and these qualities: ${animal[0].symbolism}
        `,
        n: 1,
        size: "1024x1024",
    });

    const url = image.data[0].url;

    return new Response(url);
};


    

