const {PineConeIndex}= require('./ConfigPineCone')

const ExtracObjVector= async (TextEmbedding)=>{
    const result = await PineConeIndex.query({
        vector: TextEmbedding,
        topK: 4,
        includeMetadata: true,
        includeValues: true
    })
    const content = result.matches.map(match => match.metadata.obj).join('. ');
    return content;
}

module.exports={
    ExtracObjVector
}