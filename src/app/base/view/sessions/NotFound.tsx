/* eslint-disable jsx-a11y/alt-text */
import '../../../../../src/styles/NotFound.css'

import { Button } from '@mui/material'
import React, { useEffect, useRef } from 'react'

const NotFound: React.FC = () => {
  return (
    <>
      {/* ==================== MAIN ==================== */}
      <main className="main">
        {/* ==================== HOME ==================== */}
        <section className="home">
          <div className="home__container container">
            <div className="home__data">
              <span className="home__subtitle">Error 404</span>
              {/* <h1 className="home__title">Hey Buddy</h1> */}
              <h1 className="home__title">Upss.....</h1>
              <p className="home__description">
                No Pudimos Encontrar la página <br /> que buscabas.
              </p>
              {/* <a href="#" className="home__button"> */}
              <Button className="home__button" href="/">
                Volver a Inicio
              </Button>
            </div>

            <div className="home__img">
              <img
                src="https://github.com/Nicky-nn/Nicky-nn/blob/main/ghost-img.png?raw=true"
                //src="/assets/images/ghost-img.png"
                alt=""
              />
              <div className="home__shadow"></div>
            </div>
          </div>

          <footer className="home__footer">
            <span>(591) 68048228</span>
            <span>|</span>
            <span>contactos@integrate.com.bo</span>
          </footer>
        </section>
      </main>
    </>
  )
}

export default NotFound

