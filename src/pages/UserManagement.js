
// ** Third Party Components
import classnames from "classnames";
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
  Form,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardColumns,
  CardText,
  Col,
  Row,
  CardImg,
  Label,
   InputGroup, Input,
   Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select';
import '@styles/react/libs/react-select/_react-select.scss'
import { selectThemeColors } from '@utils'
import { Fragment, useState } from 'react'
const UserManagement = () => {
  const navigate =useNavigate();
  const gotodetail =()=>{
    return (navigate("/user-management-detail"))
  };
 

    const [centeredModal, setCenteredModal] = useState(false)
  
  return(
    <>
    <div className='vertically-centered-modal'>
<Modal isOpen={centeredModal} toggle={() => setCenteredModal(!centeredModal)} className='modal-dialog-centered'>
          <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>لطفا اطلاعات کاربر را وارد نمایید</ModalHeader>
          <ModalBody>
          <Card>
      <CardHeader>
        <CardTitle tag='h4'>Vertical Form</CardTitle>
      </CardHeader>

      <CardBody>
        <Form>
          <Row>
            <Col sm='12' className='mb-1'>
              <Label className='form-label' for='nameVertical'>
               نام
              </Label>
              <Input type='text' name='name' id='nameVertical' placeholder='First Name' />
            </Col>
            <Col sm='12' className='mb-1'>
              <Label className='form-label' for='nameVertical'>
               نام خانوادگی
              </Label>
              <Input type='text' name='lastname' id='nameVertical' placeholder='First Name' />
            </Col>
            <Col sm='12' className='mb-1'>
              <Label className='form-label' for='EmailVertical'>
               ایمیل
              </Label>
              <Input type='email' name='Email' id='EmailVertical' placeholder='Email' />
            </Col>
            <Col sm='12' className='mb-1'>
              <Label className='form-label' for='mobileVertical'>
               شماره موبایل
              </Label>
              <Input type='number' name='mobile' id='mobileVertical' placeholder='Mobile' />
            </Col>
            <Col sm='12' className='mb-1'>
              <Label className='form-label' for='passwordVertical'>
              رمز عبور
              </Label>
              <Input type='password' name='password' id='passwordVertical' placeholder='Password' />
            </Col>
            <Col sm='12' className='mb-1'>
              <div className='form-check'>
                <Input type='checkbox' id='remember-me-vertical' defaultChecked={false} />
                <Label className='form-check-label' for='remember-me-vertical'>
                 مرا به خاطر بسپار
                </Label>
              </div>
            </Col>
            <Col sm='12'>
              <div className='d-flex'>
                <Button className='me-1' color='primary' type='submit' onClick={e => e.preventDefault()}>
                  ثبت
                </Button>
                <Button outline color='secondary' type='reset'>
                  انصراف
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
          </ModalBody>
         
        </Modal>
</div>
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
          <Button color='success' onClick={() => setCenteredModal(!centeredModal)}>
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
    </>
  )
};

export default UserManagement;
