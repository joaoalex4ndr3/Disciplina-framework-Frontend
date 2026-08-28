import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Badge,
  Grid,
  Container,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";

export default function App() {
  const [products, setProducts] = useState([]); // State untuk simpan semua data produk

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data); // Simpan semua data produk ke state
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts(); // Ambil data saat komponen pertama kali di-render
  }, []);

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <Container>
      <AppBar position="static" color="primary">
        <Toolbar className="flex justify-between">
          <Typography variant="h6">Nagi Store</Typography>
          <Badge badgeContent={cart.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </Toolbar>
      </AppBar>

      <Grid container spacing={4} style={{ marginTop: "20px" }}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <Card style={{ padding: "20px" }}>
              <CardContent>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
                <Typography variant="h6" style={{ marginTop: "10px" }}>
                  {product.title}
                </Typography>
                <Typography color="textSecondary" noWrap>
                  {product.description}
                </Typography>
                <Typography variant="h5" style={{ marginTop: "10px" }}>
                  ${product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: "15px" }}
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <AppBar
        position="fixed"
        color="default"
        style={{ top: "auto", bottom: 0 }}
      >
        <Toolbar className="flex justify-between">
          <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
          <Button variant="contained" color="secondary">
            Checkout
          </Button>
        </Toolbar>
      </AppBar>
    </Container>
  );
}
