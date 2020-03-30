// import { GetServerSideProps } from 'next'
// import Link from 'next/link'
import fetch from "node-fetch";
// import Layout from '../../components/Layout'
// import useSWR from "swr";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Paper, Box, Container } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Loading } from "../../components/loading";
import Alert from "@material-ui/lab/Alert";
// const fetcher = (url: string) => fetch(url).then(res => res.json());

const HtmlDocs = () => {
  const router = useRouter();
  const [data, setData] = useState<{ html: string; title: string } | undefined>(
    undefined
  );
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const accessToken = localStorage.getItem("GOOGLE_ACCESS_TOKEN");
    // const refreshToken = localStorage.getItem("GOOGLE_REFRESH_TOKEN");

    if (router.asPath && !accessToken) {
     router.push(`/authorize-url?state=${router.asPath}`);
     return;
    }
    if (router.query.id) {
      fetch(
        `/api/google/${router.query.id}?accessToken=${accessToken}`
      )
        .then(async result => {
          const json = await result.json();
          if (json.statusCode === 200) {
            setData(json);
          } else {
            setError(json.message);
          }
        })
        .catch((e) => {
         setError(`${JSON.stringify(e)}`);
        });
    }
  }, [router]);

  if (error)
    return (
      <Box pt={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  if (!data)
    return (
      <Box pt={12}>
        <Loading />
      </Box>
    );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">{data.title}</Typography>
        </Toolbar>
      </AppBar>
      <Box pt={4}>
        <Container maxWidth="md">
          <Paper>
            <Box p={2}>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.html
                }}
              ></div>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};


export default HtmlDocs;
