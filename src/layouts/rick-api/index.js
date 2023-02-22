

import {  useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "themes/LayoutContainers/DashboardLayout";
import DashboardNavbar from "themes/Navbars/DashboardNavbar";
import Footer from "themes/Footer";
import { getEpisodes } from "services/rick-services";
import { CardContent, CardHeader, CardMedia, Icon, Typography } from "@mui/material";
import MDButton from "components/MDButton";
import { getEpisodesUrl } from "services/rick-services";



function RickApi() {

  const [infoEpisodes,setInfoEpisodes]= useState();
  const [listEpisodes,setListEpisodes]= useState([]);

  useEffect(()=>{
    getEpisodes().
    then((episodesData)=>{
      console.log(episodesData);
      setInfoEpisodes(episodesData.info);
      setListEpisodes(episodesData.results);
    }).finally(()=>{});
  },[]);

 
 function formatDate(date){
    const listDate = date.split("T");
    return listDate[0];
 } 


function clicked(url){
  if(url != null){
    getEpisodesUrl(url).
    then((episodesData)=>{
      console.log(episodesData);
      setInfoEpisodes(episodesData.info);
      setListEpisodes(episodesData.results);
    }).finally(()=>{});
  }
}


 
 const contentListEpisodes = listEpisodes.map((e) =>
    <Grid  key={e.id} item xs={12} md={3} xl={3}>
       <Card>
          <CardMedia
            src={e.image}
            component="img"
            title={e.name}
            sx={{
              maxWidth: "100%",
              margin: 0,
              boxShadow: ({ boxShadows: { md } }) => md,
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <MDBox
            mx={2}
            mt={-3}
            py={3}
            px={2}
            variant="gradient"
            bgColor="success"
            borderRadius="lg"
            coloredShadow="success"
          >
            <MDTypography variant="h6" color="white">
              {e.name}
            </MDTypography>
          </MDBox>
          <CardContent sx={{ bgcolor: "#E8E8E8" }}>
            <Typography variant="h4" component="h5">
            {formatDate(e.created)}
            </Typography>
            <MDTypography component="h3"   verticalAlign="middle" variant="button" fontWeight="bold">

                Species: {e.species}
            </MDTypography>
            <MDTypography component="h3"   verticalAlign="middle" variant="button" fontWeight="bold">
                Status: {e.status}
            </MDTypography>
          </CardContent>

       </Card> 
    </Grid>
  );


  const horizontalBar = (
    <Grid item xs={12}>
      <Card>
        <MDBox pt={1} px={2} pb={1} display="flex" justifyContent="space-between" alignItems="center">
          <MDButton 
            variant="gradient" color={infoEpisodes?.prev != null ? 'info' :'light'}
            onClick={() => {
              clicked(infoEpisodes?.prev);
            }}>
              Prev
          </MDButton>

          <MDButton variant="gradient" color={infoEpisodes?.next != null ? 'info' :'light'}
            onClick={() => {
              clicked(infoEpisodes?.next);
            }}>
                Next
          </MDButton>
          

        </MDBox>
      </Card>
  </Grid>
);
  return (
    <DashboardLayout>
      <DashboardNavbar />
     
      <MDBox pt={1} pb={1}>
        {horizontalBar}
      </MDBox> 
      <MDBox mt={6} mb={2}>
        <Grid container spacing={3}>
            {contentListEpisodes}
        </Grid>
      </MDBox>
      <MDBox pt={1} pb={1}>
        {horizontalBar}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
  
  export default RickApi;