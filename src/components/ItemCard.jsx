/* eslint-disable react/prop-types */
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

const ItemCard = ({ item }) => {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Correlativo: {item.Correlativo}
          </Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell color="gray">Descripción:</TableCell>
                <TableCell>{item.Descripcion}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell color="gray">Unidad de Medida:</TableCell>
                <TableCell>{item.UnidadMedida}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell color="gray">Categoría:</TableCell>
                <TableCell>{item.Categoria}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell color="gray">Nombre Producto:</TableCell>
                <TableCell>{item.NombreProducto}</TableCell>
              </TableRow>
              {/* Agrega más detalles según sea necesario */}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ItemCard;
