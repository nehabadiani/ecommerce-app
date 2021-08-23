import { useState, useEffect } from "react";
import Butter from "buttercms";
import { Card, Layout, Space, Statistic } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./App.css";
import CustomButton from "./components/custom-button";

const { Content } = Layout;

const butter = Butter(process.env.REACT_APP_BUTTER_ECOMMERCE);
const { Meta } = Card;
function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await butter.content.retrieve(["cookies"], {
        order: "name",
      });
      const { data } = await res.data;
      const allProducts = data.cookies;
      setProducts(allProducts);
    }
    fetchData();
  }, []);
  return (
    <Layout style={{ backgroundColor: "#fff" }}>
      <div
        style={{
          borderBottom: "1px solid grey",
          height: "10vh",
          display: "flex",
          alignItems: "center",
          padding: 20,
        }}
      >
        <h1 style={{ display: "inline" }}>Cookie Jar</h1>
        <CustomButton
          className="snipcart-checkout"
          style={{ float: "right", position: "absolute", right: 20 }}
          text="View Cart"
          block={false}
          icon={<ShoppingCartOutlined />}
        />
      </div>
      <Content style={{ padding: 20 }}>
        {products.map((product) => (
          <Card
            title={`${product.name}`}
            hoverable
            style={{ display: "inline-block", width: 270, marginLeft: 50, marginBottom: 10}}
            cover={<img alt={`${product.name}`} src={product.image} />}
          >
            <Space direction="vertical" size="large">
              <Meta
                // title={product.name}
                description={product.description}
                style={{height: 110}}
              />
              <Statistic value={`$${product.price}`} />
              <CustomButton
                icon={<ShoppingCartOutlined />}
                text="Add to Cart"
                product={product}
                className="snipcart-add-item"
                data-item-id={product.id}
                data-item-image={product.image}
                data-item-name={product.name}
                data-item-url="/"
                data-item-description={product.description}
                data-item-price={product.price}
                block={true}
                style={{}}
              />
            </Space>
          </Card>
        ))}
      </Content>
    </Layout>
  );
}

export default App;
