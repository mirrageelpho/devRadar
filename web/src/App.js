import React from 'react';

import './Global.css';
import './App.css';
import './Sidebar.css';

function App() {
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form>

          <div className="inputBlock">

            <label htmlFor="github_username">Usuário do Github</label>
            <input name="github_username" id="github_username" required />

          </div>

          <div className="inputBlock">

            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" required />

          </div>

          <div className="groupImput">

            <div className="inputBlock">
              <label htmlFor="latitude">latitude</label>
              <input name="latitude" id="latitude" required />
            </div>

            <div className="inputBlock">
              <label htmlFor="latitude">Longitude</label>
              <input name="latitude" id="latitude" required />
            </div>

          </div>
          <button type="submite"> Salvar </button>
        </form>
      </aside>
      <main>

      </main>
    </div>
  );
}

export default App;
