import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { format } from "date-fns";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DetailModal from "./DetailModal";
import Container from "@mui/material/Container";
import NubePalabras from "./NubePalabras";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Barras from "./Barras.jsx";

function Tabla() {
  const [licit, setLicit] = useState([]);
  const [details, setDetails] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const endpoint =
    "https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?ticket=54296D76-CAFF-4964-886F-35E9223D30B4&estado=activas";

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(endpoint);

      const filteredLicit = response.data.Listado.filter(
        (item) => item.FechaCierre !== null
      );

      const sortedLicit = filteredLicit.sort(
        (a, b) => new Date(a.FechaCierre) - new Date(b.FechaCierre)
      );

      setLicit(sortedLicit);
    } catch (error) {
      console.error("Error al obtener datos de la API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const stopwords = [
    "de",
    "y",
    "para",
    "la",
    "el",
    "en",
    "con",
    "al",
    "-",
    "año",
    "2024",
    "del",
    "a",
    "e",
    "i",
    "o",
    "u",
    "san",
    "los",
    "",
    " ",
  ];

  const nombres = licit.flatMap((item) => item.Nombre.split(/\s+/));

  const palabras = nombres
    .filter((palabra) => !stopwords.includes(palabra.toLowerCase()))
    .map((palabra) => palabra.toLowerCase());

  const frequencyMap = palabras.reduce((acc, palabra) => {
    acc[palabra] = (acc[palabra] || 0) + 1;
    return acc;
  }, {});

  const topWords = Object.entries(frequencyMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20);

  const formatFechaTabla = (dateString) => {
    return format(new Date(dateString), "dd-MM-yyyy");
  };

  const formatFecha = (dateString) => {
    return format(new Date(dateString), "dd-MM-yyyy HH:mm");
  };

  const renderButton = (rowData) => {
    return (
      <>
        <Button onClick={() => handleButtonClick(rowData)}>
          <Typography variant="button" display="block" gutterBottom>
            Detalles
          </Typography>
        </Button>
        <DetailModal
          open={open}
          handleClose={handleClose}
          rowData={rowData}
          details={details}
          formatFecha={formatFecha}
        />
      </>
    );
  };

  const handleButtonClick = async (rowData) => {
    const { CodigoExterno } = rowData;

    setLoading(true);

    const apiURL = `${endpoint}&codigo=${encodeURIComponent(
      CodigoExterno
    )}&estado=activas`;

    try {
      const response = await axios.get(apiURL);
      setDetails(response.data.Listado[0]);
      handleOpen();
    } catch (error) {
      console.error("Error al obtener datos de la API:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      name: "CodigoExterno",
      label: "Codigo Externo",
    },
    {
      name: "Nombre",
      label: "Nombre",
    },
    {
      name: "FechaCierre",
      label: "Fecha Cierre",
      options: {
        customBodyRender: (value) => formatFechaTabla(value),
      },
    },
    {
      name: "",
      label: "#",
      options: {
        customBodyRender: (value, tableMeta) =>
          renderButton(licit[tableMeta.rowIndex]),
      },
    },
  ];

  const options = {
    responsive: "simple",
    download: true,
    downloadOptions: {
      filename: "tableDownload.csv",
      separator: ",",
      filterOptions: {
        useDisplayedRowsOnly: true,
        useDisplayedColumnsOnly: true,
      },
    },
    selectableRows: "none",
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {licit.length > 0 && (
            <>
              <Box>
                <NubePalabras topWords={topWords} />
                <br />
                <Barras licit={licit} />
              </Box>
            </>
          )}
        </Grid>
        <Grid item xs={8}>
          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <MUIDataTable
            title={"Tabla Licitaciones"}
            data={licit}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Tabla;
