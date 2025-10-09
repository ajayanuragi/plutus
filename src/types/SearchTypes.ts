export type ResultProp = {
  id: number,
  title: string,
  image: string,
  type: string,
  rating?: number,
  releaseDate: string
}
export type DataProp = {
  results: ResultProp[]
  currentPage: number
  hasNextPage: boolean
  totalResults: number
  totalPages: number
}
