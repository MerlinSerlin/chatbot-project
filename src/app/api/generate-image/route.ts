import OpenAI from "openai";

export async function POST( req: Request ){
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const image = await openai.images.generate({ 
        prompt: "a white siamese cat",
        n: 1,
        size: "1024x1024",
     });

     const url = image.data[0].url;

     console.log(url)

    // console.log(image.data);

    return new Response();
}