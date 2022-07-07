import 'antd/dist/antd.css';
import '../styles/globals.scss';
import { Navbar, Sidebar } from '../components';
import { Row, Col } from 'antd';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Row className='contentContainer'>
        <Col 
        span={3}
        >
          <Sidebar />
        </Col>
        <Col
        span={21}
        >
          <Component {...pageProps} />
        </Col>
      </Row>
    </>
  )
}

export default MyApp
