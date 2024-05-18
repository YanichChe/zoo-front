import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import Box from '@mui/material/Box'
import { ChangeEvent, ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import edit from "../../assets/pencil.svg"
import bin from "../../assets/bin.svg"
import styled from "styled-components";

export type Column = {
  label: ReactNode
}

export type TableProps = {
  columns: Column[]
  count?: number
  data: ReactNode[][]
  onPage?: (page: number) => void
  onPageSize?: (pageSize: number) => void
  page?: number
  pageSize?: number
  pageable?: boolean
  onEdit?: any
  onDelete?: any
  id?: string[]
}

export const  Icon = styled.img`;
    height: 35px;
`

export function Table(props: TableProps) {
  const { t } = useTranslation()
  const [page, setPage] = useState(props.page ?? 0)
  const [pageSize, setPageSize] = useState(props.pageSize ?? 10)

  const handleChangePage = (pageNumber: number) => {
    setPage(pageNumber)
    if (props.onPage) props.onPage(pageNumber)
  }
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const pageSize1 = Number.parseInt(event.target.value, 10)
    setPageSize(pageSize1)
    handleChangePage(0)
    if (props.onPageSize) props.onPageSize(pageSize1)
  }

  const handleClick = (index: number) => {
    props.onEdit !== null && props.id!== undefined && props.onEdit(props.id[index])
  }
  
  const handleDeleteClick = (index: number) => {
    // @ts-ignore
    props.onDelete !== null && props.id!== undefined && props.onDelete(props.id[index])
  }

  return (
    <Box style={{ width: '100%' }}>
      <TableContainer style={{ width: '100%' }}>
        <MuiTable>
          <TableHead>
            <TableRow>
              {props.columns.map((column) => (
                <TableCell>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row, rowIndex) => (
              <TableRow>
                {row.map((cell) => (
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                      }}
                    >
                      {cell}
                    </Box>
                    
                  </TableCell>
                ))}
                <Icon src={edit} onClick={() => {
                                handleClick(rowIndex)
                            }}/>
                <Icon src={bin} onClick={() => {
                                handleDeleteClick(rowIndex)
                            }}/>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      {props.pageable && (
        <TablePagination
          component="div"
          count={props.count ?? 10}
          labelRowsPerPage={t('rowsPerPage')}
          onPageChange={(_, pageNumber) => handleChangePage(pageNumber)}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={pageSize}
          rowsPerPageOptions={[10, 25, 50, 100, 500, 1000]}
        />
      )}
    </Box>
  )
}
