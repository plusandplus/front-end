import Container from '../../components/container/container.component';
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';

export default function Home(): JSX.Element {
  return (
    <Container>
      <div>
        <Header></Header>
        <span>메인 화면입니다요~</span>
        <Footer></Footer>
      </div>
    </Container>
  );
}
