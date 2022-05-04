import React, { useContext, useState } from "react"
import Card from "@material-ui/core/Card"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { AuthContext } from "App"
import { Button, TextField } from "@material-ui/core"
import { useNavigate } from "react-router-dom"
import { createPhrase } from "lib/api/phrase"
import { Phrase } from "interfaces"

const useStyles = makeStyles((theme: Theme) => ({
  submitBtn: {
    paddingTop: theme.spacing(2),
    textAlign: "right",
    flexGrow: 1,
    textTransform: "none"
  },
  header: {
    textAlign: "center"
  },
  card: {
    marginTop: "40px",
    padding: theme.spacing(2),
    maxWidth: 400
  },
  box: {
    paddingTop: "2rem"
  },
  link: {
    textDecoration: "none"
  }
}))



const New: React.FC = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [english, setEnglish] = useState<string>("")
  const [japanese, setJapanese] = useState<string>("")
  const { currentUser } = useContext(AuthContext)
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(!currentUser)return

    const data: Phrase = {
      userId: currentUser.id,
      english: english,
      japanese: japanese
    }
    try {
      const res = await createPhrase(data)

      if (res.status === 200) {
        window.alert('success!')
        navigate("/")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form noValidate autoComplete="off">
    <Card className={classes.card}>
                  <TextField
              variant="outlined"
              required
              fullWidth
              label="英文"
              value={english}
              margin="dense"
              onChange={event => setEnglish(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="日本語訳"
              value={japanese}
              margin="dense"
              onChange={event => setJapanese(event.target.value)}
            />
            </Card>
            <div className={classes.submitBtn}>
<Button
                type="submit"
                variant="outlined"
                color="primary"
                disabled={!english || !japanese ? true : false}
                onClick={handleSubmit}
              >
                送信
              </Button>
              </div>

          </form>
  )
}

export default New