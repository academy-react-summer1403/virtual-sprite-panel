import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
} from "reactstrap";
import { User } from "react-feather";
import allUsers from "../../assets/images/portrait/small/all-users.png";
import activeUser from "../../assets/images/portrait/small/active-user.png";

import CardMedal from "../../@core/components/card-medal/CardMedal";
import StatsHorizontal from "../../@core/components/widgets/stats/StatsHorizontal";
import { useState, useEffect } from "react";
import { getTopUsers } from "../../core/services/api/User/userTop.api";

const Dashboard = () => {
  const [count, setCount] = useState();
  const [activeCount, setActiveCount] = useState();

  const fetchData = async () => {
    try {
      // درخواست اولیه برای دریافت totalCount
      const initialParams = {
        PageNumber: 1,
        RowsOfPage: 1, // فقط برای دریافت totalCount
        SortingCol: "DESC",
        SortType: "InsertDate",
      };
      const initialResult = await getTopUsers(initialParams);
      const totalCount = initialResult.totalCount;

      // درخواست دوم برای گرفتن کاربران واقعی
      const params = {
        PageNumber: 1,
        RowsOfPage: totalCount, // استفاده از totalCount به‌عنوان RowsOfPage
        SortingCol: "DESC",
        SortType: "InsertDate",
      };
      const result = await getTopUsers(params);

      // محاسبه تعداد کاربران فعال
      const activeUsersCount = result.listUser.filter(
        (user) => user.active === "True"
      ).length;

      setCount(totalCount); 
      setActiveCount(activeUsersCount);   

      console.log(`تعداد کاربران فعال: ${activeUsersCount}`);
      console.log("تعداد کل کاربران:", totalCount);
    } catch (error) {
      console.error("خطا در دریافت اطلاعات:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="d-flex align-items-center gap-3">
        <StatsHorizontal
          color="primary"
          statTitle="تعداد کل کاربران"
          icon={allUsers}
          renderStats={<h3 className="fw-bolder mb-75">{count}</h3>}
        />
        <StatsHorizontal
          color="primary"
          statTitle="تعداد کاربران فعال"
          icon={activeUser}
          renderStats={<h3 className="fw-bolder mb-75">{activeCount}</h3>}
        />
      </div>
      <CardMedal />
      <Card>
        <CardHeader>
          <CardTitle> </CardTitle>
        </CardHeader>
        <CardBody>
          <CardText></CardText>
          <CardText>
           
            <CardLink
              href="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/documentation/"
              target="_blank"
            >
            </CardLink>
          </CardText>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle> </CardTitle>
        </CardHeader>
        <CardBody>
         
          <CardText>
            <CardLink
              href="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/documentation/docs/development/auth"
              target="_blank"
            >
            </CardLink>{" "}
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default Dashboard;
