import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { format } from "date-fns";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DetailModal from "./DetailModal";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";

function Tabla() {
  const [licit, setLicit] = useState([]);
  const [details, setDetails] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const endpoint =
    "https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?ticket=54296D76-CAFF-4964-886F-35E9223D30B4&estado=activas";

  const getData = async () => {
    try {
      const response = await axios.get(endpoint);
      setLicit(response.data.Listado);
    } catch (error) {
      console.error("Error al obtener datos de la API:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Lista de palabras comunes a excluir (stopwords)
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

  // Paso 1: Obtener los Nombres
  const nombres = licit.flatMap((item) => item.Nombre.split(/\s+/));

  // Paso 2: Filtrar stopwords
  const palabras = nombres
    .filter((palabra) => !stopwords.includes(palabra.toLowerCase()))
    .map((palabra) => palabra.toLowerCase());

  // Paso 3: Contar la Frecuencia de cada palabra
  const frequencyMap = palabras.reduce((acc, palabra) => {
    acc[palabra] = (acc[palabra] || 0) + 1;
    return acc;
  }, {});

  // Paso 4: Obtener las 20 palabras más usadas
  const topWords = Object.entries(frequencyMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20);

  const formatFechaTabla = (dateString) => {
    return format(new Date(dateString), "dd-MM-yyyy");
  };

  const formatFecha = (dateString) => {
    return format(new Date(dateString), "dd-MM-yyyy HH:mm");
  };

  // Renderizar la nube de etiquetas con las 20 palabras más usadas
  const tagCloud = topWords.map(([palabra, frecuencia]) => (
    <Chip
      key={palabra}
      label={`${palabra} (${frecuencia})`}
      size="small"
      style={{
        margin: "4px",
        borderRadius: "5px",
        backgroundColor: "#f0f0f0",
      }}
    />
  ));

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

    // Construir la URL de la API con el CodigoExterno
    const apiURL = `${endpoint}&codigo=${encodeURIComponent(
      CodigoExterno
    )}&estado=activas`;

    try {
      const response = await axios.get(apiURL);
      // Actualizar el estado 'details'
      setDetails(response.data.Listado[0]);
      handleOpen(); // Abre el modal después de obtener los datos
    } catch (error) {
      // Manejar errores
      console.error("Error al obtener datos de la API:", error);
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
    <Container fixed>
      <Typography variant="h5">Top palabras</Typography>
      {tagCloud}
      <MUIDataTable
        title={"Tabla Licitaciones"}
        data={licit}
        columns={columns}
        options={options}
      />
    </Container>
  );
}

export default Tabla;
