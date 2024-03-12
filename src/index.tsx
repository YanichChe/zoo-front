import React, {StrictMode, Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './styles/css/index.css';
import reportWebVitals from './reportWebVitals';
import {Color} from "./styles/tc/colors";
import {BrowserRouter} from "react-router-dom";
import {Router} from "./AppRouter";
import {PropagateLoader} from 'react-spinners'
import {Menu} from "./modules/Menu/Menu";
import {Observer} from "mobx-react";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Observer>
        {() => (
            <StrictMode>
                <Suspense
                    fallback={
                        <div style={{
                            alignItems: 'center',
                            display: 'flex',
                            height: '100vh',
                            justifyContent: 'center',
                            width: '100%'
                        }}>
                            <PropagateLoader color={Color.BUTTON_PRIMARY}/>
                        </div>
                    }
                >
                    <BrowserRouter>
                        <Menu/>
                        <Router/>
                    </BrowserRouter>
                </Suspense>
            </StrictMode>)}
    </Observer>
);

reportWebVitals();
