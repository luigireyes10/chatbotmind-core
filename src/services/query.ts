import { getConnection, SelectQueryBuilder } from 'typeorm'
import { PaginationLinks, QueryParams, ResponseMetadata } from '../constants/types'

export const paginatedQuery = async <T>(
  queryElement: SelectQueryBuilder<T> | string,
  queryParams: QueryParams
): Promise<[T[], ResponseMetadata]> => {
  const {
    page: pageNumber = 1,
    size: pageSize = 20,
  } = queryParams
  const startPosition = pageSize * (pageNumber - 1)
  const finishPosition = startPosition + pageSize
  const mainQuerySql =
    typeof queryElement === 'string' ? queryElement : queryElement.getSql()
  const paginatedQuerySql = `
      SELECT * FROM (
        SELECT A.*, ROWNUM AS ROW_POS
        FROM (${mainQuerySql}) A
        WHERE ROWNUM <= ${finishPosition}
        ORDER BY ROWNUM ASC)
      WHERE ROW_POS > ${startPosition}
    `

  try {
    const result = await getConnection().query(paginatedQuerySql)
    const [{ ROWCOUNT = 0 }] = await getConnection().query(
      `SELECT COUNT(*) AS ROWCOUNT from (${mainQuerySql})`
    )
    const totalPages = Math.ceil(ROWCOUNT / pageSize)
    const meta = getQueryMetadata(
      result.length,
      totalPages,
      queryParams,
      ROWCOUNT
    )

    return [result, meta]
  } catch (e) {
    console.log(e)
  }
}


const getQueryMetadata = (
  resultCount: number,
  totalPages: number,
  queryParams: QueryParams,
  totalRows: number
): ResponseMetadata => {
  const { page: pageNumber, size: pageSize } = queryParams

  return {
    pagination: {
      currentPage: pageNumber,
      totalPages,
      totalRows,
      pageSize,
      count: resultCount,
      links: getPaginationLinks(totalPages, queryParams),
    },
  }
}

const getPaginationLinks = (
  totalPages: number,
  queryParams: QueryParams
): PaginationLinks => {
  const { page: pageNumber } = queryParams
  const hasNextPage = pageNumber < totalPages
  const hasPreviousPage =
    pageNumber > 1 && pageNumber <= totalPages

  return {
    nextPage: hasNextPage ? getNextPageUrl(queryParams) : null,
    previousPage: hasPreviousPage ? getPreviousPageUrl(queryParams) : null,
  }
}

const getPreviousPageUrl = (queryParams: QueryParams): string => {
  return generateUrl({ ...queryParams, page: queryParams.page - 1 })
}

const getNextPageUrl = (queryParams: QueryParams): string => {
  return generateUrl({ ...queryParams, page: queryParams.page + 1 })
}

const generateUrl = (queryParams: QueryParams): string => {
  const params = Object.entries(queryParams).map(
    ([key, value]) => `${key}=${value}`
  )

  return `?${params.join('&')}`
}
