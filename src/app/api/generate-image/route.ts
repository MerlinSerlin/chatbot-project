import OpenAI from "openai";

export async function POST( req: Request ){
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    
    const { animal } = await req.json()

    const image = await openai.images.generate({ 
        prompt: 
        `A spirit animal in the shape of ${animal[0].name} with a colorful background. 
        For reference, spirit animals look like the images on this website: https://stock.adobe.com/search?filters%5Bcontent_type%3Aphoto%5D=0&filters%5Bcontent_type%3Aillustration%5D=1&filters%5Bcontent_type%3Azip_vector%5D=0&filters%5Bcontent_type%3Avideo%5D=0&filters%5Bcontent_type%3Atemplate%5D=0&filters%5Bcontent_type%3A3d%5D=0&filters%5Bcontent_type%3Aaudio%5D=0&filters%5Binclude_stock_enterprise%5D=0&filters%5Bis_editorial%5D=0&filters%5Bfree_collection%5D=0&filters%5Bcontent_type%3Aimage%5D=1&k=%22spirit+animal%22&order=relevance&safe_search=1&limit=100&search_type=filter-select&search_page=1&get_facets=1
        They should be colorful and majestic.

        The animal should be drawn with these attributes in mind:
        symbolism:${animal[0].symbolism}
        when in balance:${animal[0].when_in_balance}
        when out of balance:${animal[0].when_out_of_balance}
        `,
        n: 1,
        size: "512x512",
    });

    const url = image.data[0].url;

    return new Response(url);
};


    

