import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { format } from "date-fns";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DetailModal from "./DetailModal";

function Tabla() {
  const [licit, setLicit] = useState([]);
  const [details, setDetails] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const endpoint =
    "https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?ticket=54296D76-CAFF-4964-886F-35E9223D30B4&estado=activas";

  const getData = async () => {
    await axios.get(endpoint).then((response) => {
      const data = response.data;
      setLicit(data.Listado);
    });
  };

  useEffect(() => {
    getData();
  }, []);

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

    // Construir la URL de la API con el CodigoExterno
    const apiURL = `${endpoint}&codigo=${encodeURIComponent(
      CodigoExterno
    )}&estado=activas`;

    try {
      const response = await axios.get(apiURL);
      // Actualizar el estado 'details'
      setDetails(response.data.Listado[0]);
      console.log(response.data.Listado[0]);
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
        customBodyRender: (value) => formatFecha(value),
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
    <div className="container">
      <MUIDataTable
        title={"Tabla Licitaciones"}
        data={licit}
        columns={columns}
        options={options}
      />
    </div>
  );
}

export default Tabla;
