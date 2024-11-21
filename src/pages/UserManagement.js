import { Fragment, useEffect, useState } from "react";
// ** Third Party Components
import classnames from "classnames";
import {  Check, Twitter } from 'react-feather';
import { Search } from 'react-feather'
// ** Reactstrap Imports
import {
  Nav,
  TabPane,
  NavItem,
  NavLink,
  Dropdown,
  TabContent,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Table,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardColumns,
  CardText,
  Col,
  Row,
  CardImg,
  Button,
  Label,
   InputGroup, Input,
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select'
import '@styles/react/libs/react-select/_react-select.scss'
import { selectThemeColors } from '@utils'
const UserManagement = () => {
  const navigate =useNavigate();
  const gotodetail =()=>{
    return (navigate("/user-management-detail"))
  }
  return(
    <Col>
    <Row lg={3}>
    <Col md='4' className='mb-1'>
            <Label className='form-label' for='level'>
          نقش
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`level`}
              className='react-select'
              classNamePrefix='select'
              // options={termOptions}
           
            />
          </Col>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='level'>
            وضعیت
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`level`}
              className='react-select'
              classNamePrefix='select'
              // options={termOptions}
           
            />
          </Col>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='level'>
           مرتب سازی
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`level`}
              className='react-select'
              classNamePrefix='select'
              // options={termOptions}
           
            />
          </Col>
    </Row>
    <Col className="mt-1" >
    <Row lg={4} className="justify-content-between">
    <Col lg={2} className='mb-1'>
            <Label className='form-label' for='level'>
         نمایش
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`level`}
              className='react-select'
              classNamePrefix='select'
              // options={termOptions}
           
            />
          </Col>
          <Col lg={7}>
          <Row>
          <Col className='mt-2' lg={8}>
        <InputGroup>
          <Button color='success' outline>
            <Search size={12} />
          </Button>
          <Input type='text' placeholder='Button on both sides' />
          <Button color='success' outline>
            Search !
          </Button>
        </InputGroup>
      </Col>
          <Col lg={4} className='mt-2'>
          <Button color='success' >
            اضافه کردن کاربر جدید
          </Button>
          
          </Col>
          </Row>
          </Col >
 
    </Row>
    <Table className='text-nowrap text-center border-bottom' responsive>
        <thead>
          <tr>
            <th className='text-start'> کاربر </th>
            <th> نام کاربر</th>
            <th>نقش </th>
            <th>ایمیل </th>
            <th>درصد تکمیل پروفایل </th>
            <th>وضعیت </th>
            <th>جزییات </th>
          </tr>
        </thead>
        <tbody>
        <tr >
                <td className='text-start'> m ,m</td>
                <td>
               0 
                </td>
                <td>
      تننتتن
                 
                </td>
                <td>
      تات
                 
                </td>
                <td>
      اتات
                 
                </td>
                <td>
   تننتن
                 
                </td>
                <td onClick={gotodetail}>
  ...
                 
                </td>
              </tr>
        </tbody>
        </Table>
    
    </Col>
    </Col>
  )
};

export default UserManagement;
