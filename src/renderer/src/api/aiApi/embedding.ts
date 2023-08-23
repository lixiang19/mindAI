import api from './modelApi'
let searchable_id = ''
export async function saveEmbeddings(text: string): Promise<void> {
  const embeddingResponse = await api.embeddings({
    input: text
  })
  console.log('🚀 ~ file: embedding.ts:6 ~ embeddings ~ ret:', embeddingResponse)

  const embedding = embeddingResponse.data[0].embedding
  const res = await api.vectorSave({
    embedding: embedding,
    text: text,
    meta: '测试数据'
  })
  console.log('🚀 ~ file: embedding.ts:15 ~ saveEmbeddings ~ res:', res)
  searchable_id = res.searchable_id
}
export async function searchEmbeddings(text: string): Promise<void> {
  const embeddingResponse = await api.embeddings({
    input: text
  })

  const embedding = embeddingResponse.data[0].embedding
  const searchResponse = await api.vectorSearch({
    embedding: embedding,
    searchable_id: searchable_id
  })
  console.log('🚀 ~ file: embedding.ts:6 ~ embeddings ~ ret:', searchResponse)
}
