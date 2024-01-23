/* eslint-disable react/prop-types */
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ItemCard from "./ItemCard";

const DetailModal = ({ open, handleClose, rowData, details, formatFecha }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: "100%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflow: "scroll",
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Código de Licitación: {rowData.CodigoExterno}
        </Typography>
        <hr />

        {details && (
          <>
            <Table>
              <TableBody>
                <TableRow>
                  <Typography variant="h5">Detalles:</Typography>
                </TableRow>
                <TableRow>
                  <TableCell variant="h4">Nombre:</TableCell>
                  <TableCell>{details.Nombre}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Descripción:</TableCell>
                  <TableCell>{details.Descripcion}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Estado:</TableCell>
                  <TableCell>
                    {details.Estado} (Cierra en {details.DiasCierreLicitacion}{" "}
                    días)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Responsable Contrato:</TableCell>
                  <TableCell>{details.NombreResponsableContrato}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Responsable Pago:</TableCell>
                  <TableCell>{details.NombreResponsablePago}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table>
              <TableBody>
                <TableRow>
                  <Typography variant="h5">Comprador:</Typography>
                </TableRow>
                <TableRow>
                  <TableCell color="gray">Organismo:</TableCell>
                  <TableCell>{details.Comprador.NombreOrganismo}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell color="gray">Unidad:</TableCell>
                  <TableCell>{details.Comprador.NombreUnidad}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell color="gray">Usuario:</TableCell>
                  <TableCell>{details.Comprador.NombreUsuario}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell color="gray">Región:</TableCell>
                  <TableCell>{details.Comprador.RegionUnidad}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell color="gray">Comuna:</TableCell>
                  <TableCell>{details.Comprador.ComunaUnidad}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table>
              <TableBody>
                <TableRow>
                  <Typography variant="h5">Fechas:</Typography>
                </TableRow>
                <TableRow>
                  <TableCell color="gray">Fecha de Publicación:</TableCell>
                  <TableCell>
                    {formatFecha(details.Fechas.FechaPublicacion)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell color="gray">Fecha de Cierre:</TableCell>
                  <TableCell>
                    {formatFecha(details.Fechas.FechaCierre)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell color="gray">Fecha Final:</TableCell>
                  <TableCell>
                    {formatFecha(details.Fechas.FechaFinal)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell color="gray">
                    Fecha Estimada de Publicación:
                  </TableCell>
                  <TableCell>
                    {formatFecha(details.Fechas.FechaEstimadaAdjudicacion)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell color="gray">
                    Fecha Estimada de Adjudicación:
                  </TableCell>
                  <TableCell>
                    {formatFecha(details.Fechas.FechaEstimadaAdjudicacion)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table>
              <TableBody>
                <TableRow>
                  <Typography variant="h5">
                    Items: {details.Items.Cantidad}
                  </Typography>
                </TableRow>
              </TableBody>
            </Table>

            {/* Renderizar tarjetas de Items */}
            {details.Items.Listado.map((item, index) => (
              <ItemCard key={index} item={item} />
            ))}
          </>
        )}
      </Box>
    </Modal>
  );
};

export default DetailModal;
