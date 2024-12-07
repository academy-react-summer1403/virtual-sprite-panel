// ** Reactstrap Imports
import { Card, CardBody, CardText, Button } from 'reactstrap'

// ** Images
import medal from '@src/assets/images/illustration/badge.svg'

const CardMedal = () => {
  return (
    <Card className='card-congratulations-medal w-50'>
      <CardBody>
        <h5>تبریک 🎉 خوش آمدید!</h5>
        <CardText className='font-small-3'></CardText>
        <h3 className='mb-75 mt-2 pt-50'>
          {/* <a href='/' onClick={e => e.preventDefault()}>
          </a> */}
        </h3>
        {/* <Button color='primary'> </Button> */}
        {/* <img className='congratulation-medal' src={medal} alt='Medal Pic' /> */}
      </CardBody>
    </Card>
  )
}

export default CardMedal
