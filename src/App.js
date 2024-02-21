import React, { useEffect, useState } from 'react';//import UseState dan useEffect
import './App.css';
import { Button, Container, Row, Col } from 'react-bootstrap'; // Mengimpor komponen-komponen dari react-bootstrap
import Select from 'react-select'; // Mengimpor komponen Select dari react-select

function App() {
  const [datas, setDatas] = useState([]); // State untuk menyimpan data buah-buahan
  const [userSelect, setUserSelect] = useState(""); // State untuk menyimpan pilihan pengguna
  const [isShow, setIsShow] = useState(false); // State untuk menentukan apakah tombol ditampilkan atau disembunyikan

  // Fungsi untuk mengambil data karakter pokemon dari API PokeAPI
  const getBerries = async () => {
    const berries = await fetch("https://pokeapi.co/api/v2/berry/");
    const value = await berries.json();

    // Mengubah format data menjadi format yang diinginkan untuk komponen Select
    const result = value.results.map(data => ({
      label: data.name,
      value: data.name
    }));

    // Mengatur data  karakter pokemon dan mengurutkannya berdasarkan nama
    setDatas(result.sort((a, b) => a.label.localeCompare(b.label)));
  };

  // untuk menjalankan fungsi getBerries saat komponen dimuat
  useEffect(() => {
    getBerries();
  }, []);

  // buat fungsi Handler untuk mengatur apakah tombol ditampilkan atau disembunyikan
  const handleSubmit = () => {
    setIsShow(state => !state);
  };

  // Handler untuk mengatur pilihan pengguna
  const handleChange = (value) => {
    setUserSelect(value);
  };

  return (
    <Container className="App">
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          {/* Menampilkan teks sesuai dengan pilihan pengguna */}
          <h1 className="text-primary">{isShow ? userSelect : ""}</h1>
          <br/>
          {/* Tombol untuk menampilkan atau menyembunyikan teks */}
          <Button variant="btn-primary" onClick={handleSubmit} disabled={!userSelect}>
            {isShow ? "Hide button" : "Show button"}
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-3">
        <Col md={6}>
          {/* Komponen Select untuk memilih karakter pokemon,dimana akan dieksekusi berdasarkan use state yang telah didefinisikan */}
          <Select options={datas} onChange={(e) => handleChange(e.value)} placeholder="Select your pokemon character in here..." />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
