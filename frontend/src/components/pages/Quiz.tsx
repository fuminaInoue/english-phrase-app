import React, { useContext, useEffect, useRef, useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { AuthContext } from 'App'
import { Button, ListItemText, Typography } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { getRandomPhrase } from 'lib/api/phrase'
import { Phrase } from 'interfaces'

const useStyles = makeStyles((theme: Theme) => ({
  submitBtn: {
    paddingTop: theme.spacing(2),
    textAlign: 'right',
    flexGrow: 1,
    textTransform: 'none',
  },
  wrapper: {
    marginTop: '40px',
  },
  textInput: {
    height: '32px',
    marginTop: '40px',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #ccc',
    paddingLeft: '8px',
    fontSize: '16px',
    letterSpacing: 1.6,
    fontFamily: 'Helvetica Neue',
  },
  reslutImage: {
    width: '300px',
    height: 'auto',
    display: 'block',
    margin: '0 auto',
  },
  buttonWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: '40px',
  },
  card: {
    padding: '8px 16px',
    marginBottom: '16px',
  },
  box: {
    paddingTop: '2rem',
  },
  link: {
    textDecoration: 'none',
  },
}))

const Quiz: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext)
  const [count, setCount] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [isCorrect, setIsCorrect] = useState<Boolean | null>(null)
  const answer = useRef<HTMLInputElement>(null)
  const classes = useStyles()

  const [phrases, setPhrases] = useState<Phrase[]>()

  useEffect(() => {
    _getPhrase()
  }, [])

  const _getPhrase = async () => {
    try {
      const res = await getRandomPhrase()

      if (res.status === 200) {
        setPhrases(res.data.phrases)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const onClickSubmit = () => {
    if (!phrases) return

    const _input = answer.current?.value.toLowerCase().replace(/\s+/g, '')
    const _answer = phrases[count].english.toLowerCase().replace(/\s+/g, '')
    if (_input === _answer) {
      setIsCorrect(true)
    } else {
      setIsCorrect(false)
    }
  }

  const onClickNext = () => {
    if (!phrases) return

    setShowAnswer(false)
    if (count + 1 === phrases.length) {
      setCount(0)
    } else {
      setCount(count + 1)
    }
  }

  return (
    <>
      {isSignedIn && currentUser && phrases && (
        <div className={classes.wrapper}>
          {isCorrect !== null &&
            (isCorrect ? (
              <div>
                <Typography variant="h4" align="center">
                  正解！
                </Typography>
                <img className={classes.reslutImage} src={'../correct.png'} />
                <ListItemText
                  primary={`正解：${phrases[count].english}`}
                  secondary={`あなたの解答：${
                    answer.current?.value || '未解答'
                  }`}
                />
                <div className={classes.buttonWrapper}>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    onClick={() => [onClickNext(), setIsCorrect(null)]}
                  >
                    次へ
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <Typography variant="h4" align="center">
                  ざんねん！
                </Typography>
                <img className={classes.reslutImage} src={'../incorrect.png'} />
                <ListItemText
                  primary={`正解：${phrases[count].english}`}
                  secondary={`あなたの解答：${
                    answer.current?.value || '未解答'
                  }`}
                />
                <div className={classes.buttonWrapper}>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    onClick={() => [onClickNext(), setIsCorrect(null)]}
                  >
                    次へ
                  </Button>
                </div>
              </div>
            ))}
          {isCorrect === null && (
            <>
              <div>
                <Typography variant="h5">
                  {showAnswer
                    ? phrases[count].english
                    : phrases[count].japanese}
                </Typography>
                <input ref={answer} className={classes.textInput} />
              </div>
              <div className={classes.buttonWrapper}>
                {showAnswer ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    onClick={() => onClickNext()}
                  >
                    次へ
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    onClick={() => onClickSubmit()}
                  >
                    送信
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default Quiz
