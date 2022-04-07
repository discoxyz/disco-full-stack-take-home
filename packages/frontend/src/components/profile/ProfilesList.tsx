import * as React from "react";
import { 
  Box, 
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

import { ProfileView } from "./ProfileView";
import { ProfileLoader } from "./ProfileLoader";
import { ApiService } from "../../utils/ApiService";
import {useAsync} from "../../utils/useAsync"

interface TableType { 
  id: string;
  did: string; 
  name: string; 
  bio: string; 
}
export const ProfilesList: React.FC = (props) => {

  const api = React.useMemo(() => new ApiService(), []);
  const {data,  run,  isSuccess, isLoading} = useAsync()
  const [tableData, setTableData] = React.useState<TableType[]>([])

  React.useEffect(() =>{
    run(api.getAllProfiles())
  }, [])

 
  React.useEffect(() =>{
    if(isSuccess){
      const result = Object.keys(data).map((row) => data[row]);
      setTableData(result)
      console.log(result)
    }
  }, [data])

  if (isLoading) {
    return (
      <Box sx={{ alignItems: "center", display: "flex", justifyContent: "center", padding: "50px 0", width: "100%" }}>
        <CircularProgress />
      </Box>
    );
  }
  

  return (
    <Box>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>DID</TableCell>
            <TableCell >Name</TableCell>
            <TableCell >Bio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
     
          {tableData.map((row:TableType, i:number) =>
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.did}
              </TableCell>
              <TableCell >{row.name}</TableCell>
              <TableCell >{row.bio}</TableCell>
            </TableRow>
          )
          }
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
};
