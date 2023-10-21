import OpenAI from "openai";

export async function POST( req: Request ){
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    
    const { animal } = await req.json()

    const image = await openai.images.generate({ 
        prompt: 
        `A colorful, majestic portrait of a spirit animal in the shape of ${animal[0].name}. The animal is in the foreground with a background of deep blues and greens. 
        For reference, spirit animals look like the images on this website: https://tinyurl.com/3we4vvkz
        The spirit animal's face should be in the center of the image.
        The entire animal's body should be in the image.
        
        If the animal has eyes, their eyes should be open and looking directly at the viewer. 
        Their face shows emotion, primarily empathy and these qualities: ${animal[0].symbolism}
        `,
        n: 1,
        size: "512x512",
    });

    const url = image.data[0].url;

    return new Response(url);
};


    

