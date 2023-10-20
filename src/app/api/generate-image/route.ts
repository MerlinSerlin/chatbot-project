import OpenAI from "openai";

export async function POST( req: Request ){
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    
    const { animal } = await req.json()

    // console.log(animal[0]);

    const image = await openai.images.generate({ 
        prompt: `a spirit animal in the shape of a ${animal[0].name}`,
        n: 1,
        size: "256x256",
    });

    const url = image.data[0].url;

    return new Response(url);
};


    

