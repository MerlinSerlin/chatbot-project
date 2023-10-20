import OpenAI from "openai";

export async function POST( req: Request ){
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const image = await openai.images.generate({ 
        prompt: "a white siamese cat",
        n: 1,
        size: "256x256",
     });

     const url = image.data[0].url;

    //  const data = await fetch(url).json();

    // console.log(data)

    return new Response(url);
};


    

