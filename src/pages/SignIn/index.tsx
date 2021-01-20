import React from 'react'
import { Button, makeStyles, Typography } from '@material-ui/core'
import TwitterIcon from '@material-ui/icons/Twitter'
import SearchIcon from '@material-ui/icons/Search'
import PeopleIcon from '@material-ui/icons/PeopleOutline'
import CommentIcon from '@material-ui/icons/ModeCommentOutlined'
import { LoginModal } from './components/LoginModal'
import { RegisterModal } from './components/RegisterModal'

export const useStylesSignIn = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    height: '100vh',
  },
  infoSide: {
    backgroundColor: '#71C9F8',
    flex: '0 0 50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  infoSideBigIcon: {
    position: 'absolute',
    left: '71%',
    top: '46%',
    transform: 'translate(-50%, -50%)',
    width: '175%',
    height: '175%',
  },
  infoSideList: {
    position: 'relative',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    width: 380,
    '& h6': {
      display: 'flex',
      alignItems: 'center',
      color: 'white',
      fontWeight: 700,
      fontSize: 20,
    },
  },
  infoSideListItem: {
    marginBottom: 40,
  },
  infoSideListIcon: {
    fontSize: 35,
    marginRight: 15,
  },
  loginSide: {
    flex: '0 0 50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  loginSideTwitterIcon: {
    fontSize: 45,
  },
  loginSideWrapper: {
    width: 380,
  },
  loginSideTitle: {
    fontWeight: 700,
    fontSize: 32,
    marginBottom: 45,
    marginTop: 20,
  },
  loginSideField: {
    marginBottom: 18,
  },
  registerField: {
    marginBottom: theme.spacing(5),
  },
  loginFormControl: {
    marginBottom: theme.spacing(2),
  },
}))

export const SignIn: React.FC = (): React.ReactElement => {
  const classes = useStylesSignIn()
  const [visibleModal, setVisibleModal] = React.useState<'signIn' | 'signUp'>()

  const handleClickOpenSignIn = (): void => {
    setVisibleModal('signIn')
  }

  const handleClickOpenSignUp = (): void => {
    setVisibleModal('signUp')
  }

  const handleCloseModal = (): void => {
    setVisibleModal(undefined)
  }

  return (
    <div className={classes.wrapper}>
      <section className={classes.infoSide}>
        <TwitterIcon color="primary" className={classes.infoSideBigIcon} />
        <ul className={classes.infoSideList}>
          <li className={classes.infoSideListItem}>
            <Typography variant="h6">
              <SearchIcon className={classes.infoSideListIcon} />
              Читайте о том, что вам интересно.
            </Typography>
          </li>
          <li className={classes.infoSideListItem}>
            <Typography variant="h6">
              <PeopleIcon className={classes.infoSideListIcon} />
              Узнайте, о чем говорят в мире.
            </Typography>
          </li>
          <li className={classes.infoSideListItem}>
            <Typography variant="h6">
              <CommentIcon className={classes.infoSideListIcon} />
              Присоединяйтесь к общению.
            </Typography>
          </li>
        </ul>
      </section>
      <section className={classes.loginSide}>
        <div className={classes.loginSideWrapper}>
          <TwitterIcon
            color="primary"
            className={classes.loginSideTwitterIcon}
          />
          <Typography
            className={classes.loginSideTitle}
            gutterBottom
            variant="h4"
          >
            Узнайте, что происходит в мире прямо сейчас
          </Typography>
          <Typography>
            <b>Присоединяйтесь к Твиттеру прямо сейчас!</b>
          </Typography>
          <br />
          <Button
            onClick={handleClickOpenSignUp}
            style={{ marginBottom: 15 }}
            variant="contained"
            color="primary"
            fullWidth
          >
            Зарегистрироваться
          </Button>
          <Button
            onClick={handleClickOpenSignIn}
            variant="outlined"
            color="primary"
            fullWidth
          >
            Войти
          </Button>
          <LoginModal open={visibleModal === 'signIn'} onClose={handleCloseModal} />
          <RegisterModal open={visibleModal === 'signUp'} onClose={handleCloseModal} />
        </div>
      </section>
    </div>
  )
}
