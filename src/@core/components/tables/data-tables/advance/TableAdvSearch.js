import { Fragment, useState, useEffect, memo } from "react";
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import ComponentSpinner from "../../../spinner/Loading-spinner";
import {
  Card,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";

const TableAdvSearch = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [searchValue, setSearchValue] = useState("");
  const [searchField, setSearchField] = useState("title"); // حالت جدید برای تعیین فیلد جستجو
  const [filteredData, setFilteredData] = useState(data); // ذخیره داده‌های فیلتر شده
  const [isSearching, setIsSearching] = useState(false); // برای نمایش وضعیت جستجو

  useEffect(() => {
    setIsSearching(true); // فعال کردن حالت جستجو (برای نمایش Spinner)

    const newFilteredData =
      data?.filter((item) => {
        if (searchField === "isActive") {
          // تبدیل مقدار جستجو به مقدار بولی در صورت مطابقت با "فعال" یا "غیرفعال"
          const isActiveSearchValue =
            searchValue.toLowerCase() === "فعال"
              ? true
              : searchValue.toLowerCase() === "غیرفعال"
              ? false
              : null;

          // اگر مقدار جستجو معتبر نباشد، داده‌ها فیلتر نشوند
          if (isActiveSearchValue === null) return true;
          return item.isActive === isActiveSearchValue;
        } else if (searchField === "isdelete") {
          // تبدیل مقدار جستجو به مقدار بولی برای "موجود" و "حذف شده"
          const isDeleteSearchValue =
            searchValue.toLowerCase() === "موجود"
              ? false
              : searchValue.toLowerCase() === "حذف شده"
              ? true
              : null;

          // اگر مقدار جستجو معتبر نباشد، داده‌ها فیلتر نشوند
          if (isDeleteSearchValue === null) return true;
          return item.isdelete === isDeleteSearchValue;
        }

        // برای سایر فیلدها جستجوی رشته‌ای انجام می‌شود
        return item[searchField]
          ?.toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      }) || [];

    setFilteredData(newFilteredData); // به‌روزرسانی داده‌های فیلتر شده
    setIsSearching(false); // غیرفعال کردن حالت جستجو (برای توقف نمایش Spinner)
  }, [searchValue, searchField, data]); // هر بار که مقدار جستجو یا فیلد جستجو تغییر کند، فیلتر انجام می‌شود

  const handleFilter = (e) => {
    setSearchValue(e.target.value); // بروزرسانی مقدار جستجو
  };

  const handleFieldChange = (e) => {
    setSearchField(e.target.value); // تعیین فیلد جستجو از انتخاب کاربر
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  const dataToRender = () => {
    return filteredData.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
  };

  const CustomPagination = () => {
    const count = Math.ceil(filteredData.length / rowsPerPage);
    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        breakLabel="..."
        pageCount={count || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName="page-item"
        breakClassName="page-item"
        nextLinkClassName="page-link"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextClassName="page-item next-item"
        previousClassName="page-item prev-item"
        containerClassName={
          "pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
        }
      />
    );
  };

  return (
    <Fragment>
      <Card>
        {/* <CardHeader className="border-bottom"> */}
          {/* <CardTitle tag="h4">Server Side</CardTitle> */}
        {/* </CardHeader> */}
        <Row className="mx-0 mt-1 mb-50">
          <Col sm="4" className="d-flex align-items-center">
            <Col sm="4" className="text-center">
              <Label for="sort-select">مرتب سازی</Label>
            </Col>
            <Col sm="4">
              <Input
                className="dataTable-select"
                type="select"
                id="sort-select"
                value={rowsPerPage}
                onChange={handlePerPage}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </Input>
            </Col>
            <Col sm="4" className="text-center">
              <Label for="sort-select">entries</Label>
            </Col>
          </Col>

          <Col sm="4" className="d-flex align-items-center">
            <Label
              for="field-select"
              className="me-2 mb-0 w-auto d-inline-block"
            >
              جستجو بر اساس
            </Label>
            <Input
              type="select"
              id="field-select"
              value={searchField}
              onChange={handleFieldChange}
              className="w-auto d-inline-block"
            >
              <option value="title">عنوان دوره</option>
              <option value="typeName">نوع دوره</option>
              <option value="levelName">سطح دوره</option>
              <option value="isActive">وضعیت دوره</option>
              <option value="isdelete">وضعیت موجود بودن</option>
            </Input>
          </Col>

          <Col
            className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1"
            sm="4"
          >
            <Label className="me-1" for="search-input">
              جستجو
            </Label>
            <Input
              className="dataTable-filter w-auto"
              type="text"
              bsSize="sm"
              id="search-input"
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>

        <div className="react-dataTable">
          <DataTable
            noHeader
            pagination
            paginationServer
            className="react-dataTable"
            columns={[
              {
                name: "عنوان دوره",
                selector: (row) => row.title,
                sortable: true,
              },
              {
                name: "نوع دوره",
                selector: (row) => row.typeName,
                sortable: true,
              },
              {
                name: "سطح دوره",
                selector: (row) => row.levelName,
                sortable: true,
              },
              {
                name: "وضعیت فعال بودن",
                selector: (row) => {
                  const status = row.isActive ? "فعال" : "غیرفعال";
                  const statusColor = row.isActive ? "green" : "red"; // رنگ سبز برای فعال، قرمز برای غیرفعال
                  return <span style={{ color: statusColor }}>{status}</span>;
                },
                sortable: true,
              },
              {
                name: "وضعیت موجود بودن",
                selector: (row) => {
                  const status = row.isdelete ? "حذف شده" : "موجود";
                  const statusColor = row.isdelete ? "red" : "blue"; // رنگ قرمز برای حذف شده، آبی برای موجود
                  return (
                    <span style={{ color: statusColor }}>
                      {status}
                    </span>
                  );
                },
                sortable: true,
              }
              ,
            ]}
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            data={dataToRender()}
            noDataComponent={
              <p>
                {isSearching ? (
                  <ComponentSpinner />
                ) : (
                  <span>داده‌ای برای نمایش وجود ندارد.</span>
                )}
              </p>
            }
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default memo(TableAdvSearch);
