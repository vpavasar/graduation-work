import React, {useContext} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import MovieIcon from '@material-ui/icons/Movie';
import TvIcon from '@material-ui/icons/Tv';
import Button from '@material-ui/core/Button';
import MoreIcon from '@material-ui/icons/MoreVert';
// import LanguageIcon from '@material-ui/icons/Language';
import TranslateIcon from '@material-ui/icons/Translate';
// import GTranslateIcon from '@material-ui/icons/GTranslate';

import {AuthContext} from "../context/AuthContext";
import {LocalizationContext, localizations} from "../context/LocalizationContext";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export const PrimarySearchAppBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorLocalizationEl, setAnchorLocalizationEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isLocalizationMenuOpen = Boolean(anchorLocalizationEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLocalizationMenuOpen = (event) => {
    setAnchorLocalizationEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleLocalizationMenuClose = () => {    
    setAnchorLocalizationEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const auth = useContext(AuthContext);
  const local = useContext(LocalizationContext);
  
  const history = useHistory();

  const toogleRusLoacl = () => {
    local.toggleLoacalization(localizations.RUS);
    handleLocalizationMenuClose();
  }
  const toogleEnLoacl = () => {
    local.toggleLoacalization(localizations.EN);    
    handleLocalizationMenuClose();
  }

  const logoutHandler = () => {
      auth.logout();
      handleMenuClose();
  };
  const goToProfile = () => {
      history.push(`/profile/${auth.userId}`);
      handleMenuClose();
  };
  const goToMovies = () => {
      history.push('/');
  };
  const goToTV = () => {
      history.push('/tv');
  };
  const goToPeople = () => {
      history.push('/person');
  };

  const onSubmit = event => {
    const request = event.target.value.trim();

    if(event.key !== 'Enter'){
      return;
    }

    if(request.length === 0){
      return;
    }

    history.push(`/search/${request}`);
    event.target.value = '';
  }

  const localizationMenuId = 'primary-search-account-localization-menu';
  const renderLocalizationMenu = (
    <Menu
      anchorEl={anchorLocalizationEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={localizationMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isLocalizationMenuOpen}
      onClose={handleLocalizationMenuClose}
    >
      <MenuItem onClick={toogleRusLoacl}>Русский</MenuItem>
      <MenuItem onClick={toogleEnLoacl}>English</MenuItem>
    </Menu>
  );

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={goToProfile}>{local.localization === localizations.EN ? 'Profile' : 'Профиль'}</MenuItem>
      <MenuItem onClick={logoutHandler}>{local.localization === localizations.EN ? 'Logout' : 'Выйти'}</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
        <MenuItem onClick={goToMovies}>
            <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            >
                <MovieIcon />
            </IconButton>
            <p>{local.localization === localizations.EN ? 'Movies' : 'Фильмы'}</p>
        </MenuItem>
        <MenuItem onClick={goToTV}>
            <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            >
                <TvIcon />
            </IconButton>
            <p>{local.localization === localizations.EN ? 'TV Shows' : 'Сериалы'}</p>
        </MenuItem>
        <MenuItem onClick={goToPeople}>
            <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            >
                <RecentActorsIcon/>
            </IconButton>
            <p>{local.localization === localizations.EN ? 'People' : 'Актёры'}</p>
        </MenuItem>
      <MenuItem onClick={handleLocalizationMenuOpen}>
        <IconButton
          aria-label="localization"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <TranslateIcon />
        </IconButton>
        <p>{local.localization === localizations.EN ? 'Localization' : 'Локализация'}</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>{local.localization === localizations.EN ? 'Profile' : 'Профиль'}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{backgroundColor: 'rgba(0, 0, 0, 0.84)'}}>
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography onClick={goToMovies} className={classes.title} variant="h6" noWrap style={{cursor: 'pointer'}}>
            Movies Searcher
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder={local.localization === localizations.EN ? 'Search…' : 'Поиск…'}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onKeyPress={onSubmit}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button color="inherit" onClick={goToMovies}>{local.localization === localizations.EN ? 'Movies' : 'Фильмы'}</Button>
            <Button color="inherit" onClick={goToTV}>{local.localization === localizations.EN ? 'TV Shows' : 'Сериалы'}</Button>
            <Button color="inherit" onClick={goToPeople}>{local.localization === localizations.EN ? 'People' : 'Актёры'}</Button>
            <IconButton
              edge="end"
              aria-label="localization"
              aria-controls={localizationMenuId}
              aria-haspopup="true"
              onClick={handleLocalizationMenuOpen}
              color="inherit"
            >
              <TranslateIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderLocalizationMenu}
      {renderMenu}
    </div>
  );
}