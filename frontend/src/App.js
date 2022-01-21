import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./App.css";

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import PageHeader from "./components/PageHeader";

function App() {
  const { Header, Content, Footer } = Layout;
  return (
    
    <BrowserRouter>
    
      <Layout >
        <Header>
          <PageHeader />
        </Header>
        <Content style={{ flexGrow: "1", padding: "50px", height: "86vh" }}>
          <div>
            <Routes>
              <Route exact path="/" element={<MainPage />} />
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/register" element={<RegisterPage />} />
              <Route exact path="/portfolio" element={<UserPage />} />
              <Route exact path="/admin" element={<AdminPage />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ 
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100%',
            textAlign: 'center',
            display: 'flex',}}
        >
          Virtuaalraha
        </Footer >
      </Layout>
      
    </BrowserRouter>
    
  );
}

export default App;
