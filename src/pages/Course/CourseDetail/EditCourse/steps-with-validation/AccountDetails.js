// ** React Imports
import { Fragment } from 'react'

// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from 'reactstrap'

const defaultValues = {
  zar: '',
  username: '',
  mony: '',
  jalasat: '',
  explane:'',
  small:''
}

const AccountDetails = ({ stepper }) => {
  const SignupSchema = yup.object().shape({
    username: yup.string().required(),
   jalasat: yup.string().required(),
    mony: yup.string().required(),
    explane:yup.string().required(),
    small:yup.string().required(),
   zar: yup
      .string()
      .required()
     
  })

  // ** Hooks

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema)
  })

  const onSubmit = () => {
    if (isObjEmpty(errors)) {
      stepper.next()
    }
  }

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>اضافه کردن اطلاعات دوره</h5>
       
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='username'>
             نام دوره
            </Label>
            <Controller
              id='username'
              name='username'
              control={control}
              render={({ field }) => <Input placeholder='نام دوره را وارد کنید' invalid={errors.username && true} {...field} />}
            />
            {errors.username && <FormFeedback>{errors.username.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='zar'>
             ظرفیت دوره
            </Label>
            <Controller
              control={control}
              id='zar'
              name='zar'
              render={({ field }) => (
                <Input  placeholder='ظرفیت دوره را وارد کنید' invalid={errors.zar && true} {...field} />
              )}
            />
            {errors.zar && <FormFeedback>{errors.zar.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <div className='form-password-toggle col-md-6 mb-1'>
            <Label className='form-label' for='jalasat'>
             تعداد جلسات
            </Label>
            <Controller
              id='jalasat'
              name='jalasat'
              control={control}
              render={({ field }) => <Input  placeholder='  تعداد جلسات دوره را وارد کنید' invalid={errors.jalasat && true} {...field} />}
            />
            {errors.jalasat && <FormFeedback>{errors.jalasat.message}</FormFeedback>}
          </div>
          <div className='form-password-toggle col-md-6 mb-1'>
            <Label className='form-label' for='mony'>
              قیمت دوره
            </Label>
            <Controller
              control={control}
              id='mony'
              name='mony'
              render={({ field }) => <Input  invalid={errors.mony&& true} {...field} />}
            />
            {errors.mony && <FormFeedback>{errors.mony.message}</FormFeedback>}
          </div>
        </Row>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='explane'>
           توضیحات کامل
            </Label>
            <Controller
              id='explane'
              name='explane'
              control={control}
              render={({ field }) => <Input type='textarea' placeholder='توضیحات را وارد کنید' invalid={errors.explane && true} {...field} />}
            />
            {errors.explane && <FormFeedback>{errors.explane.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='small'>
            توضیحات کوچک
            </Label>
            <Controller
              control={control}
              id='small'
              name='small'
              render={({ field }) => <Input type='textarea' invalid={errors.small&& true} {...field} />}
            />
            {errors.small && <FormFeedback>{errors.small.message}</FormFeedback>}
          </Col>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button color='secondary' className='btn-prev' outline disabled>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button>
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default AccountDetails