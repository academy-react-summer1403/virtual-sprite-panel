// ** Icons Imports
import { Award } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardBody, CardText } from 'reactstrap'

// ** Images
import decorationLeft from '@src/assets/images/elements/decore-left.png'
import decorationRight from '@src/assets/images/elements/decore-right.png'

const CardCongratulations = () => {
  return (
    <Card className='card-congratulations'>
      <CardBody className='text-center regYekan'>
       
        <Avatar icon={<Award size={28} />} className='shadow' color='primary' size='xl' />
        <div className='text-center'>
          <h1 className='mb-1 text-white'>به آکادمی Virtual Sprite خوش آمدید</h1>
          <h2 className='mb-1 text-white'>برای دسترسی به هر یک از بخش ها، آن را انتخاب کنید</h2>
          <CardText className='m-auto w-75'>
          
          </CardText>
        </div>
      </CardBody>
    </Card>
  )
}

export default CardCongratulations
