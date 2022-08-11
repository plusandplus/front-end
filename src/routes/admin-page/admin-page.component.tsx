import {
  AdminIcon,
  AdminInfo,
  GreetingText,
  ContentContainer,
  Content,
} from './admin-page.style';
import { ROUTES } from '../../routes/routes';
import { VscCalendar } from 'react-icons/vsc';
import { FiUsers } from 'react-icons/fi';
import { MdOutlineHotel } from 'react-icons/md';
import { BiCategory } from 'react-icons/bi';
import { AiOutlineNotification } from 'react-icons/ai';

export default function Admin(): JSX.Element {
  return (
    <div>
      <AdminInfo>
        <GreetingText>관리자 페이지</GreetingText>
        <AdminIcon />
      </AdminInfo>
      {/* <AdminContent>
        <ContentItem to={ROUTES.USERLIST.path}>
          <FiUsers className="icon" />
          <IconText>유저</IconText>
        </ContentItem>
        <ContentItem to={ROUTES.BOOKINGLIST.path}>
          <VscCalendar className="icon" />
          <IconText>예약</IconText>
        </ContentItem>
        <ContentItem to={ROUTES.ROOMLIST.path}>
          <MdOutlineHotel className="icon" />
          <IconText>숙소</IconText>
        </ContentItem>
      </AdminContent> */}
      <ContentContainer>
        <Content to={ROUTES.USERLIST.path}>
          <FiUsers className="icon" />
          <span>유저</span>
        </Content>
        <Content to={ROUTES.BOOKINGLIST.path}>
          <VscCalendar className="icon" />
          <span>예약</span>
        </Content>
        <Content to={ROUTES.ROOMLIST.path}>
          <MdOutlineHotel className="icon" />
          <span>숙소</span>
        </Content>
        <Content to={ROUTES.ADMIN_CATEGORY.path}>
          <BiCategory className="icon" />
          <span>카테고리</span>
        </Content>
        <Content to={ROUTES.ADMIN_CATEGORY.path}>
          <AiOutlineNotification className="icon" />
          <span>이벤트</span>
        </Content>
      </ContentContainer>
    </div>
  );
}
