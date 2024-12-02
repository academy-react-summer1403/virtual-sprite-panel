// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Third Party Components
import axios from "axios";

// ** Custom Components
import UILoader from "@components/ui-loader";
import Breadcrumbs from "@components/breadcrumbs";

// ** Reactstrap Imports
import { Row, Col, Button } from "reactstrap";

// ** Demo Components
import ProfilePoll from "../UserProfile/ProfilePolls";
import ProfileAbout from "../UserProfile/ProfileAbout";
// import ProfilePosts from "../UserProfile/ProfilePosts";
import ProfileHeader from "../UserProfile/ProfileHeader";
import ProfileTwitterFeeds from "../UserProfile/ProfileTwitterFeeds";
// import ProfileLatestPhotos from "../UserProfile/ProfileLatestPhotos";
// import ProfileSuggestedPages from "../UserProfile/ProfileSuggestedPages";
import ProfileFriendsSuggestions from "../UserProfile/ProfileFriendsSuggestions";

// ** Styles
import "../../@core/scss/base/pages/page-profile.scss";

const UserProfile = () => {
  // ** States
  // const [data, setData] = useState(null)
  const [block, setBlock] = useState(false)

  const handleBlock = () => {
    setBlock(true)
    setTimeout(() => {
      setBlock(false)
    }, 2000)
  }

  // useEffect(() => {
  //   axios.get('/profile/data').then(response => setData(response.data))
  // }, [])
  return (
    <Fragment>
      {/* <Breadcrumbs title='Profile' /> */}
      {/* {data !== null ? ( */}
        <div id='user-profile'>
          <Row>
            <Col sm='12'>
              <ProfileHeader  />
            </Col>
          </Row>
          <section id='profile-info'>
            <Row>
              <Col lg={{ size: 3, order: 1 }} sm={{ size: 12 }} xs={{ order: 2 }}>
                <ProfileAbout  />
                {/* <ProfileSuggestedPages /> */}
                <ProfileTwitterFeeds />
              </Col>
              <Col lg={{ size: 6, order: 2 }} sm={{ size: 12 }} xs={{ order: 1 }}>
                {/* <ProfilePosts  /> */}
              </Col>
              <Col lg={{ size: 3, order: 3 }} sm={{ size: 12 }} xs={{ order: 3 }}>
                {/* <ProfileLatestPhotos  /> */}
                {/* <ProfileFriendsSuggestions  /> */}
                {/* <ProfilePoll /> */}
              </Col>
            </Row>
            <Row>
              <Col className='text-center' sm='12'>
                <Button color='primary' className='border-0 mb-1 profile-load-more' size='sm' onClick={handleBlock}>
                  <UILoader blocking={block} overlayColor='rgba(255,255,255, .5)'>
                    <span> Load More</span>
                  </UILoader>
                </Button>
              </Col>
            </Row>
          </section>
        </div>
      {/* ) : null} */}
    </Fragment>
  )
}
// const UserProfile = () => {

//   return(
//       <>
//   hello
//   </>
//   )

// };

export default UserProfile;
