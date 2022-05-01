import React from "react"

import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Header from "components/layouts/Header"

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: "3rem"
  }
}))

interface CommonLayoutProps {
  children: React.ReactElement
}

// 全てのページで共通となるレイアウト
const CommonLayout = ({ children }: CommonLayoutProps) => {
  const classes = useStyles()

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="sm" className={classes.container}>
          <Grid container justify="center">
            <Grid item xs={10}>
              {children}
            </Grid>   
          </Grid>
        </Container>
      </main>
    </>
  )
}

export default CommonLayout