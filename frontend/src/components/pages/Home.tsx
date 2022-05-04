import React, { useContext, useEffect, useState } from "react"
import Card from "@material-ui/core/Card"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { AuthContext } from "App"
import { IconButton, List, ListItemText, Typography } from "@material-ui/core"
import { useNavigate } from "react-router-dom"
import { getPhrase } from "lib/api/phrase"
import EditIcon from '@mui/icons-material/Edit'

const useStyles = makeStyles((theme: Theme) => ({
  submitBtn: {
    paddingTop: theme.spacing(2),
    textAlign: "right",
    flexGrow: 1,
    textTransform: "none"
  },
  head: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  list: {
    width: "100%",
  },
  card: {
    padding: "8px 16px",
    marginBottom: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  editIcon: {
    '&:hover': {
      cursor: "pointer",
      opacity: 0.8
    }
  },
  box: {
    paddingTop: "2rem"
  },
  link: {
    textDecoration: "none"
  }
}))

// とりあえず認証済みユーザーの名前やメールアドレスを表示
const Home: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext)
  const classes = useStyles()
  const navigate = useNavigate()

  const [phrases, setPhrases] = useState([])

  const onClickCreateIcon = () => {
    navigate('new')
  }

  useEffect(() => {
    _getPhrase()
  }, [])

  const _getPhrase = async() => {
    try {
      const res = await getPhrase()

      if (res.status === 200) {
        setPhrases(res.data.phrases)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const onClickEdit = (index: number) => {
    navigate("edit", { state: phrases[index] })
  }

  return (
    <>
      {
        isSignedIn && currentUser ? (
          <>
          <div className={classes.head}>
            <Typography variant="h6" component="h2">Hello, {currentUser?.name}!</Typography>
            <IconButton color="primary" size="small" onClick={()=>onClickCreateIcon()}>+</IconButton>
          </div>
              <List className={classes.list}>
              {phrases?.map((phrase:any, index:number) => {
                return (
                  <Card key={phrase.id} className={classes.card} >
                    <ListItemText primary={phrase?.english} secondary={phrase?.japanese} />
                    <EditIcon className={classes.editIcon} onClick={()=>onClickEdit(index)} />
                  </Card>
                )
              })}
            </List>
          </>
        ) : (
          <></>
        )
      }
    </>
  )
}

export default Home