import React, { useContext, useEffect, useState } from "react"
import Card from "@material-ui/core/Card"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { AuthContext } from "App"
import { Button, Icon, List, ListItemText, Typography } from "@material-ui/core"
import { useNavigate } from "react-router-dom"
import { getRandomPhrase } from "lib/api/phrase"
import { Phrase } from "interfaces"

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
  },
  buttonWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop:  "60px"
  },
  card: {
    padding: "8px 16px",
    marginBottom: "16px"
  },
  box: {
    paddingTop: "2rem"
  },
  link: {
    textDecoration: "none"
  }
}))

// とりあえず認証済みユーザーの名前やメールアドレスを表示
const Quiz: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext)
  const [count, setCount] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const classes = useStyles()
  const navigate = useNavigate()

  const [phrases, setPhrases] = useState<Phrase[]>()

  const onClickCreateIcon = () => {
    navigate('new')
  }

  useEffect(() => {
    _getPhrase()
  }, [])

  const _getPhrase = async() => {
    try {
      const res = await getRandomPhrase()

      if (res.status === 200) {
        setPhrases(res.data.phrases)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const onClickNext = () => {
    if(!phrases) return

    setShowAnswer(false)
    if(count + 1 === phrases.length){
      setCount(0)
    }else{
      setCount(count+1)
    }
  }

  return (
    <>
      {
        isSignedIn && currentUser && phrases&& (
          <>
          <div className={classes.head}>
            <Typography variant="h6" component="h2">
              {showAnswer ? (
                phrases[count].japanese
              ):(
                phrases[count].english
              )}
            </Typography>
          </div>
          <div className={classes.buttonWrapper}>
          {showAnswer ? (
            <Button variant="outlined" color="primary" className={classes.button}
            onClick={()=>onClickNext()}>次へ</Button>
          ):(
            <Button variant="outlined" color="primary" className={classes.button}
            onClick={()=>setShowAnswer(true)}>日本語訳</Button>
          )}
          </div>
          </>
        )
      }
    </>
  )
}

export default Quiz