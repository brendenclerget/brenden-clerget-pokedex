import './App.scss';
import Directory from './components/Directory/directory';
import { lang } from './constants/lang';

const App = () => {
  return (
    <div className='App'>
      <div id='wrapper'>
        <header>
          <h1 className='text-center'>{lang.en.appHeader}</h1>
          <p className='header-text'>{lang.en.welcomeText}</p>
        </header>
        <main>
          <form id='search'>
            <input
              className='search-input'
              type='text'
              id='search_value'
              name='searchValue'
            ></input>
          </form>
          <Directory />
        </main>
        <footer>{lang.en.footerText}</footer>
      </div>
    </div>
  );
};

export default App;
