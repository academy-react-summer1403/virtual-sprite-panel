import { Fragment, useState, memo } from 'react'
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col } from 'reactstrap'

const TableAdvSearch = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(7)
  const [searchValue, setSearchValue] = useState('')

  // Filter data based on search value
  const filteredData = data?.filter(item =>
    item.fullName.toLowerCase().includes(searchValue.toLowerCase())
  ) || []

  const handleFilter = e => {
    setSearchValue(e.target.value)
  }

  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
  }

  const handlePerPage = e => {
    setRowsPerPage(parseInt(e.target.value))
  }

  const dataToRender = () => {
    return filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
  }

  const CustomPagination = () => {
    const count = Math.ceil(filteredData.length / rowsPerPage)
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        breakLabel='...'
        pageCount={count || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName='page-item'
        breakClassName='page-item'
        nextLinkClassName='page-link'
        pageLinkClassName='page-link'
        breakLinkClassName='page-link'
        previousLinkClassName='page-link'
        nextClassName='page-item next-item'
        previousClassName='page-item prev-item'
        containerClassName={
          'pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
        }
      />
    )
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Server Side</CardTitle>
        </CardHeader>
        <Row className='mx-0 mt-1 mb-50'>
          <Col sm='6'>
            <div className='d-flex align-items-center'>
              <Label for='sort-select'>show</Label>
              <Input
                className='dataTable-select'
                type='select'
                id='sort-select'
                value={rowsPerPage}
                onChange={handlePerPage}
              >
                <option value={7}>7</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
              </Input>
              <Label for='sort-select'>entries</Label>
            </div>
          </Col>
          <Col className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1' sm='6'>
            <Label className='me-1' for='search-input'>
              Search
            </Label>
            <Input
              className='dataTable-filter'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <div className='react-dataTable'>
          <DataTable
            noHeader
            pagination
            paginationServer
            className='react-dataTable'
            columns={[
              { name: 'نام دوره', selector: row => row.fullName, sortable: true },
              { name: 'شناسه دوره', selector: row => row.courseId, sortable: true }
              // سایر ستون‌ها را در صورت نیاز اضافه کنید
            ]}
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            data={dataToRender()}
            noDataComponent={<p>هیچ داده‌ای برای نمایش وجود ندارد</p>}
          />
        </div>
      </Card>
    </Fragment>
  )
}

export default memo(TableAdvSearch)
