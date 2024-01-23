import { useState, useEffect } from "react";
import "./Tabla.css";
import DataTable from "react-data-table-component";
import "styled-components";
import { useMemo } from "react";
import Button from "react-bootstrap/Button";
import * as XLSX from "xlsx";

function Tabla() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]); // Guarda los datos de la tabla en un array
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);

  const URL =
    "https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?ticket=54296D76-CAFF-4964-886F-35E9223D30B4&estado=activas";

  const showData = async () => {
    try {
      if (!hasFetchedData) {
        setLoading(true);

        const response = await fetch(URL);
        const responseData = await response.json();

        if (responseData && responseData.Listado) {
          setData(responseData.Listado);
          setHasFetchedData(true);
        } else {
          console.error(
            "La propiedad Listado no está presente en la respuesta:",
            responseData
          );
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    showData().catch((error) => {
      console.error("Error al obtener datos:", error);
    });
  }, []);

  const columns = [
    {
      name: "CodigoExterno",
      selector: (row) => row.CodigoExterno,
      sortable: true,
    },
    { name: "Nombre", selector: (row) => row.Nombre, sortable: true },
    {
      name: "Fecha Cierre",
      selector: (row) => row.FechaCierre,
      sortable: true,
    },
  ];

  function downloadXLSX(array) {
    const worksheet = XLSX.utils.json_to_sheet(array);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Licitaciones");

    // Utiliza XLSX.writeFile en lugar de XLSX.write
    XLSX.writeFile(workbook, "export.xlsx");

    console.log("Archivo XLSX descargado correctamente");
  }

  const Export = ({ onExport }) => (
    <Button onClick={() => handleExport(onExport)} disabled={loadingExport}>
      Exportar
    </Button>
  );

  const handleExport = async (onExport) => {
    setLoadingExport(true);
    try {
      await showData(); // Espera a que la solicitud inicial se complete antes de exportar
      onExport();
    } catch (error) {
      console.error("Error al obtener datos:", error);
    } finally {
      setLoadingExport(false);
    }
  };

  const actionsMemo = useMemo(
    () => <Export onExport={() => downloadXLSX(data)} />,
    [data]
  );

  return (
    <div className="container">
      <DataTable
        title="Licitaciones"
        columns={columns}
        data={data}
        pagination
        actions={actionsMemo}
      />
    </div>
  );
}

export default Tabla;
