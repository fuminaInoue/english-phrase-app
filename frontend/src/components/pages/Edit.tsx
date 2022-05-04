import React, { useContext, useState } from "react"
import Card from "@material-ui/core/Card"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { AuthContext } from "App"
import { Button, TextField } from "@material-ui/core"
import { useLocation, useNavigate } from "react-router-dom"
import { deletePhrase, patchPhrase } from "lib/api/phrase"
import { Phrase } from "interfaces"
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles((theme: Theme) => ({
  submitBtn: {
    paddingTop: theme.spacing(2),
    textAlign: "right",
    flexGrow: 1,
    textTransform: "none",
    display: "flex",
    justifyContent: "space-between"
  },
  deleteIcon: {
    '&:hover': {
      cursor: "pointer",
      opacity: 0.8
    }
  },
  header: {
    textAlign: "center"
  },
  card: {
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



const Edit: React.FC = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const location = useLocation()
  const [phrase, setPhrase]
  = useState<Phrase>(location.state as Phrase)
  const [english, setEnglish] = useState<string>(phrase.english)
  const [japanese, setJapanese] = useState<string>(phrase.japanese)
  const { currentUser } = useContext(AuthContext)

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(!currentUser)return

    const data: Phrase = {
      id: phrase.id,
      english: english,
      japanese: japanese
    }
    try {
      const res = await patchPhrase(data)

      if (res.status === 200) {
        window.alert('success!')
        navigate('/')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const onClickDelete = async() => {
    const confirm = window.confirm('削除してよろしいですか？')
    if(!confirm||!phrase.id) return

    try {
      const res = await deletePhrase(phrase.id)

      if (res.status === 200) {
        window.alert('success!')
        navigate('/')
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
        margin="dense"
        defaultValue={phrase.english}
        onChange={event => setEnglish(event.target.value)}
      />
      <TextField
        variant="outlined"
        required
        fullWidth
        label="日本語訳"
        defaultValue={phrase.japanese}
        margin="dense"
        onChange={event => setJapanese(event.target.value)}
      />
    </Card>
    <div className={classes.submitBtn}>
      <DeleteIcon
        className={classes.deleteIcon}
        onClick={()=>onClickDelete()}
      />
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

export default Edit